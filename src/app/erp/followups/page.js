"use client";

import { useState, useEffect } from "react";
import axiosInstance from "../../../lib/axiosInstance.js";
import {
  FaPlus,
  FaClipboardList,
  FaCalendarAlt,
  FaStickyNote,
  FaExclamationCircle,
} from "react-icons/fa";
import { toast } from "sonner";

export default function FollowUpsPage() {
  const [followups, setFollowups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [newFollowup, setNewFollowup] = useState({
    enquiryId: "",
    followUpDate: "",
    note: "",
  });

  const [errors, setErrors] = useState({});

  // Fetch followups
  const fetchFollowups = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/followups");
      setFollowups(res.data);
    } catch (error) {
      toast.error("Failed to load follow-ups." , error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFollowups();
  }, []);

  const validateForm = () => {
    let temp = {};
    if (!newFollowup.enquiryId) temp.enquiryId = "Enquiry ID is required";
    if (!newFollowup.followUpDate) temp.followUpDate = "Please select a date";
    if (
      newFollowup.followUpDate &&
      new Date(newFollowup.followUpDate) < new Date().setHours(0, 0, 0, 0)
    ) {
      temp.followUpDate = "Date cannot be in the past";
    }

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setSubmitLoading(true);
      await axiosInstance.post("/followups", newFollowup);
      toast.success("Follow-up added!");
      setNewFollowup({ enquiryId: "", followUpDate: "", note: "" });
      setErrors({});
      fetchFollowups();
    } catch (error) {
      toast.error("Failed to add follow-up.");
      console.log(error)
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <div className="absolute top-6 left-6">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back
        </button>
      </div>

      {/* ADD FOLLOWUP CARD */}
      <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-lg">
        <div className="flex items-center gap-2 mb-5 justify-center">
          <FaPlus className="text-blue-600 text-2xl" />
          <h2 className="text-xl font-bold text-blue-600">Add Follow-Up</h2>
        </div>

        <form onSubmit={handleAdd} className="space-y-4">

          {/* Enquiry ID */}
          <div>
            <label className="font-medium flex items-center gap-1">
              Enquiry ID
            </label>
            <input
              placeholder="Enter Enquiry ID"
              value={newFollowup.enquiryId}
              onChange={(e) =>
                setNewFollowup({ ...newFollowup, enquiryId: e.target.value })
              }
              className={`w-full border p-2 rounded-md ${
                errors.enquiryId ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.enquiryId && (
              <p className="text-red-600 text-sm flex items-center gap-1 mt-1">
                <FaExclamationCircle /> {errors.enquiryId}
              </p>
            )}
          </div>

          {/* Date */}
          <div>
            <label className="font-medium flex items-center gap-1">
              <FaCalendarAlt /> Follow-Up Date
            </label>
            <input
              type="date"
              value={newFollowup.followUpDate}
              onChange={(e) =>
                setNewFollowup({ ...newFollowup, followUpDate: e.target.value })
              }
              className={`w-full border p-2 rounded-md ${
                errors.followUpDate ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.followUpDate && (
              <p className="text-red-600 text-sm flex items-center gap-1 mt-1">
                <FaExclamationCircle /> {errors.followUpDate}
              </p>
            )}
          </div>

          {/* Note */}
          <div>
            <label className="font-medium flex items-center gap-1">
              <FaStickyNote /> Note
            </label>
            <textarea
              value={newFollowup.note}
              onChange={(e) =>
                setNewFollowup({ ...newFollowup, note: e.target.value })
              }
              placeholder="Add notes (optional)"
              rows={2}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>

          <button
            type="submit"
            disabled={submitLoading}
            className={`w-full flex justify-center items-center gap-2 py-2 font-medium rounded-md text-white ${
              submitLoading
                ? "bg-gray-400"
                : "bg-blue-600 hover:bg-blue-700 transition"
            }`}
          >
            {submitLoading ? "Saving..." : "Add Follow-Up"}
          </button>
        </form>
      </div>

      {/* FOLLOWUP LIST */}
      <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-3xl mt-10">
        <div className="flex items-center gap-2 mb-3">
          <FaClipboardList className="text-gray-700 text-xl" />
          <h3 className="text-lg font-semibold">Upcoming Follow-Ups</h3>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : followups.length === 0 ? (
          <div className="text-center py-6 text-gray-500 flex flex-col items-center gap-2">
            <FaClipboardList className="text-3xl" />
            No follow-ups yet
          </div>
        ) : (
          <ul className="divide-y">
            {followups.map((f) => {
              const isPast =
                new Date(f.followUpDate) <
                new Date().setHours(0, 0, 0, 0);

              return (
                <li key={f._id} className="py-3 flex flex-col sm:flex-row sm:justify-between gap-2">
                  <span className="font-medium text-gray-800">
                    {f.enquiryId?.name || f.enquiryId}
                  </span>

                  <span
                    className={`px-2 py-1 text-sm rounded-md ${
                      isPast ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                    }`}
                  >
                    {new Date(f.followUpDate).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>

                  <span className="italic text-gray-600 text-sm">{f.note}</span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
