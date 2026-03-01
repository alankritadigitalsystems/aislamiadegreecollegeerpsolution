import mongoose from "mongoose";

var Schema = mongoose.Schema;

var facultySalaryCustomizationSchema = new Schema(
  {
    faculty_id: { type: String, required: true },
    created_by: { type: String, required: true },
    last_edited_by: { type: String, required: true },

    earnings: {
      type: [
        {
          category: { type: String, required: true },
          isPercentage: { type: Boolean, required: true },
          percentage: { type: Number },
          amount: { type: Number },
          calculated_amount: { type: Number },
          edit_history: {
            type: [
              {
                edited_by: { type: String, required: true },
                edited_on: { type: Date, default: Date.now() },
                percentage: { type: Number },
                amount: { type: Number },
              },
            ],
          },
        },
      ],
    },
    deductions: {
      type: [
        {
          category: { type: String, required: true },
          isPercentage: { type: Boolean, required: true },
          percentage: { type: Number },
          amount: { type: Number },
          calculated_amount: { type: Number },
          edit_history: {
            type: [
              {
                edited_by: { type: String, required: true },
                edited_on: { type: Date, default: Date.now() },
                percentage: { type: Number },
                amount: { type: Number },
              },
            ],
          },
        },
      ],
    },
    // TODO: what about any fields that are present in both uni monthly salary structure and faculty salary customization?
    employer_contribution: {
      type: [
        {
          category: { type: String, required: true },
          isPercentage: { type: Boolean, required: true },
          percentage: { type: Number },
          amount: { type: Number },
          edit_history: {
            type: [
              {
                edited_by: { type: String, required: true },
                edited_on: { type: Date, default: Date.now() },
                percentage: { type: Number },
                amount: { type: Number },
              },
            ],
          },
        },
      ],
    },
  },
  { collection: "unigrad_faculty_salary_customization" }
);

var FacultySalaryCustomizationModel = mongoose.model(
  "Unigrad-Faculty-Salary-Customization",
  facultySalaryCustomizationSchema
);

module.exports = FacultySalaryCustomizationModel;
