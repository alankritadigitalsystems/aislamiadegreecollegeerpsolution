"use client";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";

interface teachersInterface {
  _id: string;
  full_name: {
    first_name: string;
    last_name: string;
  };
}
interface assignmentsInterface {
  _id: string;
  faculty_id: {
    full_name: {
      first_name: string;
      last_name: string;
    };
  };
  subject_name: string;
  class_name: string;
  academic_year: number | string;
}

export default function AssignSubject() {
  const [teachers, setTeachers] = useState<teachersInterface[]>([]);
  const [assignments, setAssignments] = useState<assignmentsInterface[]>([]);
  const [form, setForm] = useState({
    faculty_id: "",
    subject_name: "",
    class_name: "",
    academic_year: new Date().getFullYear().toString(),
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const fetchTeachers = async () => {
    const res = await axiosInstance.get("/faculty/allFaculty");
    setTeachers(res.data.faculty || []);
  };

  const fetchAssignments = async () => {
    const res = await axiosInstance.get("/faculty/assign-subject");
    setAssignments(res.data.assignments || []);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!form.faculty_id) newErrors.faculty_id = "Please select a teacher.";
    if (!form.subject_name.trim()) newErrors.subject_name = "Subject name is required.";
    if (!form.class_name.trim()) newErrors.class_name = "Class name is required.";

    if (!/^\d{4}$/.test(form.academic_year)) {
      newErrors.academic_year = "Enter valid year like '2025'.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axiosInstance.post("/faculty/assign-subject", form);
      alert("✅ Subject assigned successfully!");

      setForm({
        faculty_id: "",
        subject_name: "",
        class_name: "",
        academic_year: new Date().getFullYear().toString(),
      });
      fetchAssignments();
      setErrors({});
    } catch (err) {
      console.error(err);
      alert("❌ Failed to assign subject");
    }
  };

  const deleteAssignment = async (id: string) => {
    await axiosInstance.delete(`/faculty/assign-subject?id=${id}`);
    fetchAssignments();
  };

  useEffect(() => {
    fetchTeachers();
    fetchAssignments();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-100 to-blue-50">
      <div className="absolute top-6 left-6">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back
        </button>
      </div>
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Assign Subject to Teacher
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Teacher */}
          <div>
            <select
              value={form.faculty_id}
              onChange={(e) => setForm({ ...form, faculty_id: e.target.value })}
              className={`border p-3 rounded w-full ${
                errors.faculty_id ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Teacher</option>
              {teachers.map((t) => (
                <option key={t._id} value={t._id}>
                  {t.full_name.first_name} {t.full_name.last_name}
                </option>
              ))}
            </select>
            {errors.faculty_id && (
              <p className="text-sm text-red-500 mt-1">{errors.faculty_id}</p>
            )}
          </div>

          {/* Subject */}
          <div>
            <input
              type="text"
              placeholder="Subject Name"
              value={form.subject_name}
              onChange={(e) => setForm({ ...form, subject_name: e.target.value })}
              className={`border p-3 rounded w-full ${
                errors.subject_name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.subject_name && (
              <p className="text-sm text-red-500 mt-1">{errors.subject_name}</p>
            )}
          </div>

          {/* Class */}
          <div>
            <input
              type="text"
              placeholder="Class Name"
              value={form.class_name}
              onChange={(e) => setForm({ ...form, class_name: e.target.value })}
              className={`border p-3 rounded w-full ${
                errors.class_name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.class_name && (
              <p className="text-sm text-red-500 mt-1">{errors.class_name}</p>
            )}
          </div>

          {/* Year */}
          <div>
            <input
              type="text"
              placeholder="Academic Year (e.g. 2025)"
              value={form.academic_year}
              onChange={(e) => setForm({ ...form, academic_year: e.target.value })}
              className={`border p-3 rounded w-full ${
                errors.academic_year ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.academic_year && (
              <p className="text-sm text-red-500 mt-1">{errors.academic_year}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 active:scale-[0.98] transition"
          >
            Assign Subject
          </button>
        </form>

        {/* Assigned list */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">
            Assigned Subjects
          </h3>
          <ul className="space-y-3">
            {assignments.map((a) => (
              <li
                key={a._id}
                className="flex justify-between items-center bg-gray-50 p-4 rounded-md border hover:shadow-sm transition"
              >
                <div>
                  <p className="font-medium text-gray-800">
                    {a.faculty_id?.full_name?.first_name} → {a.subject_name} ({a.class_name})
                  </p>
                  <p className="text-sm text-gray-500">{a.academic_year}</p>
                </div>
                <button
                  onClick={() => deleteAssignment(a._id)}
                  className="text-red-600 font-medium hover:underline"
                >
                  Delete
                </button>
              </li>
            ))}
            {assignments.length === 0 && (
              <p className="text-gray-500 text-center py-2">
                No subjects assigned yet.
              </p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
