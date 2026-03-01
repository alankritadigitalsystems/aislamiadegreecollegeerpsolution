import mongoDbConnection from "@/middlewares/connection";
import FacultyModel from "@/models/faculty";

export async function createNewStudent(req, res) {
  await mongoDbConnection();
  try {
    const body = req.body;

    const newStudent = new FacultyModel({
      faculty_id: body.name , 
      full_name: {
        first_name: body.first_name || "Student",
        last_name: body.last_name || "User",
      },
      email_id: body.email || body.email_id,
      password: body.password,
      reference_faculty: body.reference_faculty || "N/A",
      role: "student", 
      isSuperAdmin: false,
    });

    await newStudent.save();

    return res.status(201).json({ message: "Student created successfully" });
  } catch (err) {
    console.error("Error creating student:", err);
    return res.status(500).json({ message: "Error creating student", error: err.message });
  }
}
