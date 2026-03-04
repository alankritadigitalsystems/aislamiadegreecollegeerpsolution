"use client";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { TiPencil } from "react-icons/ti";
import { GrScorecard } from "react-icons/gr";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

type AdmissionForm = {
  full_name: { first_name: string; middle_name: string; last_name: string };
  father_name: string;
  mother_name: string;
  date_of_birth: string;
  gender: string;
  religion: string;
  category: string;
  nationality: string;
  email_id: string;
  mobile_number: string;
  class: string;
  high_school_board: string;
  high_school_passing_year: string;
  intermediate_board_name: string;
  intermediate_school_name: string;
  intermediate_passing_year: string;
  aadhar_number:string;
  _id:string
};
type marksInterface = {
 _id: string,
    student_id: {
      full_name: {
        first_name: string,
        last_name: string,
        middle_name: string
      },
      _id: string,
      class: string
    },
    exam_name: string,
    class: string,
    academic_year: string,
    subjects: [
      {
        name: string,
        internal_marks:  number,
        external_marks: number,
        total: number,
        _id:  string
      }
    ],
    grading_system: string,
}

type MarksEditData = {
  grading_system?: string;
  subjects?: {
    name: string;
    internal_marks: number;
    external_marks: number;
    total: number;
    _id: string;
  }[];
}
export default function MarksPage() {
  const [students, setStudents] = useState<AdmissionForm[]>([]);
  const [marks, setMarks] = useState<marksInterface[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<MarksEditData>({});
  const [selectedStudent, setSelectedStudent] = useState("");
  const [form, setForm] = useState({
    student_id: "",
    exam_name: "",
    class: "",
    academic_year: "",
    grading_system: "Percentage",
    subjects: [{ name: "", internal_marks: "", external_marks: "" }],
  });
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
  const router = useRouter();
 useEffect(() => {
    const role = Cookies.get("userRole");
    const userId = Cookies.get("userId");

    if (role === "student") {
      setSelectedStudent(userId || "");
    } else if (role !== "teacher") {
      router.push("/");
    }
  }, [router]);
  useEffect(() => {
    axiosInstance.get("/admission").then((res) => setStudents(res.data));
    fetchMarks();
  }, []);

  const fetchMarks = async () => {
    const res = await axiosInstance.get("/marks");
    setMarks(res.data);
  };

  const handleSubjectChange = (
    index: number,
    field: "name" | "internal_marks" | "external_marks",
    value: string
  ) => {
    const updated = [...form.subjects];
    updated[index] = { ...updated[index], [field]: value };
    setForm({ ...form, subjects: updated });
  };

  const addSubject = () => {
    setForm({
      ...form,
      subjects: [...form.subjects, { name: "", internal_marks: "", external_marks: "" }],
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axiosInstance.post("/marks", form);
    alert("Marks record added successfully!");
    fetchMarks();
    setForm({
      student_id: "",
      exam_name: "",
      class: "",
      academic_year: "",
      grading_system: "Percentage",
      subjects: [{ name: "", internal_marks: "", external_marks: "" }],
    });
  };

  const handleEdit = (record: marksInterface) => {
    setEditingId(record._id);
    setEditData({
      grading_system: record.grading_system,
      subjects: record.subjects,
    });
  };

  const handleSubjectEdit = (idx: number, field: string, value: string) => {
    const updated = [...(editData.subjects || [])];
    const subject = updated[idx] as { name: string; internal_marks: number; external_marks: number; total: number; _id: string };
    (subject as Record<string, string | number>)[field] = field === "name" ? value : Number(value);
    setEditData({ ...editData, subjects: updated });
  };

  const saveEdit = async (id: string) => {
    await axiosInstance.patch(`/marks/${id}`, editData);
    alert("Marks updated successfully!");
    setEditingId(null);
    fetchMarks();
  };

  // Calculate percentage helper
  const calculatePercentage = (subjects: { name: string; internal_marks: number; external_marks: number; total: number; _id: string }[]) => {
    let totalMarks = 0;
    let obtainedMarks = 0;

    subjects.forEach((s) => {
      const internal = Number(s.internal_marks) || 0;
      const external = Number(s.external_marks) || 0;
      obtainedMarks += internal + external;
      totalMarks += 100; // assuming each subject is out of 100 marks
    });

    return totalMarks ? ((obtainedMarks / totalMarks) * 100).toFixed(2) : "0.00";
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4 md:px-10">
      <div className="absolute top-6 left-6">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back
        </button>
      </div>
      <div className="max-w-6xl mx-auto  py-6">
        <h1 className="ml-4 text-2xl font-bold text-gray-800 mb-8  pb-3 flex gap-2 items-center">
          <GrScorecard /><span>Marks Management</span>
        </h1>

        {/* Add Form */}
        {!selectedStudent && <div className="bg-white shadow-md rounded-2xl p-8 mb-10">
          <h2 className="text-xl font-semibold text-gray-700 mb-6 border-b pb-4">
            Add Marks Record
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Student Name */}
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Student Name
                </label>
                <select
                  value={form.student_id}
                  onChange={(e) => setForm({ ...form, student_id: e.target.value })}
                  className={`w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none ${form.student_id === "" ? "text-gray-400" : "text-gray-700"
                    }`}
                >
                  <option value="" disabled hidden>
                    Select Student
                  </option>
                  {students.map((s) => (
                    <option key={s._id} value={s._id} className=" text-black">
                      {s.full_name.first_name}{" "}
                      {s.full_name.middle_name ? s.full_name.middle_name + " " : ""}
                      {s.full_name.last_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Exam Name */}
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Exam Name
                </label>
                <input
                  placeholder="Enter Exam Name"
                  value={form.exam_name}
                  onChange={(e) => setForm({ ...form, exam_name: e.target.value })}
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Class / Semester */}
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Class / Semester
                </label>
                <select
                  value={form.class}
                  onChange={(e) => setForm({ ...form, class: e.target.value })}
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                 <option value="" disabled>
                Please select a class
                </option>
                {classes.map((c)=>(
                  <option key={c} value={c}>{c}</option>
                ))}
                </select>
              </div>

              {/* Academic Year */}
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Academic Year
                </label>
                <select
               
                  value={form.academic_year}
                  onChange={(e) => setForm({ ...form, academic_year: e.target.value })}
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                   <option>2021-2022</option>
                   <option>2022-2023</option>
                   <option>2023-2024</option>
                   <option>2024-2025</option>
                   <option>2025-2026</option>
                </select>
              </div>
            </div>


            {/* Subjects Section */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Subjects</h3>
              {form.subjects.map((sub, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <input
                    placeholder="Subject Name"
                    value={sub.name}
                    onChange={(e) => handleSubjectChange(idx, "name", e.target.value)}
                    className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <input
                    type="number"
                    placeholder="Internal Marks"
                    value={sub.internal_marks}
                    onChange={(e) =>
                      handleSubjectChange(idx, "internal_marks", e.target.value)
                    }
                    className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <input
                    type="number"
                    placeholder="External Marks"
                    value={sub.external_marks}
                    onChange={(e) =>
                      handleSubjectChange(idx, "external_marks", e.target.value)
                    }
                    className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={addSubject}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                + Add Subject
              </button>
            </div>

            <div className="pt-6 border-t flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium"
              >
                Submit Marks Record
              </button>
            </div>
          </form>
        </div>}
        

        {/* Marks Table */}
        <div className="bg-white shadow-md rounded-2xl p-8">
          <h2 className="text-xl font-semibold mb-4 border-b pb-4 text-gray-800">
            All Marks Records
          </h2>
          <table className="w-full border-collapse border text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="border p-2">Student</th>
                <th className="border p-2">Exam</th>
                <th className="border p-2">Class</th>
                <th className="border p-2">Subjects</th>
                <th className="border p-2">Grading</th>
                <th className="border p-2">Percentage</th>
                <th className="border p-2 text-center" hidden={!!selectedStudent}>Action</th>
              </tr>
            </thead>
            <tbody>
              {marks.filter((m)=> 
                {
                  if(!selectedStudent) return true ;
                  else {
                    return m.student_id?._id === selectedStudent
                    }}).map((m)=>
                      (
                <tr key={m._id} className="hover:bg-gray-50">
                  <td className="border p-2">
                    {m.student_id?.full_name?.first_name}{" "}
                    {m.student_id?.full_name?.middle_name || ""}{" "}
                    {m.student_id?.full_name?.last_name}
                  </td>
                  <td className="border p-2">{m.exam_name}</td>
                  <td className="border p-2">{m.class}</td>
                  <td className="border p-2">
                    {editingId === m._id ? (
                      <div>
                        {editData.subjects?.map((s: { name: string; internal_marks: number; external_marks: number; total: number; _id: string }, idx: number) => (
                          <div key={idx} className="grid grid-cols-3 gap-1 mb-1">
                            <input
                              value={s.name}
                              onChange={(e) =>
                                handleSubjectEdit(idx, "name", e.target.value)
                              }
                              className="border p-1 rounded"
                            />
                            <input
                              value={s.internal_marks}
                              onChange={(e) =>
                                handleSubjectEdit(idx, "internal_marks", e.target.value)
                              }
                              className="border p-1 rounded"
                              type="number"
                            />
                            <input
                              value={s.external_marks}
                              onChange={(e) =>
                                handleSubjectEdit(idx, "external_marks", e.target.value)
                              }
                              className="border p-1 rounded"
                              type="number"
                            />
                          </div>
                        ))}
                        <button
                          onClick={() => saveEdit(m._id)}
                          className="text-green-600 mt-2 hover:underline"
                        >
                          💾 Save
                        </button>
                      </div>
                    ) : (
                      m.subjects
                        .map(
                          (s: { name: string; internal_marks: number; external_marks: number; total: number; _id: string }) =>
                            `${s.name} (${s.internal_marks}+${s.external_marks})`
                        )
                        .join(", ")
                    )}
                  </td>
                  <td className="border p-2">{m.grading_system}</td>
                  <td className="border p-2 text-center font-semibold text-blue-700">
                    {calculatePercentage(m.subjects)}%
                  </td>
                  <td className="border p-2 text-center" hidden={!!selectedStudent}>
                    {editingId === m._id ? null : (
                      <button
                        onClick={() => handleEdit(m)}
                        className="text-blue-600 hover:underline flex gap-1.5 items-center"
                      >
                        <TiPencil /> <span>Edit</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
