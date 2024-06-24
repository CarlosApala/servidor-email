const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware para procesar JSON y formularios URL-encoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuración del transportador (SMTP)
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'solrac.carlos767@gmail.com',  // Cambia esto por tu dirección de correo
        pass: 'ixwxpmckpvxskfrq'         // Cambia esto por tu contraseña o la contraseña de la aplicación generada
    }
});

// Ruta para enviar correos electrónicos
app.post('/send-email', (req, res) => {
    // Detalles del correo electrónico desde el cuerpo de la solicitud
    let mailOptions = {
        from: 'solrac.carlos766@gmail.com',    // Dirección de correo del remitente
        to: req.body.to,                // Dirección de correo del destinatario
        subject: req.body.subject,
        text: req.body.text
    };

    console.log('hola mundo');

    // Envío del correo electrónico
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            res.status(500).send('Error al enviar el correo electrónico');
        } else {
            console.log('Correo enviado: ' + info.response);
            res.status(200).send('Correo electrónico enviado correctamente');
        }
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});
