import mongoose from "mongoose";

var Schema = mongoose.Schema;

var admissionRegistrationPageInfoSchema = new Schema(
  {
    year: {
      type: String,
      required: true,
    },
    admission_type: {
      type: String,
      required: true,
    },
    info: {
      type: JSON,
      required: true,
    },
  },
  { collection: "unigrad_admission_registration_page_info" }
);

var AdmissionRegistrationPageInfoModel = mongoose.model(
  "Admission-Registration-Page-Info",
  admissionRegistrationPageInfoSchema
);

module.exports = AdmissionRegistrationPageInfoModel;
