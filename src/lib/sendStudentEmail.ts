import nodemailer from "nodemailer";
import { Resend } from "resend";

export async function sendStudentCredentialsEmail({
  toEmail,
  studentName,
  password,
}: {
  toEmail: string;
  studentName: string;
  password: string;
}) {
  const cleanEmail = toEmail?.trim();
  if (!cleanEmail) {
    return { success: false, error: "No recipient email provided" };
  }

  const subject = "Your Student Portal Login Credentials - Islamia Degree College";
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h2 style="color: #1e3a8a; margin-bottom: 4px;">Amiruddaula Islamia Degree College</h2>
        <p style="color: #64748b; font-size: 14px; margin-top: 0;">Student ERP Portal Access</p>
      </div>
      <p style="color: #334155; font-size: 16px;">Dear <b>${studentName || "Student"}</b>,</p>
      <p style="color: #334155; font-size: 15px; line-height: 1.5;">
        Your student admission record has been registered. You can now access your ERP Student Portal using the login credentials below:
      </p>
      <div style="background-color: #f1f5f9; padding: 16px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #3b82f6;">
        <p style="margin: 6px 0; color: #1e293b; font-size: 15px;"><strong>Portal URL:</strong> <a href="https://www.aislamiadegreecollegelko.org/erp/login" style="color: #2563eb; text-decoration: underline;">Login Portal</a></p>
        <p style="margin: 6px 0; color: #1e293b; font-size: 15px;"><strong>Email ID:</strong> <span style="color: #0f172a; font-family: monospace;">${cleanEmail}</span></p>
        <p style="margin: 6px 0; color: #1e293b; font-size: 15px;"><strong>Temporary Password:</strong> <span style="color: #dc2626; font-family: monospace; font-weight: bold; background: #fee2e2; padding: 2px 6px; border-radius: 4px;">${password}</span></p>
      </div>
      <p style="color: #64748b; font-size: 13px;">
        * For security reasons, please login and change your password upon your first login.
      </p>
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
      <p style="color: #94a3b8; font-size: 12px; text-align: center;">
        Islamia Degree College Administration &bull; All Rights Reserved
      </p>
    </div>
  `;

  // 1. Try Nodemailer Gmail / SMTP
  if (process.env.SMTP_EMAIL && process.env.SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: Number(process.env.SMTP_PORT) || 587,
        secure: false,
        auth: {
          user: process.env.SMTP_EMAIL,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"Islamia Degree College" <${process.env.SMTP_EMAIL}>`,
        to: cleanEmail,
        subject,
        html: htmlContent,
      });

      return { success: true, method: "smtp" };
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      console.warn("SMTP email sending failed, trying Resend fallback...", errorMsg);
    }
  }

  // 2. Fallback to Resend if configured
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Islamia Degree College <onboarding@resend.dev>",
        to: cleanEmail,
        subject,
        html: htmlContent,
      });
      return { success: true, method: "resend" };
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      console.error("Resend email sending also failed:", errorMsg);
      return { success: false, error: errorMsg || "Failed to send email via Resend" };
    }
  }

  return { success: false, error: "No email service configured" };
}
