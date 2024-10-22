import React from "react";
import { redirect } from "next/navigation";
function page() {
  return redirect("/page/Dashboard/Home");
}

export default page;
