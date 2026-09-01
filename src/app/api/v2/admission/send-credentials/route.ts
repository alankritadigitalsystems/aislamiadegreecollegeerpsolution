import { NextResponse } from "next/server";
import mongoDbConnection from "@/middlewares/connection";
import AdmissionStudentInfo from "@/models/admission_student_info";
import StudentLogin from "@/models/student_login_model";
import bcrypt from "bcryptjs";
import { sendStudentCredentialsEmail } from "@/lib/sendStudentEmail";

function generateSecurePassword(length = 8) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
  let pwd = "";
  for (let i = 0; i < length; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pwd;
}

export async function POST(req: Request) {
  try {
    await mongoDbConnection();
    const { student_id, email } = await req.json();

    const cleanEmail = email?.trim();
    if (!student_id || !cleanEmail) {
      return NextResponse.json(
        { success: false, message: "student_id and valid email are required" },
        { status: 400 }
      );
    }

    const student = await AdmissionStudentInfo.findById(student_id);
    if (!student) {
      return NextResponse.json(
        { success: false, message: "Student record not found" },
        { status: 404 }
      );
    }

    // Update email in student record
    student.email_id = cleanEmail;
    await student.save();

    // Generate random password
    const rawPassword = generateSecurePassword(8);
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    let studentLogin = await StudentLogin.findOne({
      $or: [{ email_id: cleanEmail }, { student_id: student._id }],
    });

    if (studentLogin) {
      studentLogin.email_id = cleanEmail;
      studentLogin.password = hashedPassword;
      studentLogin.student_id = student._id;
      await studentLogin.save();
    } else {
      studentLogin = await StudentLogin.create({
        student_id: student._id,
        email_id: cleanEmail,
        password: hashedPassword,
      });
    }

    const studentName = `${student.full_name?.first_name || ""} ${student.full_name?.last_name || ""}`.trim();
    const mailRes = await sendStudentCredentialsEmail({
      toEmail: cleanEmail,
      studentName,
      password: rawPassword,
    });

    return NextResponse.json({
      success: true,
      message: mailRes.success
        ? `Credentials sent to ${cleanEmail} successfully!`
        : `Email updated and password generated, but email delivery issue: ${mailRes.error}`,
      rawPassword,
      mailStatus: mailRes,
    });
  } catch (error: any) {
    console.error("send-credentials API error:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
