import FacultyModel from "@/models/faculty";
import mongoDbConnection from "@/middlewares/connection";
import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: "465",
  secure: "true",
  auth: {
    user: "project.college@naveenrao.com",
    pass: "UniGrad@123",
  },
});

import leaveService from "./service/leave";
const leave_default = {
  cl: {
    available_leave_count: 0,
    taken_leave_count: 0,
    applied_count: 0,
  },
  pl: {
    available_leave_count: 0,
    taken_leave_count: 0,
    applied_count: 0,
  },
  el: {
    available_leave_count: 0,
    taken_leave_count: 0,
    applied_count: 0,
  },
  sl: {
    available_leave_count: 0,
    taken_leave_count: 0,
    applied_count: 0,
  },
  mtl: {
    available_leave_count: 0,
    taken_leave_count: 0,
    applied_count: 0,
  },
  ptl: {
    available_leave_count: 0,
    taken_leave_count: 0,
    applied_count: 0,
  },
  lwp: {
    available_leave_count: 0,
    taken_leave_count: 0,
    applied_count: 0,
  },
  chcl: {
    available_leave_count: 0,
    taken_leave_count: 0,
    applied_count: 0,
  },
  ccl: {
    available_leave_count: 0,
    taken_leave_count: 0,
    applied_count: 0,
  },
  dl: {
    available_leave_count: 0,
    taken_leave_count: 0,
    applied_count: 0,
  },
};

export default async function login(credentials) {
  await mongoDbConnection();
  console.log("Attempting login for:", credentials.faculty_id);
  if (!credentials || !credentials.faculty_id || !credentials.password) {
    throw new Error("Missing login credentials.");
  }

  try {
    const faculty = await FacultyModel.findOne({
      faculty_id: credentials.faculty_id,
    });

    if (!faculty) {
      console.log("No faculty found with ID:", credentials.faculty_id);

      // THROW an error for failed login (401/403 equivalent)
      throw new Error(
        "No account found with faculty ID: " + credentials.faculty_id
      );
    }

    console.log("Faculty found:", faculty.faculty_id);

    if (credentials.password !== faculty.password) {
      // THROW an error for incorrect password (403 equivalent)
      throw new Error("Incorrect Password");
    }

    // --- SUCCESS CASE ---

    // If successful, RETURN the data needed for the response
    const loginData = {
      _id: faculty._id,
      login: true,
      isSuperAdmin: faculty.isSuperAdmin,
      userProfile: redactFacultyPassword(faculty),
      leaveCategoryDetails: leaveService.getLeaveCategories(),
      role: faculty.isSuperAdmin ? "admin" : "teacher", 
    };

    return loginData; // The App Router handler will turn this into a 200 JSON response
  } catch (err) {
    // --- SERVER/DATABASE ERROR CASE ---

    // Log the error for server-side debugging
    console.log("Login error (Controller):", err);

    // Re-throw the error so the App Router route.ts can catch it
    // and return the appropriate HTTP status (like the 401 you set up).
    // If the error is an operational one (like incorrect password), just re-throw it.
    throw err;
  }
}

function redactFacultyPassword(faculty) {
  const obj = faculty.toObject();
  delete obj.password;
  return obj;
}

export function createNewFaculty(req, res, modelName) {
  var obj = req.body;
  var modelObj = new modelName(obj);
  req.body["leave"] = leave_default;

  req.body = req.body;
  var modelObj = new modelName(req.body);

  modelObj
    .save()
    .then((result) => {
      password = "";
      if (req.body.password == undefined) {
        password = "password";
      } else {
        password = req.body.password;
      }

      const mailOptions = {
        from: "project.college@naveenrao.com",
        to: req.body.email_id,
        subject: "Successfully signed up",
        text:
          "Your ID is " +
          req.body.faculty_id +
          " and your Password is " +
          password,
      };

      transporter.sendMail(mailOptions, function (err, info) {
        if (err) console.log(err);
        else console.log(info);
      });

      leaveService
        .creditAnnualLeave(result)
        .then((result) => {
          return res.status(201).json({ message: "saved", id: result._id });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ message: "error", err: err });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
}

export function updatePassword(req, res) {
  var body = req.body;
  FacultyModel.findOneAndUpdate(
    { faculty_id: body.faculty_id, password: body.password },
    { password: body.updatedPassword },
    async (err, facultyProfile) => {
      if (err) {
        console.log(err);
        res.status(500).json({ err: err });
      } else if (facultyProfile == null) {
        res.status(403).json({
          err:
            "Password Mismatch / No account found with faculty id: " +
            body.faculty_id,
        });
      } else {
        res.status(200).json({
          message: "Password updated",
          result: this.redactFacultyPassword(facultyProfile),
        });
      }
    }
  );
}

export async function getAllFaculty() {
  await mongoDbConnection();
  const allFaculty = await FacultyModel.find({}).lean();
  const facultyData = allFaculty.map(({ password, ...rest }) => rest);
  return facultyData;
}
