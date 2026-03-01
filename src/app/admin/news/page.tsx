"use client";
import axiosInstance from "@/lib/axiosInstance";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { FaTrash, FaPlusCircle, FaNewspaper, FaEdit } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";


const modeColors: Record<string, string> = {
  general: "bg-gray-100 text-gray-700 border border-gray-300",
  faculty: "bg-blue-100 text-blue-700 border border-blue-300",
  class: "bg-green-100 text-green-700 border border-green-300",
  event: "bg-purple-100 text-purple-700 border border-purple-300",
  all_classes: "bg-orange-100 text-orange-700 border border-orange-300",
  student: "bg-teal-100 text-teal-700 border border-teal-300",
  website: "bg-pink-100 text-pink-700 border border-pink-300",
};

interface NewsItem {
  _id: string;
  title: string;
  description: string;
  creator_name: string;
  news_mode: string;
  created_by: string;
  class_id?: string | null;
  notice_created_on: string;
}

export default function AdminNewsPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    creator_name: "",
    created_by: "",
    news_mode: "general",
    class_id: "",
  });
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedMode, setSelectedMode] = useState<string | null>("all-news");

  const fetchNews = async () => {
    try {
      const res = await axiosInstance.get("/notice/NewsForFaculty");

      if (Array.isArray(res.data.data)) {
        setNewsList(res.data.data);
      } else if (Array.isArray(res.data.news)) {
        setNewsList(res.data.news);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch news");
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const validateForm = () => {
    if (!formData.title.trim()) return "Title is required";
    if (!formData.description.trim()) return "Description is required";
    if (!formData.creator_name.trim()) return "Creator name is required";
    if (!formData.created_by.trim()) return "Creator ID is required";
    return null;
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      toast.error(error);
      return;
    }

    setLoading(true);
    try {
      await axiosInstance.post("/notice/create-news", formData);
      toast.success("News created successfully!");
      setFormData({
        title: "",
        description: "",
        creator_name: "",
        created_by: "",
        news_mode: "general",
        class_id: "",
      });
      fetchNews();
    } catch (err) {
      toast.error( "Failed to create news");
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this news item?")) return;

    setDeletingId(id);
    try {
      const res = await axiosInstance.delete("/notice/delete-news", {
        data: { _id: id },
      });

      if (res.data?.DeleteStatus) {
        toast.success("News deleted successfully!");
        setNewsList((prev) => prev.filter((item) => item._id !== id));
      } else {
        toast.error("Failed to delete news");
      }
    } catch (err) {
      toast.error("Failed to delete");
    } finally {
      setDeletingId(null);
    }
  };

  return (


    <div className="min-h-screen bg-gray-100 py-10 px-4 flex flex-col items-center">
      <Link href="/" className="self-start text-blue-600 text-lg appearance-none">
        &larr; Back
      </Link>
      <div>
        <h2 className=" w-full max-w-3xl text-start font-bold flex justify-center items-center gap-2"><FaEdit />News Management</h2>
      </div>

      <div className="w-full max-w-3xl flex gap-6 border-b border-gray-300 mb-8 relative mt-40">
        {["all-news", "create-news"].map((mode) => (
          <button
            key={mode}
            onClick={() => setSelectedMode(mode)}
            className={`relative pb-2 text-sm font-medium transition-colors ${selectedMode === mode
              ? "text-blue-600 after:content-[''] after:absolute after:left-0 after:bottom-[-1px] after:w-full after:h-[2px] after:bg-blue-600"
              : "text-gray-600 hover:text-blue-500"
              }`}
          >
            {mode === "all-news" ? "All News" : "Create News"}
          </button>
        ))}
      </div>

      {/* ===== Create News Form ===== */}
      {selectedMode === "create-news" && <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8 border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <FaNewspaper className="text-blue-600 text-2xl" />
          <h2 className="text-2xl font-semibold text-gray-800">Create News</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter news title"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write something..."
              rows={4}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Creator Name
              </label>
              <input
                name="creator_name"
                value={formData.creator_name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Creator ID
              </label>
              <input
                name="created_by"
                value={formData.created_by}
                onChange={handleChange}
                placeholder="Enter creator ID"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              News Mode
            </label>
            <select
              name="news_mode"
              value={formData.news_mode}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="general">General</option>
              <option value="faculty">Faculty</option>
              <option value="all_classes">All Classes</option>
              <option value="website">Website</option>
              <option value="student">Student</option>
              <option value="event">Event</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white rounded-md py-2.5 font-medium hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? (
              <>
                <FiLoader className="animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <FaPlusCircle />
                Create News
              </>
            )}
          </button>
        </form>
      </div>}

      {/* ===== News List ===== */}
      {selectedMode === "all-news" && <div className="w-full max-w-3xl">
        <div className="flex items-center gap-2 mb-6">
          <FaNewspaper className="text-gray-600 text-2xl" />
          <h3 className="text-2xl font-semibold text-gray-800 mt-20">All News</h3>
        </div>

        <div className="space-y-5">
          {newsList.length === 0 && (
            <p className="text-gray-500 text-center text-sm py-6 bg-white border rounded-md shadow-sm">
              No news found.
            </p>
          )}

          {newsList.map((news) => (
            <div
              key={news._id}
              className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition flex items-start gap-4"
            >
              {/* Avatar Section */}
              <div className="flex-shrink-0">
                <FaUserCircle className="text-5xl text-gray-400" />
              </div>

              {/* News Info */}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-gray-900 text-lg">
                    {news.title}
                  </h4>
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${modeColors[news.news_mode] || "bg-gray-100 text-gray-700"
                      }`}
                  >
                    {news.news_mode.replace("_", " ")}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                  {news.description}
                </p>

                <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                  <span>By</span>
                  <span className="font-medium text-gray-700">
                    {news.creator_name}
                  </span>
                  <span>•</span>
                  <span>{new Date(news.notice_created_on).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => handleDelete(news._id)}
                disabled={deletingId === news._id}
                className="text-red-500 hover:text-red-600 transition flex items-center justify-center"
                title="Delete news"
              >
                {deletingId === news._id ? (
                  <FiLoader className="animate-spin text-sm" />
                ) : (
                  <FaTrash className="text-lg" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>}
    </div>

  );
}
