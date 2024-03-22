import mongoose from "mongoose";

const contactFormSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  message: String,
});

const ContactForm = mongoose.model("ContactForm", contactFormSchema);
export default ContactForm;
