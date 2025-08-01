import React from "react";
import { HiX } from "react-icons/hi";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/admin");
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
      <form className="w-full">
        <div className="mt-[18px]">
          <label className="mb-[15px]">Email </label>
          <div className="w-full flex  mt-[.5rem] h-[54px] border border-[#CBD5E0] justify-between items-center ">
            <input
              name="email"
              className="w-full border-none outline-none h-full px-[22px]"
              placeholder="e.g Anthonysam@gmail.com"
            />
          </div>
        </div>

        <div className="mt-[18px]">
          <label className="mb-[15px]">Password</label>
          <div className=" mt-[.5rem] w-full flex h-[54px] border border-[#CBD5E0] justify-between items-center ">
            <input
              name="password"
              className="w-full border-none outline-none h-full px-[22px]"
              placeholder="Password"
            />
          </div>
        </div>

        {/* <p className="text-[red] text-center mt-[1rem]">{error?.msg</p> */}
        <div
          className={`flex justify-center items-center w-full h-[48px] mt-[21px] rounded-[5px] text-white 
             bg-green
          `}
        >
          <button
            type="submit"
            className="border-none outline-none cursor-pointer w-full"
          >
            Continue
          </button>
        </div>
      </form>
      <div
        className={`flex text-[#718096] w-[100%] justify-center absolute bottom-[2rem] right-auto left-auto  mt-[50px] cursor-pointer text-[16px]`}
      >
        <p className="text-left ml-[5rem] w-full">
          {" "}
          Have an account?{" "}
          <span className="text-[#F04438]" onClick={goHome}>
            {" "}
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}
