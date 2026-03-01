import { cookies } from "next/headers";
import { getMenuByRole } from "@/components/Shared/metisMenu";

export interface MenuItem {
  id: number;
  icon: string;
  label: string;
  to: string;
  displayToAll?: boolean;
  permission_code?: string;
}

export async function getServerMenu(): Promise<MenuItem[]> {
  const cookieStore = await cookies();
  const role: string = cookieStore.get("userRole")?.value || "guest";
  return getMenuByRole(role);
}
