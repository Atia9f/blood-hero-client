import { Badge, Button, Dropdown, Table } from "flowbite-react";
import useMyDonationRequest from "../../../hooks/useMyDonationRequest";
import useProfile from "../../../hooks/useProfile";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UserHome = () => {
  const [loggedInUser] = useProfile();
  const [myDonationRequest, refetch] = useMyDonationRequest();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const isButtonDisabled = loggedInUser.role === "volunteer";

  // handle done
  const handleDone = (id) => {
    axiosSecure.patch(`/donation/done/${id}`).then((res) => {
      // console.log("make done response", res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Blood Donation Done`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  // handle canceled
  const handleCanceled = (id) => {
    axiosSecure.patch(`/donation/canceled/${id}`).then((res) => {
      // console.log("make canceled response", res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Blood Donation Canceled`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  // handle delete request
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/donation-data/${id}`).then((res) => {
          // console.log("delete response", res.data);
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your request has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div>
      {/* user dashboard title */}
      <h3 className="text-xl text-center md:text-4xl mt-6 md:mt-0">
        Hi, Welcome{" "}
        <span className="text-bold text-[#9F3551]">
          {loggedInUser?.name ? loggedInUser.name : "Back"}
        </span>
      </h3>
      {!myDonationRequest.length > 0 && (
        <>
          <h2 className="text-3xl text-center my-20">You have no Request</h2>
        </>
      )}
      {myDonationRequest.length > 0 && (
        <div className="mt-10">
          <h3 className="text-center text-xl md:text-3xl ">
            Recent Donation Requests
          </h3>
          <div className="overflow-x-auto mt-3 md:mt-6">
            <Table>
              <Table.Head>
                <Table.HeadCell>Recipient Name</Table.HeadCell>
                <Table.HeadCell>Recipient Location</Table.HeadCell>
                <Table.HeadCell>Donation Date</Table.HeadCell>
                <Table.HeadCell>Donation Time</Table.HeadCell>
                <Table.HeadCell>Donation Status</Table.HeadCell>
                <Table.HeadCell>Donor Name</Table.HeadCell>
                <Table.HeadCell>Donor Email</Table.HeadCell>
                <Table.HeadCell>Edit</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
                <Table.HeadCell>View</Table.HeadCell>
                <Table.HeadCell>Action</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {myDonationRequest?.slice(0, 3).map((request) => (
                  <Table.Row
                    key={request._id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell>{request.recipientName}</Table.Cell>
                    <Table.Cell>
                      {request.recipientDistrict}
                      {", "}
                      {request.recipientUpazila}
                    </Table.Cell>
                    <Table.Cell>{request.donationDate}</Table.Cell>
                    <Table.Cell>{request.donationTime}</Table.Cell>
                    <Table.Cell>
                      {request.donationStatus === "pending" && (
                        <Badge color="warning">{request.donationStatus}</Badge>
                      )}
                      {request.donationStatus === "inprogress" && (
                        <Badge color="info">{request.donationStatus}</Badge>
                      )}
                      {request.donationStatus === "done" && (
                        <Badge color="success">{request.donationStatus}</Badge>
                      )}
                      {request.donationStatus === "canceled" && (
                        <Badge color="failure">{request.donationStatus}</Badge>
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      {request.donorName ? request.donorName : " "}
                    </Table.Cell>
                    <Table.Cell>
                      {request.donorEmail ? request.donorEmail : " "}
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        to={`/dashboard/update-donation-request/${request._id}`}
                      >
                        <Button size="xs" disabled={isButtonDisabled}>
                          Edit
                        </Button>
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        onClick={() => handleDelete(request._id)}
                        className="failure-button"
                        gradientMonochrome="failure"
                        size="xs"
                        disabled={isButtonDisabled}
                      >
                        Delete
                      </Button>
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`/donation-request-details/${request._id}`}>
                        <Button size="xs" disabled={isButtonDisabled}>
                          View
                        </Button>
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      {request.donationStatus === "inprogress" ? (
                        <Dropdown
                          size="xs"
                          label="Action"
                          dismissOnClick={false}
                        >
                          <Dropdown.Item
                            onClick={() => handleDone(request._id)}
                          >
                            Done
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => handleCanceled(request._id)}
                          >
                            Cancel
                          </Dropdown.Item>
                        </Dropdown>
                      ) : (
                        " "
                      )}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
          <div className="mt-10">
            <Link to="/dashboard/my-donation-request">
              <Button  gradientMonochrome="failure" className="mx-auto failure-button">
                View All
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserHome;
