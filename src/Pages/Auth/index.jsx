import { useLocation } from "react-router-dom";
import Login from "../../Components/Auth/Login";

function Auth() {
  const location = useLocation();
  return (
    <div className="flex w-full h-full">
      <div className="hidden lg:w-[50%]  relative lg:flex justify-center items-center text-center h-[100vh]">
        <h4 className="text-[3.5rem] absolute  leading-[4.5rem] text-left w-[445px]  text-white">
          Admin Dasboard .
        </h4>
        <div className="w-full h-full bg-black"></div>
      </div>

      <div className="flex w-full lg:w-[50%] justify-center relative items-center h-screen">
        {location.pathname === "/" && <Login />}
      </div>
    </div>
  );
}

export default Auth;
