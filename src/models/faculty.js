import mongoose from "mongoose";

var Schema = mongoose.Schema;

var facultyInfoSchema = new Schema(
  {
    is_active: { type: Boolean, default: true },
    faculty_id: { type: String, required: true, unique: false },
    full_name: {
      type: {
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
      },
      required: true,
    },
    father_name: { type: String, required: false },
    mother_name: { type: String, required: false },
    spouse_name: { type: String, required: false },
    // TODO: dob is not required?
    date_of_birth: { type: Date, required: false },
    email_id: { type: String, required: true, unique: true },

    residential_address: { type: String, required: false },
    // TODO: should be from any of the known options?
    department: { type: String, required: false },
    // TODO: aadhar, PAN unique check and required?
    aadhar_number: { type: String, required: false },
    pan_number: { type: String, required: false },
    date_of_joining: {
      type: Date,
      default: Date.now(),
    },
    date_of_retirement: {
      type: Date,
      default: Date.now(),
    },

    relation_between_2_employee: { type: String, required: false },
    experience_in_this_college: { type: Number, required: false },
    net_slet_details: {
      type: {
        qualification_status: {
          type: String,
          required: false,
          enum: ["Yes", "No"],
        },
        year_of_passing: { type: String, required: false },
        net_slet_id: {
          type: String,
          required: false,
        },
      },
      required: false,
    },
    phd_details: {
      type: {
        year_of_phd: {
          type: String,
          required: false,
        },
        college_of_phd: { type: String, required: false },
        phd_certificate: {
          type: String,
          required: false,
        },
      },
      required: false,
    },
    subject_specialization: { type: String, required: false },
    no_of_phd_guided: {
      type: {
        as_main_supervisor: { type: Number, required: false },
        as_co_supervisor: { type: Number, required: false },
      },
      required: false,
    },
    no_of_papers_published: {
      type: {
        national: { type: Number, required: false },
        international: { type: Number, required: false },
      },
      required: false,
    },
    number_of_books_published: { type: Number, required: false },
    awards_and_recognition: { type: [String], required: false },
    fellowships_in_societies: { type: [String], required: false },
    fellowships_awarded: { type: [String], required: false },
    membership_in_scientific_societies: { type: [String], required: false },
    patents_published_or_awarded: { type: [String], required: false },
    id_created_at: { type: Date, default: Date.now() },

    gender: { type: String, enum: ["Male", "Female", "Others"] },
    // isFaculty: { type: Boolean, default: true },
    isSuperAdmin: { type: Boolean, default: false },
    permissions: {
      type: {
        holiday: {
          type: {
            create: { type: Boolean, default: false },
            read: { type: Boolean, default: false },
            update: { type: Boolean, default: false },
            delete: { type: Boolean, default: false },
          },
          required: true,
        },
        news_notice: {
          type: {
            create: { type: Boolean, default: false },
            read: { type: Boolean, default: false },
            update: { type: Boolean, default: false },
            delete: { type: Boolean, default: false },
          },
          required: true,
        },
      },
    },
    password: {
      type: String,
      default: "password",
      description: "Should be unique",
    },
    profile_picture: {
      type: String,
      default:
        "https://res.cloudinary.com/dwckgkzdz/image/upload/v1604757274/buddha_wyz1ek.jpg",
    },
    // TODO: is_technical or is_teaching??
    is_technical: { type: Boolean, default: false },
    leave: {
      type: {
        cl: {
          available_leave_count: { type: Number, default: 0 },
          taken_leave_count: { type: Number, default: 0 },
          applied_count: { type: Number, default: 0 },
        },
        pl: {
          available_leave_count: { type: Number, default: 0 },
          taken_leave_count: { type: Number, default: 0 },
          applied_count: { type: Number, default: 0 },
        },
        el: {
          available_leave_count: { type: Number, default: 0 },
          taken_leave_count: { type: Number, default: 0 },
          applied_count: { type: Number, default: 0 },
        },
        sl: {
          available_leave_count: { type: Number, default: 0 },
          taken_leave_count: { type: Number, default: 0 },
          applied_count: { type: Number, default: 0 },
        },
        mtl: {
          available_leave_count: { type: Number, default: 0 },
          taken_leave_count: { type: Number, default: 0 },
          applied_count: { type: Number, default: 0 },
        },
        ptl: {
          available_leave_count: { type: Number, default: 0 },
          taken_leave_count: { type: Number, default: 0 },
          applied_count: { type: Number, default: 0 },
        },
        lwp: {
          available_leave_count: { type: Number, default: 0 },
          taken_leave_count: { type: Number, default: 0 },
          applied_count: { type: Number, default: 0 },
        },
        chcl: {
          available_leave_count: { type: Number, default: 0 },
          taken_leave_count: { type: Number, default: 0 },
          applied_count: { type: Number, default: 0 },
        },
        ccl: {
          available_leave_count: { type: Number, default: 0 },
          taken_leave_count: { type: Number, default: 0 },
          applied_count: { type: Number, default: 0 },
        },
        dl: {
          available_leave_count: { type: Number, default: 0 },
          taken_leave_count: { type: Number, default: 0 },
          applied_count: { type: Number, default: 0 },
        },
      },
    },
     role: {
      type:String,
      default:"student"
     }, 
    reference_faculty: {
      type: String,
      required: true,
    },
    profile_photo_url: {
      type: String,
      required: false,
    },
    phd_documents: {
      type: [String],
      required: false,
    },
    other_documents: {
      type: [String],
      required: false,
    },
  },
  { collection: "unigrad_faculty" }
);



const FacultyModel = mongoose.models.Faculty || mongoose.model("Faculty", facultyInfoSchema);

export default FacultyModel;
