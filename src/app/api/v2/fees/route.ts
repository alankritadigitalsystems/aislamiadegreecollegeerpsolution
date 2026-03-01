import { NextResponse } from "next/server";
import mongoDbConnection from "@/middlewares/connection";
import Fees from "@/models/fees_model";

export async function GET() {
  try {
    await mongoDbConnection();

    const allFees = await Fees.find()
      .populate("student_id", "full_name class")
      .sort({ createdAt: -1 });

    return NextResponse.json(allFees, { status: 200 });
  } catch (error) {
    console.error("GET /fees error:", error);
    return NextResponse.json(
      { message: "Failed to fetch fees" },
      { status: 500 }
    );
  }
}


export async function POST(req: Request) {
  try {
    await mongoDbConnection();

    const data = await req.json();

    const newFee = await Fees.create({
      student_id: data.student_id,
      class: data.class,
      academic_year: data.academic_year,
      fee_heads: data.fee_heads,
      total_amount: data.total_amount,
      concession: data.concession || 0,
      status: "Pending",
    });

    return NextResponse.json(newFee, { status: 201 });
  } catch (error) {
    console.error("POST /fees error:", error);
    return NextResponse.json(
      { message: "Failed to create fee" },
      { status: 500 }
    );
  }
}
