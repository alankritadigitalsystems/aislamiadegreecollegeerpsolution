"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import useAuthStore from "../../store/useAuthStore";
import Cookies from "js-cookie";

const Layout = dynamic(() => import("@/components/Shared/Layout"), {
  ssr: false,
});

export default function HomePage() {
  const { setUser } = useAuthStore();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = Cookies.get("userId");
        if (!userId) throw new Error("No userId in cookies");

        const res = await fetch(`/api/v2/faculty/FacultyByID?_id=${userId}`);
        const data = await res.json();
        const normalized = {
          ...data,
          first_name: data?.full_name?.first_name || "",
          last_name: data?.full_name?.last_name || "",
          email: data?.email_id || "",
          mobile: data?.mobile_number || "",
          gender: data?.gender || "",
          profile_picture: data?.profile_picture || "",
          date_of_joining: data?.date_of_joining?.split("T")[0] || "",
          date_of_retirement: data?.date_of_retirement?.split("T")[0] || "",
          role: data?.role || "",
        };
//
        setUser(normalized);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [setUser]);


  return <Layout />;
}
