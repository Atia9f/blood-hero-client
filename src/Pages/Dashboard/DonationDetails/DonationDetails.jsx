import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useProfile from "../../../hooks/useProfile";
import { useQuery } from "@tanstack/react-query";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import Swal from "sweetalert2";

const DonationDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [loggedInUser] = useProfile();
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const {
    data: details = [],
    refetch,
    isPending,
  } = useQuery({
    queryKey: ["details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/pending-donation-details/${id}`);
      return res.data;
    },
  });
  // console.log(details);
  // handleDonate
  const handleDonate = async (e) => {
    e.preventDefault();
    const donorName = e.target.name.value;
    const donorEmail = e.target.email.value;
    const donorInfo = {
      donorName: donorName,
      donorEmail: donorEmail,
      donationStatus: "inprogress",
    };
    const result = await axiosSecure.put(`/handle-donate/${id}`, donorInfo);
    // console.log(result.data);
    if (result.data.modifiedCount > 0) {
      refetch();
      Swal.fire({
        title: "Success!",
        text: "Donation is inprogress now.",
        icon: "success",
      });
      setOpenModal(false);
      navigate("/donation-request");
    }
  };

  return (
    <div data-aos="fade-up" data-aos-duration="1500">
      <h3 className="text-xl text-center md:text-4xl mt-6 md:mt-10">
        Donation <span className="text-bold text-[#9F3551]">Details</span>
      </h3>
      <div className="p-4 md:p-10 my-10 bg-red-100 space-y-2 text-center mx-auto">
        <p>
          <span className="text-bold">Requester Name:</span>{" "}
          {details.requesterName}
        </p>
        <p>
          <span className="text-bold">Requester Email:</span>{" "}
          {details.requesterEmail}
        </p>
        <p>
          <span className="text-bold">Recipient Name:</span>{" "}
          {details.recipientName}
        </p>
        <p>
          <span className="text-bold">Recipient Blood Group:</span>{" "}
          {details.bloodGroup}
        </p>
        <p>
          <span className="text-bold">Recipient District:</span>{" "}
          {details.recipientDistrict}
        </p>
        <p>
          <span className="text-bold">Recipient Upazila:</span>{" "}
          {details.recipientUpazila}
        </p>
        <p>
          <span className="text-bold">Hospital Name:</span>{" "}
          {details.hospitalName}
        </p>
        <p>
          <span className="text-bold">Full Address:</span> {details.fullAddress}
        </p>
        <p>
          <span className="text-bold">Donation Date:</span>{" "}
          {details.donationDate}
        </p>
        <p>
          <span className="text-bold">Donation Time:</span>{" "}
          {details.donationTime}
        </p>
        <p>
          <span className="text-bold">Request Message:</span>{" "}
          {details.requestMessage}
        </p>
        <p>
          <span className="text-bold">Status:</span> {details.donationStatus}
        </p>
        {/* modal */}
        <div>
          <Button className="mx-auto mt-6" onClick={() => setOpenModal(true)}>
            Donate
          </Button>
          <Modal show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>Donor Info</Modal.Header>
            <Modal.Body>
              <div className="space-y-3">
                <form onSubmit={handleDonate}>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="name" value="Name" />
                    </div>
                    <TextInput
                      defaultValue={loggedInUser.name}
                      readOnly
                      id="base"
                      name="name"
                      type="text"
                      sizing="md"
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="email" value="email" />
                    </div>
                    <TextInput
                      defaultValue={loggedInUser.email}
                      readOnly
                      id="email"
                      name="email"
                      type="email"
                      sizing="md"
                    />
                  </div>
                  <Button type="submit" className="mt-3">
                    Confirm
                  </Button>
                </form>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default DonationDetails;
