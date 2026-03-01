import mongoDbConnection from "@/middlewares/connection";
import TeacherAssignment from "@/models/teacherAssignment";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await mongoDbConnection();
  const { faculty_id, subject_name, class_name, academic_year } =
    await req.json();

  if (!faculty_id || !subject_name || !class_name) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  const newAssign = await TeacherAssignment.create({
    faculty_id,
    subject_name,
    class_name,
    academic_year,
  });

  return NextResponse.json(
    { message: "Subject assigned successfully", assignment: newAssign },
    { status: 201 }
  );
}

export async function GET() {
  await mongoDbConnection();
  const assignments = await TeacherAssignment.find()
    .populate("faculty_id", "full_name faculty_id email_id")
    .sort({ createdAt: -1 });

  return NextResponse.json({ assignments });
}

export async function DELETE(req: Request) {
  await mongoDbConnection();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { message: "Missing assignment id" },
      { status: 400 }
    );
  }

  await TeacherAssignment.findByIdAndDelete(id);
  return NextResponse.json({ message: "Assignment deleted successfully" });
}
