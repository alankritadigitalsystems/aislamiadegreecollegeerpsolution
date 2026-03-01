import mongoose, { Schema, models } from "mongoose";

const FacultyAttendanceSchema = new Schema(
  {
    teacher_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
    date: { type: Date, required: true },
    status: {
      type: String,
      enum: ["Present", "Absent", "On Leave"],
      default: "Present",
    },
  },
  { timestamps: true, collection: "unigrad_faculty_attendance" }
);

export default models.FacultyAttendance ||
  mongoose.model("FacultyAttendance", FacultyAttendanceSchema);
