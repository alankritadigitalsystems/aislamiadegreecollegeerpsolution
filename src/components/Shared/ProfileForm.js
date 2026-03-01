"use client";

import React, { useState, useEffect, Fragment } from "react";
import moment from "moment";
import UploadDocuments from "./UploadDocuments";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const phoneRegExp = /^[6-9]\d{9}$/;

// Helper function to format userProfile into the local formData state structure
const getInitialFormData = (userProfile, initialFormData) => {
  const merged = { ...initialFormData, ...userProfile };
  
  // Format date_of_birth
  if (userProfile.date_of_birth)
    merged.date_of_birth = moment(userProfile.date_of_birth).format("YYYY-MM-DD");

  // Handle nested full_name
  merged.full_name = {
    ...initialFormData.full_name,
    ...(userProfile.full_name || {}),
  };

  return merged;
};

const ProfileForm = ({
  activeTab,
  setActiveTab,
  isStaffLogin,
  updateUserProfile,
  userProfile = {},
  updatingFaculty,
  isStudent,
}) => {
  // Define the initial structure for formData
  const initialFormDataState = {
    full_name: { first_name: "", last_name: "" },
    faculty_id: "",
    father_name: "",
    mother_name: "",
    spouse_name: "",
    date_of_birth: "",
    email_id: "",
    residential_address: "",
    aadhar_number: "",
    mobile_number: "",
    gender: "",
    profile_image: "",
  };

  const [formData, setFormData] = useState(initialFormDataState);
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (userProfile && Object.keys(userProfile).length > 0) {
      const mergedFormData = getInitialFormData(userProfile, initialFormDataState);
      setFormData(mergedFormData);
      if (userProfile.profile_image) setPreviewImage(userProfile.profile_image);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile]);

const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData(prev => {
    // nested key like full_name.first_name
    if (name.includes(".")) {
      const [obj, key] = name.split(".");
      return {
        ...prev,
        [obj]: {
          ...prev[obj],
          [key]: value
        }
      };
    }

    // normal field
    return { ...prev, [name]: value };
  });
};


  // ✅ Image upload
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreviewImage(URL.createObjectURL(file));
    setFormData((prev) => ({ ...prev, profile_image: file }));
  };

  // ✅ Manual validation
  const validate = () => {
    let err = {};

    // Validate only if isEditing is true, otherwise it can block view mode
    if (isEditing) {
        if (!formData.faculty_id) err.faculty_id = "College ID required";
        if (!formData.full_name.first_name) err["full_name.first_name"] = "First Name required";
        
        // Mobile number validation, handling empty string gracefully for non-required fields if needed, 
        // but given the required fields above, let's keep it strict for now.
        if (!formData.mobile_number || !phoneRegExp.test(formData.mobile_number)) err.mobile_number = "Enter valid 10-digit mobile";
        
        if (!formData.email_id) err.email_id = "Email required";
        if (!formData.date_of_birth) err.date_of_birth = "DOB required";
        if (!formData.gender) err.gender = "Gender required";
    }


    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // ✅ Submit profile update
  const handleSubmit = () => {
    if (!validate()) {
      toast.error("Fix validation errors!");
      return;
    }

    const send = new FormData();
    send.append("_id", userProfile._id);

    Object.keys(formData).forEach((key) => {
      if (key === "profile_image" && formData.profile_image instanceof File) {
        send.append("profile_image", formData.profile_image);
      } else {
        // Ensure that if it's the full_name object, it's stringified
        send.append(
          key,
          typeof formData[key] === "object" && key !== "profile_image"
            ? JSON.stringify(formData[key])
            : formData[key]
        );
      }
    });

    updateUserProfile(send, (msg, type) => {
      toast(msg, { type });
      setIsEditing(false);
    });
  };

const InputField = ({ label, name, type = "text", required }) => {
  const inputRef = React.useRef(null);

  // default value only at mounting (not controlling)
  const defaultValue = name.includes(".")
    ? name.split(".").reduce((acc, k) => acc?.[k], formData)
    : formData[name];

  const handleBlur = () => {
    const newVal = inputRef.current.value;

    setFormData(prev => {
      if (name.includes(".")) {
        const [obj, key] = name.split(".");
        return {
          ...prev,
          [obj]: { ...prev[obj], [key]: newVal }
        };
      }
      return { ...prev, [name]: newVal };
    });
  };

  return (
    <div className="w-full md:w-1/3 mb-5 px-2">
      <label className="font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <input
        disabled={!isEditing}
        name={name}
        type={type}
        defaultValue={defaultValue ?? ""}
        ref={inputRef}
        onBlur={handleBlur} // ✅ update only when user leaves field
        className={`w-full border rounded-lg px-4 py-2 mt-1 ${
          !isEditing ? "bg-gray-200" : ""
        }`}
      />

      {errors[name] && <p className="text-sm text-red-500">{errors[name]}</p>}
    </div>
  );
};


  // ✅ Cancel handler fix
  const handleCancel = () => {
    // Re-apply the initial formatting logic to the userProfile prop
    const mergedFormData = getInitialFormData(userProfile, initialFormDataState);
    
    setFormData(mergedFormData);
    setIsEditing(false);
    setErrors({}); // Clear any validation errors
    if (userProfile.profile_image) {
        setPreviewImage(userProfile.profile_image);
    } else {
        // Clear any new image preview if user cancels
        setPreviewImage("");
    }
  };


  return (
    <Fragment>
      {/* -------- TAB CONTENT ---------- */}
      {activeTab === 1 && (
        <div className="bg-white p-8 shadow-md rounded-md border">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">
            {isStudent ? "Student" : "Faculty"} Profile
          </h2>

          {/* Profile photo */}
          <div className="mb-6 flex gap-4 items-center">
            <img
              src={previewImage || "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"}
              alt="Profile"
              className="w-32 h-32 rounded-full border object-cover shadow"
            />
            {isEditing && (
              <label className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
                Upload
                <input type="file" className="hidden" onChange={handleImageChange} />
              </label>
            )}
          </div>

          <div className="flex flex-wrap">
            <InputField label="College ID" name="faculty_id" required />
            <InputField label="Mobile Number" name="mobile_number" required />
            <InputField label="Email" name="email_id" required />
            <InputField label="First Name" name="full_name.first_name" required />
            <InputField label="Last Name" name="full_name.last_name" />
            <InputField label="DOB" name="date_of_birth" type="date" required />
            <InputField label="Father Name" name="father_name" />
            <InputField label="Mother Name" name="mother_name" />
          </div>

          {/* Gender */}
          <div className="w-full md:w-1/3 mb-5 px-2">
            <label className="font-medium">Gender <span className="text-red-400">*</span></label>
            <select
              disabled={!isEditing}
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 mt-1 disabled:bg-gray-200"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <p className="text-sm text-red-500">{errors.gender}</p>}
          </div>

          {/* Address */}
          <div className="w-full px-2 mb-5">
            <label className="font-medium">Residential Address</label>
            <textarea
              disabled={!isEditing}
              name="residential_address"
              value={formData.residential_address || ""}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 mt-1 disabled:bg-gray-200"
            />
          </div>

          <InputField label="Aadhar Number" name="aadhar_number" required/>

          {/* Buttons */}
          <div className="mt-6 flex justify-center gap-4">
            {!isEditing ? (
              <button onClick={() => setIsEditing(true)} className="bg-blue-600 text-white px-6 py-2 rounded">
                Edit Profile
              </button>
            ) : (
              <>
                <button onClick={handleSubmit} disabled={updatingFaculty} className="bg-green-600 text-white px-6 py-2 rounded">
                  {updatingFaculty ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={handleCancel} 
                  className="bg-gray-500 text-white px-6 py-2 rounded"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {!isStudent && activeTab === 2 && <UploadDocuments />}

      <ToastContainer />
    </Fragment>
  );
};

export default ProfileForm;