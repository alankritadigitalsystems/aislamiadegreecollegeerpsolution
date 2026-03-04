"use client";
import { useEffect, useState, ChangeEvent } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { toast, Toaster } from "sonner";
import {
  ClipboardList,
  FileSpreadsheet,
  Download,
  Loader2,
  PlusCircle,
  Save,
} from "lucide-react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";

type Student = {
  _id: string;
  full_name: {
    first_name: string;
    last_name: string;
  };
};
type Period = {
  subject: string;
  status: "Present" | "Absent" | "Leave";
};

type AttendanceRecord = {
  _id?: string;
  student_id?: Student | string;
  class_name: string;
  section: string;
  date: string;
  type: "Daily" | "Period-wise";
  attendance_status?: string;
  periods?: Period[];
  faculty_id?: string;
  academic_year?: string;
};
type AttendanceApiResponse = {
  success: boolean;
  attendance: AttendanceRecord[];
};

export default function StudentAttendancePage() {
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>([]);
  const [attendanceType, setAttendanceType] = useState<"Daily" | "Period-wise">(
    "Daily"
  );
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [periods, setPeriods] = useState<Period[]>([
    { subject: "", status: "Present" },
  ]);
  const [reportData, setReportData] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [slipFile, setSlipFile] = useState<File | null>(null);
  const [sickFromDate, setSickFromDate] = useState("");
  const [sickToDate, setSickToDate] = useState("");
  const [uploadFile, setUploadFile] = useState("");
  const classes = [
    "B.A. I",
    "B.A. II",
    "B.A. III",
    "B.Com. I",
    "B.Com. II",
    "B.Com. III",
    "B.Sc. I ",
    "B.Sc. II ",
    "B.Sc. III",
  ];
  const sections = ["A", "B", "C", "D", "E"];
  useEffect(() => {
    const role = Cookies.get("userRole");
    const userId = Cookies.get("userId");

    if (role === "student") {
      setSelectedStudent(userId || "");
    } 
   
  }, [router]);

  useEffect(() => {
    axiosInstance
      .get<Student[]>("/admission")
      .then((res) => setStudents(res.data))
      .catch(() => toast.error("Failed to fetch student data"));
  }, []);

  const handleAddPeriod = () =>
    setPeriods([...periods, { subject: "", status: "Present" }]);

  const validateForm = (): boolean => {
    if (!selectedStudent) {
      toast.warning("Please select a student");
      return false;
    }
    if (!selectedClass.trim()) {
      toast.warning("Please enter a class name");
      return false;
    }
    if (!selectedSection.trim()) {
      toast.warning("Please enter Section");
      return false;
    }
    if (!selectedDate) {
      toast.warning("Please select a date");
      return false;
    }
    if (attendanceType === "Period-wise") {
      const hasEmpty = periods.some((p) => !p.subject.trim());
      if (hasEmpty) {
        toast.warning("Please fill all subject names");
        return false;
      }
    }
    return true;
  };

  const { user } = useAuthStore()

  const handleMarkAttendance = async () => {
    if (!validateForm()) return;


    const baseBody = {
      faculty_id: user?.full_name?._id,
      student_id: selectedStudent,
      class_name: selectedClass,
      section:selectedSection,
      academic_year: "2025-26",
      date: selectedDate,
      type: attendanceType,
    };

    const body: AttendanceRecord =
      attendanceType === "Daily"
        ? { ...baseBody, attendance_status: periods[0].status }
        : { ...baseBody, periods };

    try {
      await axiosInstance.post("/attendance/student", body);
      toast.success("Attendance saved successfully!");
      setSelectedClass("")
      setSelectedSection("")
      setAttendanceType("Daily")
      setSelectedStudent("")
      setSelectedDate(today)
      setPeriods([
        { subject: "", status: "Present" },
      ])
    } catch {
      toast.error("Failed to save attendance");
    }
  };

  const handleBulkUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return toast.warning("Please select a file");

    const formData = new FormData();
    formData.append("file", file);
    try {
     const res= await axiosInstance.post("/attendance/student", formData,{
        headers: { "Content-Type": "multipart/form-data" },
        
      });
     if (res.data.success) {
      toast.success(`Bulk upload completed! ${res.data.count} records added.`);
    } else {
      toast.error(res.data.message || "Bulk upload failed");
    }
    } catch {
      toast.error("Bulk upload failed");
    }
  };

  const handleFetchReport = async () => {
    if (!selectedClass.trim()) {
      toast.warning("Enter class name to generate report");
      return;
    }

    setLoading(true);
    try {
      const res = await axiosInstance.get<AttendanceApiResponse>(
        `/attendance/student?class_name=${encodeURIComponent(selectedClass)}&student_id=${encodeURIComponent(selectedStudent)}`
      );
      const attendanceArray = Array.isArray(res.data?.attendance) ? res.data.attendance : [];
      setReportData(attendanceArray);
   
    } catch {
      toast.error("Failed to fetch attendance report");
    } finally {
      setLoading(false);
    }
  };
const handleSubmitSickLeave = async () => {
  if (!selectedStudent) return toast.warning("Select a student");
  if (!sickFromDate) return toast.warning("Select FROM date");
  if (!sickToDate) return toast.warning("Select TO date");
  if (!slipFile) return toast.warning("Please upload doctor slip");

  const formData = new FormData();
  formData.append("student_id", selectedStudent);
  formData.append("from_date", sickFromDate);
  formData.append("to_date", sickToDate);
  formData.append("slip", slipFile);
  formData.append("action", "medical-request");

  try {
    await axiosInstance.patch(
      "/attendance/student?action=medical-request",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    toast.success("Medical leave request submitted!");
    setSlipFile(null);
    setSickFromDate("");
    setSickToDate("");
    setSelectedStudent("");
  } catch {
    toast.error("Failed to submit medical leave");
  }
};


  const exportPDF = () => {
    if (reportData.length === 0)
      return toast.warning("No data to export. Generate report first.");

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Amiruddaula Islamia Degree College", 105, 15, {
      align: "center",
    });

    doc.setFontSize(12);
    doc.text("Student Attendance Report", 105, 25, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Class: ${selectedClass || "All"}`, 14, 35);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 40);

    autoTable(doc, {
      startY: 46,
      head: [["#", "Student Name", "Date", "Type","Class","Section", "Status"]],
      body: reportData.map((r, i) => [
        i + 1,
        typeof r.student_id === "object" && r.student_id?.full_name
          ? `${r.student_id.full_name.first_name || "N/A"} ${r.student_id.full_name.last_name || ""}`
          : "N/A",
       r.date ? new Date(r.date).toLocaleDateString() : "-",
        r.type ?? "Unknown",
        r.class_name ?? "-",
        r.section ?? "-",
        r.type === "Daily"
          ? r.attendance_status ?? "-"
          : r.periods?.map((p) => `${p.subject}: ${p.status}`).join(", ") ||
          "-",
      ]),
      theme: "grid",
      styles: { fontSize: 9, cellPadding: 3, valign: "middle" },
      headStyles: { fillColor: [59, 130, 246], textColor: 255 },
      alternateRowStyles: { fillColor: [245, 247, 250] },
      margin: { top: 10, left: 10, right: 10 },
    });

    doc.save(`Attendance_Report_${new Date().toISOString().slice(0, 10)}.pdf`);
    toast.success("PDF downloaded successfully!");
  };




  return (
    <div className="px-48 py-8 bg-gray-50 min-h-screen">
      <div className="absolute top-6 left-6">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back
        </button>
      </div>
      <Toaster richColors position="top-right" />
      <div className="space-y-1 mb-8">
        <h1 className="text-3xl font-semibold text-gray-800 flex items-center gap-2">
          <ClipboardList className="text-blue-600" /> Student Attendance
        </h1>
        <p className="text-gray-500 text-sm">
          Manage attendance, upload bulk records, and generate detailed reports.
        </p>
      </div>

      {/* ---- Mark Attendance ---- */}
      {(Cookies.get("userRole") === "teacher" || Cookies.get("userRole") === "superadmin") && (
        <section className="bg-white rounded-xl shadow-sm p-6 space-y-5 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 border-b pb-3">
            Mark Attendance
          </h2>

          {/* Attendance Details Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            {/* Attendance Type */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">Attendance Type</label>
              <select
                className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                value={attendanceType}
                onChange={(e) =>
                  setAttendanceType(e.target.value as "Daily" | "Period-wise")
                }
              >
                <option value="Daily">Daily</option>
                <option value="Period-wise">Period-wise</option>
              </select>
            </div>

            {/* Student */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">Select Student</label>
              <select
                className={`border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none ${Cookies.get("userRole") === "student"
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : ""
                  }`}
                disabled={Cookies.get("userRole") === "student"}
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
              >
                <option value="">Select Student</option>
                {students.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.full_name.first_name} {s.full_name.last_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Class Name */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">Class Name</label>
              
              <select
                className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              > 
              <option value="" disabled>
                Please select a class
                </option>
                {classes.map((c)=>(
                  <option key={c} value={c}>{c}</option>
                ))}
                </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">Section</label>
              
              <select
                className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
              > 
              <option value="" disabled>
                Please select Section
                </option>
                {sections.map((c)=>(
                  <option key={c} value={c}>{c}</option>
                ))}
                </select>
            </div>

            {/* Date */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">Date</label>
              <input
                type="date"
                className={`border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none ${Cookies.get("userRole") === "student"
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : ""
                  }`}
                disabled={Cookies.get("userRole") === "student"}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
          </div>

          {/* Attendance Type Based UI */}
          {attendanceType === "Daily" ? (
            <div className="flex flex-col gap-1 w-full sm:w-1/2">
              <label className="text-sm font-medium text-gray-600">Attendance Status</label>
              <select
                className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                value={periods[0]?.status || "Present"}
                onChange={(e) =>
                  setPeriods([{ ...periods[0], status: e.target.value as Period["status"] }])
                }
              >
                <option>Present</option>
                <option>Absent</option>
                <option>Leave</option>
              </select>
            </div>
          ) : (
            <div className="space-y-3">
              <h3 className="text-base font-medium text-gray-700">Period-wise Details</h3>
              {periods.map((p, i) => (
                <div key={i} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    placeholder="Subject"
                    value={p.subject}
                    onChange={(e) => {
                      const updated = [...periods];
                      updated[i].subject = e.target.value;
                      setPeriods(updated);
                    }}
                    className="border border-gray-300 p-2 rounded-md flex-1 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <select
                    value={p.status}
                    onChange={(e) => {
                      const updated = [...periods];
                      updated[i].status = e.target.value as Period["status"];
                      setPeriods(updated);
                    }}
                    className="border border-gray-300 p-2 rounded-md w-full sm:w-1/3 focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Leave">Leave</option>
                  </select>
                </div>
              ))}
              <button
                onClick={handleAddPeriod}
                type="button"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium transition-all"
              >
                <PlusCircle size={16} /> Add Subject
              </button>
            </div>
          )}

          {/* Save Button */}
          <div className="pt-4">
            <button
              onClick={handleMarkAttendance}
              className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2 transition-all"
            >
              <Save size={16} /> Save Attendance
            </button>
          </div>
        </section>
      )}


      {/* ---- Bulk Upload ---- */}
      {(Cookies.get("userRole") === "teacher" || Cookies.get("userRole") === "superadmin") &&
        <section className="bg-white rounded-xl shadow-sm p-6 space-y-3 border border-gray-100 mt-8">
          <h2 className="text-lg font-medium text-gray-700 border-b pb-2 flex items-center gap-2">
            <FileSpreadsheet className="text-green-600" /> Bulk Upload
          </h2>
          <input
            type="file"
            accept=".xlsx"
            onChange={handleBulkUpload}
            className="border p-2 rounded-md"
          />
        </section>
      }
{/* ---- Sick Leave Upload ---- */}
<section className="bg-white rounded-xl shadow-sm p-6 space-y-3 border border-gray-100 mt-8">
  <h2 className="text-lg font-medium text-gray-700 border-b pb-2 flex items-center gap-2">
    <ClipboardList className="text-red-600" /> Sick Leave Submission
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">

    {/* Student */}
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-600">Student</label>
      <select
        className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
        value={selectedStudent}
        onChange={(e) => setSelectedStudent(e.target.value)}
      >
        <option value="">Select Student</option>
        {students.map((s) => (
          <option key={s._id} value={s._id}>
            {s.full_name.first_name} {s.full_name.last_name}
          </option>
        ))}
      </select>
    </div>

    {/* From Date */}
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-600">From Date</label>
      <input
        type="date"
        className="border border-gray-300 p-2 rounded-md"
        value={sickFromDate}
        onChange={(e) => setSickFromDate(e.target.value)}
      />
    </div>

    {/* To Date */}
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-600">To Date</label>
      <input
        type="date"
        className="border border-gray-300 p-2 rounded-md"
        value={sickToDate}
        onChange={(e) => setSickToDate(e.target.value)}
      />
    </div>

    {/* Upload Slip */}
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-600">Upload Doctor Slip</label>
      <input
        type="file"
        accept="image/*,.pdf"
        onChange={(e) => setSlipFile(e.target.files?.[0] || null)}
        className="border border-gray-300 p-2 rounded-md"
      />
    </div>
  </div>

  {/* Submit Button */}
  <button
  onClick={handleSubmitSickLeave}
  className="bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700 flex items-center gap-2 mt-3"
>
  <Save size={16} /> Submit Sick Leave
</button>
</section>


      {/* ---- Reports ---- */}
       <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mt-8">
        <h2 className="text-lg font-medium text-gray-700 border-b pb-2 mb-3 flex items-center gap-2">
          <Download className="text-indigo-600" /> Attendance Reports
        </h2>

        <div className="flex flex-wrap gap-3 mb-4">
          <select
           
            className="border p-2 rounded-md"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="" disabled>
                Please select a class
                </option>
            {classes.map((c)=>(
                  <option key={c} value={c}>{c}</option>
                ))}
          </select>
          <select
            className="border p-2 rounded-md bg disabled:text-gray-400"
            disabled={Cookies.get("userRole") === "student"}
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
          >
            <option value="">All Student</option>
            {students.map((s) => (
              <option key={s._id} value={s._id}>
                {s.full_name.first_name} {s.full_name.last_name}
              </option>
            ))}
          </select>

          <button
            onClick={handleFetchReport}
            disabled={loading}
            className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 disabled:opacity-60 flex items-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Generate Report"}
          </button>

          <button
            onClick={exportPDF}
            className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 flex items-center gap-2"
          >
            <Download size={16} /> Export PDF
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-md border">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-blue-50 text-blue-800">
              <tr>
                <th className="border p-2">Student</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Type</th>
                <th className="border p-2">Subject</th>
                <th className="border p-2">Section</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((r, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="border p-2">
                    {typeof r.student_id === "object" && r.student_id?.full_name?.first_name || "N/A"}
                  </td>
                  <td className="border p-2">
                    {new Date(r.date).toLocaleDateString()}
                  </td>
                  <td className="border p-2">{r.type}</td>
                  <td className="border p-2" >
                    {r.type === "Daily"
                      ? r.attendance_status
                      : r.periods
                        ?.map((p) => p.subject)
                    }
                  </td>
                  <td className="border p-2 text-center">{r.section}</td>
                  <td className="border p-2 text-gray-700">
                    {r.type === "Daily"
                      ? r.attendance_status
                      : r.periods
                        ?.map((p) => p.status)
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
