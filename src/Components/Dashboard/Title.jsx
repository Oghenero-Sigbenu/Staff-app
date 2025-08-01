import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardNavigation from "./DashboardMenu";

import { FiMenu } from "react-icons/fi";
import { BsArrowLeft } from "react-icons/bs";
const TitleNav = ({ pathname, path, menuOpen, setMenuOpen }) => {
  return (
    <div className="py-5  px-4 lg:px-8 lg:py-5 w-full border-b bg-white">
      <div className="flex items-end gap-4  justify-between">
        <div className="flex items-center gap-6">
          {path && (
            <a href={path}>
              <BsArrowLeft className="text-green" />
            </a>
          )}
          <h3 className=" px-8 text-[1.2rem] text-green font-semibold">
            {pathname}
          </h3>
        </div>
        <FiMenu
          className="md:hidden  w-8 text-black cursor-pointer"
          onClick={() => setMenuOpen(true)}
        />
      </div>

      {/* mobile menu start */}
      {menuOpen && (
        <div
          className="fixed left-0 right-0 bottom-0 h-screen w-full lg:hidden bg-[#0000003d] z-[99999]"
          onClick={() => setMenuOpen(false)}
        >
          <AnimatePresence>
            <motion.div
              initial={{ x: -100 }}
              animate={{ x: 0 }}
              exit={{ x: -100 }}
              className="fixed top-0 left-0 bg-white h-screen"
              onClick={(e) => e.stopPropagation()}
            >
              <DashboardNavigation pathname={pathname} />
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* mobile menu end */}
    </div>
  );
};

export default TitleNav;
