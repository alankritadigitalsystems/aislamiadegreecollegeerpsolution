import { NextResponse } from "next/server";
import mongoDbConnection from "@/middlewares/connection";
import Fees from "@/models/fees_model";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await mongoDbConnection();

  const { id } = await context.params;
  const updateData = await req.json();

  try {
    const updatedFee = await Fees.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedFee) {
      return NextResponse.json({ error: "Fee record not found" }, { status: 404 });
    }

    return NextResponse.json(updatedFee);
  } catch (error: unknown ) {
   return NextResponse.json({
      message: "Internal Server Error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
