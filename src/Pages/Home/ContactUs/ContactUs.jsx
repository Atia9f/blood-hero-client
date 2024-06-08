import { Button, Label, TextInput, Textarea } from "flowbite-react";
import contactImg from "../../../assets/about.png";
import Swal from "sweetalert2";

const ContactUs = () => {
  const handleContact = (e) => {
    e.preventDefault();
    e.target.reset();
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Send Successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  return (
    <div
      data-aos="fade-down"
      data-aos-duration="1500"
      className="mt-10 md:mt-20 mb-20"
    >
      <h2 className="mb-10 md:mb-16 text-center">
        <span className="text-2xl md:text-3xl lg:text-4xl uppercase font-thin text-[#9F3551] ">
          Contact
        </span>
        <span className="text-2xl md:text-3xl lg:text-4xl uppercase font-bold pb-2 border-b-4 border-[#9F3551] text-[#9F3551] ">
          {" "}
          Us
        </span>
      </h2>
      <div className="flex items-center gap-10 flex-col md:flex-row">
        <div className="flex-1">
          <img src={contactImg} alt="" />
        </div>

        <div className="flex-1">
          <div>
            <h2 className="text-xl md:text-2xl text-[#9F3551] mb-3 md:mb-6">
              {" "}
              Call Us: +8801856254485
            </h2>
          </div>
          <hr className="h-1 w-56 mb-3 md:mb-6 bg-[#9F3551]" />
          <form
            onSubmit={handleContact}
            className="flex w-full md:max-w-md flex-col gap-4"
          >
            <h2 className="text-xl md:text-3xl font-bold uppercase mb-4 text-[#9F3551]">
              Message Us
            </h2>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Your name" />
              </div>
              <TextInput id="name" type="text" placeholder="name" required />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="phone" value="Your Phone" />
              </div>
              <TextInput id="phone" type="text" placeholder="phone" required />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email1" value="Your email" />
              </div>
              <TextInput
                id="email1"
                type="email"
                placeholder="email"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="comment" value="Your message" />
              </div>
              <Textarea
                id="comment"
                placeholder="Leave a comment..."
                required
                rows={4}
              />
            </div>
            <Button type="submit" className=" failure-button">
              Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
