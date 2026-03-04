"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
export default function FeesPage() {
  const router = useRouter();

  type Student = {
    _id: string;
    full_name: {
      first_name: string;
      middle_name?: string;
      last_name: string;
    };
    class: string;
  };

  type FeeRecord = {
    _id: string;
    student_name: string;
    class: string;
    total_amount: number;
    student_id?: {
      _id: string;
      full_name: { first_name: string; last_name: string };
    };
    full_name: {
      first_name: string;
      last_name: string;
    };
    concession: number;
    status: "Pending" | "Partially Paid" | "Paid";
    academic_year: string;
  };
  type FundManagement = {
    className: string;
  };

  const [students, setStudents] = useState<Student[]>([]);
  const [fees, setFees] = useState<FeeRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [iamStudent, setIamStudent] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState <Record<string , string>>({});
  const [classNames, setClassNames] = useState<FundManagement[]>([]);
  const [form, setForm] = useState({
    student_id: "",
    class: "",
    academic_year: "",
    fee_heads: [{ name: "", amount: "" }],
    total_amount: "",
    concession: "",
    full_name: {
      first_name: "",
      last_name: "",
    },
  });
  const fetchClassNames = async () => {
    try {
      const { data } = await axiosInstance.get("/admin/funds");
      setClassNames(data.fundManagement);
    } catch (error) {
      console.log("unable to fetch class names from API" , error);
    }
  };
  useEffect(() => {
    const role = Cookies.get("userRole");
    const userId = Cookies.get("userId");

    if (role === "student" || (role === "teacher")) {
      setIamStudent(true);
    } else if (
      role === "admin" ||
      role === "teacher" ||
      role === "superadmin"
    ) {
      console.log(`${role} can access this route `);
    }
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      const [studentsRes, feesRes] = await Promise.all([
        axiosInstance.get("/admission"),
        axiosInstance.get("/fees"),
      ]);
      setStudents(studentsRes.data);
      setFees(feesRes.data);
      setLoading(false);
    };
    fetchData();
    fetchClassNames();
  }, []);

  // ✅ Validation Function
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!form.student_id) newErrors.student_id = "Student is required.";
    if (!form.class.trim()) newErrors.class = "Class is required.";

    // academic year check
    if (!/^[0-9]{4}-[0-9]{4}$/.test(form.academic_year)) {
      newErrors.academic_year = "Format must be like 2024-2025";
    }

    // fee heads validation
    form.fee_heads.forEach((head, i) => {
      if (!head.name.trim()) {
        newErrors[`feeHeadName${i}`] = "Fee head name required";
      }
      if (!head.amount || isNaN(Number(head.amount))) {
        newErrors[`feeHeadAmt${i}`] = "Valid amount required";
      }
    });

    if (!form.total_amount || isNaN(Number(form.total_amount))) {
      newErrors.total_amount = "Total amount is required";
    }

    if (form.concession > "1500") {
      newErrors.concession = "Concession cannot exceed ₹1500";
    }
    if (form.concession && isNaN(Number(form.concession))) {
      newErrors.concession = "concession must be numeric";
    }
    if (
      form.concession &&
      Number(form.concession) > Number(form.total_amount)
    ) {
      newErrors.concession = "Discount must be less than total amount";
    }
    if (form.concession && Number(form.concession) > Number(1500)) {
      newErrors.concession = "Discount must be less than 1500";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFeeHeadChange = (
    index: number,
    field: "name" | "amount",
    value: string,
  ) => {
    const updated = [...form.fee_heads];
    updated[index][field] = value;
    setForm({ ...form, fee_heads: updated });
  };

  const addFeeHead = () => {
    setForm({
      ...form,
      fee_heads: [...form.fee_heads, { name: "", amount: "" }],
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return; // ✅ Block submit if form invalid

    await axiosInstance.post("/fees", form);
    const updatedFees = await axiosInstance.get("/fees");
    setFees(updatedFees.data);

    alert("✅ Fee record added!");

    setForm({
      student_id: "",
      class: "",
      academic_year: "",
      fee_heads: [{ name: "", amount: "" }],
      total_amount: "",
      concession: "",
      full_name: {
        first_name: "",
        last_name: "",
      },
    });
    setErrors({});
  };

  const handleStatusChange = async (
    id: string,
    status: FeeRecord["status"],
  ) => {
    await axiosInstance.patch(`/fees/${id}`, { status });
    const updatedFees = await axiosInstance.get("/fees");
    setFees(updatedFees.data);
  };

  console.log(fees);

  if (loading)
    return <p className="p-10 text-gray-500 text-center text-lg">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 py-10 px-4 md:px-10">
      <div className="absolute top-6 left-6">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back
        </button>
      </div>
      {/* ====== ADD FEES FORM ====== */}
      {iamStudent ? (
        ""
      ) : (
        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-8 mb-10 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
            Add Fee Record
          </h2>

          <form onSubmit={handleSubmit} className="space-y-8 mt-4">
            {/* Student Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Student dropdown */}
              <div>
                <label className="text-gray-700 font-medium">Student</label>
                <select
                  value={form.student_id}
                  onChange={(e) => {
                    const selectedStudent = students.find(
                      (s) => s._id === e.target.value,
                    );

                    setForm({
                      ...form,
                      student_id: e.target.value,
                      full_name: {
                        first_name: selectedStudent?.full_name.first_name || "",
                        last_name: selectedStudent?.full_name.last_name || "",
                      },
                    });
                  }}
                  className={`w-full border p-2 rounded-md ${
                    errors.student_id ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select student</option>
                  {students.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.full_name.first_name} {s.full_name.middle_name || ""}{" "}
                      {s.full_name.last_name}
                    </option>
                  ))}
                </select>
                {errors.student_id && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.student_id}
                  </p>
                )}
              </div>

              {/* Class */}
              <div>
                <label className="text-gray-700 font-medium">Class</label>
                <select
                  value={form.class}
                  onChange={(e) => setForm({ ...form, class: e.target.value })}
                  className={`w-full border p-2 rounded-md ${errors.class ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value=""> Select Class </option>
                  {classNames.map((c, i) => (
                    <option key={i} value={c.className} >
                     {c.className}
                    </option>
                  ))}
                </select>
                {errors.class && (
                  <p className="text-sm text-red-500">{errors.class}</p>
                )}
              </div>

              {/* Academic year */}
              <div>
                <label className="text-gray-700 font-medium">
                  Academic Year
                </label>
                <input
                  value={form.academic_year}
                  onChange={(e) =>
                    setForm({ ...form, academic_year: e.target.value })
                  }
                  placeholder="2024-2025"
                  className={`w-full border p-2 rounded-md ${
                    errors.academic_year ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.academic_year && (
                  <p className="text-sm text-red-500">{errors.academic_year}</p>
                )}
              </div>
            </div>

            {/* Fee Heads */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Fee Heads
              </h3>

              {form.fee_heads.map((head, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2  p-3 rounded-lg"
                >
                  <div>
                    <input
                      placeholder="Fee Head Name"
                      value={head.name}
                      onChange={(e) =>
                        handleFeeHeadChange(idx, "name", e.target.value)
                      }
                      className={`w-full border p-2 rounded-md ${
                        errors[`feeHeadName${idx}`]
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {errors[`feeHeadName${idx}`] && (
                      <p className="text-sm text-red-500">
                        {errors[`feeHeadName${idx}`]}
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      type="number"
                      placeholder="Amount"
                      value={head.amount}
                      onChange={(e) =>
                        handleFeeHeadChange(idx, "amount", e.target.value)
                      }
                      className={`w-full border p-2 rounded-md ${
                        errors[`feeHeadAmt${idx}`]
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {errors[`feeHeadAmt${idx}`] && (
                      <p className="text-sm text-red-500">
                        {errors[`feeHeadAmt${idx}`]}
                      </p>
                    )}
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addFeeHead}
                className="text-blue-600 hover:underline text-sm"
              >
                + Add Fee Head
              </button>
            </div>

            {/* Totals */}
            <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
              <input
                id="includeConcession"
                type="checkbox"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                className="h-5 w-5 accent-blue-600 cursor-pointer"
              />
              <label
                htmlFor="includeConcession"
                className="text-gray-700 font-medium cursor-pointer select-none"
              >
                Include Concession
              </label>
            </div>

            {isChecked && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div>
                  <label className="text-gray-700 font-medium">
                    Concession
                  </label>
                  <input
                    type="number"
                    value={form.concession}
                    onChange={(e) =>
                      setForm({ ...form, concession: e.target.value })
                    }
                    className={`w-full border p-2 rounded-md ${
                      errors.concession ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.concession && (
                    <p className="text-sm text-red-500">{errors.concession}</p>
                  )}
                </div>
                <div>
                  <label className="text-gray-700 font-medium">
                    Total Amount
                  </label>
                  <input
                    type="number"
                    value={form.total_amount}
                    onChange={(e) =>
                      setForm({ ...form, total_amount: e.target.value })
                    }
                    className={`w-full border p-2 rounded-md ${
                      errors.total_amount ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.total_amount && (
                    <p className="text-sm text-red-500">
                      {errors.total_amount}
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-all"
              >
                Submit Fee Record
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ===== All Fee Records ===== */}
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-8 border border-gray-200 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-800">
          All Fee Records
        </h2>

        <table className="w-full border-collapse text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3">Student</th>
              <th className="border p-3">Class</th>
              <th className="border p-3">Academic Year</th>
              <th className="border p-3">Concession</th>
              <th className="border p-3">Total</th>
              <th className="border p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {fees.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-6 text-gray-500 italic"
                >
                  No fee records available.
                </td>
              </tr>
            ) : (
              fees.map((f, idx) => (
                <tr
                  key={f._id}
                  className={`hover:bg-blue-50 transition ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="border p-3">
                    {f.student_id?.full_name?.first_name}{" "}
                    {f?.full_name?.last_name}
                  </td>
                  <td className="border p-3">{f.class}</td>
                  <td className="border p-3">{f.academic_year}</td>
                  <td className="border p-3">₹{f.concession}</td>
                  <td className="border p-3">₹{f.total_amount}</td>
                  <td className="border p-3">
                    {iamStudent ? (
                      <div
                        className={`border p-1.5 rounded-md text-sm font-medium 
                        ${
                          f.status === "Paid"
                            ? "bg-green-100 text-green-700"
                            : f.status === "Partially Paid"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {f.status}
                      </div>
                    ) : (
                      <select
                        disabled={iamStudent}
                        value={f.status}
                        onChange={(e) =>
                          handleStatusChange(
                            f._id,
                            e.target.value as FeeRecord["status"],
                          )
                        }
                        className={`border p-1.5 rounded-md text-sm font-medium 
                        ${
                          f.status === "Paid"
                            ? "bg-green-100 text-green-700"
                            : f.status === "Partially Paid"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Partially Paid">Partially Paid</option>
                        <option value="Paid">Paid</option>
                      </select>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
