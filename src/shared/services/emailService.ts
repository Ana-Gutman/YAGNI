import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'Gmail', 
    auth: {
        user: 'fedecabreradoglio@gmail.com', 
        pass: 'dpix ysal bfzy ycjl'
    },
});

export const enviarEmail = async (destinatario: string, asunto: string, mensaje: string) => {
    const mailOptions = {
        from: 'fedecabreradoglio@gmail.com',
        to: destinatario, 
        subject: asunto,
        text: mensaje,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Correo enviado con éxito');
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        throw error;
    }
};
