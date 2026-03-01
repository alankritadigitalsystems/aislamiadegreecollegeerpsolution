import mongoDbConnection from "@/middlewares/connection";
import StudentLogin from "@/models/student_login_model";
import AdmissionStudentInfo from "@/models/admission_student_info";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function studentLogin(request) {
  try {
    await mongoDbConnection();
    const { email_id, password } = await request.json();

    if (!email_id)
      return NextResponse.json(
        { success: false, message: "Please enter email ID" },
        { status: 400 }
      );

    if (!password)
      return NextResponse.json(
        { success: false, message: "Please enter password" },
        { status: 400 }
      );

    const studentLogin = await StudentLogin.findOne({ email_id });
    if (!studentLogin)
      return NextResponse.json(
        { success: false, message: "No account found" },
        { status: 404 }
      );

    const isMatch = await bcrypt.compare(password, studentLogin.password);
    if (!isMatch)
      return NextResponse.json(
        { success: false, message: "Invalid password" },
        { status: 401 }
      );

    const admission = await AdmissionStudentInfo.findById(
      studentLogin.student_id
    );

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      student: {
        id: studentLogin.student_id,
        name: `${admission.full_name.first_name} ${
          admission.full_name.last_name || ""
        }`,
        class: admission.class,
        roll_number: admission.roll_number,
        status: admission.status,
      },
    });

    // ✅ Set cookies using NextResponse API
    response.cookies.set("userRole", "student", {
      path: "/",
      httpOnly: false,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 6, // 6 hours
    });

    response.cookies.set("userId", studentLogin.student_id.toString(), {
      path: "/",
      httpOnly: false,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 6,
    });

    return response;
  } catch (error) {
    console.error("Student login error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
