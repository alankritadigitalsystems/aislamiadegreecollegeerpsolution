"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { clearSession, userLogin } from "../../components/api/authenticationApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { faculty_id, isLoading } = useSelector(
    (state) => state.authenticationReducer
  );

  const [userType, setUserType] = useState("faculty");
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [emailEmpty, setEmailEmpty] = useState(false);
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [displayFailureMessage, setDisplayFailureMessage] = useState(true);

  // ✅ Clear session only once (NOT on every faculty_id/router change)
  useEffect(() => {
    clearSession(dispatch);
    setUserID(faculty_id || "");
  }, [dispatch]);

  // ✅ Form Validation
  const validateForm = () => {
    let emailErr = "";
    let passErr = "";

    if (!userID.trim()) emailErr = "Login ID / Email is required";
    if (!password.trim()) passErr = "Password is required";

    setEmailError(emailErr);
    setPasswordError(passErr);
    setEmailEmpty(!!emailErr);
    setPasswordEmpty(!!passErr);

    if (emailErr || passErr) {
      toast.warn("Please fill in all required fields", {
        position: "top-right",
        autoClose: 2000,
      });
      return false;
    }
    return true;
  };

  // ✅ Handle login
  const postUserLogin = () => {
    if (!validateForm()) return;

    const navigateTo = () => {
      router.push("/erp");
    };

    const payload =
      userType === "faculty"
        ? { email_id: userID, password }
        : { email_id: userID, password };

    userLogin(payload, dispatch, navigateTo, userLoginFailureCallback, userType);
  };

  const userLoginFailureCallback = () => {
    setDisplayFailureMessage(true);
    setTimeout(() => setDisplayFailureMessage(false), 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer />
      <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-8">
        <div className="text-center mb-6">
          <div className="text-5xl text-blue-600 mb-3">
            <i className="fa fa-graduation-cap"></i>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Amiruddaula Islamia Degree College
          </h2>
          <p className="text-gray-600 mt-1">
            Login to your account ({userType})
          </p>
        </div>

        {/* ✅ Toggle Faculty / Student */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setUserType("faculty")}
            className={`px-4 py-2 rounded-l-lg border ${
              userType === "faculty"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Faculty Login
          </button>
          <button
            onClick={() => setUserType("student")}
            className={`px-4 py-2 rounded-r-lg border ${
              userType === "student"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Student Login
          </button>
        </div>

        {/* ✅ Login Form */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-gray-700 font-medium mb-1 block">
              {userType === "faculty" ? "Faculty Email ID" : "Student Email ID"}
            </label>
            <input
              type="text"
              placeholder={
                userType === "faculty"
                  ? "Enter your Faculty ID"
                  : "Enter your Email ID"
              }
              value={userID}
              onChange={(e) => {
                setUserID(e.target.value);
                setEmailEmpty(false);
                setEmailError("");
              }}
              className={`w-full p-3 border rounded-lg ${
                emailEmpty ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {emailError && (
              <p className="text-sm text-red-500 mt-1">{emailError}</p>
            )}
          </div>

          <div>
            <label className="text-gray-700 font-medium mb-1 block">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordEmpty(false);
                setPasswordError("");
              }}
              onKeyUp={(e) => e.keyCode === 13 && postUserLogin()}
              className={`w-full p-3 border rounded-lg ${
                passwordEmpty ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {passwordError && (
              <p className="text-sm text-red-500 mt-1">{passwordError}</p>
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            {/* <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700 ml-2">Remember me</span>
            </label> */}
            <Link
              href="/forgotpassword"
              className="text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            onClick={postUserLogin}
            disabled={isLoading}
            className={`w-full py-3 text-white rounded-xl font-medium flex justify-center items-center ${
              isLoading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLoading ? (
              <i className="fa fa-circle-o-notch fa-spin fa-fw"></i>
            ) : (
              "Sign in"
            )}
          </button>

          <div className="text-center text-sm mt-3">
            Don’t have an account?{" "}
            <Link href="/erp/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
