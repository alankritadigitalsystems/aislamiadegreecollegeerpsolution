import { NextResponse } from "next/server";
import { getAllFaculty } from "@/controllers/faculty";

export async function GET() {
  try {
    const facultyData = await getAllFaculty();
    return NextResponse.json({ faculty: facultyData });
  } catch (error) {
    console.error("Error in /allFaculty GET handler:", error);
    return NextResponse.json(
      { message: "Server encountered an internal error." },
      { status: 500 }
    );
  }
}
