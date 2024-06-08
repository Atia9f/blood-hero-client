import { BiSolidDonateBlood } from "react-icons/bi";
import { RiRefund2Line } from "react-icons/ri";
import useAllDonationRequest from "../../../hooks/useAllDonationRequest";
import useProfile from "../../../hooks/useProfile";
import { FaUsers } from "react-icons/fa";
import useAllUsers from "../../../hooks/useAllUsers";

const AdminHome = () => {
  const [loggedInUser] = useProfile();
  const [allDonationRequest] = useAllDonationRequest();
  const [allUsers] = useAllUsers();
  return (
    <div data-aos="fade-up" data-aos-duration="1500">
      {/* admin home title */}
      <div>
        <h3 className="text-xl text-center md:text-4xl mt-6 md:mt-0">
          Hi, Welcome{" "}
          <span className="text-bold text-[#9F3551]">
            {loggedInUser?.name ? loggedInUser.name : "Back"}
          </span>
        </h3>
      </div>
      {/* data */}
      <div className="flex items-center justify-center flex-col md:flex-row gap-5 md:gap-10 mt-10 md:mt-16  mx-auto">
        <div className="flex flex-col md:flex-row gap-5 md:gap-10">
          {/* total users */}
          <div className="flex items-center gap-5 bg-gradient-to-r from-red-200 to-red-400 p-4 rounded-md">
            <div>
              <FaUsers className="text-5xl text-[#ff5441]"></FaUsers>
            </div>
            <div>
              <h2 className="text-xl">Total Users</h2>
              <p className="text-3xl font-bold">{allUsers.length}</p>
            </div>
          </div>
          {/* total donation request */}
          <div className="flex items-center gap-5 bg-gradient-to-r from-red-200 to-red-400 p-4 rounded-md">
            <div>
              <BiSolidDonateBlood className="text-5xl text-[#ff5441]"></BiSolidDonateBlood>
            </div>
            <div>
              <h2 className="text-xl">Total Donation Request</h2>
              <p className="text-3xl font-bold">{allDonationRequest.length}</p>
            </div>
          </div>
          {/* total users */}
          <div className="flex items-center gap-5 bg-gradient-to-r from-red-200 to-red-400 p-4 rounded-md">
            <div>
              <RiRefund2Line className="text-5xl text-[#ff5441]"></RiRefund2Line>
            </div>
            <div>
              <h2 className="text-xl">Total Fundings</h2>
              <p className="text-3xl font-bold">00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
