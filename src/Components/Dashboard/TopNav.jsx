import { useState, useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
// import GenerateHeaders from "../../utils/Header";
import { MdLogout } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import { BiArrowBack, BiUserCircle } from "react-icons/bi";

import { IoIosArrowDown } from "react-icons/io";

const TopMenuNav = ({ TitleHeader }) => {
  const location = useLocation();

  // const userDetails = useSelector(
  //   (state) => state.auth?.userDetails?.userDetails
  // );
  // const userType = userDetails?.user?.user_type;

  // const FullName = useSelector(
  //   (state) => state.auth?.userDetails?.profileDetails?.personal?.full_name
  // );

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    sessionStorage.clear();
    // dispatch(LogoutState());
    navigate("/");
  };

  return (
    <>
      <div className="bg-[transparent] z-50 lg:bg-[#ffffff] w-auto overflow-x-hidden lg:shadow lg:sticky top-0 ">
        <div className="p-4 w-full">
          <div className="flex w-full justify-between">
            <div className=" flex justify-between items-center gap-[10px] lg:ml-[2rem]">
              <p
                className={`${
                  location.pathname !== "/dashboard" ? "" : "hidden"
                } text-[10px] lg:text-2xl cursor-pointer`}
                onClick={() => navigate(-1)}
              >
                <BiArrowBack className="w-[18px] lg:w-[20px]" />
              </p>

              <p className=" font-MontserratMain  font-[600] text-[14px] lg:text-[24px] text-[#131523] uppercase">
                {TitleHeader}
              </p>
            </div>
            <div className="flex  gap-[7px] lg:gap-[11px] items-center">
              <ProfileImage
                // handleImageChange={handleImageChange}
                loading={loading}
              />
              <UserInfo
                // userName={FullName}
                // userType={userType}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                logout={logout}
              />
            </div>
          </div>
        </div>
      </div>
      {isOpen && <DropdownMenu logout={logout} />}
    </>
  );
};

TopMenuNav.propTypes = {
  TitleHeader: PropTypes.string.isRequired,
};

const ProfileImage = ({ loading }) => (
  <div className="flex  gap-[3px] lg:gap-[11px] items-center cursor-pointer">
    <div className="h-[20px] w-[20px] lg:h-[50px] lg:w-[50px] rounded-full bg-green-100 overflow-hidden relative">
      <input
        type="file"
        id="file-upload"
        className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
        // onChange={handleImageChange}
        accept=".jpg, .jpeg, .png, .gif"
        disabled={loading}
      />
      <label htmlFor="file-upload">
        <BiUserCircle className="w-full h-full object-cover" />
      </label>
    </div>
  </div>
);

const UserInfo = ({ userName, userType, isOpen, setIsOpen }) => (
  <div
    className="flex gap-[3px] lg:gap-[11px] items-center cursor-pointer"
    onClick={() => setIsOpen(!isOpen)}
  >
    <p className="capitalize text-[8px] lg:text-[14px] text-[#5A607F] font-[500]">
      {userType === "super_admin"
        ? "Admin"
        : userName !== "undefined"
        ? userName
        : "Welcome"}
    </p>
    <IoIosArrowDown />
  </div>
);

const DropdownMenu = ({ logout }) => (
  <div className="bg-white fixed z-[9999999999] rounded-[10px] right-[20px] py-[12px]">
    <Link to="/update-photo">
      <div className="flex items-center gap-[10px] border-b py-[12px] hover:bg-slate-100 cursor-pointer px-[20px]">
        <FaUser />
        <p className="text-[##404040] text-[14px]">Profile</p>
      </div>
    </Link>

    <div
      className="flex items-center gap-[10px] border-b py-[12px] hover:bg-slate-100 cursor-pointer px-[20px]"
      onClick={logout}
    >
      <MdLogout className=" text-2xl" />
      <p className="text-[##404040] text-[14px]">Log out</p>
    </div>
  </div>
);

DropdownMenu.propTypes = {
  logout: PropTypes.func.isRequired,
  userType: PropTypes.string,
};

export default TopMenuNav;
