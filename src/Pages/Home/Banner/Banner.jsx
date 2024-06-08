import { Button } from "flowbite-react";
import banner from "../../../assets/banner.png";
import { Link } from "react-router-dom";
const Banner = () => {
  return (
    <div
      data-aos="fade-up"
      data-aos-duration="1500"
      className="flex pb-5 flex-col gap-5 items-center md:flex-row-reverse"
    >
      <div className="flex-1">
        <img src={banner} alt="" />
      </div>
      <div className="flex-1 px-4 md:px-0">
        <h2 className="uppercase text-3xl md:text-4xl lg:text-5xl font-thin">
          Donate Blood
        </h2>
        <h2 className="text-[#9F3551] my-2 md:my-4 uppercase text-3xl md:text-4xl lg:text-5xl font-bold">
          Give the gift Of life
        </h2>
        <p className="pr-5 text-[#919397]">
          Donate Today! you never know when you need it. The blood you donate
          gives someone another chance at life. You never know when you need it.
          The blood you donate gives someone another chance at life.
        </p>
        <div className="flex gap-5 mt-4">
          <Link to="/register">
            <Button className=" failure-button">Join As Donor</Button>
          </Link>
          <Link to="/search">
            <Button outline gradientDuoTone="pinkToOrange">
              Search Donor
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
