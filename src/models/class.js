import mongoose from "mongoose";

var Schema = mongoose.Schema;

var classSchema = new Schema(
  {
    department: { type: String, description: "Required Field", required: true},
    year: {type: Number, description: "Required Field"},
    course_name: { type: String, description: "Required Field", required: true},
    // course type like bachelors, masters 
    course_type: { type: String, enum : ["Bachelors", "Masters"]},
    start_date: { type: Date, required: true},
    course_duration: { type: Number, required: true},
    course_id: { type: String, required: true},
    //Academic year of graduating or completing the course
    class_of: { type: Number, required: true},
    created_at    : { type: Date },
    updated_at    : { type: Date },
    //contact email-id of department
    email_id: { type: String, required: false},
    no_of_semesters: { type: Number, required: true},
    syllabus: { type: String, required: true},
    category: {type: String, required: false, enum: ["Self Funded", "Government Aided"]},
    main_subjects: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Unigrad-Subject'}],
    additional_subjects: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Unigrad-Subject'}],
  },
  { collection: "unigrad_class" }
);

var ClassModel = mongoose.model(
  "Unigrad-Class",
  classSchema
);

module.exports = ClassModel;
