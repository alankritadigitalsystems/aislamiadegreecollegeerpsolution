import mongoDbConnection from "@/middlewares/connection";
import funds from "@/models/funds";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
 
  const { id } = await context.params;
  const body = await req.json();
  const { amount } = body;
  try {
   await mongoDbConnection();
    const updateFundAmount = await funds.findOneAndUpdate(
      { "funds._id": id },
      { $set: { "funds.$.amount": amount } },
      { new: true },
    );

    return NextResponse.json(updateFundAmount);
  } catch (error) {
    return NextResponse.json(
      { message: "error in PUT request" },
      { status: 500 },
    );
  }
}
