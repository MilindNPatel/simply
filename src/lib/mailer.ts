import nodemailer from "nodemailer";
const { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASSWORD } = process.env;

const mailer = async (email: any, text: any, subject: any) => {
  return new Promise(async (resolve: any, reject: any) => {
    try {
      const host = MAIL_HOST || "";
      const port = MAIL_PORT ? parseInt(MAIL_PORT) : 587;
      const user = MAIL_USER || "";
      const pass = MAIL_PASSWORD || "";
      const transporter = nodemailer.createTransport({
        host: host,
        port: port,
        secure: false,
        auth: {
          user: user,
          pass: pass,
        },
      });
      let info = await transporter.sendMail({
        from: "demotvapp@gmail.com", // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        text: text,
      });
      resolve(info);
    } catch (error) {
      reject(error);
    }
  });
};
export default mailer;
