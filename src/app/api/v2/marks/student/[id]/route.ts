import { NextRequest, NextResponse } from "next/server";
import mongoDbConnection from "@/middlewares/connection";
import Marks from "@/models/marks";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await mongoDbConnection();
    const { id } = await context.params;
    const marks = await Marks.find({ student_id: id })
      .populate("student_id", "first_name middle_name last_name")
      .lean();

    return NextResponse.json(marks);
  } catch (error) {
    console.error("Error fetching marks:", error);
    return NextResponse.json(
      { error: "Failed to fetch marks" },
      { status: 500 }
    );
  }
}
