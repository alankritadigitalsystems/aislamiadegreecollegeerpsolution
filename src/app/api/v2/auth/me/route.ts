import { NextRequest, NextResponse } from "next/server";
import mongoDbConnection from "@/middlewares/connection";
import FacultyModel from "@/models/faculty";
import AdmissionStudentInfo from "@/models/admission_student_info";
import StudentLogin from "@/models/student_login_model";
import mongoose from "mongoose";

export async function GET(request: NextRequest) {
  try {
    await mongoDbConnection();

    // Look for userId in cookies or query params
    const cookieUserId = request.cookies.get("userId")?.value;
    const { searchParams } = new URL(request.url);
    const queryUserId = searchParams.get("userId") || searchParams.get("_id");

    const userId = cookieUserId || queryUserId;

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User not authenticated" },
        { status: 401 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { success: false, message: "Invalid user ID" },
        { status: 400 }
      );
    }

    // 1. Check Faculty collection
    const faculty = (await FacultyModel.findById(userId).lean()) as Record<string, unknown> | null;
    if (faculty) {
      const genuineRole = (faculty.role as string) || "teacher";
      const fullName = (faculty.full_name as Record<string, string>) || {};

      const response = NextResponse.json({
        success: true,
        role: genuineRole,
        userType: "faculty",
        user: {
          _id: faculty._id,
          first_name: fullName.first_name || "",
          last_name: fullName.last_name || "",
          email: (faculty.email_id as string) || "",
          mobile: (faculty.mobile_number as string) || "",
          gender: (faculty.gender as string) || "",
          profile_picture: (faculty.profile_picture as string) || "",
          date_of_joining: faculty.date_of_joining ? new Date(faculty.date_of_joining as string | Date).toISOString().split("T")[0] : "",
          date_of_retirement: faculty.date_of_retirement ? new Date(faculty.date_of_retirement as string | Date).toISOString().split("T")[0] : "",
          role: genuineRole,
          permissions: faculty.permissions || {},
        },
      });

      // Synchronize and lock userRole cookie to genuine DB role
      response.cookies.set("userRole", genuineRole, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 6,
      });

      return response;
    }

    // 2. Check Admission / Student collection
    const student = (await AdmissionStudentInfo.findById(userId).lean()) as Record<string, unknown> | null;
    if (student) {
      const genuineRole = "student";
      const fullName = (student.full_name as Record<string, string>) || {};

      const response = NextResponse.json({
        success: true,
        role: genuineRole,
        userType: "student",
        user: {
          _id: student._id,
          first_name: fullName.first_name || "",
          last_name: fullName.last_name || "",
          email: (student.email as string) || "",
          class: (student.class as string) || "",
          roll_number: (student.roll_number as string) || "",
          status: (student.status as string) || "",
          role: genuineRole,
        },
      });

      // Synchronize and lock userRole cookie to genuine DB role
      response.cookies.set("userRole", genuineRole, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 6,
      });

      return response;
    }

    // 3. Fallback: Check StudentLogin collection
    const studentLogin = (await StudentLogin.findOne({ student_id: userId }).lean()) as Record<string, unknown> | null;
    if (studentLogin) {
      const genuineRole = "student";

      const response = NextResponse.json({
        success: true,
        role: genuineRole,
        userType: "student",
        user: {
          _id: userId,
          email: (studentLogin.email_id as string) || "",
          role: genuineRole,
        },
      });

      response.cookies.set("userRole", genuineRole, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 6,
      });

      return response;
    }

    return NextResponse.json(
      { success: false, message: "User not found in database" },
      { status: 404 }
    );
  } catch (error: unknown) {
    console.error("Auth /me error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
