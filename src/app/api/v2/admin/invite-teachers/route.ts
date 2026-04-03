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
            return { email: trimmedEmail, status: "failed", message: "Faculty with this email already exists." };
          }

          // Check if already invited
          const existingInvite = await Invite.findOne({ email: trimmedEmail, used: false });
          if (existingInvite) {
            return { email: trimmedEmail, status: "failed", message: "Invite already sent and pending." };
          }

          const token = crypto.randomBytes(32).toString("hex");
          await Invite.create({ email: trimmedEmail, token });
          
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

          return { email: trimmedEmail, status: "success", token };
        } catch (err) {
          console.error(`Error inviting ${email}:`, err);
          return { email, status: "failed", message: "failed" };
        }
      })
    );

    const successfulInvites = results.filter(r => r.status === "success");
    const failedInvites = results.filter(r => r.status === "failed");

    return NextResponse.json({
      message: `${successfulInvites.length} invites sent successfully! ${failedInvites.length} failed.`,
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
