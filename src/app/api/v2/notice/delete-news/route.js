import { NextResponse } from "next/server";
import mongoDbConnection from "@/middlewares/connection";
import NewsNoticeModel from "@/models/news";

export async function DELETE(req) {
  try {
    await mongoDbConnection();
    const body = await req.json();
    const { _id } = body;

    if (!_id) {
      return NextResponse.json(
        { success: false, message: "Notice ID (_id) is required for deletion." },
        { status: 400 }
      );
    }

    const deletedNews = await NewsNoticeModel.findByIdAndDelete(_id);

    if (!deletedNews) {
      return NextResponse.json(
        {
          success: false,
          message: `No news found with ID: ${_id}`,
          DeleteStatus: false,
        },
        { status: 404 }
      );
    }

    // ✅ Successfully deleted
    console.log(`[DB] Deleted Notice ID: ${_id}`);
    return NextResponse.json(
      {
        success: true,
        message: "News deleted successfully.",
        DeleteStatus: true,
        deletedId: _id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Error in delete-news:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
        DeleteStatus: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
