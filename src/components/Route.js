// Import all components here
import Dashboard from "./university/Dashboard/Dashboard";
import Professors from "./university/Professors/Professors";
import Staff from "./university/Staff/Staff";
import Students from "./university/Students/Students";
import SubjectClass from "./university/Departments/SubjectClass";
import Courses from "./university/Courses/Courses";
import CourseDetails from "./university/Courses/CourseDetails";
import Library from "./university/Library/Library";
import Holiday from "./university/Holiday/Holiday";
import Calendar from "./university/Calendar/Calendar";
import ChatApp from "./university/ChatApp/ChatApp";
import Contact from "./university/Contact/Contact";
import FileManager from "./university/FileManager/FileManager";
import Payments from "./admin/Payments/Payments";
import Noticeboard from "./admin/Noticeboard/Noticeboard";
import Taskboard from "./admin/Taskboard/Taskboard";
import Hostel from "./admin/Hostel/Hostel";
import Transports from "./admin/Transports/Transports";
// import Attandance from "./admin/Attandance/Attandance";
import Setting from "./admin/Setting/Setting";
import SocialMedia from "./university/SocialMedia/SocialMedia";
import Email from "./university/Email/Email";
import EmailView from "./university/Email/EmailView";
import Compose from "./university/Email/Compose";
import PageSearch from "./university/Page/PageSearch";
import PageProfile from "./university/Page/PageProfile";
import PageInvoices from "./university/Page/PageInvoices";
import PagePricing from "./university/Page/PagePricing";
import PageTimeline from "./university/Page/PageTimeline";
import PageEmpty from "./university/Page/PageEmpty";
import OurCentre from "./university/OurCentre/OurCentre";
import Gallery from "./university/Gallery/Gallery";
import Login from "./Authentication/login";
import StudentRegistration from "./student/Registration";
import Signup from "./Authentication/signup";
import ForgotPassword from "./Authentication/forgotpassword";
import NotFound from "./Authentication/404";
import InternalServer from "./Authentication/500";
import AddUser from "./university/AddUser/AddUser";
import ViewUser from "./university/ViewUser/ViewUser";
import Timetable from "./university/Timetable/Timetable";
import UserAttendance from "./admin/Attandance/UserAttendance";
import ApplyLeaves from "./admin/Leave/ApplyLeaves";
import ApproveLeaves from "./admin/Leave/ApproveLeaves";
import AppliedLeaves from "./admin/Leave/AppliedLeaves";
import CreateSalary from "./admin/Salary/CreateSalary";
import ViewSalary from "./admin/Salary/ViewSalary";
import EditSalary from "./admin/Salary/EditSalary";

const Routes = [
  {
    path: "/salary/create-salary-slip",
    name: "create salary slip",
    exact: true,
    pageTitle: "Create salary slip",
    component: CreateSalary,
    permission_code: "salary"
  },
  {
    path: "/salary/view-salary-slip",
    name: "view salary slip",
    exact: true,
    pageTitle: "View Salary slips",
    component: ViewSalary,
    permission_code: "salary"
  },
  {
    path: "/salary/edit-salary-slip",
    name: "Edit salary slip",
    exact: true,
    pageTitle: "Edit Salary slips",
    component: EditSalary,
    permission_code: "salary"
  },
  {
    path: "/gallery",
    name: "gallery",
    exact: true,
    pageTitle: "Gallery",
    component: Gallery,
  },
  {
    path: "/ourCentre",
    name: "ourCentre",
    exact: true,
    pageTitle: "OurCentre",
    component: OurCentre,
  },
  {
    path: "/pageEmpty",
    name: "pageEmpty",
    exact: true,
    pageTitle: "PageEmpty",
    component: PageEmpty,
  },
  {
    path: "/pageTimeline",
    name: "pageTimeline",
    exact: true,
    pageTitle: "PageTimeline",
    component: PageTimeline,
  },
  {
    path: "/pagePricing",
    name: "pagePricing",
    exact: true,
    pageTitle: "PagePricing",
    component: PagePricing,
  },
  {
    path: "/pageInvoices",
    name: "pageInvoices",
    exact: true,
    pageTitle: "PageInvoices",
    component: PageInvoices,
  },
  {
    path: "/pageProfile",
    name: "pageProfile",
    exact: true,
    pageTitle: "PageProfile",
    component: PageProfile,
  },
  {
    path: "/pageSearch",
    name: "pageSearch",
    exact: true,
    pageTitle: "PageSearch",
    component: PageSearch,
  },
  {
    path: "/compose",
    name: "compose",
    exact: true,
    pageTitle: "Compose",
    component: Compose,
  },
  {
    path: "/emailView",
    name: "emailView",
    exact: true,
    pageTitle: "EmailView",
    component: EmailView,
  },
  {
    path: "/email",
    name: "email",
    exact: true,
    pageTitle: "Email",
    component: Email,
  },
  {
    path: "/socialMedia",
    name: "socialMedia",
    exact: true,
    pageTitle: "socialMedia",
    component: SocialMedia,
  },
  {
    path: "/setting",
    name: "setting",
    exact: true,
    pageTitle: "setting",
    component: Setting,
  },
  // {
  //   path: "/leave",
  //   name: "leave",
  //   exact: true,
  //   pageTitle: "leave",
  //   component: Leave,
  // },
  {
    path: "/leave/apply-leave",
    name: "apply leave",
    exact: true,
    pageTitle: "leave",
    component: ApplyLeaves,
  },
  {
    path: "/leave/approve-leaves",
    name: "approve leaves",
    exact: true,
    pageTitle: "leave",
    component: ApproveLeaves,
    permission_code: "approve_leave"
  },
  {
    path: "/leave/applied-leaves",
    name: "applied leaves",
    exact: true,
    pageTitle: "leave",
    component: AppliedLeaves,
  },
  // {
  //   path: "/attandance",
  //   name: "attandance",
  //   exact: true,
  //   pageTitle: "attandance",
  //   component: Attandance,
  //   permission_code: "attendance",
  // },
  {
    path: "/transports",
    name: "transports",
    exact: true,
    pageTitle: "transports",
    component: Transports,
  },
  {
    path: "/hostel",
    name: "hostel",
    exact: true,
    pageTitle: "hostel",
    component: Hostel,
  },
  {
    path: "/taskboard",
    name: "taskboard",
    exact: true,
    pageTitle: "taskboard",
    component: Taskboard,
  },
  {
    path: "/noticeboard",
    name: "noticeboard",
    exact: true,
    pageTitle: "noticeboard",
    component: Noticeboard,
  },
  {
    path: "/payments",
    name: "payments",
    exact: true,
    pageTitle: "Payments",
    component: Payments,
  },
  {
    path: "/filemanager",
    name: "filemanager",
    exact: true,
    pageTitle: "FileManager",
    component: FileManager,
  },
  {
    path: "/contact",
    name: "contact",
    exact: true,
    pageTitle: "Contact",
    component: Contact,
  },
  {
    path: "/chat",
    name: "chatApp",
    exact: true,
    pageTitle: "ChatApp",
    component: ChatApp,
  },
  {
    path: "/events",
    name: "calendar",
    exact: true,
    pageTitle: "Calendar",
    component: Calendar,
  },
  {
    path: "/holiday",
    name: "holiday",
    exact: true,
    pageTitle: "Holiday",
    component: Holiday,
    permission_code: "holiday",
  },
  {
    path: "/library",
    name: "library",
    exact: true,
    pageTitle: "Library",
    component: Library,
  },
  {
    path: "/courses",
    name: "courses",
    exact: true,
    pageTitle: "Courses",
    component: Courses,
  },
  {
    path: "/courseDetails",
    name: "courseDetails",
    exact: true,
    pageTitle: "CourseDetails",
    component: CourseDetails,
  },
  {
    path: "/subjectClass",
    name: "SubjectClass",
    exact: true,
    pageTitle: "SubjectClass",
    component: SubjectClass,
    permission_code: "subject_and_class",
  },
  {
    path: "/students",
    name: "students",
    exact: true,
    pageTitle: "Students",
    component: Students,
  },
  {
    path: "/staff",
    name: "staff",
    exact: true,
    pageTitle: "Staff",
    component: Staff,
  },
  {
    path: "/addUser",
    name: "addUser",
    exact: true,
    pageTitle: "Add User",
    isAddUser: true,
    component: AddUser,
    permission_code: "create_user"
  },
  {
    path: "/viewuser",
    name: "viewUser",
    exact: true,
    pageTitle: "View User",
    component: ViewUser,
  },
  {
    path: "/timetable",
    name: "timetable",
    exact: true,
    pageTitle: "Timetable",
    component: Timetable,
    permission_code: "timetable",
  },
  {
    path:"/myAttendance",
    name:"myAttendance",
    exact:true,
    pageTitle:"My Attendance",
    component:UserAttendance
  },
  {
    path: "/professors",
    name: "professors",
    exact: true,
    pageTitle: "Professors",
    component: Professors,
  },
  {
    path: "/",
    name: "dashboard",
    exact: true,
    pageTitle: "Dashboard",
    component: Dashboard,
    permission_code: "news_notice",
  },
  {
    path: "/login",
    name: "login",
    exact: true,
    pageTitle: "Tables",
    component: Login,
  },
  {
    path: "/studentRegistration",
    name: "studentRegistration",
    exact: true,
    pageTitle: "Student Registration",
    component: StudentRegistration,
  },
  {
    path: "/signup",
    name: "signup",
    exact: true,
    pageTitle: "Tables",
    component: Signup,
  },
  {
    path: "/forgotpassword",
    name: "forgotpassword",
    exact: true,
    pageTitle: "Tables",
    component: ForgotPassword,
  },
  {
    path: "/notfound",
    name: "notfound",
    exact: true,
    pageTitle: "Tables",
    component: NotFound,
  },
  {
    path: "/internalserver",
    name: "internalserver",
    exact: true,
    pageTitle: "Tables",
    component: InternalServer,
  },
];

export default Routes;
