import { NextResponse } from "next/server";
import mongoDbConnection from "@/middlewares/connection";
import NewsNoticeModel from "@/models/news";
export async function GET() {
  try {
    await mongoDbConnection();
    const news = await NewsNoticeModel.find({});
    return NextResponse.json({
      news,
    });
  } catch (error: unknown) {
    return NextResponse.json(
      { message: "Internal Server Error", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
