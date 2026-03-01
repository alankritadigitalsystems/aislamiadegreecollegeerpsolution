import { NextRequest, NextResponse } from "next/server";
import mongoDbConnection from "@/middlewares/connection";
import Notification from "@/models/notification";
import Faculty from "@/models/faculty";

export async function GET() {
  await mongoDbConnection();

  try {
    const findNotifications = await Notification.find({});

    return NextResponse.json(
      {
        body: findNotifications,
        message: "Loaded all notifications",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error getting notifications:", error);
    return NextResponse.json(
      {
        error: "Error getting notifications from API",
        success: false,
      },
      { status: 500 }
    );
  }
}
export async function POST(req: NextRequest) {
  await mongoDbConnection();

  try {
    const body = await req.json();
    const { enquiryId, message, senderId } = body;

    if (!enquiryId || !message || !senderId) {
      return NextResponse.json(
        { error: "Missing enquiryId, message, or senderId" },
        { status: 400 }
      );
    }
    const teachers = await Faculty.find({}, "_id").lean();

    if (!teachers.length) {
      return NextResponse.json(
        { error: "No teachers found to send notification" },
        { status: 404 }
      );
    }

    const notifications = teachers.map((t) => ({
      teacherId: t._id,
      senderId,
      message,
      enquiryId,
      isRead: false,
      createdAt: new Date(),
    }));

    await Notification.insertMany(notifications);

    return NextResponse.json(
      { message: "Notifications sent to all teachers successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating notifications:", error);
    return NextResponse.json(
      { error: "Failed to send notifications" },
      { status: 500 }
    );
  }
}
