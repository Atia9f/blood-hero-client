import { Button, Table } from "flowbite-react";
import usePendingRequest from "../../hooks/usePendingRequest";
import { Link } from "react-router-dom";

const DonationRequest = () => {
  const [pendingRequest, isPending] = usePendingRequest();
  // console.log(pendingRequest);

  return (
    <div data-aos="fade-up" data-aos-duration="1500">
      {/* user dashboard title */}
      <h3 className="text-xl text-center md:text-4xl mt-6 md:mt-10">
        Blood Donation{" "}
        <span className="text-bold text-[#9F3551]">Requests</span>
      </h3>
      {isPending && (
        <p className="text-3xl font-bold text-center text-red-500 my-20">
          Loading
        </p>
      )}
      {!pendingRequest.length && (
        <p className="text-xl font-bold text-center my-20">
          We have no blood donation request
        </p>
      )}
      {pendingRequest.length > 0 && (
        <div className="mt-10">
          <div className="overflow-x-auto my-3 md:my-16">
            <Table>
              <Table.Head>
                <Table.HeadCell>Requester Name</Table.HeadCell>
                <Table.HeadCell>Location</Table.HeadCell>
                <Table.HeadCell>Date</Table.HeadCell>
                <Table.HeadCell>Time</Table.HeadCell>
                <Table.HeadCell>View</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {pendingRequest?.map((request) => (
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
                      <Link to={`/donation-request-details/${request._id}`}>
                        <Button size="xs">View</Button>
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationRequest;
