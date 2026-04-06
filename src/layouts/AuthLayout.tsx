import { Outlet } from "react-router-dom";
import login from "../assets/login.webp";

const AuthLayout = () => {
  return (
    <div className="flex flex-col w-full h-screen ">
      <div className="flex h-screen overflow-hidden sm:items-center sm:justify-center sm:p-0">
        <div className="p-10 pr-0 w-[55%]">
          <img
            src={login}
            alt=""
            className="object-cover h-full w-full rounded-3xl"
          />
        </div>
        <div className="md:w-full w-[45%] h-screen px-16 py-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
