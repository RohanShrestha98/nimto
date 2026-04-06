import { Outlet } from "react-router-dom";
import Header from "@/pages/website/Header";

export default function BaseLayout() {
  return (
    <div className=" cursor-default">
      <Header />
      <Outlet />
    </div>
  );
}
