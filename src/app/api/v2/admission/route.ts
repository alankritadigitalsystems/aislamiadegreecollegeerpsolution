import { NextResponse } from "next/server";
import mongoDbConnection from "@/middlewares/connection";
import AdmissionStudentInfo from "@/models/admission_student_info";
import StudentLogin from "@/models/student_login_model";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

export async function GET() {
  await mongoDbConnection();
  const allAdmissions = await AdmissionStudentInfo.find().sort({
    createdAt: -1,
  });
  return NextResponse.json(allAdmissions);
}

export async function POST(req: Request) {
  await mongoDbConnection();

  try {
    const data = await req.json();
    const newAdmission = await AdmissionStudentInfo.create(data);
    const randomPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(randomPassword, 10);
    const studentLogin = await StudentLogin.create({
      student_id: newAdmission._id,
      email_id: newAdmission.email_id,
      password: hashedPassword,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"Your Institute" <${process.env.EMAIL_USER}>`,
      to: newAdmission.email_id,
      subject: "Your Student Portal Login Credentials",
      html: `
        <h2>Welcome to Our Institute!</h2>
        <p>Dear ${newAdmission.full_name?.first_name || "Student"},</p>
        <p>Your admission has been successfully recorded.</p>
        <p>Here are your login details for the student portal:</p>
        <ul>
          <li><b>Email:</b> ${newAdmission.admission_email}</li>
          <li><b>Password:</b> ${randomPassword}</li>
        </ul>
        <p>Please change your password after first login.</p>
        <br/>
        <p>Regards,<br/>Institute Admin</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Admission created and credentials sent to student email.",
      admission: newAdmission,
      studentLogin,
    });
  } catch (error) {
    console.error("Error creating admission:", error);
    return NextResponse.json(
      { success: false, error: "Error creating admission" },
      { status: 500 }
    );
  }
}
