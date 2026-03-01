import { NextRequest, NextResponse } from "next/server";
import mongoDbConnection from "@/middlewares/connection";
import AdmissionStudentInfo from "@/models/admission_student_info";
import { safeContext } from "@/lib/safeContext";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await mongoDbConnection();

  const resolvedParams = await context.params;
  const { params } = safeContext({ params: resolvedParams });
  const { id } = params;
  const updateData = await req.json();

  try {
    const admission = await AdmissionStudentInfo.findById(id);
    if (!admission) {
      return NextResponse.json({ error: "Admission not found" }, { status: 404 });
    }

    let roll_number = admission.roll_number;
    if (updateData.status === "Enrolled" && !admission.roll_number) {
      const seq = (await AdmissionStudentInfo.countDocuments({ class: admission.class })) + 1;
      const year = new Date().getFullYear();
      roll_number = `${admission.class}-${year}-${seq.toString().padStart(3, "0")}`;
    }

    const finalUpdate = { ...updateData };
    if (roll_number) finalUpdate.roll_number = roll_number;

    const updatedAdmission = await AdmissionStudentInfo.findByIdAndUpdate(
      id,
      { $set: finalUpdate },
      { new: true, runValidators: true }
    );

    return NextResponse.json(updatedAdmission);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "internal server error" }, { status: 500 });
  }
}
