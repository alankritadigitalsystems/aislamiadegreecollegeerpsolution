import mongoDbConnection from "@/middlewares/connection";
import FacultyModel from "@/models/faculty";
import { NextRequest, NextResponse } from "next/server";

interface FacultyLoginRequest {
  faculty_id: string;
  password: string;
  email_id:string
}

interface FacultyDoc {
  _id: string;
  name: string;
  faculty_id: string;
  email_id?: string;
  department?: string;
  password: string;
  role: string;
}

export async function POST(request: NextRequest) {
   await mongoDbConnection();
  try {
    const body = (await request.json()) as FacultyLoginRequest;

    if (!body?.email_id || !body?.password) {
      return NextResponse.json(
        { message: "Missing required login credentials (email_id/password)." },
        { status: 400 }
      );
    }

    const faculty = (await FacultyModel.findOne({ email_id: body.email_id }).lean()) as FacultyDoc | null;

    if (!faculty) {
      return NextResponse.json(
        { success: false, message: "email_id not found" },
        { status: 404 }
      );
    }
    if(body.password !== faculty.password){
      return NextResponse.json(
        {success:false ,message: "Password is wrong"},
        { status: 404 }
      )
    }
    const role = faculty.role || "student";

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      role,
      userProfile: faculty,
      login: true,
    });

    response.cookies.set("userRole", role, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 6,
    });

    response.cookies.set("userId", faculty._id, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 6,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false,  message:  "Login failed" },
      { status: 500 }
    );
  }
  
}

export async function GET() {
  return NextResponse.json(
    { message: "GET method not allowed for this route" },
    { status: 405 }
  );
}
