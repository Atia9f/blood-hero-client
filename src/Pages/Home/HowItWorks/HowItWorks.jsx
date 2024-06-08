import { SiGnuprivacyguard } from "react-icons/si";
import { GiGlassShot } from "react-icons/gi";
import { FaRegClipboard } from "react-icons/fa6";
import { FaHeartbeat } from "react-icons/fa";
import { BiDonateBlood } from "react-icons/bi";
import { FaHeartCircleCheck } from "react-icons/fa6";
const HowItWorks = () => {
  return (
    <div
      data-aos="zoom-in"
      data-aos-duration="1500"
      data-aos-once="true"
      className="mt-10 md:mt-16 "
    >
      <h2 className=" mb-10 text-center">
        <span className="text-2xl md:text-3xl lg:text-4xl uppercase font-bold pb-2 border-b-4 border-[#9F3551] text-[#9F3551] ">
          How
        </span>
        <span className="text-2xl md:text-3xl lg:text-4xl uppercase font-thin text-[#9F3551] ">
          {" "}
          it works
        </span>
      </h2>
      <div className="grid gap-4 grid-cols-2 p-6 md:grid-cols-3 lg:grid-cols-6 bg-gradient-to-r from-red-200 to-red-50 ">
        <div className="space-y-3 p-2 md:p-4">
          <div className="flex gap-5">
            <SiGnuprivacyguard className="text-5xl font-bold text-[#9F3551]"></SiGnuprivacyguard>
            <span className="text-7xl font-thin text-[#9f372c]">1</span>
          </div>
          <h2 className="text-2xl mb-3 text-[#9F3551]">Sign Up</h2>
          <p>Click "Join as Donor" & sign up online</p>
        </div>
        <div className="space-y-3 p-2 md:p-4">
          <div className="flex gap-5">
            <GiGlassShot className="text-5xl font-bold text-[#9F3551]"></GiGlassShot>
            <span className="text-7xl font-thin text-[#9f372c]">2</span>
          </div>
          <h2 className="text-2xl mb-3 text-[#9F3551]">Prepare</h2>
          <p>Collect documents. Eat well and hydrate.</p>
        </div>
        <div className="space-y-3 p-2 md:p-4">
          <div className="flex gap-5">
            <FaRegClipboard className="text-5xl font-bold text-[#9F3551]"></FaRegClipboard>
            <span className="text-7xl font-thin text-[#9f372c]">3</span>
          </div>
          <h2 className="text-2xl mb-3 text-[#9F3551]">Check-In</h2>
          <p>Verify eligibility and complete registration</p>
        </div>
        <div className="space-y-3 p-2 md:p-4">
          <div className="flex gap-5">
            <FaHeartbeat className="text-5xl font-bold text-[#9F3551]"></FaHeartbeat>
            <span className="text-7xl font-thin text-[#9f372c]">4</span>
          </div>
          <h2 className="text-2xl mb-3 text-[#9F3551]">Screening</h2>
          <p>A brief physical exam by medical staff.</p>
        </div>
        <div className="space-y-3 p-2 md:p-4">
          <div className="flex gap-5">
            <BiDonateBlood className="text-5xl font-bold text-[#9F3551]"></BiDonateBlood>
            <span className="text-7xl font-thin text-[#9f372c]">5</span>
          </div>
          <h2 className="text-2xl mb-3 text-[#9F3551]">Donate</h2>
          <p>Relax comfortable during your donation.</p>
        </div>
        <div className="space-y-3 p-2 md:p-4">
          <div className="flex gap-5">
            <FaHeartCircleCheck className="text-5xl font-bold text-[#9F3551]"></FaHeartCircleCheck>
            <span className="text-7xl font-thin text-[#9f372c]">6</span>
          </div>
          <h2 className="text-2xl mb-3 text-[#9F3551]">Feel Blessed</h2>
          <p>You make a difference. You save a life today</p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
