import { NextResponse } from "next/server";
import mongoDbConnection from "@/middlewares/connection";
import AdmissionStudentInfo from "@/models/admission_student_info";
import StudentLogin from "@/models/student_login_model";
import Fees from "@/models/fees_model";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendStudentCredentialsEmail } from "@/lib/sendStudentEmail";

function generateSecurePassword(length = 8) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
  let pwd = "";
  for (let i = 0; i < length; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pwd;
}

export async function POST(req: Request) {
  try {
    await mongoDbConnection();
    const body = await req.json();
    const { students = [], sendEmailImmediately = true } = body;

    if (!Array.isArray(students) || students.length === 0) {
      return NextResponse.json(
        { success: false, message: "No student data provided" },
        { status: 400 }
      );
    }

    const results: any[] = [];
    let importedCount = 0;
    let emailsSentCount = 0;
    let skippedCount = 0;

    for (let index = 0; index < students.length; index++) {
      const row = students[index];
      const enrol_no = row.enrol_no?.toString().trim() || "";
      const roll_number = row.roll_number?.toString().trim() || row.roll_no?.toString().trim() || "";
      const fullNameStr = row.name?.toString().trim() || "";
      const father_name = row.father_name?.toString().trim() || row.f_name?.toString().trim() || "";
      const className = row.class?.toString().trim() || row.className?.toString().trim() || "";
      const aadhar_number = row.aadhar_number?.toString().trim() || row.adhar_card_no?.toString().trim() || "";
      const email_id = row.email?.toString().trim() || row.email_id?.toString().trim() || "";
      const mobile_number = row.mobile_number?.toString().trim() || "";
      const fee_amt = row.fee_amt ? Number(row.fee_amt) : undefined;
      const fee_date = row.fee_date?.toString().trim() || "";
      const fee_div = row.fee_div?.toString().trim() || "";

      // Parse first name / last name
      const nameParts = fullNameStr.split(" ").filter(Boolean);
      const first_name = nameParts.length > 0 ? nameParts[0] : (enrol_no || `Student-${index + 1}`);
      const last_name = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

      try {
        // Check if student exists by enrol_no or email or roll_number
        let existingStudent = null;
        if (enrol_no) {
          existingStudent = await AdmissionStudentInfo.findOne({ enrol_no });
        }
        if (!existingStudent && email_id) {
          existingStudent = await AdmissionStudentInfo.findOne({ email_id });
        }
        if (!existingStudent && roll_number && className) {
          existingStudent = await AdmissionStudentInfo.findOne({ roll_number, class: className });
        }

        let studentDoc;
        const studentPayload: any = {
          full_name: {
            first_name,
            last_name,
          },
          father_name,
          class: className,
          roll_number,
          enrol_no,
          aadhar_number,
          fee_amt,
          fee_date,
          fee_div,
          status: "Enrolled",
        };

        if (email_id) studentPayload.email_id = email_id;
        if (mobile_number) studentPayload.mobile_number = mobile_number;

        if (existingStudent) {
          // Update existing
          studentDoc = await AdmissionStudentInfo.findByIdAndUpdate(
            existingStudent._id,
            { $set: studentPayload },
            { new: true }
          );
        } else {
          // Create new
          studentDoc = await AdmissionStudentInfo.create(studentPayload);
        }

        // If fee details provided, create / update Fees model record
        if (fee_amt && fee_amt > 0) {
          try {
            const currentYear = new Date().getFullYear();
            const academic_year = `${currentYear}-${currentYear + 1}`;

            let feeDoc = await Fees.findOne({ student_id: studentDoc._id });
            const installmentItem = {
              name: fee_div || "Installment-1",
              amount: fee_amt,
              paid: true,
              payment_date: fee_date ? new Date(fee_date) : new Date(),
            };

            if (!feeDoc) {
              await Fees.create({
                student_id: studentDoc._id,
                full_name: {
                  first_name,
                  last_name,
                },
                class: className || "General",
                academic_year,
                fee_heads: [
                  {
                    name: fee_div ? `Admission Fee (${fee_div})` : "Admission Fee",
                    amount: fee_amt,
                  },
                ],
                total_amount: fee_amt,
                installments: [installmentItem],
                status: "Paid",
              });
            }
          } catch (feeErr) {
            console.error("Error creating fee entry for student:", feeErr);
          }
        }

        // Handle Email Credentials
        let credentialsSent = false;
        let passwordCreated = null;

        if (email_id && sendEmailImmediately) {
          const rawPassword = generateSecurePassword(8);
          const hashedPassword = await bcrypt.hash(rawPassword, 10);

          let studentLogin = await StudentLogin.findOne({
            $or: [{ email_id }, { student_id: studentDoc._id }],
          });

          if (studentLogin) {
            studentLogin.email_id = email_id;
            studentLogin.password = hashedPassword;
            await studentLogin.save();
          } else {
            studentLogin = await StudentLogin.create({
              student_id: studentDoc._id,
              email_id,
              password: hashedPassword,
            });
          }

          passwordCreated = rawPassword;

          // Dispatch email
          const mailRes = await sendStudentCredentialsEmail({
            toEmail: email_id,
            studentName: `${first_name} ${last_name}`.trim(),
            password: rawPassword,
          });

          if (mailRes.success) {
            credentialsSent = true;
            emailsSentCount++;
          }
        }

        importedCount++;
        results.push({
          row: index + 1,
          enrol_no,
          name: `${first_name} ${last_name}`.trim(),
          email: email_id || "None (Pending)",
          student_id: studentDoc._id,
          credentialsSent,
          status: "success",
        });
      } catch (err: any) {
        console.error(`Row ${index + 1} processing error:`, err);
        skippedCount++;
        results.push({
          row: index + 1,
          enrol_no,
          name: fullNameStr,
          status: "failed",
          error: err?.message || "Unknown error",
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: `Bulk processing complete. ${importedCount} imported/updated, ${emailsSentCount} login credentials emailed.`,
      stats: {
        total: students.length,
        imported: importedCount,
        emailsSent: emailsSentCount,
        skipped: skippedCount,
      },
      results,
    });
  } catch (error: any) {
    console.error("Bulk upload API error:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
