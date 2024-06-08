import { BiDonateBlood } from "react-icons/bi";
import { CiFaceSmile } from "react-icons/ci";
import { GiBrokenHeartZone } from "react-icons/gi";

const AboutUs = () => {
  return (
    <div data-aos="fade-down" data-aos-duration="1500" className="mt-16">
      <h2 className="mb-5 md:mb-10 text-center">
        <span className="text-2xl md:text-3xl lg:text-4xl uppercase font-thin text-[#9F3551] ">
          Why should you{" "}
        </span>
        <span className="text-2xl md:text-3xl lg:text-4xl uppercase font-bold pb-2  text-[#9F3551] ">
          donate
        </span>
      </h2>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3 p-4 md:p-0">
        <div className="border-2 border-[#feb8b0] p-6 md:p-10 space-y-3 md:space-y-6">
          <BiDonateBlood className="text-4xl md:text-5xl text-[#9F3551] "></BiDonateBlood>
          <h2 className="text-2xl md:text-3xl text-[#9F3551] ">
            Blood Saves Lives
          </h2>
          <p>
            The blood we collect from your donation will be used to create
            life-saving and treatments for those living with chronic medical
            conditions.
          </p>
        </div>
        <div className="border-2 border-[#feb8b0] p-6 md:p-10 space-y-3 md:space-y-6">
          <CiFaceSmile className="text-4xl md:text-5xl text-[#9F3551] "></CiFaceSmile>
          <h2 className="text-2xl md:text-3xl text-[#9F3551] ">
            Helping Others
          </h2>
          <p>
            Talking the time to dante your blood could literally save someones
            life. You can sleep better at night knowing you made a difference.
          </p>
        </div>
        <div className="border-2 border-[#feb8b0] p-6 md:p-10 space-y-3 md:space-y-6">
          <GiBrokenHeartZone className="text-4xl md:text-5xl text-[#9F3551] "></GiBrokenHeartZone>
          <h2 className="text-2xl md:text-3xl text-[#9F3551] ">Feel Blessed</h2>
          <p>
            You will feel good from your donation will be used to create
            life-saving and chronic medical treatments for those living with
            chronic medical lives.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
