import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Faculty",
    required: true,
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Faculty", 
    required: true,
  },
  message: { type: String, required: true },
  enquiryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Enquiry",
  },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Notification ||
  mongoose.model("Notification", notificationSchema);
