import { Button } from "flowbite-react";
import { FaHome } from "react-icons/fa";
import { FaBlog, FaUser, FaUsers } from "react-icons/fa6";
import { BiSolidDonateBlood } from "react-icons/bi";
import { IoIosCreate } from "react-icons/io";
import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import useProfile from "../hooks/useProfile";
import './Das.css'

const Dashboard = () => {
  let [open, setOpen] = useState(false);
  const [loggedInUser] = useProfile();
  // ToDo: get isAdmin value from the database
  const role = loggedInUser.role;
  return (
    <div
      data-aos="fade-up"
      data-aos-duration="1500"
      className="flex max-w-full mx-auto"
    >
      {/* dashboard side bar */}
      <div className="w-64 min-h-screen bg-[#ffb8b0] hidden md:block">
        <ul className="menu px-4 mt-10 space-y-4">
          {/* donor access navbar */}
          {role === "donor" && (
            <>
              <li>
                <NavLink to="/dashboard/user-home">
                  <Button className="w-full failure-button">
                    <FaHome className="mr-2"></FaHome>User Home
                  </Button>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/user-profile">
                  <Button className="w-full  failure-button" >
                    <FaUser className="mr-2"></FaUser>User Profile
                  </Button>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/my-donation-request">
                  <Button className="w-full  failure-button">
                    <BiSolidDonateBlood className="mr-2"></BiSolidDonateBlood>My
                    Donation Request
                  </Button>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/create-donation-request">
                  <Button className="w-full failure-button" >
                    <IoIosCreate className="mr-2"></IoIosCreate>Create Donation
                    Request
                  </Button>
                </NavLink>
              </li>
            </>
          )}
          {/* admin access navbar */}
          {role === "admin" && (
            <>
              <li>
                <NavLink to="/dashboard/admin-home">
                  <Button className="w-full failure-button" >
                    <FaHome className="mr-2"></FaHome>Admin Home
                  </Button>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/user-profile">
                  <Button className="w-full  failure-button" >
                    <FaUser className="mr-2"></FaUser>User Profile
                  </Button>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/all-users">
                  <Button className="w-full failure-button">
                    <FaUsers className="mr-2"></FaUsers>All Users
                  </Button>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/all-donation-request">
                  <Button className="w-full  failure-button" >
                    <IoIosCreate className="mr-2"></IoIosCreate>All Donation
                    Request
                  </Button>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/content-management">
                  <Button className="w-full  failure-button" >
                    <FaBlog className="mr-2"></FaBlog>Content Management
                  </Button>
                </NavLink>
              </li>
            </>
          )}
          {/* volunter access navbar */}
          {role === "volunteer" && (
            <>
              <li>
                <NavLink to="/dashboard/admin-home">
                  <Button className="w-full failure-button" >
                    <FaHome className="mr-2"></FaHome>Volunteer Home
                  </Button>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/user-profile">
                  <Button className="w-full failure-button" >
                    <FaUser className="mr-2"></FaUser>User Profile
                  </Button>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/all-donation-request">
                  <Button className="w-full failure-button" >
                    <IoIosCreate className="mr-2"></IoIosCreate>All Donation
                    Request
                  </Button>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/content-management">
                  <Button className="w-full failure-button">
                    <FaBlog className="mr-2"></FaBlog>Content Management
                  </Button>
                </NavLink>
              </li>
            </>
          )}
          <span>
            <hr className="my-10"></hr>
          </span>
          <li>
            <NavLink to="/">
              <Button className="w-full failure-button" >
                <FaHome className="mr-2"></FaHome>Back To Home
              </Button>
            </NavLink>
          </li>
        </ul>
      </div>
      {/* mobile responsive */}
      <div
        onClick={() => setOpen(!open)}
        className="z-[1000] text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
      >
        {open ? (
          <AiOutlineClose></AiOutlineClose>
        ) : (
          <AiOutlineMenu></AiOutlineMenu>
        )}
      </div>
      <div
        className={`z-[10] md:hidden absolute bg-red-100 left-0 w-full px-8 pb-4 transition-all duration-500 ease-in ${
          open ? "top-0 opacity-100" : "left-[-490px]"
        } opacity-0`}
      >
        {/* donor nav mobile */}
        {role === "donor" && (
          <>
            {" "}
            <ul className="md:flex md:items-center gap-5">
              {" "}
              <li className="md:ml-8 text-xl md:my-0 mt-7 mb-3">
                <NavLink to="/dashboard/user-home">
                  <Button
                    className="w-64 md:w-full failure-button"
                  >
                    <FaHome className="mr-2"></FaHome>User Home
                  </Button>
                </NavLink>
              </li>
              <li className="md:ml-8 text-xl md:my-0 mb-3">
                <NavLink to="/dashboard/user-profile">
                  <Button
                    className="w-64 md:w-full failure-button"
                  >
                    <FaUser className="mr-2"></FaUser>User Profile
                  </Button>
                </NavLink>
              </li>
              <li className="md:ml-8 text-xl md:my-0 mb-3">
                <NavLink to="/dashboard/my-donation-request">
                  <Button
                    className="w-64 md:w-full failure-button"
                  >
                    <BiSolidDonateBlood className="mr-2"></BiSolidDonateBlood>My
                    Donation Request
                  </Button>
                </NavLink>
              </li>
              <li className="md:ml-8 text-xl md:my-0 mb-3">
                <NavLink to="/dashboard/create-donation-request">
                  <Button
                    className="w-64 md:w-full failure-button"
                  >
                    <IoIosCreate className="mr-2"></IoIosCreate>Create Donation
                    Request
                  </Button>
                </NavLink>
              </li>
            </ul>
          </>
        )}
        {/* admin nav mobile */}
        {role === "admin" && (
          <>
            {" "}
            <ul className="md:flex md:items-center gap-5">
              {" "}
              <li className="md:ml-8 text-xl md:my-0 mt-7 mb-3">
                <NavLink to="/dashboard/admin-home">
                  <Button
                    className="w-64 md:w-full failure-button"
                  >
                    <FaHome className="mr-2"></FaHome>Admin Home
                  </Button>
                </NavLink>
              </li>
              <li className="md:ml-8 text-xl md:my-0 mb-3">
                <NavLink to="/dashboard/user-profile">
                  <Button
                    className="w-64 md:w-full failure-button"
                  >
                    <FaUser className="mr-2"></FaUser>User Profile
                  </Button>
                </NavLink>
              </li>
              <li className="md:ml-8 text-xl md:my-0 mb-3">
                <NavLink to="/dashboard/all-users">
                  <Button
                    className="w-64 md:w-full failure-button"
                  >
                    <FaUsers className="mr-2"></FaUsers>All Users
                  </Button>
                </NavLink>
              </li>
              <li className="md:ml-8 text-xl md:my-0 mb-3">
                <NavLink to="/dashboard/all-donation-request">
                  <Button
                    className="w-64 md:w-full failure-button"
                  >
                    <IoIosCreate className="mr-2"></IoIosCreate>All Donation
                    Request
                  </Button>
                </NavLink>
              </li>
              <li className="md:ml-8 text-xl md:my-0 mb-3">
                <NavLink to="/dashboard/content-management">
                  <Button
                    className="w-64 md:w-full failure-button"
                  >
                    <FaBlog className="mr-2"></FaBlog>Content Management
                  </Button>
                </NavLink>
              </li>
              <li className="md:ml-8 text-xl md:my-0 mb-3">
                <NavLink to="/">
                  <Button
                    className="w-64 md:w-full failure-button"
                  >
                    <FaHome className="mr-2"></FaHome>Back To Home
                  </Button>
                </NavLink>
              </li>
            </ul>
          </>
        )}
        {/* volunteer mobile nav */}
        {role === "volunteer" && (
          <>
            {" "}
            <ul className="md:flex md:items-center gap-5">
              {" "}
              <li className="md:ml-8 text-xl md:my-0 mt-7 mb-3">
                <NavLink to="/dashboard/admin-home">
                  <Button
                    className="w-64 md:w-full failure-button"
                  >
                    <FaHome className="mr-2"></FaHome>Volunteer Home
                  </Button>
                </NavLink>
              </li>
              <li className="md:ml-8 text-xl md:my-0 mb-3">
                <NavLink to="/dashboard/user-profile">
                  <Button
                    className="w-64 md:w-full failure-button"
                  >
                    <FaUser className="mr-2"></FaUser>User Profile
                  </Button>
                </NavLink>
              </li>
              <li className="md:ml-8 text-xl md:my-0 mb-3">
                <NavLink to="/dashboard/all-donation-request">
                  <Button
                    className="w-64 md:w-full failure-button"
                  >
                    <IoIosCreate className="mr-2"></IoIosCreate>All Donation
                    Request
                  </Button>
                </NavLink>
              </li>
              <li className="md:ml-8 text-xl md:my-0 mb-3">
                <NavLink to="/dashboard/content-management">
                  <Button
                    className="w-64 md:w-full failure-button"
                  >
                    <FaBlog className="mr-2"></FaBlog>Content Management
                  </Button>
                </NavLink>
              </li>
              <li className="md:ml-8 text-xl md:my-0 mb-3">
                <NavLink to="/">
                  <Button
                    className="w-64 md:w-full failure-button"
                  >
                    <FaHome className="mr-2"></FaHome>Back To Home
                  </Button>
                </NavLink>
              </li>
            </ul>
          </>
        )}
      </div>

      {/* dashboard content */}
      <div className="flex-1 py-10 md:p-10  overflow-x-auto">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;


