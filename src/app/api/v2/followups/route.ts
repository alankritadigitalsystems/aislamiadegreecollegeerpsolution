import mongoDbConnection from "@/middlewares/connection";
import FollowUp from "@/models/followUp";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  await mongoDbConnection();
  const data = await req.json();
  const followup = await FollowUp.create(data);
  return Response.json(followup);
}

export async function GET() {
  await mongoDbConnection();
  const followups = await FollowUp.find().populate("enquiryId");
  return Response.json(followups);
}
