"use client";
import { useState } from "react";
import axiosInstance from "@/lib/axiosInstance";

type AdmissionForm = {
  full_name: { first_name: string; middle_name: string; last_name: string };
  father_name: string;
  mother_name: string;
  date_of_birth: string;
  gender: string;
  religion: string;
  category: string;
  nationality: string;
  email_id: string;
  mobile_number: string;
  class: string;
  high_school_board: string;
  high_school_passing_year: string;
  intermediate_board_name: string;
  intermediate_school_name: string;
  intermediate_passing_year: string;
  aadhar_number:string;
};

export default function NewAdmissionPage() {
  const [form, setForm] = useState<AdmissionForm>({
    full_name: { first_name: "", middle_name: "", last_name: "" },
    father_name: "",
    mother_name: "",
    date_of_birth: "",
    gender: "",
    religion: "",
    category: "",
    nationality: "",
    email_id: "",
    mobile_number: "",
    class: "",
    high_school_board: "",
    high_school_passing_year: "",
    intermediate_board_name: "",
    intermediate_school_name: "",
    intermediate_passing_year: "",
    aadhar_number:""
  });

  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: "" })); // clear error on change

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setForm((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof AdmissionForm] as object),
          [child]: value,
        },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateStep = () => {
    const newErrors: { [key: string]: string } = {};

    if (step === 1) {
      if (!form.full_name.first_name) newErrors["full_name.first_name"] = "First name is required";
      if (!form.father_name) newErrors.father_name = "Father's name is required";
      if (!form.mother_name) newErrors.mother_name = "Mother's name is required";
      if (!form.date_of_birth) newErrors.date_of_birth = "Date of birth is required";
      if (!form.gender) newErrors.gender = "Please select a gender";
      if (!form.email_id) newErrors.email_id = "Email is required";
      if (!form.aadhar_number) newErrors.aadhar_number = "aadhar number is required";
      if (!/\S+@\S+\.\S+/.test(form.email_id)) newErrors.email_id = "Enter a valid email";
      if (!form.mobile_number) newErrors.mobile_number = "Mobile number is required";
      if (!/^\d{10}$/.test(form.mobile_number))
        newErrors.mobile_number = "Enter a valid 10-digit number";
      if (!form.nationality) newErrors.nationality = "Nationality is required";
    }

    if (step === 2) {
      if (!form.class) newErrors.class = "Please enter class";
      if (!form.high_school_board)
        newErrors.high_school_board = "High school board is required";
      if (!form.high_school_passing_year)
        newErrors.high_school_passing_year = "Passing year is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) setStep((prev) => prev + 1);
  };

  const handleBack = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;

    try {
      await axiosInstance.post("/admission", form);
      alert("🎉 Admission form submitted successfully!");
      setForm({
        full_name: { first_name: "", middle_name: "", last_name: "" },
        father_name: "",
        mother_name: "",
        date_of_birth: "",
        gender: "",
        religion: "",
        category: "",
        nationality: "",
        email_id: "",
        mobile_number: "",
        class: "",
        high_school_board: "",
        high_school_passing_year: "",
        intermediate_board_name: "",
        intermediate_school_name: "",
        intermediate_passing_year: "",
        aadhar_number:"",
      });
      setStep(1);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to submit admission form");
    }
  };

  const renderError = (field: string) =>
    errors[field] ? (
      <p className=" text-red-600 mt-1">{errors[field]}</p>
    ) : null;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
       <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back
        </button>
      <h2 className="text-2xl font-bold mb-4 text-center">
        Student Admission Form
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Step Indicator */}
        <div className="flex justify-center mb-6">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`w-8 h-8 flex items-center justify-center rounded-full mx-2 ${
                s <= step
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              {s}
            </div>
          ))}
        </div>

        {/* STEP 1: Personal Info */}
        {step === 1 && (
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-4 border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block  font-medium text-gray-700">
                  First Name
                </label>
                <input
                  name="full_name.first_name"
                  placeholder="Enter first name"
                  value={form.full_name.first_name}
                  onChange={handleChange}
                  className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-400 outline-none"
                />
                {renderError("full_name.first_name")}
              </div>

              <div>
                <label className="block  font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  name="full_name.last_name"
                  placeholder="Enter last name"
                  value={form.full_name.last_name}
                  onChange={handleChange}
                  className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

              <div>
                <label className="block  font-medium text-gray-700">
                  Father’s Name
                </label>
                <input
                  name="father_name"
                  placeholder="Enter father’s name"
                  value={form.father_name}
                  onChange={handleChange}
                  className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-400 outline-none"
                />
                {renderError("father_name")}
              </div>

              <div>
                <label className="block  font-medium text-gray-700">
                  Mother’s Name
                </label>
                <input
                  name="mother_name"
                  placeholder="Enter mother’s name"
                  value={form.mother_name}
                  onChange={handleChange}
                  className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-400 outline-none"
                />
                {renderError("mother_name")}
              </div>

              <div>
                <label className="block  font-medium text-gray-700">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="date_of_birth"
                  value={form.date_of_birth}
                  onChange={handleChange}
                  className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-400 outline-none"
                />
                {renderError("date_of_birth")}
              </div>

              <div>
                <label className="block  font-medium text-gray-700">
                  Gender
                </label>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-400 outline-none"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {renderError("gender")}
              </div>

              <div className="col-span-2">
                <label className="block  font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  name="email_id"
                  placeholder="Enter email"
                  value={form.email_id}
                  onChange={handleChange}
                  className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-400 outline-none"
                />
                {renderError("email_id")}
              </div>

              <div className="col-span-2">
                <label className="block  font-medium text-gray-700">
                  Mobile Number
                </label>
                <input
                  name="mobile_number"
                  placeholder="Enter mobile number"
                  value={form.mobile_number}
                  onChange={handleChange}
                  className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-400 outline-none"
                />
                {renderError("mobile_number")}
              </div>
              <div className="col-span-2">
                <label className="block  font-medium text-gray-700">
                  Aadhar Number
                </label>
                <input
                  name="aadhar_number"
                  placeholder="Enter Aadhar Number"
                  value={form.aadhar_number}
                  onChange={handleChange}
                  className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-400 outline-none"
                />
                {renderError("aadhar_number")}
              </div>

              <div className="col-span-2">
                <label className="block  font-medium text-gray-700">
                  Nationality
                </label>
                <input
                  name="nationality"
                  placeholder="Enter nationality"
                  value={form.nationality}
                  onChange={handleChange}
                  className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-400 outline-none"
                />
                {renderError("nationality")}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleNext}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Academic Info */}
        {step === 2 && (
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-4 border border-gray-100">
            <h3 className="text-lg font-semibold">Academic Information</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Applying for Class", name: "class", placeholder: "Enter class" },
                { label: "High School Board", name: "high_school_board", placeholder: "Enter board" },
                { label: "High School Passing Year", name: "high_school_passing_year", placeholder: "YYYY" },
                { label: "Intermediate Board", name: "intermediate_board_name", placeholder: "Enter board" },
                { label: "Intermediate School", name: "intermediate_school_name", placeholder: "Enter school" },
                { label: "Intermediate Passing Year", name: "intermediate_passing_year", placeholder: "YYYY" },
              ].map((f) => (
                <div key={f.name}>
                  <label className="block  font-medium text-gray-700">
                    {f.label}
                  </label>
                  <input
                    name={f.name}
                    placeholder={f.placeholder}
                    value={(form[f.name as keyof AdmissionForm] as string) || ""}
                    onChange={handleChange}
                    className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                  {renderError(f.name)}
                </div>
              ))}
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Review & Submit */}
        {step === 3 && (
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-4 border border-gray-100">
            <h3 className="text-lg font-semibold">Review & Submit</h3>
            <div className="bg-gray-50 p-4 rounded border space-y-1">
              <p>
                <strong>Name:</strong> {form.full_name.first_name}{" "}
                {form.full_name.last_name}
              </p>
              <p>
                <strong>Email:</strong> {form.email_id}
              </p>
              <p>
                <strong>Mobile:</strong> {form.mobile_number}
              </p>
              <p>
                <strong>Class:</strong> {form.class}
              </p>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                ← Back
              </button>
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Submit Form
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
