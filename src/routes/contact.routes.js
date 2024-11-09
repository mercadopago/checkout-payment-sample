import { Router } from 'express';
import path from 'path';
import { pool } from '../db.js'; // conexión a la base de datos

const router = Router();

// laruta del formulario de contacto
router.get('/contacto', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'src/pages/contacto.html'));
});


// Ruta para manejar el formulario de contacto
router.post('/contacto', async (req, res) => {
    console.log('Se ha recibido una solicitud POST a /contacto');
    console.log('Datos recibidos del formulario:', req.body);
  
    const { nombre, email, mensaje } = req.body;
  
    try {
      const query = `
        INSERT INTO mensajes_contacto (nombre, email, mensaje)
        VALUES (?, ?, ?);
      `;
      await pool.query(query, [nombre, email, mensaje]);
      console.log('Datos guardados en la base de datos correctamente.');
  
      // Enviar HTML para mostrar mensaje y redirigir al inicio con contador regresivo 10seg
      res.setHeader('Content-Type', 'text/html');
      res.send(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Mensaje Enviado</title>
          <link rel="stylesheet" href="/public/styles.css">
          <script>
            let countdown = 10;
  
            function updateCountdown() {
              document.getElementById("countdown").innerText = countdown;
              countdown--;
  
              if (countdown < 0) {
                window.location.href = "/";
              } else {
                setTimeout(updateCountdown, 1000);
              }
            }
  
            // Iniciar el contador cuando la página cargue
            window.onload = updateCountdown;
          </script>
        </head>
        <body>
          <div class="container" style="text-align: center; margin-top: 50px;">
            <h2>¡Gracias por contactarnos!</h2>
            <p>Responderemos tu mensaje a la brevedad. vas a volver al inicio en <span id="countdown">10</span> segundos.</p>
          </div>
        </body>
        </html>
      `);
    } catch (error) {
      console.error('Error al guardar el mensaje de contacto:', error);
      res.status(500).send('Hubo un error al enviar tu mensaje. Por favor, intenta de nuevo más tarde.');
    }
  });
  
  

export default router;
