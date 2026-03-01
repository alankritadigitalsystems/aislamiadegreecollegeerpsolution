import mongoDbConnection from "@/middlewares/connection";
import Enquiry from "@/models/enquiry";
import { NextRequest } from "next/server";

export async function PATCH(
  req: NextRequest,
   context: { params: Promise<{ id: string }> }
) {
  try {
    await mongoDbConnection();
    
    const { id } = await context.params; 
    const body = await req.json();
    const { status } = body;

    const updated = await Enquiry.findByIdAndUpdate(
      id,
      { status, convertedDate: status === "converted" ? new Date() : null },
      { new: true }
    );

    if (!updated)
      return new Response(JSON.stringify({ error: "Not found" }), {
        status: 404,
      });

    return new Response(JSON.stringify(updated), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "internal error" }), {
      status: 500,
    });
  }
}
