import mongoDbConnection from "@/middlewares/connection";
import Enquiry from "@/models/enquiry";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {Resend} from "resend"
const resend = new Resend(process.env.RESEND_API_KEY)
export async function POST(req: NextRequest) {
  try {
    await mongoDbConnection();
    const data = await req.json();
    const enquiry = await Enquiry.create(data);
    await resend.emails.send({
      from: "Islamia Degree College <principalaidc@aislamiadegreecollegelko.org>",
      to: "sushimsushi8699@gmail.com",
      subject: "✨ New Enquiry Received!",
      html: `
    <div style="font-family: Arial, sans-serif; background:#f4f4f7; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">

        <div style="background: linear-gradient(135deg, #4e73df, #224abe); padding: 20px; color: white;">
          <h2 style="margin:0; font-size: 24px;">New Enquiry Received</h2>
          <p style="margin:0; opacity: 0.9;">You have a new message from your Student.</p>
        </div>

        <div style="padding: 20px;">

          <p style="font-size: 16px; color:#333;">Here are the enquiry details:</p>

          <table style="width:100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; font-weight: bold; color:#555;">Name:</td>
              <td style="padding: 10px; color:#333;">${data.name}</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 10px; font-weight: bold; color:#555;">Email:</td>
              <td style="padding: 10px; color:#333;">${data.email}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; color:#555;">Phone:</td>
              <td style="padding: 10px; color:#333;">${data.phone}</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 10px; font-weight: bold; color:#555;">Course Interested:</td>
              <td style="padding: 10px; color:#333;">${data.courseInterested}</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 10px; font-weight: bold; color:#555;">Message:</td>
              <td style="padding: 10px; color:#333;">${data.enquirie}</td>
            </tr>
          </table>

        </div>

        <div style="background:#f1f1f1; padding: 15px; text-align:center; color:#777; font-size: 13px;">
          This email was generated from your website contact form.
        </div>

      </div>
    </div>
  `,
    });

    return NextResponse.json({ success: true, enquiry });
  } catch (error) {
    console.error("Error submitting enquiry:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit enquiry" },
      { status: 500 }
    );
  }
}

export async function GET() {
  await mongoDbConnection();
  const enquiries = await Enquiry.find().sort({ createdAt: -1 });
  return Response.json(enquiries);
}
