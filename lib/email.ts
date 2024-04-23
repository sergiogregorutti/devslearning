export const sendEmailWithMailgun = (emailData: any) => {
  const formData = require("form-data");
  const Mailgun = require("mailgun.js");
  const mailgun = new Mailgun(formData);
  const mg = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY,
  });

  return mg.messages.create("mg.devslearning.com", emailData);
};
