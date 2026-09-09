require('dotenv').config();

const express = require('express');
const mysql = require('mysql2/promise');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

app.post('/api/contacto', async (req, res) => {
  const { nombre, correo, telefono, asunto, mensaje } = req.body;

  if (!nombre || !correo || !telefono || !asunto || !mensaje) {
    return res.status(400).json({
      error: 'Los campos nombre, correo, telefono, asunto y mensaje son obligatorios.',
    });
  }

  let connection;
  try {
    connection = await pool.getConnection();

    await connection.execute(
      'INSERT INTO contactos (nombre, correo, telefono, asunto, mensaje) VALUES (?, ?, ?, ?, ?)',
      [nombre, correo, telefono, asunto, mensaje]
    );

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.MAIL_TO || process.env.SMTP_USER,
      replyTo: correo,
      subject: asunto,
      text: `Nombre: ${nombre}\nCorreo: ${correo}\nTeléfono: ${telefono}\nAsunto: ${asunto}\nMensaje:\n${mensaje}`,
      html: `<p><strong>Nombre:</strong> ${nombre}</p><p><strong>Correo:</strong> ${correo}</p><p><strong>Teléfono:</strong> ${telefono}</p><p><strong>Asunto:</strong> ${asunto}</p><p><strong>Mensaje:</strong></p><p>${mensaje}</p>`,
    });

    res.status(201).json({ mensaje: 'Datos guardados y correo enviado correctamente.' });
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud.' });
  } finally {
    if (connection) connection.release();
  }
});

process.on('unhandledRejection', (error) => {
  console.error('Promesa rechazada sin manejar:', error);
});

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';
app.listen(PORT, HOST, () => {
  console.log(`Servidor escuchando en ${HOST}:${PORT}`);
});
