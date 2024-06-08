import { Button, FileInput, Label, TextInput } from "flowbite-react";
import { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
// imgbb api key
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddBlog = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  // get and submit form data
  const onSubmit = async (data) => {
    setError("");
    if (!content) {
      return setError("Content Field is Required");
    }
    // console.log("form data", data);
    // image upload to imgbb and get the url
    const imageFile = { image: data.thumbnail[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    // console.log(res);
    if (res.data.success) {
      // now send the menu item data to the server with the image url
      const blogs = {
        title: data.title,
        thumbnail: res.data.data.display_url,
        content: content,
        status: "draft",
      };
      // console.log(blogs);
      // post user data to database
      const postBlogsRes = await axiosPublic.post("/blogs", blogs);
      // console.log(postBlogsRes.data);
      if (postBlogsRes.data.insertedId) {
        reset();
        setContent("");
        Swal.fire({
          title: "Success",
          text: "Blog created",
          icon: "success",
        });
      }
    }
  };

  return (
    <div data-aos="fade-up" data-aos-duration="1500">
      <h3 className="text-xl text-center md:text-4xl mt-6 md:mt-0">
        Add <span className="text-bold text-[#9F3551]">Blogs</span>
      </h3>
      {/* add blog form */}
      <div className="md:max-w-[80%] mx-auto px-4 md:px-0 mt-10 md:mt-16">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex max-w-full flex-col gap-4"
        >
          {/* blog title and thumbnil image */}
          <div className="flex gap-5 flex-col md:flex-row">
            <div className="flex-1">
              <div className="mb-2 block">
                <Label htmlFor="title" value="Blog Title" />
              </div>
              <TextInput
                id="title"
                type="text"
                name="title"
                placeholder="Your Blog Title"
                required
                {...register("title")}
              />
            </div>
            <div className="flex-1">
              <div className="mb-2 block">
                <Label htmlFor="thumbnail" value="Thumbnail Image" />
              </div>
              <FileInput
                id="thumbnail"
                name="thumbnail"
                required
                {...register("thumbnail")}
              />
            </div>
          </div>
          {/* end blog title */}
          {/* jodit react */}
          <div>
            <p className="font-medium text-sm text-[#111827]">
              Write your content here
            </p>
            <JoditEditor
              ref={editor}
              required
              value={content}
              onChange={(newContent) => setContent(newContent)}
            />
          </div>
          <p className="text-red-600 text-bold">{error}</p>
          <Button type="submit">Create Blog</Button>
        </form>
        {/* {HTMLReactParser(content)} */}
      </div>
    </div>
  );
};

export default AddBlog;
