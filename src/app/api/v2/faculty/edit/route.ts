import { NextResponse } from "next/server";
import FacultyModel from "@/models/faculty";
import connectDB from "@/middlewares/connection";

export async function PUT(req:Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { faculty_id, password } = body;

    if (!faculty_id || !password) {
      return NextResponse.json(
        { message: "Missing required fields (faculty_id or password)" },
        { status: 400 }
      );
    }

    const faculty = await FacultyModel.findById(faculty_id);
    if (!faculty) {
      return NextResponse.json(
        { message: "Faculty not found" },
        { status: 404 }
      );
    }
    faculty.password = password;
    await faculty.save();

    return NextResponse.json(
      { UpdateStatus: true, message: "Password updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating password:", error);
    return NextResponse.json(
      { UpdateStatus: false, message:"Error updating password" },
      { status: 500 }
    );
  }
}
