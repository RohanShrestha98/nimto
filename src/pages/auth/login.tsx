/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { useAuthStore } from "@/store/useAuthStore";
import { useAuthMutation } from "@/hooks/useMutateData";
import Button from "@/ui/Button";
import InputText from "@/ui/InputText";
import toast from "react-hot-toast";
import { LuMail } from "react-icons/lu";
import { FiLock } from "react-icons/fi";

const loginSchema = Yup.object().shape({
  email: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

const Login = () => {
  const { setUser } = useAuthStore();
  const authMutation = useAuthMutation();
  const [error, setError] = useState();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(loginSchema),
  });

  const onSubmitHandler = async (data) => {
    try {
      const result = await authMutation.mutateAsync(["post", "", data]);
      setUser({
        token: result?.data?.access,
        refresh: result?.data?.access,
        data: result?.data,
      });
      toast.success("Login successfully");
      result?.data?.role == "Staff" ? navigate("/user-product") : navigate("/");
      reset();
    } catch (error) {
      toast.error(error?.response?.data?.error);
      setError(error?.response?.data?.error);
    }
  };

  return (
    //
    <div className=" flex flex-col ">
      <div className="flex md:justify-center ml-[-30px] gap-1 items-center ">
        <img className="h-8 w-8" src={logo} alt="logo" />
        <div className="font-bold text-[#121212] flex flex-col">
          <p>POS</p>
          {/* <p className="mt-[-6px]">App</p> */}
        </div>
      </div>
      <div className="flex flex-col mt-20 md:justify-center">
        <div className="flex flex-col ">
          <div className="flex flex-col gap-1 mb-6 md:items-center tracking-tight md:justify-center  ">
            <p className=" text-4xl font-semibold ">Welcome to App</p>
            <p className="text-normalText text-base tracking-[-1%] font-normal leading-6">
              Fill in the credentials below to login
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className="flex w-full flex-col gap-3 md:px-4 "
          >
            <InputText
              label="Email"
              icon={<LuMail />}
              className=" text-sm"
              register={register}
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              error={errors?.email?.message}
            />
            <InputText
              label="Password"
              required
              icon={<FiLock />}
              className="bg-white w-full text-sm"
              register={register}
              name="password"
              type="password"
              placeholder="Password"
              error={errors?.password?.message}
            />
            <p className="text-red-600 text-xs">{error}</p>
            <Button
              buttonName={"Login"}
              className={"w-full h-10 font-normal bg-primary"}
              icon={undefined}
            />
          </form>
        </div>
        <div className="flex whitespace-nowrap justify-center tracking-tight text-base gap-1 mt-6">
          <p className="text-normalText font-normal">
            Don’t have an account ?{" "}
          </p>

          <p
            onClick={() => navigate("/signup")}
            className="text-primary cursor-pointer font-medium underline"
          >
            Register
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
