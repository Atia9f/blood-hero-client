import {
  Button,
  Label,
  Select,
  Spinner,
  TextInput,
  Textarea,
} from "flowbite-react";
import { useForm } from "react-hook-form";
import useDistricts from "../../../hooks/useDistricts";
import useUpazilas from "../../../hooks/useUpazilas";
import { useState } from "react";
import useProfile from "../../../hooks/useProfile";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const CreateDonationRequest = () => {
  const { register, handleSubmit, reset } = useForm();
  const [loggedInUser] = useProfile();
  const [btnLoading, setBtnLoading] = useState(false);
  const [districts] = useDistricts();
  const [upazilas] = useUpazilas();
  const axiosPublic = useAxiosPublic();

  const onSubmit = async (data) => {
    setBtnLoading(true);
    const currentDate = new Date();
    const donationRequestData = {
      requesterName: loggedInUser.name,
      requesterEmail: loggedInUser.email,
      recipientName: data.recipientName,
      bloodGroup: data.bloodGroup,
      recipientDistrict: data.recipientDistrict,
      recipientUpazila: data.recipientUpazila,
      hospitalName: data.hospitalName,
      fullAddress: data.fullAddress,
      donationDate: data.donationDate,
      donationTime: data.donationTime,
      requestMessage: data.requestMessage,
      donationStatus: "pending",
      createdAt: currentDate,
    };
    // post donation data to database
    try {
      const donationReqRes = await axiosPublic.post(
        "/create-donation-request",
        donationRequestData
      );
      if (donationReqRes.data.insertedId) {
        Swal.fire({
          title: "Submitted Successfully",
          text: "Your request is submitted",
          icon: "success",
        });
        setBtnLoading(false);
        reset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-xl mx-auto my-10 md:my-10 px-4 md:px-0">
      <h2 className="mb-5 md:mb-10  text-center">
        <span className="text-2xl md:text-3xl lg:text-4xl uppercase font-thin text-[#9F3551] ">
          Create Donation{" "}
        </span>
        <span className="text-2xl md:text-3xl lg:text-4xl uppercase font-bold pb-2 border-b-4 border-[#9F3551] text-[#9F3551] ">
          Request
        </span>
      </h2>
      {loggedInUser?.status === "blocked" && (
        <div>
          <h2 className="text-xl md:text-3xl font-bold text-center text-[#9F3551]">
            You have Blocked By Admin
          </h2>
          <p className="text-base md:text-xl font-bold text-center mt-6">
            You can not create any Request
          </p>
        </div>
      )}
      {loggedInUser?.status === "active" && (
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/*requester name */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="requesterName" value="Requester name" />
              </div>
              <TextInput
                type="text"
                id="requesterName"
                defaultValue={loggedInUser.name}
                placeholder="Requester name"
                {...register("requesterName")}
                required
                readOnly
              />
            </div>
            {/*requester email */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="requesterEmail" value="Requester email" />
              </div>
              <TextInput
                type="email"
                id="requesterEmail"
                defaultValue={loggedInUser.email}
                placeholder="Requester email"
                {...register("requesterEmail")}
                required
                readOnly
              />
            </div>
            {/*recipient name */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="recipientName" value="Recipient name" />
              </div>
              <TextInput
                type="text"
                id="recipientName"
                placeholder="Recipient name"
                {...register("recipientName")}
                required
              />
            </div>
            {/* blood group */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="bloodGroup" value="Recipient Blood Group" />
              </div>
              <Select id="bloodGroup" required {...register("bloodGroup")}>
                <option disabled value="default">
                  Select a category
                </option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </Select>
            </div>
            {/*recipient district */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="recipientDistrict" value="Recipient District" />
              </div>
              <Select
                id="recipientDistrict"
                required
                {...register("recipientDistrict")}
              >
                {districts.map((district) => (
                  <option key={district.id} value={district.name}>
                    {district.name}
                  </option>
                ))}
              </Select>
            </div>
            {/*recipient upazila */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="recipientUpazila" value="Recipient Upazila" />
              </div>
              <Select
                id="recipientUpazila"
                required
                {...register("recipientUpazila")}
              >
                {upazilas.map((upazila) => (
                  <option key={upazila.id} value={upazila.name}>
                    {upazila.name}
                  </option>
                ))}
              </Select>
            </div>
            {/*hospital name */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="hospitalName" value="Hospital name" />
              </div>
              <TextInput
                type="text"
                id="hospitalName"
                placeholder="Hospital name"
                {...register("hospitalName")}
                required
              />
            </div>
            {/*full address */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="fullAddress" value="Full Address" />
              </div>
              <TextInput
                type="text"
                id="fullAddress"
                placeholder="Ex: Zahir Raihan Rd, Dhaka"
                {...register("fullAddress")}
                required
              />
            </div>
            {/*donation date */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="donationDate" value="Donation Date" />
              </div>
              <TextInput
                type="date"
                id="donationDate"
                placeholder=""
                {...register("donationDate")}
                required
              />
            </div>
            {/*donation time */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="donationTime" value="Donation Time" />
              </div>
              <TextInput
                type="time"
                id="donationTime"
                placeholder=""
                {...register("donationTime")}
                required
              />
            </div>
            {/*donation time */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="requestMessage" value="Request Message" />
              </div>
              <Textarea
                id="requestMessage"
                placeholder="Write your message"
                {...register("requestMessage")}
                required
                rows={4}
              />
            </div>

            <Button
              className="w-full  failure-button"
              type="submit"
            >
              Submit Request{" "}
              {btnLoading && (
                <span className="ms-4">
                  <Spinner aria-label="Extra large spinner example" size="sm" />
                </span>
              )}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateDonationRequest;
