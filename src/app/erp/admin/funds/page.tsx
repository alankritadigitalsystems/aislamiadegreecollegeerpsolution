"use client";
import axiosInstance from "@/lib/axiosInstance";
import React, { useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { number } from "yup";

const Funds = () => {
  type FundItems = {
    name: string;
    amount: number;
    _id: string;
  };
  type FundManagement = {
    _id: string;
    className: string;
    funds: FundItems[];
  };
  type feeStudntStatus = {
    status: "Pending" | "Paid" | "Partially Paid";
    class: string;
  };
  const fetchFundsManagementApi = async () => {
    try {
      const { data } = await axiosInstance.get("/admin/funds");
      setFunds(data.fundManagement);
    } catch (error) {
      console.error("Failed to fetch funds:", error);
    }
  };

  useEffect(() => {
    fetchFundsManagementApi();
  }, []);

  const [funds, setFunds] = useState<FundManagement[]>([]);
  const [fees, setFees] = useState<FundManagement[]>([]);
  const [branchAndYear, setBranchAndYear] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedAmount, setEditedAmount] = useState<number | "">("");
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [feesPaidStudent, setFeesPaidStudent] = useState<feeStudntStatus[]>([]);
  useEffect(() => {
    const fetchFees = async () => {
      const res = await axiosInstance.get("/fees");
      setFees(res.data);
      setFeesPaidStudent(res.data);
    };
    fetchFees();
  }, []);
  const paidStudentsCount = feesPaidStudent.filter(
    (student) => student.class === branchAndYear && student.status === "Paid",
  ).length;
  const updateFundAmount = async (id: string) => {
    if (editedAmount === "") return;
    try {
      setLoadingId(id);
      await axiosInstance.put(`/admin/funds/${id}`, {
        amount: editedAmount,
      });

      setFunds((prev) =>
        prev.map((fundClass) => ({
          ...fundClass,
          funds: fundClass.funds.map((f) =>
            f._id === id ? { ...f, amount: Number(editedAmount) } : f,
          ),
        })),
      );

      setEditingId(null);
      setEditedAmount("");
    } catch (err) {
      console.error("Update failed", err);
    } finally {
      setLoadingId(null);
    }
  };

  const selectedFund = funds.find((f) => f.className === branchAndYear);
  const currentFunds = selectedFund?.funds || [];
  const totalAmount = currentFunds.reduce(
    (sum, item) => sum + Number(item.amount) * paidStudentsCount,
    0,
  );
  const handleDownloadReport = async () => {
    const element = document.getElementById("fee-report");

    if (!element) {
      console.error("Fee report element not found");
      return;
    }
  const html2pdf = (await import("html2pdf.js")).default;
    html2pdf()
      .set({
        margin: 10,
        filename: `fee-record-${branchAndYear}.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .from(element)
      .save();
  };

  return (
    <div>
      <button
        onClick={() => window.history.back()}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mb-4"
      >
        ← Back
      </button>

      <div className="max-w-6xl mx-auto bg-white shadow rounded-2xl p-8 border">
        <h2 className="text-2xl font-bold mb-6">Funds Distribution</h2>

        <select
          value={branchAndYear}
          onChange={(e) => setBranchAndYear(e.target.value)}
          className="w-full max-w-md border rounded-lg px-4 py-2"
        >
          <option value="">Select Branch & Year</option>
          {funds.map((fundOption) => (
            <option key={fundOption._id} value={fundOption.className}>
              {fundOption.className}
            </option>
          ))}
        </select>
        <h5 className="text-center mt-2">
          Students Fees Paid for {branchAndYear}= {paidStudentsCount || 0}
        </h5>
      </div>
      <div>
        {paidStudentsCount === 0 && (
          <h5 className="text-center mt-30 text-gray-600">
            No Student Paid Fees{" "}
          </h5>
        )}
      </div>

      {branchAndYear && paidStudentsCount > 0 && (
        <div className="mt-10 flex flex-col items-center">
          <div className="w-full max-w-xl rounded-xl border bg-white shadow-sm">
            <div className="grid grid-cols-3 px-6 py-4 bg-gray-50 font-semibold">
              <span>S. No</span>
              <span>Name of Fund</span>
              <span className="text-right">Amount (₹)</span>
            </div>

            {currentFunds.map((item, index) => (
              <div
                key={item._id}
                className="grid grid-cols-3 px-6 py-3 border-b text-sm"
              >
                <span>{index + 1}</span>
                <span>{item.name}</span>

                <div className="text-right font-medium flex justify-end gap-2">
                  {editingId === item._id ? (
                    <input
                      type="number"
                      value={editedAmount}
                      autoFocus
                      onChange={(e) => setEditedAmount(Number(e.target.value))}
                      onBlur={() => updateFundAmount(item._id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") updateFundAmount(item._id);
                        if (e.key === "Escape") {
                          setEditingId(null);
                          setEditedAmount("");
                        }
                      }}
                      className="w-24 h-7 border-1  rounded-sm text-center "
                    />
                  ) : (
                    <div>{item.amount * paidStudentsCount} ₹</div>
                  )}

                  <button
                    disabled={loadingId === item._id}
                    className="hover:scale-150"
                    onClick={() => {
                      setEditingId(item._id);
                      setEditedAmount(item.amount);
                    }}
                  >
                    <FaPencilAlt />
                  </button>
                </div>
              </div>
            ))}

            <div className="grid grid-cols-3 px-6 py-3 bg-gray-100 font-bold">
              <span />
              <span>Total</span>
              <span className="text-right">₹{totalAmount}</span>
            </div>
          </div>

          <button
            onClick={handleDownloadReport}
            className="my-10 rounded-xl border-2 border-blue-600 bg-blue-500 px-6 py-2 font-semibold text-white shadow hover:bg-blue-600 active:scale-95"
          >
            📄 Download Report
          </button>
        </div>
      )}
      <div
        id="fee-report"
        style={{ background: "white", padding: 40, width: 800 }}

      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              background: "#1e3a8a",
              color: "white",
              padding: "12px 20px",
              textAlign: "right",
            }}
          >
            <div style={{ color: "#fde047", fontSize: 18 }}>Code:</div>
            <div style={{ fontSize: 20, fontWeight: 600 }}>{branchAndYear}</div>
          </div>
        </div>

        <h1 style={{ fontSize: 36, marginTop: 40 }}>Fee yearly Record</h1>

        <p style={{ fontSize: 20 }}>Total {branchAndYear} students :</p>
        <p style={{ fontSize: 20, marginBottom: 30 }}>
          Total Paid students : {paidStudentsCount}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            color: "#1e3a8a",
            fontWeight: 600,
          }}
        >
          <div>Account Name</div>
          <div>Fee Amount (total) (Rs.)</div>
        </div>

        {currentFunds.map((item) => (
          <div
            key={item._id}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              marginTop: 8,
            }}
          >
            <div>• {item.name}</div>
            <div>• {item.amount * paidStudentsCount}</div>
          </div>
        ))}

        <div
          style={{
            border: "2px solid #22c55e",
            marginTop: 30,
            padding: 15,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span style={{ color: "#1e3a8a", fontWeight: 600 }}>
            Total Fee Paid (Rs.)
          </span>
          <span style={{ fontWeight: 600 }}>{totalAmount} Rs</span>
        </div>

        <p style={{ marginTop: 20, color: "#1e3a8a" }}>
          Per student Total (Rs.) –{" "}
          {Math.round(totalAmount / paidStudentsCount)} Rs
        </p>

        <div
          style={{
            border: "2px solid #eab308",
            marginTop: 20,
            padding: 15,
          }}
        >
          <p>Total Pending students :</p>
          <p>Total Pending Amount : Rs</p>
        </div>
      </div>
    </div>
  );
};

export default Funds;
