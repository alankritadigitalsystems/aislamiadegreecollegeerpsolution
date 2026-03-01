
import mongoose, { Schema } from "mongoose";

const studentLoginSchema = new Schema(
  {
    student_id: { type: Schema.Types.ObjectId, ref: "AdmissionStudentInfo" },
    email_id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { collection: "student_login", timestamps: true }
);

export default mongoose.models.StudentLogin ||
  mongoose.model("StudentLogin", studentLoginSchema);
