import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { FiHome, FiLogOut } from "react-icons/fi";
import { motion } from "framer-motion";
import { logout } from "../../Store/auth/au";
import { useDispatch } from "react-redux";
import { RiHome6Line } from "react-icons/ri";
import { FiShoppingCart, FiUsers } from "react-icons/fi";

const DashboardMenu = ({ pathname }) => {
  const navigate = useNavigate();
  const [data] = useState([]);
  const [open] = useState(false);
  const [hover, setHover] = useState(false);
  const [activeHover, setActiveHover] = useState(false);
  const dispatch = useDispatch();

  const handleDropDown = () => {};
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const goTo = (item) => {
    navigate(item);
  };

  const showHover = (status, item) => {
    setHover(status);
    setActiveHover(item);
  };

  const user = {};

  const privateRoute = [
    // {
    //   path: "/dashboard/home",
    //   title: "Home",
    //   sub: false,
    //   icon: <RiHome6Line className="" />,
    // },
    // {
    //   title: "Hotel Management",
    //   sub: false,
    //   path: "/dashboard/hotels/view",
    //   icon: <FiHome className="" />,
    // },
    {
      title: "Flight Management",
      path: "/dashboard/flights/view",

      sub: false,
      icon: <FiShoppingCart className="" />,
    },
    // {
    //   title: "Customer Management",
    //   path: "/dashboard/orders/view",
    //   sub: false,
    //   icon: <FiShoppingCart className="" />,
    // },
    // {
    //   title: "Tour Management",

    //   path: "/dashboard/packages/view",
    //   sub: false,
    //   icon: <FiShoppingCart className="" />,
    // },
    // {
    //   title: "Transfer Management",

    //   path: "/dashboard/transfers/view",
    //   sub: false,
    //   icon: <FiShoppingCart className="" />,
    // },
  ];
  return (
    <>
      <div
        className={` justify-between h-full relative py-6 overflow-y-auto bg-[black] text-white"}`}
      >
        <div>
          <div className="flex justify-between items-center gap-2 p-3 mx-5 lg:mx-8">
            <Link href="/" className="flex items-center justify-center">
              {/* <img src={Logo} alt="Arad" className="max-h-7 mx-auo" /> */}
              <h4
                className={`ml-[7px]  text-white text-[21px] font-bold sm:text-[24px]`}
              >
                Logo
              </h4>
            </Link>
          </div>

          <div className="flex flex-col justify-center mt-8  pl-3 ml-5 lg:ml-8">
            {privateRoute && (
              <>
                {privateRoute?.map(({ path, title, icon, sub, subMenu }, i) => (
                  <div
                    key={i}
                    // href={path}
                    onClick={() => goTo(path)}
                    className={` py-2 mb-2 md:mb-[1.5rem] relative  cursor-pointer  flex pr-[1.5rem]  ${
                      pathname === path
                        ? " text-[#838583] font-[800] border-r-2  "
                        : " text-white  font-light"
                    } 
                     
         `}
                    onMouseEnter={() => showHover(true, title)}
                    onMouseLeave={() => showHover(false)}
                  >
                    <span className="">{icon}</span>
                    <span className="text-sm font-medium  ml-[1rem]">
                      {title}
                    </span>
                    {title === "Livestream" ? (
                      <span className="bg-red-400 text-white w-4 h-4 text-[.6rem] items-center flex justify-center text-center rounded-full">
                        {data?.length}
                      </span>
                    ) : (
                      ""
                    )}

                    {hover && activeHover === title && sub && (
                      <motion.ul
                        whileInView={{ y: [-20, 0] }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        tabIndex="0"
                        className="bg-white dropdown-content absolute left-[10%] top-5 menu rounded px-3 py-2 w-[175px] z-[1000] border shadow-md bg-base-100 divide-y"
                      >
                        {subMenu?.map(({ path, title }, i) => (
                          <li key={i}>
                            <a href={path} passHref={true}>
                              <p
                                // target={domain == "blog" ? "_blank" : ""}
                                className="p-2 text-[.5rem] md:text-[1rem] hover:text-primary dropdown dropdown-hover dropdown-right active:bg-primary active:bg-opacity-10"
                              >
                                {title}
                              </p>
                            </a>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="bg-[red] ml-[3rem] mt-[28rem] text-white px-[1rem] md:px-[2rem] py-[.5rem] rounded-[5px]"
          >
            Logout
          </button>
        </div>

        <div
          className="flex bottom-[8rem] w-full md:bottom-[10px] absolute md:justify-between gap-2 mx-5 border-t border-[#efefef] pt-7 lg:mx-6 text-sm cursor-pointer dropdown dropdown-top"
          tabIndex="0"
        >
          <div className="flex gap-3 items-center">
            <div className="text-kdark3">
              <h2>
                {user?.username
                  ? `${user?.username.slice(0, 15)}${
                      user?.username?.length > 15 ? "..." : ""
                    }`
                  : "Name"}
              </h2>
              <h2
                className={`text-xs text-[#AAAAAA] text-kdark3
                }`}
              >
                {user?.email
                  ? `${user?.email?.slice(0, 22)}${
                      user?.email?.length > 22 ? "..." : ""
                    }`
                  : "Email"}
              </h2>
            </div>
          </div>
          {!open && (
            <IoChevronDown
              className={`text-xl float-right text-kdark3
              `}
              onClick={handleDropDown}
            />
          )}
          {open && (
            <IoChevronUp
              className={`text-xl float-righttext-kdark3
              `}
              onClick={handleDropDown}
            />
          )}
          {open && (
            <ul
              tabIndex="0"
              className={`absolute bottom-[90px] x menu w-[80%]  py-2 mx-auto shadow bg-[#fff] text-kdark3
              `}
            >
              <li
                className="px-2 py-[.8rem] border-t-[#ebe9e9] border-t-[1px]"
                onClick={handleLogout}
              >
                <span className="flex hover:text-red-500  ">
                  <FiLogOut className="w-6 h-4 " />
                  <p className="mr-4">Logout</p>
                </span>
              </li>
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardMenu;
