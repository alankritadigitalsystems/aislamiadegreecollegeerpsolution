import mongoose, { Schema, models } from "mongoose";

const inviteSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    token: { type: String, required: true, unique: true },
    used: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Invite = models.Invite || mongoose.model("Invite", inviteSchema);
export default Invite;
