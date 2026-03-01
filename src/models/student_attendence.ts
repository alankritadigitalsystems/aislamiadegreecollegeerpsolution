import mongoose, { Schema, models } from "mongoose";

const PeriodSchema = new Schema({
  subject: { type: String },
  status: {
    type: String,
    enum: ["Present", "Absent", "Leave"],
    default: "Present",
  },
});

const StudentAttendanceSchema = new Schema(
  {
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AdmissionStudentInfo",
      required: true,
    },
    class_name: { type: String, required: true },
    section: { type: String, required: false },
    academic_year: { type: String, default: "2025-26" },
    date: { type: Date, required: true },
    type: { type: String, enum: ["Daily", "Period-wise"], default: "Daily" },

    attendance_status: {
      type: String,
      enum: ["Present", "Absent", "Leave"],
      default: "Present",
    },

    periods: [PeriodSchema],
    medical_pending: { type: Boolean, default: false },
    slip_url: { type: String, default: null },
    approved_by_admin: { type: Boolean, default: false },
  },
  { timestamps: true, collection: "unigrad_student_attendance" }
);

export default models.StudentAttendance ||
  mongoose.model("StudentAttendance", StudentAttendanceSchema);
