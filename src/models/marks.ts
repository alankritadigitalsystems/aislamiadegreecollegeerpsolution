import mongoose, { Schema, models } from "mongoose";

const SubjectSchema = new Schema({
  name: { type: String, required: true },
  internal_marks: { type: Number, default: 0 },
  external_marks: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  grade: { type: String },
});

const MarksSchema = new Schema(
  {
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AdmissionStudentInfo",
      required: true,
    },
    exam_name: { type: String, required: true },
    class: { type: String, required: true },
    academic_year: { type: String, required: true },
    subjects: [SubjectSchema],
    grading_system: {
      type: String,
      enum: ["Percentage", "GPA"],
      default: "Percentage",
    },
    overall_percentage: Number,
    gpa: Number,
  },
  { timestamps: true, collection: "unigrad_marks" }
);

export default models.Marks || mongoose.model("Marks", MarksSchema);
