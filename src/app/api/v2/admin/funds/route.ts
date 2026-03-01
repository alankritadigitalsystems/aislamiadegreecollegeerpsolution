import mongoDbConnection from "@/middlewares/connection";
import { NextRequest, NextResponse } from "next/server";
import funds from "@/models/funds";
export async function GET(req: NextRequest) {
  try {
    mongoDbConnection();
    const fundManagement =await funds.find()
    return NextResponse.json({
      fundManagement
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error getting fund Request" },
      { status: 500 },
    );
  }
}
