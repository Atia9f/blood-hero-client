import logo from "../../../assets/logo.png";
import { Link } from "react-router-dom";

const Footerr = () => {
  return (
    <footer
      data-aos="fade-down"
      data-aos-duration="1500"
      className="w-full px-4 md:px-20 pt-10 pb-5 bg-[#FDE8E8]"
    >
      <div className="flex gap-5 flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col md:flex-row items-center gap-5">
          <img src={logo} alt="" />{" "}
          <p className="text-xl md:text-2xl font-bold text-[#9F3551]">
            Blood Heros
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-1 md:gap-5 text-center md:text-start text-sm">
          <div>
            <Link to="/fundings">Fundings</Link>
          </div>
          <div>
            <Link to="/donation-request">Donation Request</Link>
          </div>
          <div>
            <Link to="/blogs">Read Blogs</Link>
          </div>
          <div>
            {" "}
            <Link to="/register">Join</Link>
          </div>
        </div>
      </div>
      <hr className="h-0.5 my-5 bg-red-800" />
      <div>
        <p className="text-center text-xs">
          Copyright © {new Date().getFullYear()} - All right reserved by Blood
          Heros
        </p>
      </div>
    </footer>
  );
};

export default Footerr;





