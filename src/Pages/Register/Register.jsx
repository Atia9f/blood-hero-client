import { Button, FileInput, Label, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
// imgbb api key
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
  const axiosPublic = useAxiosPublic();
  const { createUser } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [passwordMatch, setPasswordMatch] = useState(true);

  // get and submit form data
  const onSubmit = async (data) => {
    // console.log(data);
    // image upload to imgbb and get the url
    const imageFile = { image: data.photo[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    // console.log(res);
    if (res.data.success) {
      // now send the menu item data to the server with the image url
      const users = {
        name: data.name,
        email: data.email,
        photo: res.data.data.display_url,
        bloodGroup: data.bloodGroup,
        upazila: data.upazila,
        district: data.district,
        password: data.password,
        role: "donor",
        status: "active",
      };
      // post user data to database
      const userRes = await axiosPublic.post("/users", users);
      // console.log(userRes.data);
      if (userRes.data.insertedId) {
        createUser(data.email, data.password).then((result) => {
          const loggedUser = result.user;
          // console.log(loggedUser);
          reset();
          Swal.fire({
            title: "Sign up Successfull",
            text: "You clicked the button!",
            icon: "success",
          });
          navigate("/");
        });
      }
    }
  };

  const validatePassword = () => {
    const password = watch("password");
    const confirmPassword = watch("confirmPassword");
    if (password === confirmPassword) {
      setPasswordMatch(true);
      return true;
    } else {
      setPasswordMatch(false);
      setError("confirmPassword", {
        type: "manual",
        message: "Password do not match",
      });
      return false;
    }
  };

  useEffect(() => {
    fetch("district.json")
      .then((res) => res.json())
      .then((data) => setDistricts(data));
  }, []);
  useEffect(() => {
    fetch("upazilas.json")
      .then((res) => res.json())
      .then((data) => setUpazilas(data));
  }, []);

  return (
    <div className="max-w-xl mx-auto my-10 md:my-20 px-4 md:px-0">
      <h2 className="mb-5  text-center">
        <span className="text-2xl md:text-3xl lg:text-4xl uppercase font-thin text-[#9F3551] ">
          Please{" "}
        </span>
        <span className="text-2xl md:text-3xl lg:text-4xl uppercase font-bold pb-2 border-b-4 border-[#9F3551] text-[#9F3551] ">
          Register
        </span>
      </h2>
      <div>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* name */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Your name" />
            </div>
            <TextInput
              type="text"
              id="name"
              {...register("name", { required: true })}
              placeholder="name"
            />
            {errors.name && (
              <span className="text-red-600 mt-2 text-sm font-bold">
                Name field is required
              </span>
            )}
          </div>
          {/* email */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Your email" />
            </div>
            <TextInput
              type="email"
              id="email"
              {...register("email", { required: true })}
              placeholder="email"
            />
            {errors.email && (
              <span className="text-red-600 mt-2 text-sm font-bold">
                Email field is required
              </span>
            )}
          </div>
          {/* photo */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="photo" value="Your Photo" />
            </div>
            <FileInput id="photo" {...register("photo", { required: true })} />

            {errors.photo && (
              <span className="text-red-600 mt-2 text-sm font-bold">
                Your Photo field is required
              </span>
            )}
          </div>
          {/* blood group */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="bloodGroup" value="Select your Blood Group" />
            </div>
            <Select
              id="bloodGroup"
              {...register("bloodGroup", { required: true })}
            >
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </Select>
            {errors.bloodGroup && (
              <span className="text-red-600 mt-2 text-sm font-bold">
                Blood Group field is required
              </span>
            )}
          </div>
          {/* upazila */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="upazila" value="Select your Upazila" />
            </div>
            <Select id="upazila" {...register("upazila", { required: true })}>
              {upazilas.map((upazila) => (
                <option key={upazila.id} value={upazila.name}>
                  {upazila.name}
                </option>
              ))}
            </Select>
            {errors.upazila && (
              <span className="text-red-600 mt-2 text-sm font-bold">
                Upazila field is required
              </span>
            )}
          </div>
          {/* district */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="district" value="Select your District" />
            </div>
            <Select id="district" {...register("district", { required: true })}>
              {districts.map((district) => (
                <option key={district.id} value={district.name}>
                  {district.name}
                </option>
              ))}
            </Select>
            {errors.district && (
              <span className="text-red-600 mt-2 text-sm font-bold">
                District field is required
              </span>
            )}
          </div>
          {/* password */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Password" />
            </div>
            <TextInput
              type="password"
              id="password"
              {...register("password", {
                required: true,
                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                minLength: 6,
                maxLength: 10,
              })}
              placeholder="password"
            />
            {errors.password?.type === "required" && (
              <span className="text-red-600 mt-2 text-sm font-bold">
                Password field is required
              </span>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-600 mt-2 text-sm font-bold">
                Password must have, One Uppercase, One Lowercase, One Number and
                One Special Character
              </p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-600 mt-2 text-sm font-bold">
                Password must be 6 characters
              </p>
            )}
            {errors.password?.type === "maxLength" && (
              <p className="text-red-600 mt-2 text-sm font-bold">
                Password max length is 10
              </p>
            )}
          </div>
          {/* confirmPassword */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="confirmPassword" value="Confirm Password" />
            </div>
            <TextInput
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: validatePassword,
              })}
              placeholder="confirmPassword"
            />
            {/* {errors.confirmPassword && (
              <span className="text-red-600 mt-2 text-sm font-bold">
                {errors.confirmPassword.message}
              </span>
            )} */}
            {!passwordMatch && (
              <span className="text-red-600 mt-2 text-sm font-bold">
                {" "}
                Password Do Not match
              </span>
            )}
          </div>
          <Button className="w-full failure-button" type="submit" >
            Register
          </Button>
        </form>
        <p className="font-bold py-4 text-center">
          New to this Website ? Please{" "}
          <Link to="/login" className="text-[#9F3551]">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
