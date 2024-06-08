import { Badge, Button, Label, Select, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";
import useAllBlogs from "../../../hooks/useAllBlogs";
import useProfile from "../../../hooks/useProfile";

const ContentManagement = () => {
  const [allBlogs, refetch, isLoading] = useAllBlogs();
  const [loggedInUser] = useProfile();
  const axiosSecure = useAxiosSecure();
  const [loadedData, setLoadedData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("draft");
  const isButtonDisabled = loggedInUser.role === "volunteer";

  //   filter onclick
  const handleFilter = (e) => {
    const filterValue = e.target.value;
    setSelectedCategory(filterValue);
    // console.log("handle filter clicked", filterValue);
  };

  useEffect(() => {
    const loadedFilterData = allBlogs.filter(
      (item) => item.status === selectedCategory
    );
    setLoadedData(loadedFilterData);
  }, [allBlogs, selectedCategory]);

  // handle publish blog
  const handlePublish = (singleBlog) => {
    axiosSecure.patch(`/publish-blog/${singleBlog._id}`).then((res) => {
      // console.log("publish response", res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Blog has been Published`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  // handle block user
  const handleUnpublish = (singleUser) => {
    axiosSecure.patch(`/unpublish-blog/${singleUser._id}`).then((res) => {
      // console.log("unpublish response", res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Blog has been Unpublished`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleDelete = (id) => {
    // console.log(id);
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
        axiosSecure.delete(`/all-blogs/${id}`).then((res) => {
          // console.log("delete response", res.data);
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Blog has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  if (isLoading) {
    return (
      <h2 className="text-center text-red-600 font-bold text-4xl my-20">
        Loading
      </h2>
    );
  }

  return (
    <div data-aos="fade-up" data-aos-duration="1500">
      <h3 className="text-xl text-center md:text-4xl mt-6 md:mt-0">
        Manage <span className="text-bold text-[#9F3551]">Blog</span> Content
      </h3>
      <div className="flex justify-end p-5">
        <Link to="/dashboard/content-management/add-blog">
          <Button className="failure-button" gradientMonochrome="failure">Add Blog</Button>
        </Link>
      </div>
      {/* all blogs */}
      <div>
        <div>
          {!allBlogs.length > 0 && (
            <>
              <h2 className="text-3xl text-center my-20">No Blogs Exists</h2>
            </>
          )}
          {allBlogs.length > 0 && (
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
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </Select>
              </div>
              {/* filter end */}
              <div className="overflow-x-auto mt-3 md:mt-6">
                <Table>
                  <Table.Head>
                    <Table.HeadCell>Title</Table.HeadCell>
                    <Table.HeadCell>Status</Table.HeadCell>
                    <Table.HeadCell>Status Action</Table.HeadCell>
                    <Table.HeadCell>Delete</Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y">
                    {loadedData?.map((singleBlog) => (
                      <Table.Row
                        key={singleBlog._id}
                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                      >
                        <Table.Cell>
                          {singleBlog.title.length > 40
                            ? `${singleBlog.title.slice(0, 40)}...`
                            : singleBlog.title}
                        </Table.Cell>
                        <Table.Cell>
                          {singleBlog.status === "published" && (
                            <Badge color="success">{singleBlog.status}</Badge>
                          )}
                          {singleBlog.status === "draft" && (
                            <Badge color="failure">{singleBlog.status}</Badge>
                          )}
                        </Table.Cell>
                        <Table.Cell>
                          {singleBlog.status === "draft" && (
                            <Button
                              onClick={() => handlePublish(singleBlog)}
                              gradientMonochrome="success"
                              size="xs"
                              disabled={isButtonDisabled}
                            >
                              Publish
                            </Button>
                          )}
                          {singleBlog.status === "published" && (
                            <Button
                              onClick={() => handleUnpublish(singleBlog)}
                              gradientMonochrome="failure"
                              size="xs"
                              disabled={isButtonDisabled}
                            >
                              Unpublish
                            </Button>
                          )}
                        </Table.Cell>
                        <Table.Cell>
                          <Button
                            onClick={() => handleDelete(singleBlog._id)}
                            color="failure"
                            size="xs"
                            disabled={isButtonDisabled}
                          >
                            Delete
                          </Button>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentManagement;
