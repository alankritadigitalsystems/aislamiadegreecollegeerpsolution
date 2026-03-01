import mongoose from "mongoose";

const newsNoticeSchema = new mongoose.Schema(
  {
    title: { type: String, description: "Required Field", required: true },
    description: { type: String, required: true },
    created_by: { type: String, required: true },
    creator_name: { type: String, required: true },
    class_id: { type: String },
    notice_created_on: { type: Date, default: Date.now },
    news_mode: {
      type: String,
      enum: ["student", "faculty", "all_classes", "website","event","general"],
      required: true,
    },
  },
  { collection: "unigrad_news_notice" }
);


const NewsNoticeModel =
  mongoose.models.NewsNotice || mongoose.model("NewsNotice", newsNoticeSchema);

export default NewsNoticeModel;
