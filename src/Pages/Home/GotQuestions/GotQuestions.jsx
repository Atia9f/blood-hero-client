import { Accordion } from "flowbite-react";

const GotQuestions = () => {
  return (
    <div data-aos="fade-up" data-aos-duration="1500" className="mt-10 md:mt-16">
      <h2 className=" mb-10 text-center">
        <span className="text-2xl md:text-3xl lg:text-4xl uppercase font-bold pb-2 border-b-4 border-[#9F3551] text-[#9F3551] ">
          Got Questions ?
        </span>
        <span className=" md:mt-0 text-2xl md:text-3xl lg:text-4xl uppercase font-thin text-[#9F3551] ">
          {" "}
          No Worries
        </span>
      </h2>
      <div className="grid grid-cols-1 gap-5 md:gap-10  md:grid-cols-2 p-4 md:p-0">
        <div className="space-y-5">
          <Accordion collapseAll>
            <Accordion.Panel>
              <Accordion.Title className="text-[#9F3551]">
                What is blood heros?
              </Accordion.Title>
              <Accordion.Content>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  Blood Heroes are the extraordinary individuals who embody the
                  spirit of compassion and generosity by donating blood to save
                  lives. At [Your Organization/Website Name], we celebrate our
                  Blood Heroes, recognizing the selfless contributions that make
                  a significant impact on the well-being of others. Join our
                  community of Blood Heroes and be a part of something truly
                  heroic the gift of life through blood donation.
                </p>
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>
          <Accordion collapseAll>
            <Accordion.Panel>
              <Accordion.Title className="text-[#9F3551]">
                How do I donate blood?
              </Accordion.Title>
              <Accordion.Content>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  Ensure you meet the eligibility criteria for blood donation,
                  including age, weight, and overall health. Common requirements
                  may vary, so check with your local blood donation center.
                </p>
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>
        </div>
        <div className="space-y-5">
          <Accordion collapseAll>
            <Accordion.Panel>
              <Accordion.Title className="text-[#9F3551]">
                How does it works?
              </Accordion.Title>
              <Accordion.Content>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  A healthcare professional will conduct a brief interview to
                  ensure that you meet the eligibility criteria and that it's
                  safe for you to donate. This step includes checking your blood
                  pressure, pulse, and hemoglobin levels.
                </p>
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>
          <Accordion collapseAll>
            <Accordion.Panel>
              <Accordion.Title className="text-[#9F3551]">
                How do I register as Donor?
              </Accordion.Title>
              <Accordion.Content>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  Navigate to our website where youll find a dedicated section
                  for donor registration.Click on the Register or Sign Up button
                  to create your donor account. Provide essential information,
                  including your name, contact details, and any other required
                  details.
                </p>
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default GotQuestions;
