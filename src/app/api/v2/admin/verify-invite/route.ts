import { NextResponse } from "next/server";
import mongoDbConnection from "@/middlewares/connection";
import Invite from "@/models/faculty_invite_mail";

export async function GET(req: Request) {
  try {
    await mongoDbConnection();

    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token)
      return NextResponse.json(
        { valid: false, error: "Token missing" },
        { status: 400 }
      );

    const invite = await Invite.findOne({ token, used: false });

    if (!invite)
      return NextResponse.json(
        { valid: false, error: "Invalid or expired invite" },
        { status: 400 }
      );

    return NextResponse.json({ valid: true, email: invite.email });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { valid: false, error: "Server error" },
      { status: 500 }
    );
  }
}
