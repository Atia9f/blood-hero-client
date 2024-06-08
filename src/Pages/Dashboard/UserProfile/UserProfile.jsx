import { Button, Spinner } from "flowbite-react";
import useProfile from "../../../hooks/useProfile";
import { Link } from "react-router-dom";
// import { useEffect } from "react";

const UserProfile = () => {
  const [loggedInUser, refetch, isLoading] = useProfile();

  // useEffect(() => {
  //   refetch();
  // }, [loggedInUser, refetch]);

  if (isLoading) {
    return (
      <div className="text-center my-40">
        <Spinner aria-label="Extra large spinner example" size="xl" />
      </div>
    );
  }

  return (
    <div data-aos="fade-up" data-aos-duration="1500" className="px-4 md:px-4">
      <div>
        <img
          className="rounded-full h-60 w-60"
          src={loggedInUser?.photo}
          alt="avatar"
        />
        <div className="space-y-3">
          <h2 className="text-4xl font-bold mt-8">{loggedInUser?.name}</h2>
          <p>
            <span className="font-bold">Email:</span> {loggedInUser?.email}
          </p>
          <p>
            <span className="font-bold">Address:</span> {loggedInUser?.district}
            ,{"  "}
            {loggedInUser?.upazila}
          </p>
          <p>
            <span className="font-bold">Blood Group:</span>{" "}
            {loggedInUser?.bloodGroup}
          </p>
          <Button className=" failure-button">
            <Link to="/dashboard/update-user-profile">Edit Profile</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
