"use client";

import axiosInstance from "@/lib/axiosInstance";
import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaTimesCircle, FaCalendarAlt, FaSave } from "react-icons/fa";
import { IoMdSchool } from "react-icons/io";
import { toast } from "sonner";

type Teacher = {
  _id: string;
  full_name: {
    first_name: string;
    last_name: string;
  };
};
export default function FacultyAttendance() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [attendance, setAttendance] = useState<Record<string, string>>({});
  const formatDate = (date: Date) => {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
};
  const todayDate = formatDate(new Date());
  const [date, setDate] = useState(todayDate);
  const [loading, setLoading] = useState(false);
  
  const fetchAttendanceByDate = async (selectedDate: string) => {
  try {
    const res = await axiosInstance.get(
      `/attendance/faculty?date=${selectedDate}`
    );
    const attendanceObj: Record<string, string> = {};

    res.data.forEach((item: {teacher_id:string , status:string}) => {
      attendanceObj[item.teacher_id] = item.status;
    });

    setAttendance(attendanceObj);
  } catch (err) {
    console.error("Failed to fetch attendance", err);
    setAttendance({}); 
  }
};

const fetchTeachers =async function () {
      try {
        const res = await axiosInstance.get("/faculty/allFaculty");
        const data: Teacher[] = await res.data.faculty;
        setTeachers(data);
      } catch (error) {
        console.error("Failed to load teachers:", error);
        toast.error("Failed to load teachers");
      }
    }
  useEffect(() => {
    fetchTeachers();
  }, []);
  useEffect(() => {
    fetchAttendanceByDate(date);
  }, [date]);

  console.log(teachers)


  const handleAttendanceChange = (id: string, status: string) => {
    setAttendance((prev) => ({ ...prev, [id]: status }));
  };

  const submitAttendance = async () => {
    if (!date) return toast.error("Please select a date before saving attendance.");

    setLoading(true);
    try {
      const res = await axiosInstance.post("/attendance/faculty",
        { date, attendance })
      if (!res.data) throw new Error("Failed to save attendance");
      toast.success("Faculty attendance saved successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save attendance. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="absolute top-6 left-6">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back
        </button>
      </div>
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <IoMdSchool className="text-3xl text-indigo-600" />
        <h2 className="text-2xl font-bold text-gray-800">
          Faculty Attendance Management
        </h2>
      </div>

      {/* Date + Save Controls */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex items-center gap-2 border rounded-lg p-2 bg-gray-50">
          <FaCalendarAlt className="text-gray-600" />
          <input
            type="date"
            value={date.split("-").reverse().join("-")} 
            onChange={(e) => {
              const yyyyMmDd = e.target.value; 
              const [yyyy, mm, dd] = yyyyMmDd.split("-");
              setDate(`${dd}-${mm}-${yyyy}`); 
            }}
            className="bg-transparent outline-none"
          />
        </div>

        <button
          onClick={submitAttendance}
          disabled={loading}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-white font-medium transition-all ${loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
            }`}
        >
          <FaSave />
          {loading ? "Saving..." : "Save Attendance"}
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg shadow-sm">
        <table className="min-w-full text-sm border-collapse bg-white">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 border">#</th>
              <th className="p-3 border text-left">Teacher Name</th>
              <th className="p-3 border text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((t, i) => (
       <tr
                key={t._id}
                className="border-t hover:bg-gray-50 transition-colors"
              >
                <td className="p-3 border text-center">{i + 1}</td>
                <td className="p-3 border font-medium text-gray-800">
                  {`${t.full_name?.first_name} ${t.full_name?.last_name}`}
                </td>
                <td className="p-3 border text-center">
                  {attendance[t._id] ? (
                    <span
                      className={`font-medium ${
                        attendance[t._id] === "Present"
                          ? "text-green-600"
                          : attendance[t._id] === "Absent"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {attendance[t._id]}
                    </span>
                  ) : (
                    <select
                      value={attendance[t._id] || ""}
                      disabled={loading}
                      onChange={(e) =>
                        handleAttendanceChange(t._id, e.target.value)
                      }
                      className="border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">Select</option>
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                      <option value="On Leave">On Leave</option>
                    </select>
                  )}
                </td>
              </tr>
            ))}
            {teachers.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center p-4 text-gray-500">
                  Loading teachers
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
