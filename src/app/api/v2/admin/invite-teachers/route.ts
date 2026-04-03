import { NextResponse } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";
import mongoDbConnection from "@/middlewares/connection";
import Invite from "@/models/faculty_invite_mail";
import FacultyModel from "@/models/faculty";

export async function POST(req: Request) {
  try {
    await mongoDbConnection();
    const { emails } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASS,
      },
    });

    const results = await Promise.all(
      emails.map(async (email: string) => {
        try {
          const trimmedEmail = email.trim();
          if (!trimmedEmail) return { email: trimmedEmail, status: "ignored", message: "Empty email" };

          // Check if faculty already exists
          const existingFaculty = await FacultyModel.findOne({ email_id: trimmedEmail });
          if (existingFaculty) {
            return { email: trimmedEmail, status: "failed", message: "User already registered as faculty." };
          }

          // Check if already invited (if so, we will re-send)
          let token = crypto.randomBytes(32).toString("hex");
          const existingInvite = await Invite.findOne({ email: trimmedEmail, used: false });
          
          if (existingInvite) {
            existingInvite.token = token;
            await existingInvite.save();
          } else {
            await Invite.create({ email: trimmedEmail, token });
          }
          
          // Use the correct project link
          const link = `https://www.aislamiadegreecollegelko.org/erp/faculty/signup?token=${token}`;

          await transporter.sendMail({
            from: `"Aislamiadegreecollege ERP" <${process.env.SMTP_EMAIL}>`,
            to: trimmedEmail,
            subject: "You're invited to join as a Teacher",
            html: `<p>Hello,</p>
                   <p>You’ve been invited to join as a teacher. Click below to register:</p>
                   <a href="${link}" style="color: blue;">${link}</a>`,
          });

          return { 
            email: trimmedEmail, 
            status: "success", 
            message: existingInvite ? "Invitation re-sent" : "Invitation sent" 
          };
        } catch (err) {
          console.error(`Error inviting ${email}:`, err);
          return { email, status: "failed", message: "Failed to send email." };
        }
      })
    );

    const successfulInvites = results.filter(r => r.status === "success");
    const failedInvites = results.filter(r => r.status === "failed");

    let finalMessage = "";
    if (successfulInvites.length > 0 && failedInvites.length === 0) {
      finalMessage = `${successfulInvites.length} invitations sent successfully!`;
    } else if (successfulInvites.length === 0 && failedInvites.length > 0) {
      // If ONLY failures, show the REASON for the first failure to be informative
      finalMessage = `Failed: ${failedInvites[0].message} (Total: ${failedInvites.length})`;
    } else {
      finalMessage = `${successfulInvites.length} sent, ${failedInvites.length} failed.`;
    }

    return NextResponse.json({
      message: finalMessage,
      invites: successfulInvites,
      errors: failedInvites,
    });
  } catch (error) {
    console.error("Critical error in invite-teachers:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
