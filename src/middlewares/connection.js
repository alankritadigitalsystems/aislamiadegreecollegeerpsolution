
import mongoose from "mongoose";

const mongoDbConnection = async () => {

  await mongoose.connect(process.env.MONGODB_URI, {
    
  });
  console.log("MongoDB connected");
};

export default mongoDbConnection;
