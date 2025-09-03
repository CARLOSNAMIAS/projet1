/* eslint-disable */

// ========================================
// IMPORTACIÓN DE DEPENDENCIAS
// ========================================
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config(); // Cargar variables de entorno

// ========================================
// CONFIGURACIÓN INICIAL DEL SERVIDOR
// ========================================
const app = express();
const port = process.env.PORT || 3000;

// ========================================
// CONFIGURACIÓN DE CORS
// ========================================
app.use(
  cors({
    origin: [
      'http://127.0.0.1:5502', // desarrollo local
      'http://localhost:5502', // desarrollo local
      'https://projet1-production-959a.up.railway.app', // backend en Railway
      'https://projet1-cyan.vercel.app', // frontend en Vercel ✅
    ],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// ========================================
// MIDDLEWARES
// ========================================
app.use(express.json());

// ========================================
// CONFIGURACIÓN DEL TRANSPORTADOR DE EMAIL
// ========================================
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Desde .env
    pass: process.env.EMAIL_PASS, // Desde .env
  },
});

// ========================================
// RUTAS Y ENDPOINTS
// ========================================
app.post('/enviar-factura', (req, res) => {
  const { to, subject, html } = req.body;

  if (!to || !subject || !html) {
    return res.status(400).send('Faltan datos para enviar el correo.');
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('❌ Error al enviar el correo:', error);
      return res.status(500).send('Error al enviar el correo.');
    }
    console.log('✅ Correo enviado con éxito:', info.response);
    res.status(200).send('Correo enviado con éxito.');
  });
});

// ========================================
// INICIALIZACIÓN DEL SERVIDOR
// ========================================
app.listen(port, () => {
  console.log(`✅ Servidor corriendo en el puerto ${port}`);
});
