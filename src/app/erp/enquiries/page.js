"use client";
import { useState, useEffect } from "react";
import axiosInstance from "../../../lib/axiosInstance.js";
import { IoAddOutline } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { LiaClipboardListSolid } from "react-icons/lia";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function EnquiriesPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    courseInterested: "",
    enquirie: "",
  });

  const [errors, setErrors] = useState({});
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(false);
  const router = useRouter();

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Full name is required";

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[\w-.]+@[\w-]+\.[a-z]{2,7}$/i.test(form.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(form.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }

    if (!form.courseInterested.trim()) {
      newErrors.courseInterested = "Course name is required";
    }

    if (!form.enquirie.trim()) {
      newErrors.enquirie = "Enquiry is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const role = Cookies.get("userRole");
    if (role === "student") {
      setSelectedStudent(true);
    }
  }, [router]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/enquiries");
      const data = Array.isArray(res.data)
        ? res.data
        : res.data.enquiries || [];
      setEnquiries(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load enquiries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await axiosInstance.post("/enquiries", form);
      const createdEnquiry = res.data?.enquiry || res.data;

      if (selectedStudent && createdEnquiry?._id) {
        try {
          const senderId = Cookies.get("userId");
          const message = `New enquiry received from ${form.name} regarding ${form.courseInterested}.`;

          await axiosInstance.post("/notifications", {
            enquiryId: createdEnquiry._id,
            senderId,
            message,
          });

          console.log("✅ Notification sent successfully");
        } catch (notifyErr) {
          console.error("❌ Failed to send notification:", notifyErr);
        }
      }

      setForm({
        name: "",
        email: "",
        phone: "",
        courseInterested: "",
        enquirie: "",
      });
      setErrors({});
      fetchData();
    } catch (err) {
      console.error("Error submitting enquiry:", err);
      alert("Failed to submit enquiry");
    }
  };

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-8">
      <div className="absolute top-6 left-6">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back
        </button>
      </div>

      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <header className="text-center mb-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-1">
            🎓 Enquiry Management
          </h1>
          <p className="text-gray-600">
            Manage and track student course enquiries efficiently.
          </p>
        </header>

        {/* New Form */}
        <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-100">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
            <span className="text-blue-600 mr-2">
              <LiaClipboardListSolid />
            </span>
            New Enquiry
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6"
          >
            {/* Name */}
            <div className="flex flex-col gap-1">
              <label className="text-gray-700 font-medium">Full Name</label>
              <input
                type="text"
                placeholder="Enter full name"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className={`border rounded-lg px-4 py-2 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="text-gray-700 font-medium">Email Address</label>
              <input
                type="email"
                placeholder="Enter email address"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={`border rounded-lg px-4 py-2 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1">
              <label className="text-gray-700 font-medium">Phone Number</label>
              <input
                type="tel"
                placeholder="Enter 10-digit phone number"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className={`border rounded-lg px-4 py-2 ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone}</p>
              )}
            </div>

            {/* Course */}
            <div className="flex flex-col gap-1">
              <label className="text-gray-700 font-medium">
                Course Interested
              </label>
              <input
                type="text"
                placeholder="Enter course name"
                value={form.courseInterested}
                onChange={(e) =>
                  handleChange("courseInterested", e.target.value)
                }
                className={`border rounded-lg px-4 py-2 ${
                  errors.courseInterested ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.courseInterested && (
                <p className="text-sm text-red-500">
                  {errors.courseInterested}
                </p>
              )}
            </div>

            {/* Enquiry */}
            <div className="flex flex-col gap-1 sm:col-span-2">
              <label className="text-gray-700 font-medium">
                Mention in details your Enquiry
              </label>
              <input
                type="text"
                placeholder="Mention in details your Enquiry"
                value={form.enquirie}
                onChange={(e) => handleChange("enquirie", e.target.value)}
                className={`border rounded-lg px-4 py-2 ${
                  errors.enquirie ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.enquirie && (
                <p className="text-sm text-red-500">{errors.enquirie}</p>
              )}
            </div>

            <div className="sm:col-span-2 flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 flex items-center gap-2 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 active:scale-[0.98] transition"
              >
                <IoAddOutline /> Add Enquiry
              </button>
            </div>
          </form>
        </div>

        {/* Enquiries List */}
        <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-100">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
            <span className="text-blue-600 mr-2">
              <FaPhoneAlt />
            </span>
            {selectedStudent ? "Your Enquiries" : "All Enquiries"}
          </h3>

          {loading ? (
            <p className="text-gray-500 text-center py-6">Loading enquiries...</p>
          ) : error ? (
            <p className="text-red-500 text-center py-6">{error}</p>
          ) : Array.isArray(enquiries) && enquiries.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden mt-6">
                <thead className="bg-blue-600 text-white text-sm">
                  <tr>
                    <th className="text-left px-4 py-3">Name</th>
                    <th className="text-left px-4 py-3">Email</th>
                    <th className="text-left px-4 py-3">Phone</th>
                    <th className="text-left px-4 py-3">Course</th>
                    <th className="text-left px-4 py-3">Status</th>
                    <th className="text-center px-4 py-3" hidden={selectedStudent}>Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {enquiries.map((e) => (
                    <tr
                      key={e._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3">{e.name}</td>
                      <td className="px-4 py-3">{e.email}</td>
                      <td className="px-4 py-3">{e.phone}</td>
                      <td className="px-4 py-3">{e.courseInterested}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            e.status === "converted"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {e.status || "pending"}
                        </span>
                      </td>
                      <td className="text-center px-4 py-3" hidden={selectedStudent}>
                        {e.status !== "converted" && (
                          <button
                            disabled={selectedStudent}
                            className="bg-green-500 disabled:bg-gray-400 text-white px-3 py-1.5 rounded hover:bg-green-600 transition"
                            onClick={async () => {
                              await axiosInstance.patch(`/enquiries/${e._id}`, {
                                status: "converted",
                              });
                              fetchData();
                            }}
                          >
                            Mark as Converted
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-6">
              No enquiries found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
