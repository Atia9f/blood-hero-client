import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllUsers = () => {
  // tanstack query
  const axiosSecure = useAxiosSecure();
  const {
    data: allUsers = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-users");
      return res.data;
    },
  });
  return [allUsers, refetch, isLoading];
};

export default useAllUsers;
