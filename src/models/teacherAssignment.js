import mongoose from "mongoose";

const TeacherAssignmentSchema = new mongoose.Schema(
  {
    faculty_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty", 
      required: true,
    },
    subject_name: { type: String, required: true },
    class_name: { type: String, required: true },
    academic_year: { type: String, default: new Date().getFullYear().toString() },
    assigned_date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.TeacherAssignment ||
  mongoose.model("TeacherAssignment", TeacherAssignmentSchema);
