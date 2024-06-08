import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import ErrorPage from "../Pages/Shared/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Blogs from "../Pages/Blogs/Blogs";
import Dashboard from "../layout/Dashboard";
import UserHome from "../Pages/Dashboard/UserHome/UserHome";
import UserProfile from "../Pages/Dashboard/UserProfile/UserProfile";
import MyDonationRequest from "../Pages/Dashboard/MyDonationRequest/MyDonationRequest";
import CreateDonationRequest from "../Pages/Dashboard/CreateDonationRequest/CreateDonationRequest";
import UpdateUserProfile from "../Pages/Dashboard/UpdateUserProfile/UpdateUserProfile";
import UpdateDonationRequest from "../Pages/Dashboard/UpdateDonationRequest/UpdateDonationRequest";
import DonationDetails from "../Pages/Dashboard/DonationDetails/DonationDetails";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AllDonationRequest from "../Pages/Dashboard/AllDonationRequest/AllDonationRequest";
import ContentManagement from "../Pages/Dashboard/ContentManagement/ContentManagement";
import AddBlog from "../Pages/Dashboard/AddBlog/AddBlog";
import SearchPage from "../Pages/SearchPage/SearchPage";
import DonationRequest from "../Pages/DonationRequest/DonationRequest";
import Fundings from "../Pages/Fundings/Fundings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/donation-request",
        element: <DonationRequest></DonationRequest>,
      },
      {
        path: "/donation-request-details/:id",
        element: (
          <PrivateRoute>
            <DonationDetails></DonationDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/search",
        element: <SearchPage></SearchPage>,
      },
      {
        path: "/fundings",
        element: <Fundings></Fundings>,
      },
      {
        path: "/blogs",
        element: <Blogs></Blogs>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "user-home",
        element: <UserHome></UserHome>,
      },

      {
        path: "user-profile",
        element: <UserProfile></UserProfile>,
      },
      {
        path: "update-user-profile",
        element: <UpdateUserProfile></UpdateUserProfile>,
      },
      {
        path: "my-donation-request",
        element: <MyDonationRequest></MyDonationRequest>,
      },
      {
        path: "create-donation-request",
        element: <CreateDonationRequest></CreateDonationRequest>,
      },
      {
        path: "update-donation-request/:id",
        element: <UpdateDonationRequest></UpdateDonationRequest>,
      },
      // admin routes
      {
        path: "admin-home",
        element: <AdminHome></AdminHome>,
      },
      {
        path: "all-users",
        element: <AllUsers></AllUsers>,
      },
      {
        path: "all-donation-request",
        element: <AllDonationRequest></AllDonationRequest>,
      },
      {
        path: "content-management",
        element: <ContentManagement></ContentManagement>,
      },
      {
        path: "content-management/add-blog",
        element: <AddBlog></AddBlog>,
      },
    ],
  },
]);

export default router;
