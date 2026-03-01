"use client";
import React, { useState } from "react";
import Link from "next/link";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
   
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
   
  });

  // Simple email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = () => {
    let valid = true;
    let newErrors = { name: "", email: "", password: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (validate()) {
    try {
      const res = await axiosInstance.post("/student/signup", formData);

      if (res.status === 201 || res.status === 200) {
        alert("✅ Account created successfully!");
        router.push("/login"); 
      } else {
        alert(`❌ ${res.data.message || "Something went wrong"}`);
      }
    } catch (err) {
      console.error(err);
      alert(
        `⚠️ ${
          err.response?.data?.message || "Something went wrong, please try again."
        }`
      );
    }
  }
};



  return (
    <div className="auth option2 flex justify-center items-center min-h-screen bg-gray-50">
      <div className="auth_left w-full max-w-md">
        <div className="card shadow-lg rounded-lg border border-gray-200">
          <div className="card-body p-6">
            <div className="text-center mb-4">
              <Link className="header-brand inline-block mb-2" href="/">
                <i className="fa fa-graduation-cap brand-logo text-3xl text-blue-600"></i>
              </Link>
              <h2 className="card-title text-xl font-semibold">
                Create new account
              </h2>
              {/* <div className="flex justify-center gap-2 mt-3">
                <button type="button" className="btn btn-facebook bg-blue-600 text-white px-3 py-2 rounded">
                  <i className="fa fa-facebook mr-2"></i>Facebook
                </button>
                <button type="button" className="btn btn-google bg-red-500 text-white px-3 py-2 rounded">
                  <i className="fa fa-google mr-2"></i>Google
                </button>
              </div> */}
              {/* <h6 className="mt-3 text-gray-500">Or</h6> */}
            </div>

            <form onSubmit={handleSubmit}>     
              {/* Name */}
              <div className="form-group mb-3">
                <label className="form-label block mb-1 font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`form-control w-full border rounded p-2 ${errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                  placeholder="Enter name"
                />
                {errors.name && (
                  <small className="text-red-500">{errors.name}</small>
                )}
              </div>

              {/* Email */}
              <div className="form-group mb-3">
                <label className="form-label block mb-1 font-medium">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-control w-full border rounded p-2 ${errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  placeholder="Enter email"
                />
                {errors.email && (
                  <small className="text-red-500">{errors.email}</small>
                )}
              </div>

              {/* Password */}
              <div className="form-group mb-3">
                <label className="form-label block mb-1 font-medium">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`form-control w-full border rounded p-2 ${errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                  placeholder="Enter password"
                />
                {errors.password && (
                  <small className="text-red-500">{errors.password}</small>
                )}
              </div>

              {/* Checkbox */}
              <div className="form-group mb-4 flex items-center gap-2">
                {/* <input
                  type="checkbox"
                  name="agree"
                  checked={formData.agree}
                  onChange={handleChange}
                  className="custom-control-input"
                /> */}
                {/* <span className="custom-control-label text-sm text-gray-600">
                  I agree to the{" "}
                  <Link href="/" className="text-blue-600 hover:underline">
                    terms and policy
                  </Link>
                </span> */}
              </div>
              {/* {errors.agree && (
                <small className="text-red-500 block mb-2">{errors.agree}</small>
              )} */}

              {/* Submit */}
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-primary btn-block bg-blue-600 text-white py-2 px-4 rounded w-full hover:bg-blue-700"
                >
                  Create new account
                </button>
                <div className="text-muted mt-4 text-sm">
                  Already have an account?{" "}
                  <Link href="/login" className="text-blue-600 hover:underline">
                    Sign in
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
