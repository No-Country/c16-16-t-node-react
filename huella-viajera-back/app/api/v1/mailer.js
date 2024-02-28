import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const mensajeBienvenida = ({ email }) => {
  return {
    from: "PetStay",
    to: `${email}`,
    subject: "¡Bienvenido a PetStay Latinoamerica!",
    text: "Bienvenido a PetStay, gracias por registrarte en nuestra plataforma.",
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
        <style>
            p, a, h1, h2, h3, h4, h5, h6 {font-family: 'Roboto', sans-serif !important;}
            h1{ font-size: 30px !important;}
            h2{ font-size: 25px !important;}
            h3{ font-size: 18px !important;}
            h4{ font-size: 16px !important;}
            p, a{font-size: 15px !important;}
    
            .claseBoton{
                width: 30%;
                    background-color: #48C8BB;
                    border: 2px solid #48C8BB;
                    color: black; 
                    padding: 16px 32px;
                    text-align: center;
                    text-decoration: none;
                    font-weight: bold;
                    display: inline-block;
                    font-size: 16px;
                    margin: 4px 2px;
                    transition-duration: 0.4s;
                    cursor: pointer;
                    border-radius: 10px;
            }
            .claseBoton:hover{
                background-color: #C96694;
                color: #ffffff;
                border-radius: 10px;
            }
            .imag{
                width: 20px;
                height: 20px;
            }
            .contA{
                margin: 0px 5px 0 5px;
            }
            .afooter{
                color: #ffffff !important; 
                text-decoration: none;
                font-size: 13px !important;
            }
        </style>
    </head>
    <body>
        <div style="width: 100%; background-color: #F7A363;">
            <div style="padding: 20px 10px 20px 10px;">
                <!-- Imagen inicial -->
                <div style="background-color: #48C8BB; padding: 10px 0px 10px 0px; width: 100%; text-align: center; border-radius: 10px;">
                    <img src="https://res.cloudinary.com/dmorvzjff/image/upload/v1709086162/app/Dise%C3%B1o_sin_t%C3%ADtulo_28_kh0biu.png" alt="" style="width: 120px; height: 120px; border-radius: 50%;">
                </div>
                <!-- Imagen inicial -->
    
                <!-- Contenido principal -->
                <div style="background: linear-gradient(to right, #F7A363, #C96694); margin:20px 0px 10px 0px; padding: 50px 0px 50px 0px; width: 100%; text-align: center; border-radius: 10px;">
                    <h1>¡Bienvenido a PetStay! </h1>
                    <p>

                    En petStay estamos felices de que te hayas unido a nuestra comunidad, podras encontrar el mejor cuidado para tu mascota y tambien podras ofrecer tus servicios como cuidador de mascotas.
                     
                    
                    </p>
    
                    <!-- Gracias -->
                    <p>Gracias por tu tiempo y empecemos a trabajar juntos! </p>
                    <p style="margin-bottom: 50px;"><i>Atentamente:</i><br>Equipo PetStay</p>
    
                    <!-- Botón -->
                    <a class="claseBoton" href="https://www.google.com/">Iniciar Sesión</a>
                </div>
                <!-- Contenido principal -->
    
                <!-- Footer -->
                <div style="background-color: #C96694; color: #ffffff; padding: 5px 0px 0px 0px; width: 100%; text-align: center; border-radius: 10px;">
                   
                    <h4>Soporte</h4>
                    <p style="font-size: 13px; padding: 0px 20px 0px 20px;">
                        Comunícate con nosotros por los siguientes medios:<br>
                        Correo: <a class="afooter" href="mailto:petstaylatam@gmail.com">petstaylatam@gmail.com</a><br>
                        Whatsapp: <a class="afooter" href="https://wa.me/573122821189">+57 320 871 9438</a><br>
                    </p>
                    <p style="background-color: #7DE900; padding: 20px 0px 10px 0px; font-size: 12px !important; border-radius: 10px;">
                        © 2024 PetStay, todos los derechos reservados.
                    </p>
                </div>
                <!-- Footer -->
            </div>
        </div>
    </body>
    </html>`,
  };
};
