import AboutUs from "../AboutUs/AboutUs";
import Banner from "../Banner/Banner";
import ContactUs from "../ContactUs/ContactUs";
import GotQuestions from "../GotQuestions/GotQuestions";
import HowItWorks from "../HowItWorks/HowItWorks";

const Home = () => {
  return (
    <div>
      <Banner></Banner>

      <AboutUs></AboutUs>

      <HowItWorks></HowItWorks>
      <GotQuestions></GotQuestions>
      <ContactUs></ContactUs>
    </div>
  );
};

export default Home;
