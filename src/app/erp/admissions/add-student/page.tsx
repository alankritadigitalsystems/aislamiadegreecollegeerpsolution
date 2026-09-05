"use client";

import { useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import {
  PiStudentFill,
  PiUploadSimpleBold,
  PiUserPlusBold,
  PiFileXlsBold,
  PiCheckCircleFill,
  PiPaperPlaneTiltBold,
  PiTrashBold,
  PiArrowLeftBold,
} from "react-icons/pi";
import Link from "next/link";

interface ParsedStudentRow {
  id: string;
  enrol_no: string;
  name: string;
  father_name: string;
  sub_group_id: string;
  phone_no: string;
  aadhar_number: string;
  email: string;
  isValid?: boolean;
}

interface UploadSummaryStats {
  total: number;
  imported: number;
  emailsSent: number;
  skipped: number;
}

interface UploadSummaryData {
  success: boolean;
  message?: string;
  stats?: UploadSummaryStats;
}

export default function AddStudentPage() {
  const [activeTab, setActiveTab] = useState<"manual" | "excel">("excel");

  // --- Manual Form State ---
  const [manualForm, setManualForm] = useState({
    enrol_no: "",
    name: "",
    father_name: "",
    sub_group_id: "B.A. I",
    phone_no: "",
    aadhar_number: "",
    email_id: "",
  });
  const [manualLoading, setManualLoading] = useState(false);
  const [sendCredsNow, setSendCredsNow] = useState(true);

  // --- Excel Upload State ---
  const [excelRows, setExcelRows] = useState<ParsedStudentRow[]>([]);
  const [fileName, setFileName] = useState<string | null>(null);
  const [bulkLoading, setBulkLoading] = useState(false);
  const [bulkProgress, setBulkProgress] = useState<string | null>(null);
  const [uploadSummary, setUploadSummary] = useState<UploadSummaryData | null>(null);

  // Parse Excel File
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();

    reader.onload = (evt) => {
      try {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        const wsName = wb.SheetNames[0];
        const ws = wb.Sheets[wsName];
        const rawJson: Record<string, unknown>[] = XLSX.utils.sheet_to_json(ws, { defval: "" });

        if (rawJson.length === 0) {
          toast.error("Excel sheet is empty!");
          return;
        }

        const normalizedRows: ParsedStudentRow[] = rawJson.map((row, idx) => {
          // Flexible key matching for exact column headers from photo:
          // Enrol_No, NAME, FATHER NAME, SUB-GROUP-ID, PHONE NO., ADHAR NUMBER, EMAIL
          const getVal = (keys: string[]) => {
            for (const k of keys) {
              const matchedKey = Object.keys(row).find(
                (rk) => rk.trim().toLowerCase() === k.toLowerCase()
              );
              if (matchedKey && row[matchedKey] !== undefined && row[matchedKey] !== "") {
                return row[matchedKey];
              }
            }
            return "";
          };

          const enrol_no = String(getVal(["Enrol_No", "Enrol No", "enrol_no", "enrol no", "enrolment no", "enrolment"])).trim();
          const name = String(getVal(["NAME", "name", "student name", "student_name", "full_name"])).trim();
          const father_name = String(getVal(["FATHER NAME", "father name", "father_name", "f_name", "f name"])).trim();
          const sub_group_id = String(getVal(["SUB-GROUP-ID", "sub-group-id", "sub_group_id", "sub group id", "Class.", "Class", "class"])).trim();
          const phone_no = String(getVal(["PHONE NO.", "PHONE NO", "phone no.", "phone no", "phone_no", "mobile", "mobile_number", "phone"])).trim();
          const aadhar_number = String(getVal(["ADHAR NUMBER", "adhar number", "adhar_number", "Adhar card No.", "aadhar_number", "aadhar card no", "aadhar"])).trim();
          const email = String(getVal(["EMAIL", "email", "email_id", "email id"])).trim();

          return {
            id: `row-${idx}-${Date.now()}`,
            enrol_no,
            name,
            father_name,
            sub_group_id,
            phone_no,
            aadhar_number,
            email,
          };
        });

        setExcelRows(normalizedRows);
        setUploadSummary(null);
        toast.success(`Loaded ${normalizedRows.length} student records from Excel`);
      } catch (err: unknown) {
        console.error("Excel parse error:", err);
        toast.error("Failed to parse Excel file. Please ensure it's a valid xlsx/xls/csv.");
      }
    };

    reader.readAsBinaryString(file);
  };

  // Update specific field in parsed Excel preview
  const handleExcelCellChange = (id: string, field: keyof ParsedStudentRow, val: string) => {
    setExcelRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: val } : r))
    );
  };

  const handleRemoveRow = (id: string) => {
    setExcelRows((prev) => prev.filter((r) => r.id !== id));
  };

  // Submit Bulk Upload
  const handleBulkSubmit = async () => {
    if (excelRows.length === 0) {
      toast.error("No student rows to upload!");
      return;
    }

    try {
      setBulkLoading(true);
      setBulkProgress("Uploading student records and dispatching emails...");

      const payload = {
        students: excelRows,
        sendEmailImmediately: true,
      };

      const res = await axiosInstance.post("/admission/bulk-upload", payload);

      if (res.data.success) {
        toast.success(res.data.message || "Bulk import completed!");
        setUploadSummary(res.data);
      } else {
        toast.error(res.data.message || "Failed to process bulk upload.");
      }
    } catch (err: unknown) {
      const errorObj = err as { response?: { data?: { message?: string } } };
      console.error(err);
      toast.error(errorObj?.response?.data?.message || "Error submitting bulk student data");
    } finally {
      setBulkLoading(false);
      setBulkProgress(null);
    }
  };

  // Submit Manual Single Student
  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualForm.name) {
      toast.error("Please provide student NAME!");
      return;
    }

    try {
      setManualLoading(true);
      const payload = {
        students: [
          {
            Enrol_No: manualForm.enrol_no,
            NAME: manualForm.name,
            "FATHER NAME": manualForm.father_name,
            "SUB-GROUP-ID": manualForm.sub_group_id,
            "PHONE NO.": manualForm.phone_no,
            "ADHAR NUMBER": manualForm.aadhar_number,
            email: manualForm.email_id,
          },
        ],
        sendEmailImmediately: sendCredsNow,
      };

      const res = await axiosInstance.post("/admission/bulk-upload", payload);

      if (res.data.success) {
        toast.success(
          manualForm.email_id && sendCredsNow
            ? "Student added and login credentials sent to email!"
            : "Student record added successfully!"
        );
        // Reset form
        setManualForm({
          enrol_no: "",
          name: "",
          father_name: "",
          sub_group_id: "B.A. I",
          phone_no: "",
          aadhar_number: "",
          email_id: "",
        });
      } else {
        toast.error(res.data.message || "Failed to add student.");
      }
    } catch (err: unknown) {
      const errorObj = err as { response?: { data?: { message?: string } } };
      console.error(err);
      toast.error(errorObj?.response?.data?.message || "Failed to add student.");
    } finally {
      setManualLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div>
            <div className="flex items-center gap-3">
              <Link
                href="/erp/admissions"
                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition flex items-center gap-1.5 text-sm font-medium"
              >
                <PiArrowLeftBold size={16} /> Back to Admissions
              </Link>
              <span className="text-xs px-2.5 py-1 font-semibold rounded-full bg-blue-100 text-blue-800 uppercase tracking-wide">
                Super Admin
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-800 mt-2 flex items-center gap-2.5">
              <PiStudentFill className="text-blue-600" /> Student Admission & Excel Bulk Upload
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Add individual student records or batch upload Excel files matching: <code>Enrol_No</code>, <code>NAME</code>, <code>FATHER NAME</code>, <code>SUB-GROUP-ID</code>, <code>PHONE NO.</code>, <code>ADHAR NUMBER</code>.
            </p>
          </div>

          {/* Tab Selector Buttons */}
          <div className="flex items-center bg-slate-100 p-1.5 rounded-xl border border-slate-200 self-start md:self-auto">
            <button
              onClick={() => setActiveTab("excel")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "excel"
                  ? "bg-white text-blue-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <PiFileXlsBold size={18} className="text-emerald-600" /> Excel Bulk Upload
            </button>
            <button
              onClick={() => setActiveTab("manual")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "manual"
                  ? "bg-white text-blue-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <PiUserPlusBold size={18} className="text-blue-600" /> Manual Form
            </button>
          </div>
        </div>

        {/* TAB 1: EXCEL BULK UPLOAD */}
        {activeTab === "excel" && (
          <div className="space-y-6">
            {/* Upload Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <PiUploadSimpleBold className="text-emerald-600" /> Upload Excel Spreadsheet (.xlsx, .xls, .csv)
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Excel Heads:</span>
                    <span className="text-xs bg-slate-100 px-2 py-0.5 rounded font-mono font-medium text-slate-700">Enrol_No</span>
                    <span className="text-xs bg-slate-100 px-2 py-0.5 rounded font-mono font-medium text-slate-700">NAME</span>
                    <span className="text-xs bg-slate-100 px-2 py-0.5 rounded font-mono font-medium text-slate-700">FATHER NAME</span>
                    <span className="text-xs bg-slate-100 px-2 py-0.5 rounded font-mono font-medium text-slate-700">SUB-GROUP-ID</span>
                    <span className="text-xs bg-slate-100 px-2 py-0.5 rounded font-mono font-medium text-slate-700">PHONE NO.</span>
                    <span className="text-xs bg-slate-100 px-2 py-0.5 rounded font-mono font-medium text-slate-700">ADHAR NUMBER</span>
                  </div>
                </div>
              </div>

              {/* Drag & Drop Area */}
              <div className="mt-6">
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50/60 hover:bg-blue-50/30 rounded-xl p-8 cursor-pointer transition text-center group">
                  <PiFileXlsBold size={48} className="text-emerald-600 group-hover:scale-110 transition-transform mb-2" />
                  <span className="font-semibold text-slate-700 text-base">
                    {fileName ? `Selected: ${fileName}` : "Click or drag & drop Excel file here"}
                  </span>
                  <span className="text-xs text-slate-500 mt-1">
                    Supports .xlsx, .xls, .csv files with the exact table columns
                  </span>
                  <input
                    type="file"
                    accept=".xlsx, .xls, .csv"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>
            </div>

            {/* Preview & Edit Table */}
            {excelRows.length > 0 && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                      📋 Preview Data ({excelRows.length} Students)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Superadmin can enter or update email IDs below. Random passwords will be created and sent to student emails.
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        setExcelRows([]);
                        setFileName(null);
                      }}
                      className="px-3 py-2 text-sm text-slate-600 hover:text-red-600 font-medium"
                    >
                      Clear All
                    </button>
                    <button
                      onClick={handleBulkSubmit}
                      disabled={bulkLoading}
                      className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md transition disabled:opacity-50"
                    >
                      <PiPaperPlaneTiltBold size={18} />
                      {bulkLoading ? "Processing Import..." : `Import ${excelRows.length} Students & Dispatch Emails`}
                    </button>
                  </div>
                </div>

                {bulkProgress && (
                  <div className="p-3 bg-blue-50 border border-blue-200 text-blue-800 text-sm rounded-lg flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    {bulkProgress}
                  </div>
                )}

                {/* Data Grid with exact requested heads */}
                <div className="overflow-x-auto border border-slate-200 rounded-xl max-h-[500px]">
                  <table className="min-w-full text-xs text-left">
                    <thead className="bg-slate-100 text-slate-700 font-semibold sticky top-0 uppercase tracking-wider">
                      <tr>
                        <th className="p-2.5 border-b">#</th>
                        <th className="p-2.5 border-b">Enrol_No</th>
                        <th className="p-2.5 border-b">NAME</th>
                        <th className="p-2.5 border-b">FATHER NAME</th>
                        <th className="p-2.5 border-b">SUB-GROUP-ID</th>
                        <th className="p-2.5 border-b">PHONE NO.</th>
                        <th className="p-2.5 border-b">ADHAR NUMBER</th>
                        <th className="p-2.5 border-b min-w-[200px]">Student Email (For Credentials)</th>
                        <th className="p-2.5 border-b text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {excelRows.map((row, idx) => (
                        <tr key={row.id} className="hover:bg-slate-50 transition">
                          <td className="p-2.5 text-slate-500 font-medium">{idx + 1}</td>
                          <td className="p-2">
                            <input
                              type="text"
                              value={row.enrol_no}
                              onChange={(e) => handleExcelCellChange(row.id, "enrol_no", e.target.value)}
                              className="w-24 px-2 py-1 border rounded text-xs bg-transparent focus:bg-white font-medium"
                              placeholder="J-1001"
                            />
                          </td>
                          <td className="p-2">
                            <input
                              type="text"
                              value={row.name}
                              onChange={(e) => handleExcelCellChange(row.id, "name", e.target.value)}
                              className="w-40 px-2 py-1 border rounded text-xs font-semibold text-slate-800 bg-transparent focus:bg-white"
                              placeholder="MOHD AMIR"
                            />
                          </td>
                          <td className="p-2">
                            <input
                              type="text"
                              value={row.father_name}
                              onChange={(e) => handleExcelCellChange(row.id, "father_name", e.target.value)}
                              className="w-36 px-2 py-1 border rounded text-xs bg-transparent focus:bg-white"
                              placeholder="MOHD ASIF"
                            />
                          </td>
                          <td className="p-2">
                            <input
                              type="text"
                              value={row.sub_group_id}
                              onChange={(e) => handleExcelCellChange(row.id, "sub_group_id", e.target.value)}
                              className="w-24 px-2 py-1 border rounded text-xs bg-transparent focus:bg-white"
                              placeholder="B.A. I"
                            />
                          </td>
                          <td className="p-2">
                            <input
                              type="text"
                              value={row.phone_no}
                              onChange={(e) => handleExcelCellChange(row.id, "phone_no", e.target.value)}
                              className="w-28 px-2 py-1 border rounded text-xs bg-transparent focus:bg-white"
                              placeholder="8957315539"
                            />
                          </td>
                          <td className="p-2">
                            <input
                              type="text"
                              value={row.aadhar_number}
                              onChange={(e) => handleExcelCellChange(row.id, "aadhar_number", e.target.value)}
                              className="w-36 px-2 py-1 border rounded text-xs bg-transparent focus:bg-white"
                              placeholder="578168107119"
                            />
                          </td>
                          <td className="p-2">
                            <input
                              type="email"
                              value={row.email}
                              onChange={(e) => handleExcelCellChange(row.id, "email", e.target.value)}
                              placeholder="Enter email to send login"
                              className={`w-full px-2 py-1 border rounded text-xs focus:bg-white outline-none ${
                                row.email
                                  ? "border-blue-300 bg-blue-50/50 text-blue-900"
                                  : "border-amber-300 bg-amber-50/50 text-slate-500"
                              }`}
                            />
                          </td>
                          <td className="p-2 text-center">
                            <button
                              onClick={() => handleRemoveRow(row.id)}
                              className="p-1.5 text-slate-400 hover:text-red-600 rounded transition"
                              title="Delete Row"
                            >
                              <PiTrashBold size={15} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Results Summary Box */}
            {uploadSummary && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <PiCheckCircleFill className="text-emerald-500" /> Upload Summary
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <span className="text-xs text-slate-500">Total Processed</span>
                    <p className="text-2xl font-bold text-slate-800">{uploadSummary.stats?.total}</p>
                  </div>
                  <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                    <span className="text-xs text-emerald-600 font-medium">Students Enrolled</span>
                    <p className="text-2xl font-bold text-emerald-700">{uploadSummary.stats?.imported}</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                    <span className="text-xs text-blue-600 font-medium">Credential Emails Sent</span>
                    <p className="text-2xl font-bold text-blue-700">{uploadSummary.stats?.emailsSent}</p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                    <span className="text-xs text-amber-600 font-medium">Skipped / Failed</span>
                    <p className="text-2xl font-bold text-amber-700">{uploadSummary.stats?.skipped || 0}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: MANUAL FORM */}
        {activeTab === "manual" && (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-1 flex items-center gap-2">
              <PiUserPlusBold className="text-blue-600" /> Student Admission Form
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              Enter individual student admission particulars matching the required format.
            </p>

            <form onSubmit={handleManualSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Enrol No */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Enrol_No
                  </label>
                  <input
                    type="text"
                    value={manualForm.enrol_no}
                    onChange={(e) => setManualForm({ ...manualForm, enrol_no: e.target.value })}
                    placeholder="e.g. J-1001"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                {/* NAME */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    NAME <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={manualForm.name}
                    onChange={(e) => setManualForm({ ...manualForm, name: e.target.value })}
                    placeholder="e.g. MOHD AMIR"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                {/* FATHER NAME */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    FATHER NAME
                  </label>
                  <input
                    type="text"
                    value={manualForm.father_name}
                    onChange={(e) => setManualForm({ ...manualForm, father_name: e.target.value })}
                    placeholder="e.g. MOHD ASIF"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                {/* SUB-GROUP-ID */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    SUB-GROUP-ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={manualForm.sub_group_id}
                    onChange={(e) => setManualForm({ ...manualForm, sub_group_id: e.target.value })}
                    placeholder="e.g. B.A. I"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                {/* PHONE NO. */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    PHONE NO.
                  </label>
                  <input
                    type="tel"
                    value={manualForm.phone_no}
                    onChange={(e) => setManualForm({ ...manualForm, phone_no: e.target.value })}
                    placeholder="e.g. 8957315539"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                {/* ADHAR NUMBER */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    ADHAR NUMBER
                  </label>
                  <input
                    type="text"
                    value={manualForm.aadhar_number}
                    onChange={(e) => setManualForm({ ...manualForm, aadhar_number: e.target.value })}
                    placeholder="e.g. 578168107119"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              {/* Email & Portal Credentials Section */}
              <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 mt-6 space-y-4">
                <h4 className="text-sm font-bold text-blue-900 flex items-center gap-2">
                  <PiPaperPlaneTiltBold className="text-blue-600" /> Student Login Credentials & Email Setup
                </h4>
                <p className="text-xs text-blue-800">
                  Provide the student&apos;s email address. A random password will be created, stored securely, and automatically sent to this email ID. Leave blank if assigning later.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Student Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={manualForm.email_id}
                      onChange={(e) => setManualForm({ ...manualForm, email_id: e.target.value })}
                      placeholder="student@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-blue-300 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-6">
                    <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={sendCredsNow}
                        onChange={(e) => setSendCredsNow(e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      Send random password login credentials immediately via email
                    </label>
                  </div>
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() =>
                    setManualForm({
                      enrol_no: "",
                      name: "",
                      father_name: "",
                      sub_group_id: "B.A. I",
                      phone_no: "",
                      aadhar_number: "",
                      email_id: "",
                    })
                  }
                  className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-xl"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  disabled={manualLoading}
                  className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md transition disabled:opacity-50"
                >
                  <PiUserPlusBold size={18} />
                  {manualLoading ? "Submitting Student..." : "Add Student Record"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
