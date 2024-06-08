import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Button, Label, TextInput } from "flowbite-react";

const Login = () => {
  const { signIn } = useAuth();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const location = useLocation();
  // console.log(location.state);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(email, password);
    setError("");
    setSuccess("");
    signIn(email, password)
      .then((result) => {
        // console.log(result.user);
        setSuccess("Successfully logged in");
        navigate(location?.state ? location.state : "/");
        Swal.fire({
          title: "Successfull",
          text: "You have successfully logged In",
          icon: "success",
        });
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };
  return (
    <div className="px-4 md:px-0 my-10 md:my-20">
      <h2 className="mb-5 md:mb-10 text-center">
        <span className="text-2xl md:text-3xl lg:text-4xl uppercase font-thin text-[#9F3551] ">
          Please{" "}
        </span>
        <span className="text-2xl md:text-3xl lg:text-4xl uppercase font-bold pb-2 border-b-4 border-[#9F3551] text-[#9F3551] ">
          Login
        </span>
      </h2>
      <form
        onSubmit={handleLogin}
        className="flex max-w-md flex-col gap-4 mx-auto mt-10"
      >
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Your email" />
          </div>
          <TextInput
            id="email"
            type="email"
            placeholder="Your Email"
            name="email"
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Your password" />
          </div>
          <TextInput
            id="password"
            type="password"
            placeholder="******"
            name="password"
            required
          />
        </div>
        {error && <p className="text-red-400 font-bold my-4">{error}</p>}
        {success && <p className="text-green-400 font-bold my-4">{success}</p>}
        <Button type="submit" className="failure-button" gradientMonochrome="failure">
          Login
        </Button>
      </form>
      <p className="font-bold py-4 text-center">
        New to this Website ? Please{" "}
        <Link to="/register" className="text-[#9F3551]">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
