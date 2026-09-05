import mongoDbConnection from "../src/middlewares/connection.js";
import AdmissionStudentInfo from "../src/models/admission_student_info.js";
import StudentLogin from "../src/models/student_login_model.js";

async function clearData() {
  try {
    await mongoDbConnection();
    const resAdm = await AdmissionStudentInfo.deleteMany({});
    const resLog = await StudentLogin.deleteMany({});
    console.log(`DELETED_ADMISSIONS: ${resAdm.deletedCount}`);
    console.log(`DELETED_LOGINS: ${resLog.deletedCount}`);
    process.exit(0);
  } catch (e) {
    console.error("ERROR:", e);
    process.exit(1);
  }
}

clearData();
