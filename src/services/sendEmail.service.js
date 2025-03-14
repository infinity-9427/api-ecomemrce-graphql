import nodemailer from "nodemailer";
import "dotenv/config";
import validator from "validator";

const emailUser = process.env.GMAIL_USER;
const keyUser = process.env.GMAIL_KEY;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: emailUser,
    pass: keyUser,
  },
});

export const sendEmailService = async ({ name, email, phone, subject, message, lang }) => {
  try {
    // 📌 Validaciones
    if (!name || !email || !message || !lang) {
      throw new Error("Missing required fields");
    }

    if (!validator.isEmail(email)) throw new Error("Invalid email format");
    if (!validator.isLength(name, { min: 2, max: 50 })) throw new Error("Name must be between 2 and 50 characters");
    if (!validator.isLength(message, { min: 10 })) throw new Error("Message must be at least 10 characters long");

    // Si el subject está vacío, asignar "No Subject"
    subject = subject?.trim() || "No Subject";

    // 📩 Enviar correo al administrador
    await transporter.sendMail({
      from: `Infinity Dev <${emailUser}>`,
      to: emailUser,
      subject,
      html: `
      <div style="background-color:#f4f4f4; padding:20px; color:#333; font-family:Arial, sans-serif;">
        <div style="max-width:600px; background:#ffffff; padding:20px; border-radius:10px; box-shadow:0px 0px 10px rgba(0,0,0,0.1); margin:auto;">
          <h2 style="color:#0073e6; text-align:center;">📩 New Contact Message</h2>
          <p style="font-size:16px; text-align:center;">You received a new message.</p>
          <div style="background:#f9f9f9; padding:15px; border-radius:8px; margin-top:15px;">
            <p><b>📌 Name:</b> ${name}</p>
            <p><b>📧 Email:</b> ${email}</p>
            ${phone ? `<p><b>📞 Phone:</b> ${phone}</p>` : ""}
            <hr style="border:none; border-top:1px solid #ddd; margin:10px 0;">
            <p><b>📂 Subject:</b> ${subject}</p>
            <p><b>✉️ Message:</b></p>
            <p style="background:#fff; padding:10px; border-radius:5px; border:1px solid #ddd;">${message}</p>
          </div>
          <div style="text-align:center; margin-top:20px;">
            <p style="font-size:14px; color:#666;">Infinity Dev | Tech Solutions</p>
          </div>
        </div>
      </div>
      `,
      text: `New Contact Message\n\nName: ${name}\nEmail: ${email}\n${phone ? `Phone: ${phone}\n` : ""}Subject: ${subject}\nMessage:\n${message}\n\nInfinity Dev | Tech Solutions`,
      replyTo: email,
    });

    // 📩 Enviar correo de confirmación al usuario
    const emailTemplates = {
      en: {
        subject: "Your message has been received!",
        greeting: `Hi ${name}, I have received your message and will get back to you as soon as possible.`,
        thanks: "Thank you for reaching out to Infinity Dev!",
      },
      es: {
        subject: "¡He recibido tu mensaje!",
        greeting: `Hola ${name}, he recibido tu mensaje y te responderé lo antes posible.`,
        thanks: "¡Gracias por contactar con Infinity Dev!",
      },
    };

    const selectedLang = emailTemplates[lang] || emailTemplates.en;

    await transporter.sendMail({
      from: `Infinity Dev <${emailUser}>`,
      to: email,
      subject: selectedLang.subject,
      html: `
      <div style="background-color:#f4f4f4; padding:10px; color:#333; font-family:Arial, sans-serif;">
        <div style="max-width:600px; background:#ffffff; padding:10px; border-radius:8px; box-shadow:0px 0px 10px rgba(0,0,0,0.1); margin:auto;">
          <h2 style="color:#0073e6; text-align:center;">${selectedLang.subject}</h2>
          <p style="font-size:16px; text-align:center;">
            ${selectedLang.greeting}
          </p>
          <div style="background:#f9f9f9; padding:10px; border-radius:5px; margin-top:10px;">
            <p><b>Subject:</b> ${subject}</p>
            <p><b>Message:</b></p>
            <p style="background:#fff; padding:10px; border-radius:5px; border:1px solid #ddd;">${message}</p>
          </div>
          <div style="text-align:center; margin-top:20px;">
            <p style="font-size:14px; color:#666;">${selectedLang.thanks}</p>
          </div>
        </div>
      </div>
      `,
      text: `${selectedLang.greeting}\n\nSubject: ${subject}\nMessage: ${message}\n\n${selectedLang.thanks}`,
    });

    return "Message sent successfully!";
  } catch (error) {
    console.error("Email sending error:", error);
    throw new Error("Failed to send message");
  }
};