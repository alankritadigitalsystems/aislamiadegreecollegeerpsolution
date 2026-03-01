import { NextResponse } from "next/server";
import mongoDbConnection from "@/middlewares/connection";
import NewsNoticeModel from "@/models/news";

export async function POST(req: Request) {
  try {
    await mongoDbConnection();

    const body = await req.json();
    const { title, description, creator_name, news_mode, created_by, class_id } = body;

    if (!title || !description || !created_by || !creator_name || !news_mode) {
      return NextResponse.json(
        { message: "Missing required fields." },
        { status: 400 }
      );
    }

    const newNotice = await NewsNoticeModel.create({
      title,
      description,
      creator_name,
      news_mode,
      created_by,
      class_id,
      notice_created_on: new Date(),
    });

    return NextResponse.json(
      {
        message: "saved",
        newsID: newNotice._id,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("API Error in createNews:", error);
    return NextResponse.json(
       { message: "Internal Server Error", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
