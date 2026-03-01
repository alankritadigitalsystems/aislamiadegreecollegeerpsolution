"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { GrScorecard } from "react-icons/gr";
import  Cookies from "js-cookie"
export default function NewsManagement() {
  const newsModes = [
    "student",
    "faculty",
    "all_classes",
    "website",
    "event",
    "general",
  ];

  
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    creator_name: "",
    news_mode: "",
    class_id: "",
    created_by: "" 
  });


  const fetchNews = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/notice/NewsForFaculty");
      
    } catch (err) {
      console.error("Error fetching news:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
    const payload = {
      ...form,
      created_by: Cookies.get("userId")
    };

    const res = await axiosInstance.post("/notice/create-news", payload);

    alert("News added successfully!");
    fetchNews();

    setForm({
      title: "",
      description: "",
      creator_name: "",
      news_mode: "",
      class_id: "",
      created_by: ""
    });

  } catch (err) {
    console.error("Error adding news:", err);
    alert("Failed to add news.");
  }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4 md:px-10">

      {/* Back Button */}
      <div className="absolute top-6 left-6">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back
        </button>
      </div>

      <div className="max-w-6xl mx-auto py-6">
        {/* Page Header */}
        <h1 className="ml-4 text-2xl font-bold text-gray-800 mb-8 pb-3 flex gap-2 items-center">
          <GrScorecard />
          <span>News Management</span>
        </h1>

        {/* Add News Form */}
        <div className="bg-white shadow-md rounded-2xl p-8 mb-10">
          <h2 className="text-xl font-semibold text-gray-700 mb-6 border-b pb-4">
            Add News
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Form Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Title */}
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  placeholder="Enter News Title"
                  value={form.title}
                  onChange={(e) =>
                    setForm({ ...form, title: e.target.value })
                  }
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input
                  placeholder="Enter description"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Creator Name */}
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Creator Name
                </label>
                <input
                  placeholder="Enter creator name"
                  value={form.creator_name}
                  onChange={(e) =>
                    setForm({ ...form, creator_name: e.target.value })
                  }
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* News Mode */}
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  News Mode
                </label>
                <select
                  value={form.news_mode}
                  onChange={(e) =>
                    setForm({ ...form, news_mode: e.target.value })
                  }
                  className={`w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                    form.news_mode === "" ? "text-gray-400" : "text-gray-700"
                  }`}
                >
                  <option value="" disabled hidden>
                    Select News Mode
                  </option>
                  {newsModes.map((mode) => (
                    <option key={mode} value={mode}>
                      {mode}
                    </option>
                  ))}
                </select>
              </div>

              {/* Class ID */}
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Class ID
                </label>
                <input
                  placeholder="Enter class id"
                  value={form.class_id}
                  onChange={(e) =>
                    setForm({ ...form, class_id: e.target.value })
                  }
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium"
              >
                Submit News
              </button>
            </div>
          </form>
        </div>

        {/* News List (optional if you want to show below form) */}
        {/* To be added later if needed */}
      </div>
    </div>
  );
}
