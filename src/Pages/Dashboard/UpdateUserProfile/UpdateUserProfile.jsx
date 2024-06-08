import {
  Button,
  FileInput,
  Label,
  Select,
  Spinner,
  TextInput,
} from "flowbite-react";
import { useForm } from "react-hook-form";
import useProfile from "../../../hooks/useProfile";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useState } from "react";
import Swal from "sweetalert2";
import useDistricts from "../../../hooks/useDistricts";
import useUpazilas from "../../../hooks/useUpazilas";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateUserProfile = () => {
  const { register, handleSubmit } = useForm();
  const [btnLoading, setBtnLoading] = useState(false);
  const [loggedInUser, refetch, isLoading] = useProfile();
  const [districts] = useDistricts();
  const [upazilas] = useUpazilas();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  // console.log(loggedInUser);

  // console.log("dististircs data", districts);

  const onSubmit = async (data) => {
    setBtnLoading(true);
    // console.log("form data", data);
    // image upload to imgbb and the get an url
    const imageFile = { image: data.photo[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.success) {
      const userUpdatedData = {
        name: data.name,
        email: data.email,
        bloodGroup: data.bloodGroup,
        photo: res.data.data.display_url,
        upazila: data.upazila,
        district: data.district,
      };
      const userUpdateRes = await axiosSecure.patch(
        `/users?email=${loggedInUser.email}`,
        userUpdatedData
      );
      if (userUpdateRes.data.modifiedCount > 0) {
        // show pop up msg
        refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${loggedInUser.name} your profile is updated`,
          showConfirmButton: false,
          timer: 1500,
        });
        setBtnLoading(false);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="text-center my-40">
        <Spinner aria-label="Extra large spinner example" size="xl" />
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto my-10 md:my-10 px-4 md:px-0">
      <h2 className="mb-5  text-center">
        <span className="text-2xl md:text-3xl lg:text-4xl uppercase font-thin text-[#9F3551] ">
          Update{" "}
        </span>
        <span className="text-2xl md:text-3xl lg:text-4xl uppercase font-bold pb-2 border-b-4 border-[#9F3551] text-[#9F3551] ">
          Profile
        </span>
      </h2>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* name */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Your name" />
            </div>
            <TextInput
              type="text"
              id="name"
              placeholder="name"
              required
              {...register("name")}
            />
          </div>
          {/* email */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Your email" />
            </div>
            <TextInput
              type="email"
              id="email"
              defaultValue={loggedInUser.email}
              readOnly
              placeholder="email"
              required
              {...register("email")}
            />
          </div>
          {/* photo */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="photo" value="Your Photo" />
            </div>
            <FileInput id="photo" required {...register("photo")} type="file" />
          </div>
          {/* blood group */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="bloodGroup" value="Select your Blood Group" />
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
          {/* upazila */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="upazila" value="Select your Upazila" />
            </div>
            <Select id="upazila" required {...register("upazila")}>
              {upazilas.map((upazila) => (
                <option key={upazila.id} value={upazila.name}>
                  {upazila.name}
                </option>
              ))}
            </Select>
          </div>
          {/* district */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="district" value="Select your District" />
            </div>
            <Select id="district" required {...register("district")}>
              {districts.map((district) => (
                <option key={district.id} value={district.name}>
                  {district.name}
                </option>
              ))}
            </Select>
          </div>
          <Button className="w-full failure-button" type="submit" gradientMonochrome="failure">
            Update{" "}
            {btnLoading && (
              <span className="ms-4">
                <Spinner aria-label="Extra large spinner example" size="sm" />
              </span>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserProfile;
