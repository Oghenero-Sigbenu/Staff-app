import React from "react";
import { motion } from "framer-motion";
import DashboardNavigation from "./DashboardMenu";
import { useLocation } from "react-router-dom";

const DashboardLayout = ({ children }) => {
  const router = useLocation();

  return (
    <>
      <div
        className={`h-screen flex justify-content items-center bg-[#fafafa] text-[#27272E]
        }`}
      >
        <aside className="hidden  h-screen w-3/12 overflow-y-auto lg:block border-r">
          <DashboardNavigation pathname={router.pathname} />
        </aside>

        <div className="h-screen w-full mx-auto  overflow-y-auto overflow-x-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className=""
          >
            {children}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
