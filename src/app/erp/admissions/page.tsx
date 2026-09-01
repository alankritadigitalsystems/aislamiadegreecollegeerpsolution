"use client";

import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axiosInstance.js";
import { PiStudentFill, PiUserPlusBold, PiPaperPlaneTiltBold, PiEnvelopeSimpleBold, PiXBold } from "react-icons/pi";
import Link from "next/link";
import { toast } from "sonner";

interface Admission {
  _id: string;
  enrol_no?: string;
  full_name: { first_name: string; last_name?: string };
  email_id?: string;
  mobile_number?: string;
  class: string;
  gender: string;
  status: string;
  roll_number?: string;
  aadhar_number?: string;
  createdAt: string;
}

export default function AdmissionsPage() {
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Email Assignment Modal state
  const [selectedStudent, setSelectedStudent] = useState<Admission | null>(null);
  const [modalEmail, setModalEmail] = useState("");
  const [sendingCreds, setSendingCreds] = useState(false);

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
      toast.success(`Status updated to ${status}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status. Try again.");
    } finally {
      setUpdatingId(null);
    }
  };

  const openEmailModal = (adm: Admission) => {
    setSelectedStudent(adm);
    setModalEmail(adm.email_id || "");
  };

  const handleSendCredentials = async () => {
    if (!selectedStudent || !modalEmail.trim()) {
      toast.error("Please enter a valid student email");
      return;
    }

    try {
      setSendingCreds(true);
      const res = await axiosInstance.post("/admission/send-credentials", {
        student_id: selectedStudent._id,
        email: modalEmail.trim(),
      });

      if (res.data.success) {
        toast.success(res.data.message || "Credentials sent successfully!");
        setAdmissions((prev) =>
          prev.map((a) =>
            a._id === selectedStudent._id ? { ...a, email_id: modalEmail.trim() } : a
          )
        );
        setSelectedStudent(null);
      } else {
        toast.error(res.data.message || "Failed to send credentials");
      }
    } catch (err: unknown) {
      const errorObj = err as { response?: { data?: { message?: string } } };
      console.error(err);
      toast.error(errorObj?.response?.data?.message || "Error sending credentials");
    } finally {
      setSendingCreds(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-gray-600 animate-pulse font-medium">
        Loading admissions...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-600 font-medium">
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
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Header & Action Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <div>
          <Link
           href="/erp"
            className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-medium text-xs mb-2"
          >
            ← Back
          </Link>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <PiStudentFill className="text-blue-600" /> Student Admissions & Enrolments
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Total Students: <span className="font-semibold text-gray-800">{admissions.length}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/erp/admissions/add-student"
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-sm hover:shadow transition"
          >
            <PiUserPlusBold size={18} /> Add Student / Excel Import
          </Link>
        </div>
      </div>

      {/* Admissions Table */}
      <div className="overflow-x-auto rounded-xl shadow-sm border border-gray-200 bg-white">
        <table
          className="min-w-full border-collapse text-xs text-left"
          aria-label="Admissions Table"
        >
          <thead className="bg-slate-100 text-slate-700 uppercase font-semibold tracking-wider">
            <tr>
              <th className="px-3 py-3 border-b">#</th>
              <th className="px-3 py-3 border-b">Enrol No</th>
              <th className="px-3 py-3 border-b">Roll No.</th>
              <th className="px-3 py-3 border-b">Name</th>
              <th className="px-3 py-3 border-b">Class</th>
              <th className="px-3 py-3 border-b">Mobile</th>
              <th className="px-3 py-3 border-b min-w-[200px]">Portal Email & Login</th>
              <th className="px-3 py-3 border-b text-center">Status</th>
              <th className="px-3 py-3 border-b">Date</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {admissions.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="text-center py-10 text-gray-500 italic text-sm"
                >
                  No student admission records found. Use the &quot;Add Student&quot; button above to add manually or import Excel sheets.
                </td>
              </tr>
            ) : (
              admissions.map((adm, idx) => (
                <tr
                  key={adm._id}
                  className={`hover:bg-blue-50/40 transition ${
                    idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                  }`}
                >
                  <td className="px-3 py-2.5 text-gray-500 font-medium">
                    {idx + 1}
                  </td>

                  <td className="px-3 py-2.5 font-semibold text-blue-900">
                    {adm.enrol_no || "-"}
                  </td>

                  <td className="px-3 py-2.5 font-medium text-gray-700">
                    {adm.roll_number || "-"}
                  </td>

                  <td className="px-3 py-2.5 text-gray-900 font-semibold">
                    {adm.full_name.first_name} {adm.full_name.last_name || ""}
                  </td>

                  <td className="px-3 py-2.5 font-medium text-gray-700">{adm.class || "-"}</td>

                  <td className="px-3 py-2.5 text-gray-600">
                    {adm.mobile_number || "-"}
                  </td>

                  {/* Email & Credentials Action */}
                  <td className="px-3 py-2.5">
                    {adm.email_id ? (
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-blue-700 font-medium truncate max-w-[150px]" title={adm.email_id}>
                          {adm.email_id}
                        </span>
                        <button
                          onClick={() => openEmailModal(adm)}
                          className="px-2 py-1 text-[11px] rounded bg-slate-100 hover:bg-blue-100 text-blue-700 font-medium transition"
                          title="Resend or update password"
                        >
                          Resend
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => openEmailModal(adm)}
                        className="flex items-center gap-1 px-2.5 py-1 text-[11px] rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 font-semibold transition"
                      >
                        <PiEnvelopeSimpleBold size={13} /> Assign Email & Send Login
                      </button>
                    )}
                  </td>

                  {/* Status Dropdown */}
                  <td className="px-3 py-2.5 text-center">
                    <select
                      id={`status-${adm._id}`}
                      value={adm.status || "Pending"}
                      onChange={(e) =>
                        handleStatusChange(adm._id, e.target.value)
                      }
                      disabled={updatingId === adm._id}
                      className={`border rounded-lg px-2 py-1 text-xs font-medium focus:ring-2 focus:ring-blue-400 outline-none transition ${
                        adm.status === "Approved" || adm.status === "Enrolled"
                          ? "bg-green-100 text-green-800 border-green-300"
                          : adm.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800 border-yellow-300"
                          : adm.status === "Rejected"
                          ? "bg-red-100 text-red-800 border-red-300"
                          : "bg-blue-100 text-blue-800 border-blue-300"
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Enrolled">Enrolled</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>

                  <td className="px-3 py-2.5 text-gray-500 text-[11px]">
                    {new Date(adm.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Email & Credentials Dispatch Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <PiPaperPlaneTiltBold className="text-blue-600" /> Send Login Credentials
              </h3>
              <button
                onClick={() => setSelectedStudent(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded"
              >
                <PiXBold size={18} />
              </button>
            </div>

            <div className="my-4 space-y-3 text-sm">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
                <p><strong>Student:</strong> {selectedStudent.full_name?.first_name} {selectedStudent.full_name?.last_name || ""}</p>
                <p><strong>Class:</strong> {selectedStudent.class || "N/A"}</p>
                <p><strong>Enrol No:</strong> {selectedStudent.enrol_no || "N/A"}</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Student Email ID
                </label>
                <input
                  type="email"
                  value={modalEmail}
                  onChange={(e) => setModalEmail(e.target.value)}
                  placeholder="e.g. student@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  autoFocus
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  A random 8-character password will be securely created, hashed in the database, and emailed to this student.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-4 py-2 text-sm text-slate-600 hover:text-slate-800 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleSendCredentials}
                disabled={sendingCreds}
                className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow transition disabled:opacity-50"
              >
                {sendingCreds ? "Generating & Sending..." : "Send Credentials"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
