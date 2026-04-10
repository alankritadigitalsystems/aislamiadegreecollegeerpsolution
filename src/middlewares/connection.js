
import mongoose from "mongoose";

const mongoDbConnection = async () => {

  await mongoose.connect(process.env.MONGODB_URI, {
    family: 4,
  });
  console.log("MongoDB connected");
};

export default mongoDbConnection;
