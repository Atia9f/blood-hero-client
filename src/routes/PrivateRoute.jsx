import { Spinner } from "flowbite-react";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="text-center my-20">
        <Spinner aria-label="Center-aligned Extra large spinner example" />
      </div>
    );
  }
  if (user) {
    return children;
  }
  return <Navigate state={location.pathname} to="/login"></Navigate>;
};

export default PrivateRoute;
