import mongoose from "mongoose";

const EnquirySchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  courseInterested: String,
  enquiry:String,
  status: {
    type: String,
    enum: ["new", "in_progress", "followup", "converted", "lost"],
    default: "new",
  },
  convertedDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Enquiry ||
  mongoose.model("Enquiry", EnquirySchema);
