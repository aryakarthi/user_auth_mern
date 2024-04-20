import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RootLayout = () => {
  return (
    <>
      <NavBar />
      <ToastContainer limit={1} position="bottom-right" autoClose="3000" theme="colored"/>
      <Outlet />
    </>
  );
};

export default RootLayout;
