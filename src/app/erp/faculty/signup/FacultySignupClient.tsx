"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "sonner";

interface FacultyFormData {
  full_name: { first_name: string; last_name: string };
  father_name: string;
  mother_name: string;
  spouse_name: string;
  gender: string;
  date_of_birth: string;
  email_id: string;
  reference_faculty: string;
  profile_photo_url: string;
  faculty_id: string;
  department: string;
  date_of_joining: string;
  date_of_retirement: string;
  aadhar_number: string;
  pan_number: string;
  residential_address: string;
  relation_between_2_employee: string;
  experience_in_this_college: string;
  subject_specialization: string;
  number_of_books_published: string;
  password: string;
  confirm_password: string;
  net_slet_details: {
    qualification_status: string;
    year_of_passing: string;
    net_slet_id: string;
  };
  phd_details: {
    year_of_phd: string;
    college_of_phd: string;
    phd_certificate: string;
  };
  no_of_phd_guided: { as_main_supervisor: string; as_co_supervisor: string };
  no_of_papers_published: { national: string; international: string };
  awards_and_recognition: string[];
  fellowships_in_societies: string[];
  fellowships_awarded: string[];
  membership_in_scientific_societies: string[];
  patents_published_or_awarded: string[];
}

export default function FacultySignupPageClient() {
  const searchParams = useSearchParams();
  const inviteToken = searchParams.get("token");

  const [formData, setFormData] = useState<FacultyFormData>({
    full_name: { first_name: "", last_name: "" },
    father_name: "",
    mother_name: "",
    spouse_name: "",
    gender: "",
    date_of_birth: "",
    email_id: "",
    reference_faculty: "",
    profile_photo_url: "",
    faculty_id: "",
    department: "",
    date_of_joining: "",
    date_of_retirement: "",
    aadhar_number: "",
    pan_number: "",
    residential_address: "",
    relation_between_2_employee: "",
    experience_in_this_college: "",
    subject_specialization: "",
    number_of_books_published: "",
    password: "",
    confirm_password: "",
    net_slet_details: {
      qualification_status: "No",
      year_of_passing: "",
      net_slet_id: "",
    },
    phd_details: {
      year_of_phd: "",
      college_of_phd: "",
      phd_certificate: "",
    },
    no_of_phd_guided: { as_main_supervisor: "", as_co_supervisor: "" },
    no_of_papers_published: { national: "", international: "" },
    awards_and_recognition: [""],
    fellowships_in_societies: [""],
    fellowships_awarded: [""],
    membership_in_scientific_societies: [""],
    patents_published_or_awarded: [""],
  });

  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchInvite = async () => {
      try {
        const res = await axios.get(
          `/api/v2/admin/verify-invite?token=${inviteToken}`,
        );
        setFormData((prev) => ({ ...prev, email_id: res.data.email }));
      } catch (error) {
        setStatus("Invalid or expired invite link.");
      } finally {
        setLoading(false);
      }
    };
    if (inviteToken) fetchInvite();
  }, [inviteToken]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = <K extends keyof FacultyFormData>(
    section: K,
    field: string,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section] as object),
        [field]: value,
      },
    }));
  };

  const handleArrayChange = (
    field: keyof FacultyFormData,
    index: number,
    value: string,
  ) => {
    const arr = [...(formData[field] as string[])];
    arr[index] = value;
    setFormData((prev) => ({ ...prev, [field]: arr }));
  };

  const addArrayItem = (field: keyof FacultyFormData) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...(prev[field] as string[]), ""],
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const loadingToast = toast.loading("Creating your account...");

    try {
      // Data Transformation: Ensure numeric fields are correctly formatted
      const dataToSubmit = {
        ...formData,
        experience_in_this_college: formData.experience_in_this_college === "" ? null : Number(formData.experience_in_this_college),
        number_of_books_published: formData.number_of_books_published === "" ? null : Number(formData.number_of_books_published),
        no_of_phd_guided: {
          as_main_supervisor: formData.no_of_phd_guided.as_main_supervisor === "" ? null : Number(formData.no_of_phd_guided.as_main_supervisor),
          as_co_supervisor: formData.no_of_phd_guided.as_co_supervisor === "" ? null : Number(formData.no_of_phd_guided.as_co_supervisor),
        },
        no_of_papers_published: {
          national: formData.no_of_papers_published.national === "" ? null : Number(formData.no_of_papers_published.national),
          international: formData.no_of_papers_published.international === "" ? null : Number(formData.no_of_papers_published.international),
        },
        reference_faculty: formData.reference_faculty || "",
        token: inviteToken,
      };

      await axiosInstance.post("/faculty/complete-signup", dataToSubmit);
      
      toast.success("Signup successful! You can now log in.", { id: loadingToast });
      setStatus("Signup successful! You can now log in.");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Signup failed";
      toast.error(errorMessage, { id: loadingToast });
      setStatus(errorMessage);
    }
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500">
        Validating invite link...
      </p>
    );
  if (status === "Invalid or expired invite link.")
    return <p className="text-center mt-10 text-red-600">{status}</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8 mt-10 mb-20">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Faculty Registration
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Personal Information */}
        <section>
          <h3 className="text-lg font-semibold border-b pb-2 mb-4">
            Personal Information
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="first_name"
              placeholder="First Name"
              required
              value={formData.full_name.first_name}
              onChange={(e) =>
                handleNestedChange("full_name", "first_name", e.target.value)
              }
              className="border p-2 rounded"
            />
            <input
              name="last_name"
              placeholder="Last Name"
              required
              value={formData.full_name.last_name}
              onChange={(e) =>
                handleNestedChange("full_name", "last_name", e.target.value)
              }
              className="border p-2 rounded"
            />
            <input
              name="father_name"
              placeholder="Father Name"
              value={formData.father_name}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="mother_name"
              placeholder="Mother Name"
              value={formData.mother_name}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="spouse_name"
              placeholder="Spouse Name"
              value={formData.spouse_name}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Others</option>
            </select>
            <input
              type="date"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="residential_address"
              placeholder="Residential Address"
              value={formData.residential_address}
              onChange={handleChange}
              className="border p-2 rounded col-span-2"
            />
            <input
              name="email_id"
              placeholder="Email"
              value={formData.email_id}
              readOnly
              className="border p-2 rounded bg-gray-100"
            />
            <input
              name="reference_faculty"
              placeholder="Reference Faculty"
              value={formData.reference_faculty}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>
        </section>

        {/* Employment Details */}
        <section className="mt-8">
          <h3 className="text-lg font-semibold border-b pb-2 mb-4">
            Employment Details
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="faculty_id"
              placeholder="Faculty ID"
              required
              value={formData.faculty_id}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="department"
              placeholder="Department"
              value={formData.department}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="date"
              name="date_of_joining"
              value={formData.date_of_joining}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="date"
              name="date_of_retirement"
              value={formData.date_of_retirement}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="aadhar_number"
              placeholder="Aadhar Number"
              value={formData.aadhar_number}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="pan_number"
              placeholder="PAN Number"
              value={formData.pan_number}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="relation_between_2_employee"
              placeholder="Relation Between 2 Employees"
              value={formData.relation_between_2_employee}
              onChange={handleChange}
              className="border p-2 rounded col-span-2"
            />
            <input
              type="number"
              name="experience_in_this_college"
              placeholder="Experience (years)"
              value={formData.experience_in_this_college}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>
        </section>

        {/* Academic Details */}
        <section className="mt-8">
          <h3 className="text-lg font-semibold border-b pb-2 mb-4">
            Academic Details
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <select
              value={formData.net_slet_details.qualification_status}
              onChange={(e) =>
                handleNestedChange(
                  "net_slet_details",
                  "qualification_status",
                  e.target.value,
                )
              }
              className="border p-2 rounded"
            >
              <option>No</option>
              <option>Yes</option>
            </select>
            <input
              placeholder="NET/SLET Year"
              value={formData.net_slet_details.year_of_passing}
              onChange={(e) =>
                handleNestedChange(
                  "net_slet_details",
                  "year_of_passing",
                  e.target.value,
                )
              }
              className="border p-2 rounded"
            />
            <input
              placeholder="PhD Year"
              value={formData.phd_details.year_of_phd}
              onChange={(e) =>
                handleNestedChange("phd_details", "year_of_phd", e.target.value)
              }
              className="border p-2 rounded"
            />
            <input
              placeholder="Subject Specialization"
              name="subject_specialization"
              value={formData.subject_specialization}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>
        </section>

        {/* Dynamic Arrays Section */}
        <section className="mt-8">
          <h3 className="text-lg font-semibold border-b pb-2 mb-4">
            Recognitions & Achievements
          </h3>
          {(
            [
              "awards_and_recognition",
              "fellowships_in_societies",
              "patents_published_or_awarded",
            ] as const
          ).map((field) => (
            <div key={field} className="mb-4">
              <label className="font-medium capitalize">
                {field.replaceAll("_", " ")}
              </label>
              {formData[field].map((item, idx) => (
                <input
                  key={idx}
                  className="border p-2 rounded w-full mt-2"
                  value={item}
                  onChange={(e) =>
                    handleArrayChange(field, idx, e.target.value)
                  }
                  placeholder="Enter item"
                />
              ))}
              <button
                type="button"
                onClick={() => addArrayItem(field)}
                className="text-blue-600 mt-2 text-sm"
              >
                + Add More
              </button>
            </div>
          ))}
        </section>

        <section className="mt-8">
          <h3 className="text-lg font-semibold border-b pb-2 mb-4">Security</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="password"
              name="confirm_password"
              placeholder="Confirm Password"
              required
              value={formData.confirm_password}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>
        </section>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold mt-6"
        >
          Submit
        </button>
        {status && (
          <p className="text-center text-sm text-gray-600 mt-3">{status}</p>
        )}
      </form>
    </div>
  );
}
