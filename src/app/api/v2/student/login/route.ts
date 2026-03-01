import { studentLogin } from "@/controllers/studentLoginController";

export async function POST(request: Request) {
  return studentLogin(request);
}
