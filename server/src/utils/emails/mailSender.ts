import nodemailer from "nodemailer";
import { CustomAPIError } from "../../errors";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  // secure: false,
  // requireTLS: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  // logger:true,
});

export const mailSender = async function (email: string, title: string, body: string) {
  try {
    let info = await transporter.sendMail({
      from: "MystiScript",
      to: email,
      subject: title,
      html: body,
    });
    return info;
  } catch (error: any) {
    console.error(error?.message);
    throw new CustomAPIError("Error sending mail"); //TODO: handle error here
  }
};
