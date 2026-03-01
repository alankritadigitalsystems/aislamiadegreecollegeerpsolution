import { NextResponse } from "next/server";
import mongoDbConnection from "@/middlewares/connection";
import FacultyAttendance from "@/models/faculty_attendence";

export async function GET(req: Request) {
  await mongoDbConnection();

  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json(
      { error: "Date parameter is required." },
      { status: 400 }
    );
  }

  const [dd, mm, yyyy] = date.split("-");
  const formattedDate = `${yyyy}-${mm}-${dd}`;

  const attendance = await FacultyAttendance
    .find({ date: formattedDate })
    .lean();

  return NextResponse.json(attendance);
}

export async function POST(req: Request) {
  await mongoDbConnection();

  const { date, attendance } = await req.json();

  if (!date || !attendance) {
    return NextResponse.json(
      { error: "Date and attendance data are required." },
      { status: 400 }
    );
  }

  const [dd, mm, yyyy] = date.split("-");
  const formattedDate = `${yyyy}-${mm}-${dd}`;

  const records = Object.entries(attendance).map(
    ([teacherId, status]) => ({
      teacher_id: teacherId,
      date: formattedDate,
      status,
    })
  );

  await FacultyAttendance.deleteMany({ date: formattedDate }); // optional but recommended

  const newRecords = await FacultyAttendance.insertMany(records);

  return NextResponse.json({ success: true, data: newRecords });
}
