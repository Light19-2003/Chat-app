import { resend, sender } from "../lib/resend.js";

import { WelcomeEmailTemplate } from "../emails/emailTemplate.js";

export const sendEmail = async (email, name, clientURL) => {
  const { data, error } = await resend.emails.send({
    from: sender.email,
    to: email,
    subject: "Welcome to Chat App",
    html: WelcomeEmailTemplate(name, clientURL),
  });


  if (error){ console.log(error) 
    
    throw new Error(error);
  }

  else{
    console.log(data);
  }
};
