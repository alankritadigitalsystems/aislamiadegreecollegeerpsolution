"use client";
import React, { Component } from "react";
import ToolTip from "@/components/common/toolTip";

// ✅ React Icons
import { FaCloudUploadAlt, FaFolder, FaFilePdf, FaFileWord, FaFileExcel } from "react-icons/fa";
import { FiChevronUp, FiX } from "react-icons/fi";

export default class FileManager extends Component {
  render() {
    return (
      <div className=" px-20">
        {/* ===== HEADER ===== */}
        <div className="section-body bg-gray-50 border-b">
          <div className="container-fluid py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">File Manager</h1>
                <ol className="text-sm text-gray-500 flex gap-2 mt-2 -ml-8 ">
                  <li>
                    <button onClick={() => window.history.back()} className="hover:text-blue-600 font-medium">
                      Amiruddaula Islamia Degree College
                    </button>
                  </li>
                  <li>/ App /</li>
                  <li className="text-blue-600 font-semibold">File Manager</li>
                </ol>
              </div>

              <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium flex items-center gap-2 transition-all">
                <FaCloudUploadAlt className="text-lg" />
                Upload File
              </button>
            </div>
          </div>
        </div>

        {/* ===== RECENT FILES ===== */}
        <div className="section-body mt-6">
          <div className="container-fluid">
            <div className="bg-white shadow-md rounded-xl overflow-hidden mb-6">
              <div className="flex justify-between items-center border-b p-4">
                <h3 className="font-semibold text-gray-800">Recently Accessed Files</h3>
                <div className="flex gap-3 text-gray-500">
                  <button><FiChevronUp /></button>
                  <button><FiX /></button>
                </div>
              </div>

              <div className="p-4 flex gap-6 flex-wrap">
                {/* Folder */}
                <div className="flex gap-3 cursor-pointer hover:bg-gray-100 p-3 rounded-lg transition">
                  <FaFolder className="text-green-600 text-3xl" />
                  <div>
                    <p className="font-medium text-gray-700">Family</p>
                    <small className="text-gray-500">3 Files, 1.2GB</small>
                  </div>
                </div>

                {/* Word File */}
                <div className="flex gap-3 cursor-pointer hover:bg-gray-100 p-3 rounded-lg transition">
                  <FaFileWord className="text-blue-600 text-3xl" />
                  <div>
                    <p className="font-medium text-gray-700">Report2017.doc</p>
                    <small className="text-gray-500">68KB</small>
                  </div>
                </div>

                {/* PDF */}
                <div className="flex gap-3 cursor-pointer hover:bg-gray-100 p-3 rounded-lg transition">
                  <FaFilePdf className="text-red-600 text-3xl" />
                  <div>
                    <p className="font-medium text-gray-700">Report2017.pdf</p>
                    <small className="text-gray-500">68KB</small>
                  </div>
                </div>
              </div>
            </div>

            {/* ===== FILE TABLE ===== */}
            <div className="bg-white rounded-xl shadow-md">
              <div className="p-4 border-b">
                <h3 className="font-semibold text-gray-800">All Files</h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                    <tr>
                      <th className="p-3"></th>
                      <th className="p-3">Name</th>
                      <th className="p-3">Shared With</th>
                      <th className="p-3">Owner</th>
                      <th className="p-3">Last Update</th>
                      <th className="p-3 text-center">Size</th>
                    </tr>
                  </thead>

                  <tbody className="text-gray-800">
                    {[
                      { icon: <FaFolder />, name: "Work", share: 3, owner: "Me", date: "Oct 7, 2018", size: "-" },
                      { icon: <FaFolder />, name: "Family", share: 0, owner: "Me", date: "Oct 17, 2018", size: "-" },
                      { icon: <FaFolder className="text-red-600" />, name: "Holidays", share: 0, owner: "John", date: "Oct 18, 2018", size: "50MB" },
                      { icon: <FaFolder />, name: "Mobile Work", share: 0, owner: "Me", date: "Apr 7, 2019", size: "1GB" },
                      { icon: <FaFileExcel className="text-green-600" />, name: "new timesheet.xlsx", share: 0, owner: "Me", date: "Dec 5, 2018", size: "52KB" },
                      { icon: <FaFileWord className="text-yellow-600" />, name: "new project.doc", share: 0, owner: "Me", date: "May 5, 2019", size: "152KB" },
                      { icon: <FaFilePdf className="text-red-600" />, name: "report.pdf", share: 0, owner: "Me", date: "May 2, 2019", size: "841KB" },
                    ].map((file, idx) => (
                      <tr key={idx} className="border-b hover:bg-gray-50 transition">
                        <td className="p-3 text-xl">{file.icon}</td>
                        <td className="p-3 font-medium">{file.name}</td>
                        <td className="p-3">
                          {file.share === 0 ? "-" : <span className="text-sm bg-gray-200 px-2 py-1 rounded">{file.share} users</span>}
                        </td>
                        <td className="p-3">{file.owner}</td>
                        <td className="p-3">{file.date}</td>
                        <td className="p-3 text-center">{file.size}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
