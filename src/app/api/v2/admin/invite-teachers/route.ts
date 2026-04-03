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

    const invites = await Promise.all(
      emails.map(async (email: string) => {
        // Check if faculty already exists
        const existingFaculty = await FacultyModel.findOne({ email_id: email });
        if (existingFaculty) {
          throw new Error(`Faculty with email ${email} already exists.`);
        }

        const token = crypto.randomBytes(32).toString("hex");
        await Invite.create({ email, token });
        
        // Correct the link to include /erp prefix
        const link = `https://www.aislamiadegreecollegelko.org/erp/faculty/signup?token=${token}`;

        await transporter.sendMail({
          from: `"Aislamiadegreecollege ERP" <${process.env.SMTP_EMAIL}>`,
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
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: error.message || "Error sending invites" },
      { status: 500 }
    );
  }
}
