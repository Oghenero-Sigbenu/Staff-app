import { Route, Routes } from "react-router-dom";
import Flight from "../Flight";
import { Home, Users } from "../index";
import Orders from "../Orders";
import Packages from "../Packages";

export default function Dasboard() {
  return (
    <>
      <Routes>
        <Route exact path="home" element={<Home />} />
        <Route exact path="users/view" element={<Users />} />
        <Route exact path="flights/view" element={<Flight />} />
        <Route exact path="orders/view" element={<Orders />} />
        <Route exact path="packages/view" element={<Packages />} />
      </Routes>
    </>
  );
}
