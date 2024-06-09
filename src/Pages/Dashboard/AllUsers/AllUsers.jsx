import { useEffect, useState } from "react";
import useAllUsers from "../../../hooks/useAllUsers";
import Swal from "sweetalert2";
import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  Label,
  Select,
  Table,
} from "flowbite-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllUsers = () => {
  const [allUsers, refetch] = useAllUsers();
  const axiosSecure = useAxiosSecure();
  const [loadedData, setLoadedData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("active");

  //   filter onclick
  const handleFilter = (e) => {
    const filterValue = e.target.value;
    setSelectedCategory(filterValue);
    // console.log("handle filter clicked", filterValue);
  };

  useEffect(() => {
    const loadedFilterData = allUsers.filter(
      (item) => item.status === selectedCategory
    );
    setLoadedData(loadedFilterData);
  }, [allUsers, selectedCategory]);

  // handle active user
  const handleActiveUser = (singleUser) => {
    axiosSecure.patch(`/active-user/${singleUser._id}`).then((res) => {
      // console.log("active response", res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${singleUser.name} is Active Now`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  // handle block user
  const handleBlockedUser = (singleUser) => {
    axiosSecure.patch(`/blocked-user/${singleUser._id}`).then((res) => {
      // console.log("blocked response", res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${singleUser.name} is Blocked Now`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  // handle make admin
  const handleMakeAdmin = (singleUser) => {
    axiosSecure.patch(`/users/admin/${singleUser._id}`).then((res) => {
      // console.log("make admin response", res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${singleUser.name} is an Admin Now`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  // handle make Volunteer
  const handleMakeVolunteer = (singleUser) => {
    axiosSecure.patch(`/users/volunteer/${singleUser._id}`).then((res) => {
      // console.log("make volunteer response", res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${singleUser.name} is an Volunteer Now`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  return (
    <div data-aos="fade-up" data-aos-duration="1500">
      {/* user dashboard title */}
      <h3 className="text-xl text-center md:text-4xl mt-6 md:mt-0">
        All <span className="text-bold text-[#9F3551]">Users</span>
      </h3>
      {!allUsers.length > 0 && (
        <>
          <h2 className="text-3xl text-center my-20">No user Exists</h2>
        </>
      )}
      {allUsers.length > 0 && (
        <div className="mt-10">
          {/* filter */}
          <div className="w-40 my-10 ms-4 md:ms-0">
            <div className="mb-2 block">
              <Label htmlFor="status" value="Filter" />
            </div>
            <Select
              onChange={handleFilter}
              name="status"
              id="status"
              type="text"
              required
            >
              {/* <option value="all">All</option> */}
              <option value="active">Active</option>
              <option value="blocked">Blocked</option>
            </Select>
          </div>
          {/* filter end */}
          <div className="overflow-x-auto mt-3 md:mt-6">
            <Table>
              <Table.Head>
                <Table.HeadCell>Avatar</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
                <Table.HeadCell>Status Action</Table.HeadCell>
                <Table.HeadCell>Role</Table.HeadCell>
                <Table.HeadCell>Action</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {loadedData?.map((singleUser) => (
                  <Table.Row
                    key={singleUser._id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell>
                      {" "}
                      <Avatar img={singleUser.photo} alt="image" rounded />
                    </Table.Cell>
                    <Table.Cell>{singleUser.email}</Table.Cell>
                    <Table.Cell>{singleUser.name}</Table.Cell>
                    <Table.Cell>
                      {singleUser.status === "active" && (
                        <Badge color="success">{singleUser.status}</Badge>
                      )}
                      {singleUser.status === "blocked" && (
                        <Badge color="failure">{singleUser.status}</Badge>
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      {singleUser.status === "active" && (
                        <Button
                          onClick={() => handleBlockedUser(singleUser)}
                          gradientMonochrome="failure"className="failure-button"
                          size="xs"
                        >
                          Block Now
                        </Button>
                      )}
                      {singleUser.status === "blocked" && (
                        <Button
                          onClick={() => handleActiveUser(singleUser)}
                          gradientMonochrome="success"
                          size="xs"
                        >
                          Unblock
                        </Button>
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      {singleUser.role === "donor" && (
                        <Badge color="success">{singleUser.role}</Badge>
                      )}
                      {singleUser.role === "volunteer" && (
                        <Badge color="purple">{singleUser.role}</Badge>
                      )}
                      {singleUser.role === "admin" && (
                        <Badge color="failure">{singleUser.role}</Badge>
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      <Dropdown
                        size="xs"
                        label="Make Admin"
                        dismissOnClick={false}
                      >
                        <Dropdown.Item
                          onClick={() => handleMakeAdmin(singleUser)}
                        >
                          Make Admin
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => handleMakeVolunteer(singleUser)}
                        >
                          Make volunteer
                        </Dropdown.Item>
                      </Dropdown>
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

export default AllUsers;


