import { Suspense } from "react";
import FacultySignupClient from "./FacultySignupClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
      <FacultySignupClient />
    </Suspense>
  );
}
