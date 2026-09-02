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
        const res = await fetch(userId ? `/api/v2/auth/me?userId=${userId}` : "/api/v2/auth/me");
        const data = await res.json();
        if (data.success && data.user) {
          setUser(data.user);
        }
      } catch (error) {
        console.error("Error fetching authentic profile from DB:", error);
      }
    };

    fetchProfile();
  }, [setUser]);


  return <Layout />;
}
