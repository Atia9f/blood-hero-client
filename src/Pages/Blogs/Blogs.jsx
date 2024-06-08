import usePublishedBlogs from "../../hooks/usePublishedBlogs";
import BlogsCard from "./BlogsCard";

const Blogs = () => {
  const [publishedBlogs, isPending] = usePublishedBlogs();
  // console.log("published blogs are", publishedBlogs);

  if (isPending) {
    return <h2 className="text-center text-xl font-bold my-20">Loading</h2>;
  }

  return (
    <div className="p-4" data-aos="fade-up" data-aos-duration="1500">
      <h3 className="text-xl text-center md:text-4xl mt-6 md:mt-10">
        Our <span className="text-bold text-[#9F3551]">Blogs</span>
      </h3>
      <div className=" my-10">
        {publishedBlogs.map((blog) => (
          <BlogsCard key={blog._id} blog={blog}></BlogsCard>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
