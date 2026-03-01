import mongoose from "mongoose";

const followUpSchema = new mongoose.Schema({
  enquiryId: { type: mongoose.Schema.Types.ObjectId, ref: "Enquiry" },
  followUpDate: Date,
  note: String,
  isCompleted: { type: Boolean, default: false },
});

export default mongoose.models.FollowUp ||
  mongoose.model("FollowUp", followUpSchema);
