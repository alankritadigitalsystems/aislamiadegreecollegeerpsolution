import { NextResponse } from "next/server";
import mongoDbConnection from "@/middlewares/connection";
import AdmissionStudentInfo from "@/models/admission_student_info";
import StudentLogin from "@/models/student_login_model";
import bcrypt from "bcryptjs";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  await mongoDbConnection();

  try {
    const collection = AdmissionStudentInfo.collection;
    const indexes = await collection.indexes();
    const emailIndex = indexes.find((idx) => idx.name === "email_id_1");
    if (emailIndex && !emailIndex.sparse) {
      await collection.dropIndex("email_id_1");
    }
  } catch {}

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

    await resend.emails.send({
      from: "Islamia Degree College <principalaidc@aislamiadegreecollegelko.org>",
      to: newAdmission.email_id,
      subject: "Your Student Portal Login Credentials",
      html: `
        <h2>Welcome to Our Institute!</h2>
        <p>Dear ${newAdmission.full_name?.first_name || "Student"},</p>
        <p>Your admission has been successfully recorded.</p>
        <ul>
          <li><b>Email:</b> ${newAdmission.email_id}</li>
          <li><b>Password:</b> ${randomPassword}</li>
        </ul>
      
        <br/>
        <p>Regards,<br/>Institute Admin</p>
      `,
    });

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

export async function DELETE() {
  await mongoDbConnection();

  try {
    const deletedAdmissions = await AdmissionStudentInfo.deleteMany({});
    const deletedLogins = await StudentLogin.deleteMany({});
    
    return NextResponse.json({
      success: true,
      message: `Successfully deleted all admission records (${deletedAdmissions.deletedCount}) and student logins (${deletedLogins.deletedCount}).`,
      count: deletedAdmissions.deletedCount,
    });
  } catch (error) {
    console.error("Error deleting admissions:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete admissions data" },
      { status: 500 }
    );
  }
}