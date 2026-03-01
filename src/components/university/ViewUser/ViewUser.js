"use client";

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import ProfileForm from "../../Shared/ProfileForm";

const ViewUser = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingFaculty, setUpdatingFaculty] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = Cookies.get("userId");
        if (!userId) throw new Error("No userId in cookies");

        const res = await fetch(`/api/v2/faculty/FacultyByID?_id=${userId}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch");

        const normalized = {
          ...data,
          full_name: {
            first_name: data?.full_name?.first_name || "",
            last_name: data?.full_name?.last_name || ""
          },
          email_id: data?.email_id || "",
          mobile_number: data?.mobile_number || "",
          profile_image: data?.profile_image || "",
          date_of_birth: data?.date_of_birth?.split("T")[0] || "",
          role: data?.role || ""
        };

        setUserProfile(normalized);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ✅ Handles profile updates with FormData
const handleUpdateProfile = async (formData, callback) => {
  try {
    setUpdatingFaculty(true);

    const res = await fetch("/api/v2/faculty/FacultyByID", {
      method: "PATCH",
      body: formData,
    });

    let data;
    try {
      data = await res.json();
    } catch {
      data = null;
    }

    if (res.ok && data?.UpdateStatus) {
      setUserProfile(data.data);

      callback?.(
        data.message || "Profile updated successfully",
        "success"
      );
    } else {
      callback?.(
        data?.message || "Update failed",
        "error"
      );
    }
  } catch (error) {
    console.error("Update error:", error);
    callback?.("Something went wrong", "error");
  } finally {
    setUpdatingFaculty(false);
  }
};


  if (loading) return (
    <div className="text-center py-10 text-gray-600 text-lg animate-pulse">
      Loading profile...
    </div>
  );

  if (!userProfile) return (
    <div className="text-center py-10 text-gray-600 text-lg">
      No profile data found.
    </div>
  );

  const isStudent = userProfile.role === "student";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6 md:p-10">

      <button
        onClick={() => window.history.back()}
        className="mb-6 flex items-center text-blue-600 hover:text-blue-800 font-medium"
      >
        ← Back
      </button>

      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow-lg rounded-xl p-6 md:p-8 border mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-1">
            👤 View {isStudent ? "Student" : "Faculty"} Profile
          </h1>
          <p className="text-gray-600 mb-3">Manage and update your profile details.</p>

          <div className="text-sm text-gray-500">
            <button onClick={() => window.history.back()} className="text-blue-600 hover:underline">
              Amiruddaula Islamia Degree College
            </button>{" "}
            / View User Profile
          </div>

          {/* ✅ Tabs */}
          <div className="flex gap-4 mt-6 border-b">
            <button
              className={
                `px-4 py-2 font-medium transition-all ${
                  activeTab === 1
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600 hover:text-blue-600"
                }`
              }
              onClick={() => setActiveTab(1)}
            >
              Information
            </button>

            {!isStudent && (
              <button
                className={
                  `px-4 py-2 font-medium transition-all ${
                    activeTab === 2
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                  }`
                }
                onClick={() => setActiveTab(2)}
              >
                Upload Documents
              </button>
            )}
          </div>
        </div>

        <ProfileForm
          isStaffLogin={true}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          updateUserProfile={handleUpdateProfile}
          userProfile={userProfile}
          updatingFaculty={updatingFaculty}
          isStudent={isStudent}
          isFaculty={!isStudent}
        />
      </div>
    </div>
  );
};

export default ViewUser;
