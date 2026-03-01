import { NextResponse } from "next/server";
import mongoDbConnection from "@/middlewares/connection";
import Marks from "@/models/marks";

export async function GET() {
  await mongoDbConnection();
  const allMarks = await Marks.find()
    .populate("student_id", "full_name class")
    .sort({ createdAt: -1 });
  return NextResponse.json(allMarks);
}

export async function POST(req: Request) {
  await mongoDbConnection();
  const data = await req.json();
  const newMarks = await Marks.create(data);
  return NextResponse.json(newMarks);
}
