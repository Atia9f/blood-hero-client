import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useProfile = () => {
  // tanstack query
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: loggedInUser = {},
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["loggedInUser", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user?.email}`);
      return res.data;
    },
  });
  return [loggedInUser, refetch, isLoading];
};

export default useProfile;
