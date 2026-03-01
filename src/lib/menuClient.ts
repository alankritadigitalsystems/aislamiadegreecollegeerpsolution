"use client";
import Cookies from "js-cookie";
import { getMenuByRole } from "@/components/Shared/metisMenu";

export interface MenuItem {
  id: number;
  icon: string;
  label: string;
  to: string;
  displayToAll?: boolean;
  permission_code?: string;
}

export function getClientMenu(): MenuItem[] {
  const role: string = Cookies.get("userRole") || "guest";
  return getMenuByRole(role);
}
