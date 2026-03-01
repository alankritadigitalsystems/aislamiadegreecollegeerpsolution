import { NextResponse } from "next/server";
import Cookies from "js-cookie";
import mongoDbConnection from "@/middlewares/connection";
import AdmissionStudentInfo from "@/models/faculty";

export async function GET(req: Request) {
  try {
    await mongoDbConnection();

   
    const cookieUserId = Cookies.get("userId")?.valueOf;


    const { searchParams } = new URL(req.url);
    const queryUserId = searchParams.get("_id");

    const userId = cookieUserId || queryUserId;

    if (!userId) {
      return NextResponse.json(
        { message: "Missing userId in cookies or query" },
        { status: 400 }
      );
    }

    const faculty = await AdmissionStudentInfo.findById(userId);

    if (!faculty) {
      return NextResponse.json({ message: "Faculty not found" }, { status: 404 });
    }

    return NextResponse.json(faculty, { status: 200 });
  } catch (error) {
    console.error("Error fetching faculty:", error);
    return NextResponse.json(
      { message: "Error fetching faculty" },
      { status: 500 }
    );
  }
}


export async function PATCH(req: Request) {
  try {
    await mongoDbConnection();

    const formData = await req.formData();
    const _id = formData.get("_id");

    if (!_id) {
      return NextResponse.json(
        { message: "Missing required field: _id" },
        { status: 400 }
      );
    }

   const updateData: Record<string, string | number | boolean | object | null> = {};
    formData.forEach((value, key) => {
      if (key !== "_id") {
        if (typeof value === "string") {
          try {
            updateData[key] = JSON.parse(value);
          } catch {
            updateData[key] = value;
          }
        } else {
          updateData[key] = value;
        }
      }
    });

    const updatedFaculty = await AdmissionStudentInfo.findByIdAndUpdate(
      _id,
      { $set: updateData },
      { new: true }
    );

    if (!updatedFaculty) {
      return NextResponse.json(
        { message: "Faculty not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        UpdateStatus: true,
        message: "Profile updated successfully",
        data: updatedFaculty,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating faculty:", error);
    return NextResponse.json(
      { UpdateStatus: false, message: "Error updating faculty" },
      { status: 500 }
    );
  }
}