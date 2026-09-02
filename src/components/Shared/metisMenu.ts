"use client";
import admissionLogo from "@/assets/images/admission.png";
import Enquiry from "@/assets/images/enquiry.png";
import followUp from "@/assets/images/followup.png";
import files from "@/assets/images/file.png";
import fees from "@/assets/images/fees.png";
import search from "@/assets/images/search.svg";
import subject from "@/assets/images/subject.png";
import newFaculty from "@/assets/images/faculty.png";
import Cookies from "js-cookie";
export const superAdminMenu = [
  {
    id: 1,
    icon: "calendar-check-o",
    label: "Attendance",
    to: "/erp/faculty/attendance",
    permission_code: "attendance",
  },
  {
    id: 2,
    icon: admissionLogo.src,
    label: "All Admissions",
    to: "/erp/admissions",
    displayToAll: true,
  },
  {
    id: 3,
    icon: admissionLogo.src,
    label: "Add Student",
    to: "/erp/admissions/add-student",
    displayToAll: true,
  },
  {
    id: 4,
    icon: Enquiry.src,
    label: "Enquiries",
    to: "/erp/enquiries",
    displayToAll: true,
  },
  {
    id: 4,
    icon: subject.src,
    label: "Assign Subject",
    to: "/erp/faculty/assign-subject",
    displayToAll: true,
  },
  {
    id: 5,
    icon: files.src,
    label: "File Manager",
    to: "/erp/filemanager",
    displayToAll: true,
  },
  {
    id: 6,
    icon: followUp.src,
    label: "Follow Ups",
    to: "/erp/followups",
    displayToAll: true,
  },
  {
    id: 7,
    icon: fees.src,
    label: "Fees",
    to: "/erp/fees",
  },
  {
    id: 8,
    icon: search.src,
    label: "Page Search",
    to: "/erp/pagesearch",
    displayToAll: true,
  },
  {
    id: 9,
    icon: newFaculty.src,
    label: "Add New Faculty",
    to: "/erp/admin/invite-teachers",
    displayToAll: true,
  },
  {
    id: 10,
    icon: newFaculty.src,
    label: "News management",
    to: "/erp/admin/news",
    displayToAll: true,
  },
  {
    id: 10,
    icon: newFaculty.src,
    label: "Medical Approval",
    to: "/erp/student/medicalleavelist",
    displayToAll: true,
  },
  {
    id: 11,
    icon: newFaculty.src,
    label: "Fund Distribution",
    to: "/erp/admin/funds",
    displayToAll: true,
  },
 
];
export const adminMenu = [
  {
    id: 1,
    icon: fees.src,
    label: "Fees",
    to: "/erp/fees",
  },
  // {
  //   id: 2,
  //   icon: newFaculty.src,
  //   label: "Fund Distribution",
  //   to: "/erp/admin/funds",
  //   displayToAll: true,
  // },
  {
    id: 3,
    icon: admissionLogo.src,
    label: "All Admissions",
    to: "/erp/admissions",
    displayToAll: true,
  },
  {
    id: 4,
    icon: admissionLogo.src,
    label: "Add Student",
    to: "/erp/admissions/add-student",
    displayToAll: true,
  },
];
export const teacherMenu = [
  {
    id: 1,
    icon: Enquiry.src,
    label: "Enquiries",
    to: "/erp/enquiries",
    displayToAll: true,
  },
  {
    id: 2,
    icon: followUp.src,
    label: "Follow Ups",
    to: "/erp/followups",
    displayToAll: true,
  },
  {
    id: 3,
    icon: fees.src,
    label: "Fees",
    to: "/erp/fees",
  },
  {
    id: 4,
    icon: "calendar-check-o",
    label: "My Attendance",
    to: "/erp/faculty/attendance",
  },

  {
    id: 5,
    icon: "calendar-check-o",
    label: "Marks",
    to: "/erp/marks",
  },
  {
    id: 6,
    icon: "file-text",
    label: "Progress Report",
    to: "/erp/progress-report",
  },

  {
    id: 7,
    icon: "calendar",
    label: "Student Attendance",
    to: "/erp/student/attendance",
  },
];

export const studentMenu = [
  {
    id: 1,
    icon: "calendar",
    label: "My Attendance",
    to: "/erp/student/attendance",
  },
  {
    id: 2,
    icon: "file-text",
    label: "Progress Report",
    to: "/erp/progress-report",
  },
  {
    id: 3,
    icon: fees.src,
    label: "Fees",
    to: "/erp/fees",
  },
  {
    id: 4,
    icon: "calendar-check-o",
    label: "Marks",
    to: "/erp/marks",
  },
  {
    id: 5,
    icon: Enquiry.src,
    label: "Enquiries",
    to: "/erp/enquiries",
    displayToAll: true,
  },
];

export const universityStaffMenu = [
  { id: 1, icon: "dashboard", label: "Dashboard", to: "/" },
  { id: 2, icon: "user-circle-o", label: "Staff", to: "/staff" },
  { id: 3, icon: "black-tie", label: "View Profile", to: "/viewuser" },
  { id: 4, icon: "bullhorn", label: "Holiday", to: "/holiday" },
];

export const universityAdminMenu = [
  { id: 1, icon: "dashboard", label: "Dashboard", to: "/", displayToAll: true },
  // {
  //   id: 2,
  //   icon: "",
  //   label: "Faculty Attendance",
  //   to: "/faculty/attendance",
  //   displayToAll: true,
  // },
];

export function getMenuByRole(role: string) {
  switch (role) {
    case "superadmin":
      return superAdminMenu;
    case "admin":
      return adminMenu;
    case "teacher":
      return teacherMenu;
    case "student":
      return studentMenu;
    case "universityAdmin":
      return universityAdminMenu;
    case "universityStaff":
      return universityStaffMenu;
    default:
      return [];
  }
}

export function getClientMenu(customRole?: string) {
  const role = customRole || Cookies.get("userRole") || "guest";
  return getMenuByRole(role);
}
