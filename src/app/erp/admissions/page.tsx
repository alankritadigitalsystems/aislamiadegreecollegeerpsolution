"use client";

import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axiosInstance.js";
import { PiStudentFill } from "react-icons/pi";

interface Admission {
  _id: string;
  full_name: { first_name: string; last_name?: string };
  email_id: string;
  mobile_number: string;
  class: string;
  gender: string;
  status: string;
  roll_number?: string;
  createdAt: string;
}

export default function AdmissionsPage() {
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchAdmissions = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/admission");
      setAdmissions(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch admissions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmissions();
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      setUpdatingId(id);
      const res = await axiosInstance.patch(`/admission/${id}`, { status });
      setAdmissions((prev) =>
        prev.map((adm) => (adm._id === id ? res.data : adm))
      );
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update status. Try again.");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600 animate-pulse">
        Loading admissions...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600 font-medium">
        {error}
        <button
          onClick={fetchAdmissions}
          className="ml-3 text-blue-600 underline hover:text-blue-800"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="absolute top-6 left-6">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back
        </button>
      </div>
      <h2 className="text-2xl font-semibold mb-4 text-center flex justify-center items-center gap-2">
       <PiStudentFill /> Student Admissions
      </h2>

      <div className="overflow-x-auto rounded-md shadow-sm border border-gray-200">
        <table
          className="min-w-full border-collapse bg-white text-sm"
          aria-label="Admissions Table"
        >
          <thead>
            <tr className="bg-gray-100 text-gray-700 uppercase text-xs font-semibold tracking-wide">
              <th className="px-4 py-3 border">#</th>
              <th className="px-4 py-3 border text-left">Name</th>
              <th className="px-4 py-3 border text-left">Email</th>
              <th className="px-4 py-3 border text-left">Mobile</th>
              <th className="px-4 py-3 border">Class</th>
              <th className="px-4 py-3 border">Gender</th>
              <th className="px-4 py-3 border">Status</th>
              <th className="px-4 py-3 border">Roll No.</th>
              <th className="px-4 py-3 border">Submitted On</th>
            </tr>
          </thead>

          <tbody>
            {admissions.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="text-center py-8 text-gray-500 italic"
                >
                  No admissions found.
                </td>
              </tr>
            ) : (
              admissions.map((adm, idx) => (
                <tr
                  key={adm._id}
                  className={`border-t text-center hover:bg-gray-50 transition ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="px-4 py-2 border text-gray-700 font-medium">
                    {idx + 1}
                  </td>

                  <td className="px-4 py-2 border text-gray-800 text-left font-medium">
                    {adm.full_name.first_name} {adm.full_name.last_name || ""}
                  </td>

                  <td className="px-4 py-2 border text-left text-blue-700">
                    <a href={`mailto:${adm.email_id}`} className="hover:underline">
                      {adm.email_id}
                    </a>
                  </td>

                  <td className="px-4 py-2 border text-left text-gray-700">
                    {adm.mobile_number}
                  </td>

                  <td className="px-4 py-2 border">{adm.class}</td>
                  <td className="px-4 py-2 border">{adm.gender}</td>

                  <td className="px-4 py-2 border">
                    <label
                      htmlFor={`status-${adm._id}`}
                      className="sr-only"
                    >
                      Change Status
                    </label>
                    <select
                      id={`status-${adm._id}`}
                      value={adm.status}
                      onChange={(e) =>
                        handleStatusChange(adm._id, e.target.value)
                      }
                      disabled={updatingId === adm._id}
                      className={`border rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-400 outline-none ${
                        adm.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : adm.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : adm.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Enrolled">Enrolled</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                    {updatingId === adm._id && (
                      <span className="ml-2 text-xs text-gray-500 animate-pulse">
                        Updating...
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-2 border font-semibold text-gray-700">
                    {adm.roll_number || "-"}
                  </td>

                  <td className="px-4 py-2 border text-gray-600 text-sm">
                    {new Date(adm.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
