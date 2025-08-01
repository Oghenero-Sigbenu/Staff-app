import React from "react";
import { HiX } from "react-icons/hi";
import { IoChevronBack } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Store/auth/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const { loading, error } = useSelector((state) => state.auth);
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitForm = (userDetail) => {
    dispatch(login({ userDetail, navigate }));
  };
  return (
    <div className="w-[438px]  flex flex-col justify-center sm:w-[500px] px-[50px]">
      <div className=" mb-[37px] flex items-center  justify-between ">
        <div
          className={`  w-[30px] flex align-middle text-[#344054] items-center h-[30px] rounded-[50%] bg-[#F2F4F7] text-center cursor-pointer`}
        >
          <IoChevronBack
            size={18}
            color=""
            className={` mx-auto  text-center`}
          />
        </div>
        <div className="align-center text-center">
          <h4 className=" text-center text-kdark3 text-[24px]">Login</h4>
        </div>
        <div className=" w-[30px] flex align-middle items-center h-[30px] rounded-[50%] bg-[#F2F4F7] text-center cursor-pointer">
          <HiX
            size={18}
            color=""
            className="text-[#344054] mx-auto  text-center"
          />
        </div>
      </div>
      <form className="w-full" onSubmit={handleSubmit(submitForm)}>
        <div className="mt-[18px]">
          <label className="mb-[15px]">Email </label>
          <div className="w-full flex  mt-[.5rem] h-[54px] border border-[#CBD5E0] justify-between items-center ">
            <input
              className="w-full border-none outline-none h-full px-[22px]"
              placeholder="e.g Anthonysam@gmail.com"
              {...register("email")}
              required
            />
          </div>
        </div>

        <div className="mt-[18px]">
          <label className="mb-[15px]">Password</label>
          <div className=" mt-[.5rem] w-full flex h-[54px] border border-[#CBD5E0] justify-between items-center ">
            <input
              className="w-full border-none outline-none h-full px-[22px]"
              placeholder="Password"
              {...register("password")}
              required
            />
          </div>
        </div>

        {/* <p className="text-[red] text-center mt-[1rem]">{error?.msg</p> */}
        <div
          className={`flex justify-center items-center w-full h-[48px] mt-[2rem] rounded-[5px] text-white 
             bg-[green]
          `}
        >
          <button
            type="submit"
            className="border-none outline-none cursor-pointer w-full"
          >
            {loading ? "Loading..." : "Continue"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
