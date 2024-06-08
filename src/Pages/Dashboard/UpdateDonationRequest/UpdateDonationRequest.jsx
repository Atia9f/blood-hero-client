import useDistricts from "../../../hooks/useDistricts";
import useUpazilas from "../../../hooks/useUpazilas";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import {
  Button,
  Label,
  Select,
  Spinner,
  TextInput,
  Textarea,
} from "flowbite-react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const UpdateDonationRequest = () => {
  const { id } = useParams();
  const [districts] = useDistricts();
  const [upazilas] = useUpazilas();
  const axiosPublic = useAxiosPublic();

  const {
    data: preData = {},
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["preData", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/donation-request/${id}`);
      return res.data;
    },
  });

  // console.log("from tn predata", preData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      recipientName: e.target.recipientName.value,
      bloodGroup: e.target.bloodGroup.value,
      recipientDistrict: e.target.recipientDistrict.value,
      recipientUpazila: e.target.recipientUpazila.value,
      hospitalName: e.target.hospitalName.value,
      fullAddress: e.target.fullAddress.value,
      donationDate: e.target.donationDate.value,
      donationTime: e.target.donationTime.value,
      requestMessage: e.target.requestMessage.value,
    };
    // console.log("testing updated data", updatedData);
    // update donation request data on database
    const updateRes = await axiosPublic.put(
      `/update-donation-request/${id}`,
      updatedData
    );
    // console.log(updateRes.data);
    if (updateRes.data.modifiedCount > 0) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: `Donation Request Updated Successfully`,
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
    }
  };

  if (isPending) {
    <div className="text-center my-20">
      <Spinner aria-label="Center-aligned Extra large spinner example" />
    </div>;
  }

  return (
    <div className="max-w-xl mx-auto my-10 md:my-10 px-4 md:px-0">
      <h2 className="mb-5 md:mb-10  text-center">
        <span className="text-2xl md:text-3xl lg:text-4xl uppercase font-thin text-[#9F3551] ">
          Update Donation{" "}
        </span>
        <span className="text-2xl md:text-3xl lg:text-4xl uppercase font-bold pb-2 border-b-4 border-[#9F3551] text-[#9F3551] ">
          Request
        </span>
      </h2>
      <div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/*requester name */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="requesterName" value="Requester name" />
            </div>
            <TextInput
              type="text"
              id="requesterName"
              name="requesterName"
              defaultValue={preData.requesterName}
              placeholder="Requester name"
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
              name="email"
              defaultValue={preData.requesterEmail}
              placeholder="Requester email"
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
              name="recipientName"
              placeholder="Recipient name"
              required
              defaultValue={preData.recipientName}
            />
          </div>
          {/* blood group */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="bloodGroup" value="Recipient Blood Group" />
            </div>
            <Select
              id="bloodGroup"
              name="bloodGroup"
              required
              defaultValue={preData.bloodGroup}
            >
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
              name="recipientDistrict"
              required
              defaultValue={preData?.recipientDistrict}
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
              name="recipientUpazila"
              required
              defaultValue={preData.recipientUpazila}
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
              name="hospitalName"
              placeholder="Hospital name"
              required
              defaultValue={preData.hospitalName}
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
              name="fullAddress"
              placeholder="Ex: Zahir Raihan Rd, Dhaka"
              required
              defaultValue={preData.fullAddress}
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
              name="donationDate"
              required
              defaultValue={preData.donationDate}
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
              name="donationTime"
              required
              defaultValue={preData.donationTime}
            />
          </div>
          {/*donation time */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="requestMessage" value="Request Message" />
            </div>
            <Textarea
              id="requestMessage"
              name="requestMessage"
              placeholder="Write your message"
              required
              defaultValue={preData.requestMessage}
              rows={4}
            />
          </div>

          <Button className="w-full failure-button" type="submit" >
            Update Request
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdateDonationRequest;
