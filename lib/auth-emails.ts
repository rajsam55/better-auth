// app/actions/auth-emails.ts
"use server";


import mailchimpTransactional from "@mailchimp/mailchimp_transactional"







const mailchimp = mailchimpTransactional(process.env.MAILCHIMP_TRANSACTIONAL_API_KEY!);

interface SendResetEmailProps {
  email: string;
  resetUrl: string;
}

export async function sendMailchimpResetEmail({ email, resetUrl }: SendResetEmailProps) {
  try {
    const senderEmail = process.env.MAILCHIMP_SENDER_EMAIL;
    if (!senderEmail) {
      throw new Error("MAILCHIMP_SENDER_EMAIL environment variable is not set");
    }

    const response = await mailchimp.messages.send({
      message: {
        from_email: senderEmail,
        subject: "Reset Your Password",
        html: `
          <p>You requested a password reset.</p>
          <p>Click the link below to set a new password:</p>
          <a href="${resetUrl}" target="_blank">Reset Password</a>
          <p>If you did not request this, please ignore this email.</p>
        `,
        to: [
          {
            email: email,
            type: "to",
          },
        ],
      },
    });

    return { success: true, data: response };
  } catch (error) {
    console.error("Mailchimp email error:", error);
    return { success: false, error: "Failed to send reset email" };
  }
}
