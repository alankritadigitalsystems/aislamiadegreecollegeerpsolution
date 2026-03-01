"use client";
import axiosInstance from "@/lib/axiosInstance";
import { useState } from "react";
import { Plus, X  } from "lucide-react"; 

export default function InviteTeachersPage() {
  const [emails, setEmails] = useState([""]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddEmail = () => setEmails([...emails, ""]);
  const handleRemoveEmail = (index: number) => {
    const newEmails = emails.filter((_, i) => i !== index);
    setEmails(newEmails.length > 0 ? newEmails : [""]);
  };
  const handleEmailChange = (index: number, value: string) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("Sending invites...");

    try {
      const filtered = emails.map((e) => e.trim()).filter(Boolean);
      const res = await axiosInstance.post("/admin/invite-teachers", {
        emails: filtered,
      });
      setStatus(res.data.message || "Invites sent successfully!");
      setEmails([""]);
    } catch (error) {
      console.error(error);
      setStatus( "Error sending invites");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 p-4">
      <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back
        </button>
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
          📧 Invite Teachers
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Add teacher emails below. Each will get a unique signup link.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="space-y-3">
            {emails.map((email, index) => (
              <div
                key={index}
                className="flex items-center gap-2 border border-gray-300 rounded-lg p-2 focus-within:ring-2 focus-within:ring-blue-500 transition"
              >
                <input
                  type="email"
                  placeholder={`Teacher email #${index + 1}`}
                  className="flex-1 outline-none text-gray-700 placeholder-gray-400"
                  value={email}
                  onChange={(e) => handleEmailChange(index, e.target.value)}
                  required
                />
                {emails.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveEmail(index)}
                    className="text-gray-400 hover:text-red-500 transition"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddEmail}
              className="flex items-center justify-center gap-2 w-full border border-dashed border-blue-400 text-blue-600 hover:bg-blue-50 rounded-lg py-2 transition"
            >
              <Plus size={18} />
              Add Another
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-6 py-3 rounded-lg text-white font-medium transition-all ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg"
            }`}
          >
            {loading ? "Sending..." : "Send Invitations"}
          </button>
        </form>

        {status && (
          <div
            className={`mt-5 text-center text-sm font-medium ${
              status.includes("Error") ? "text-red-600" : "text-green-600"
            }`}
          >
            {status}
          </div>
        )}
      </div>
    </div>
  );
}
