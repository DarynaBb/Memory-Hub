import ContactForm from "../models/ContactFromModel.js"
import nodemailer from "nodemailer";

export const sendContactForm = async (req, res) => {
  const { firstName, lastName, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_EMAIL_PASS,
    },
  });

  try {
    const newContactForm = new ContactForm({ firstName, lastName, email, message });
    await newContactForm.save();

    await transporter.sendMail({
      from: process.env.ADMIN_EMAIL,
      to: email,
      subject: "MemoryHub - Your contact form has been submitted",
      text: `Dear ${firstName},\n\n
      Thanks for your contact. We have got your request and We will be in touch as soon as possible.\n\n
      Best Regards,\n
      Your MemoryHub Team`, 
    });


    res.status(201).send("Message sent and saved!");
  } catch (error) {
    res.status(500).send("Error while sending or saving the message: " + error.message);
  }

  console.log("Received Form Data:", { firstName, lastName, email, message });
};
