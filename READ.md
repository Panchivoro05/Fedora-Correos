# Sistema de Contacto Full-Stack (React Native & Node.js)

Aplicación móvil desarrollada con **React Native (Expo)** y un backend en **Node.js (Express)** conectado a una base de datos **MySQL**, con notificaciones automatizadas vía **Nodemailer (SMTP)**.

## 📂 Estructura del Proyecto

- `/app-correo`: Aplicación móvil en React Native / Expo (Frontend).
- `/backend`: API REST en Node.js y Express (Backend).

## 🚀 Requisitos Previos

Asegúrate de tener instalado en tu entorno:
- Node.js (v18 o superior)
- MySQL Server
- Expo Go (en tu dispositivo móvil) o un emulador configurado

## ⚙️ Configuración y Ejecución

### 1. Configurar y Ejecutar el Backend

1. Entra a la carpeta del backend:
   ```bash
   cd backend
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo `.env` en la raíz de la carpeta `backend` con tus credenciales:
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=tu_usuario
   DB_PASSWORD=tu_contraseña
   DB_NAME=sistema_correos
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=tu_correo@gmail.com
   SMTP_PASSWORD=tu_app_password
   ```

4. Inicia el servidor:
   ```bash
   npm start
   ```

### 2. Configurar y Ejecutar el Frontend

1. Abre otra pestaña o ventana de la terminal y entra a la carpeta del frontend:
   ```bash
   cd app-correo/frontend
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia la aplicación con Expo:
   ```bash
   npx expo start
   ```
