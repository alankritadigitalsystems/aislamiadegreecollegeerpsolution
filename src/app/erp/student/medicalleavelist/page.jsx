"use client";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "react-toastify";

export default function MedicalLeaveList() {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const res = await axiosInstance.get(
        "/attendance/student?action=medical-list"
      );

      const raw = res.data.requests || [];

      const grouped = [];

      raw.forEach((item) => {
        const existing = grouped.find(
          (g) => g.student_id._id === item.student_id._id
        );

        if (existing) {
          existing.dates.push(item.date);
          existing.records.push(item);
        } else {
          grouped.push({
            student_id: item.student_id,
            class_name: item.class_name,
            dates: [item.date],
            records: [item],
          });
        }
      });

    
      const formatted = grouped.map((g) => {
        const sorted = g.dates.sort((a, b) => new Date(a) - new Date(b));
        return {
          ...g,
          from_date: sorted[0],
          to_date: sorted[sorted.length - 1],
          slip_name: g.records[0]?.slip_name,
          slip_file: g.records[0]?._id,
        };
      });

      setRequests(formatted);
    } catch (error) {
      toast.error("Failed to load medical leave requests");
    }
  };


  const approveRequest = async (req) => {
    try {
      await axiosInstance.patch("/attendance/student?action=approve-medical", {
        student_id: req.student_id._id,
        startDate: req.from_date,
        endDate: req.to_date,
      });

      toast.success("Medical leave approved!");
      fetchRequests();
    } catch (error) {
      toast.error("Failed to approve request");
    }
  };


  const downloadSlip = async (recordId) => {
    try {
      const res = await axiosInstance.get(`/attendance/slip?id=${recordId}`, {
        responseType: "blob",
      });

      const url = URL.createObjectURL(res.data);
      window.open(url, "_blank");
    } catch (error) {
      toast.error("Unable to open slip");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="p-6 bg-white shadow rounded-xl">
      <button
        onClick={() => window.history.back()}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
      >
        ← Back
      </button>{" "}
      <h2 className="text-xl font-semibold mb-4">Medical Leave Requests</h2>
      {requests.length === 0 ? (
        <p className="text-gray-600">No pending requests</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border">Student</th>
              <th className="p-3 border">Class</th>
              <th className="p-3 border">Date Range</th>
              <th className="p-3 border">Slip</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((req) => (
              <tr key={req.student_id._id} className="border">
                <td className="p-3 border">
                  {req.student_id.full_name.first_name}{" "}
                  {req.student_id.full_name.last_name}
                </td>

                <td className="p-3 border">{req.class_name}</td>

                <td className="p-3 border">
                  {new Date(req.from_date).toLocaleDateString("en-GB")} →{" "}
                  {new Date(req.to_date).toLocaleDateString("en-GB")}
                </td>

                <td className="p-3 border">
                  {req.slip_file ? (
                    <button
                      onClick={() => downloadSlip(req.records[0]._id)}
                      className="text-blue-600 underline"
                    >
                      View Slip
                    </button>
                  ) : (
                    "No File"
                  )}
                </td>

                <td className="p-3 border">
                  <button
                    onClick={() => approveRequest(req)}
                    className="px-4 py-2 bg-green-600 text-white rounded"
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
