import mongoDbConnection from "@/middlewares/connection";
import StudentAttendance from "@/models/student_attendence";
import { NextResponse } from "next/server";
import * as XLSX from "xlsx";


interface AttendanceQuery {
  class_name?: string;
  section?: string | null;
  student_id?: string;
  date?: {
    $gte: Date;
    $lte: Date;
  };
}

interface ExcelAttendanceRow {
  student_id: string;
  class_name: string;
  section?: string;
  date: string | number;
  attendance_status: string;
  [key: string]: string | number | boolean | undefined;
}

export async function GET(req: Request) {
  await mongoDbConnection();

  const { searchParams } = new URL(req.url);
  const action = searchParams.get("action");

  const class_name = searchParams.get("class_name");
  const section = searchParams.get("section");
  const student_id = searchParams.get("student_id");
  const startDate = searchParams.get("start");
  const endDate = searchParams.get("end");

  if (action === "medical-list") {
    const medicalRequests = await StudentAttendance.find({
      medical_pending: true,
    })
      .populate("student_id", "full_name")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      requests: medicalRequests,
    });
  }

  // Strictly typed query object
  const query: AttendanceQuery = {};

  if (class_name) query.class_name = class_name;
  if (section) query.section = section;
  if (student_id) query.student_id = student_id;

  if (startDate && endDate) {
    query.date = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  }

  const attendance = await StudentAttendance.find(query).populate(
    "student_id",
    "full_name"
  );

  return NextResponse.json({
    success: true,
    attendance,
  });
}

export async function POST(req: Request) {
  await mongoDbConnection();

  const contentType = req.headers.get("content-type");

  if (contentType && contentType.includes("multipart/form-data")) {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    const buffer = Buffer.from(await file.arrayBuffer());
    const workbook = XLSX.read(buffer, { type: "buffer" });

    const sheetData = XLSX.utils.sheet_to_json<ExcelAttendanceRow>(
      workbook.Sheets[workbook.SheetNames[0]]
    );

    const processedData = sheetData.map((row) => ({
      ...row,
      section: row.section || null,
    }));

    const inserted = await StudentAttendance.insertMany(processedData);

    return NextResponse.json({ success: true, count: inserted.length });
  }

  const body = await req.json();
  const data = await StudentAttendance.create(body);
  return NextResponse.json(data);
}

export async function PATCH(req: Request) {
  await mongoDbConnection();

  const url = new URL(req.url);
  const action = url.searchParams.get("action");

  if (action === "medical-request") {
    const formData = await req.formData();

    const student_id = formData.get("student_id") as string;
    const from_date = formData.get("from_date") as string;
    const to_date = formData.get("to_date") as string;
    const slip = formData.get("slip") as File | null;

    let slipBuffer: Buffer | null = null;
    let slipName: string | null = null;

    if (slip) {
      slipBuffer = Buffer.from(await slip.arrayBuffer());
      slipName = slip.name;
    }

    await StudentAttendance.updateMany(
      {
        student_id,
        date: {
          $gte: new Date(from_date),
          $lte: new Date(to_date),
        },
      },
      {
        attendance_status: "Absent",
        medical_pending: true,
        slip_file: slipBuffer,
        slip_name: slipName,
      }
    );

    return NextResponse.json({
      success: true,
      message: "Medical leave request submitted",
    });
  }

  if (action === "approve-medical") {
    const body = await req.json();

    const start = new Date(body.startDate);
    const end = new Date(body.endDate);

    if (isNaN(start.valueOf()) || isNaN(end.valueOf())) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid start or end date",
        },
        { status: 400 }
      );
    }

    await StudentAttendance.updateMany(
      {
        student_id: body.student_id,
        date: { $gte: start, $lte: end },
      },
      {
        attendance_status: "Present",
        medical_pending: false,
      }
    );

    return NextResponse.json({
      success: true,
      message: "Medical leave approved",
    });
  }

  const body = await req.json();

  const updated = await StudentAttendance.findByIdAndUpdate(body._id, body, {
    new: true,
  });

  return NextResponse.json(updated);
}