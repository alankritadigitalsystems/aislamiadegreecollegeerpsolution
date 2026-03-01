import { NextResponse } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";
import mongoDbConnection from "@/middlewares/connection";
import Invite from "@/models/faculty_invite_mail";

export async function POST(req: Request) {
  try {
    await mongoDbConnection();
    const { emails } = await req.json();

    const invites = await Promise.all(
      emails.map(async (email: string) => {
        const token = crypto.randomBytes(32).toString("hex");
        const invite = await Invite.create({ email, token });
        const link = `http://localhost:3000/faculty/signup?token=${token}`;

        const transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: `"Your App" <${process.env.SMTP_EMAIL}>`,
          to: email,
          subject: "You're invited to join as a Teacher",
          html: `<p>Hello,</p>
                 <p>You’ve been invited to join as a teacher. Click below to register:</p>
                 <a href="${link}" style="color: blue;">${link}</a>`,
        });

        return { email, token };
      })
    );

    return NextResponse.json({
      message: "Invites sent successfully!",
      invites,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error sending invites" },
      { status: 500 }
    );
  }
}
