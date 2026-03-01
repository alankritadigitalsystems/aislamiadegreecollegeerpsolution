import mongoose from "mongoose";

const fundItemSchema = new mongoose.Schema({
  name: String,
  amount: Number,
});

const fundStructureSchema = new mongoose.Schema({
  className: { type: String, required: true, unique: true },
  funds: [fundItemSchema],
});

export default mongoose.models.FundStructure ||
  mongoose.model("FundStructure", fundStructureSchema);
