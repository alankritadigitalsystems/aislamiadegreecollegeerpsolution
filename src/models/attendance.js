import mongoose from "mongoose";

var Schema = mongoose.Schema;

var attendanceSchema = new Schema(
  {
    id: {type: String, description: "Required Field", required: true},
    created_by: { type: String, description: "Required Field", required: true},
    admin_name: {type: String, description: "Required Field", required: true},
    date: {type: Date},
    isPresent: {type: Boolean, default: false},
    //two field more, created at 
  },
  { collection: "unigrad_attendance" }
);

var AttendanceModel = mongoose.model(
  "Unigrad-Attendance",
  attendanceSchema
);

module.exports = AttendanceModel;
