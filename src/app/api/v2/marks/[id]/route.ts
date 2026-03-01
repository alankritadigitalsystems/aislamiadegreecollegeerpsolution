import { NextRequest, NextResponse } from "next/server";
import mongoDbConnection from "@/middlewares/connection";
import Marks from "@/models/marks";
import { safeContext } from "@/lib/safeContext";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  await mongoDbConnection();
  const { id } = await context.params;
  const updateData = await req.json();

  try {
    const updated = await Marks.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json(
        { error: "Marks record not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(updated);
  } catch (error: unknown) {
    return NextResponse.json({
      message: "Internal Server Error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
