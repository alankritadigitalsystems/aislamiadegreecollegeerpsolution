"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "sonner";
import { GrScorecard } from "react-icons/gr";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";


interface Student {
  full_name: {
    first_name: string;
    last_name: string;
    middle_name: string;
  };
  class: string;
  intermediate_board_name: string;
  father_name: string;
  mother_name: string;
  date_of_birth: Date;
  gender: string;
  religion: string;
  category: string;
  nationality: string;
  _id: string;
  email_id: string;
  mobile_number: number;
  high_school_passing_year: string;
  high_school_board: string;
  intermediate_passing_year: string;
  intermediate_school_name: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
}

/* =========================
   Marks / Report Types
========================= */

interface Subject {
  name: string;
  internal_marks: number;
  external_marks: number;
  grade?: string;
}

interface Exam {
  exam_name: string;
  academic_year: string;
  class: string;
  subjects: Subject[];
}

interface Report {
  student?: Student;
  exams: Exam[];
  total: number;
  percentage: string;
  gpa: string;
}

type JsPDFWithAutoTable = jsPDF & {
  lastAutoTable?: {
    finalY: number;
  };
};

export default function ProgressReportPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<string>("");
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [studentError, setStudentError] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    const role = Cookies.get("userRole");
    const userId = Cookies.get("userId");

    if (role === "student") {
      setSelectedStudent(userId || "");
    }
  }, [router]);

  /* =========================
     Fetch Students
  ========================= */
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axiosInstance.get<Student[]>("/admission");
        setStudents(res.data);
      } catch {
        toast.error("Failed to load students. Please try again.");
      }
    };
    fetchStudents();
  }, []);

  /* =========================
     Validation
  ========================= */
  const validate = () => {
    if (!selectedStudent) {
      setStudentError("Please select a student");
      return false;
    }
    setStudentError("");
    return true;
  };

  /* =========================
     Fetch Report
  ========================= */
  const fetchReport = async () => {
    if (!validate()) return;

    setLoading(true);
    setReport(null);

    try {
      const res = await axiosInstance.get<Exam[]>(
        `/marks/student/${selectedStudent}`,
      );
      const marksData = res.data;

      if (
        !marksData ||
        marksData.length === 0 ||
        marksData[0].subjects.length === 0
      ) {
        toast.error("No exam records found for this student.");
        return;
      }

      const allSubjects = marksData.flatMap((m) => m.subjects);

      const totalInternal = allSubjects.reduce(
        (acc, s) => acc + Number(s.internal_marks || 0),
        0,
      );

      const totalExternal = allSubjects.reduce(
        (acc, s) => acc + Number(s.external_marks || 0),
        0,
      );

      const total = totalInternal + totalExternal;
      const maxMarks = allSubjects.length * 100;
      const percentage = ((total / maxMarks) * 100).toFixed(2);
      const gpa = (parseFloat(percentage) / 20).toFixed(2);

      setReport({
        student: students.find((s) => s._id === selectedStudent),
        exams: marksData,
        total,
        percentage,
        gpa,
      });

      toast.success("Report generated successfully!");
    } catch {
      toast.error("Error loading report. Try again.");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     PDF Generation
  ========================= */
  const printPDF = () => {
    if (!report) return toast.warning("Generate a report first.");

    const doc = new jsPDF();
    const pdfDoc = doc as JsPDFWithAutoTable;

    const s = report.student;
    const exam = report.exams[0];

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Amiruddaula Islamia Degree College", 105, 20, {
      align: "center",
    });

    doc.setFontSize(14);
    doc.text("Progress Report Card 2025–26", 105, 30, { align: "center" });

    doc.line(15, 35, 195, 35);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    doc.text(
      `Student Name : ${s?.full_name?.first_name} ${s?.full_name?.last_name}`,
      20,
      45,
    );
    doc.text(`Class : ${exam?.class || "-"}`, 20, 52);
    doc.text(`Exam : ${exam?.exam_name || "-"}`, 20, 59);
    doc.text(`Academic Year : ${exam?.academic_year || "-"}`, 20, 66);
    doc.text(`GPA : ${report.gpa}`, 140, 45);
    doc.text(`Percentage : ${report.percentage}%`, 140, 52);
    doc.text(`Total Marks : ${report.total}`, 140, 59);

    const tableData: (string | number)[][] = [];

    report.exams.forEach((examItem) => {
      examItem.subjects.forEach((sub) => {
        tableData.push([
          examItem.exam_name,
          sub.name,
          sub.internal_marks,
          sub.external_marks,
          sub.internal_marks + sub.external_marks,
          sub.grade || "-",
        ]);
      });
    });

    autoTable(doc, {
      startY: 75,
      head: [["Exam", "Subject", "Internal", "External", "Total", "Grade"]],
      body: tableData,
      theme: "grid",
      styles: { fontSize: 11, halign: "center" },
      headStyles: {
        fillColor: [25, 118, 210],
        textColor: 255,
        fontStyle: "bold",
      },
      alternateRowStyles: { fillColor: [240, 240, 240] },
      margin: { left: 15, right: 15 },
    });

    const finalY = (pdfDoc.lastAutoTable?.finalY ?? 70) + 15;

    const remark =
      parseFloat(report.percentage) >= 85
        ? "Outstanding performance! Keep it up."
        : parseFloat(report.percentage) >= 60
          ? "Good work. Keep improving."
          : "Needs improvement. Stay consistent and focused.";

    doc.setFont("helvetica", "bold");
    doc.text("Remarks:", 20, finalY);

    doc.setFont("helvetica", "normal");
    doc.text(remark, 45, finalY);

    doc.setFontSize(12);
    doc.text(
      "Signature of Class Teacher: ____________________",
      20,
      finalY + 20,
    );
    doc.text(
      "Signature of Principal: ________________________",
      20,
      finalY + 30,
    );

    doc.setFontSize(10);
    doc.text("Generated by Unigrad ERP System © 2025", 105, 290, {
      align: "center",
    });

    doc.save(`Progress_Report_${s?.full_name?.first_name}.pdf`);
    toast.success("PDF downloaded!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 py-12 px-4">
      <div className="absolute top-6 left-6">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back
        </button>
      </div>

      <h1 className="text-3xl font-bold text-blue-700 mb-8 flex items-center gap-2">
        <GrScorecard /> Progress Report Management
      </h1>

      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-3xl">
        <div className="bg-gray-50 p-6 rounded-xl border mb-6">
          <h2 className="font-semibold mb-3 text-gray-800">
            Generate Student Progress Report
          </h2>

          <div className="flex flex-wrap gap-3 items-center">
            <div>
              {Cookies.get("userRole") !== "student" && (
                <select
                  value={selectedStudent}
                  disabled={Cookies.get("userRole") === "student"}
                  onChange={(e) => {
                    setSelectedStudent(e.target.value);
                    setStudentError("");
                  }}
                  className={` ${
                    selectedStudent && "hidden"
                  } border p-2 rounded w-64 focus:outline-none focus:ring-2 ${
                    studentError
                      ? "border-red-500 focus:ring-red-400"
                      : "focus:ring-blue-400 border-gray-300"
                  }`}
                >
                  <option value="">-- Select Student --</option>
                  {students.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.full_name.first_name} {s.full_name.last_name}
                    </option>
                  ))}
                </select>
              )}

              {studentError && (
                <p className="text-red-600 text-sm mt-1">{studentError}</p>
              )}
            </div>

            <button
              onClick={fetchReport}
              disabled={loading}
              className={`px-4 py-2 rounded-md text-white font-medium transition ${
                loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Loading..." : "Generate Report"}
            </button>
          </div>
        </div>

        {report && (
          <div className="bg-white border rounded-xl p-6 shadow-inner">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Report Card - {report.student?.full_name?.first_name}
              </h2>

              <button
                onClick={printPDF}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
              >
                🖨 Print / Download
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
