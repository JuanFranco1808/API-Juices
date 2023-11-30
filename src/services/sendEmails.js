
/*PIDE UNAS VERIFICACIONES DE GOOGLE 
DEBIDO A UNOS CREDENCIALES INVALIDOS, 
INTENTE QUITARLOS PERO NO ME DEJA :c
*/

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "juan.fraco1299@gmail.com",
    pass: "juancho1808",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function sendEmail() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"JuiceApp" <juan.fraco1299@gmail.com>', // sender address
    to: "juan.franco26551@ucaldas.edu.co", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "¡Hello world!", // plain text body
    html: "<b>¡Hello world!</b>", // html body
  });
  console.log("Email enviado");
}

//main().catch(console.error);

module.exports = { sendEmail };
