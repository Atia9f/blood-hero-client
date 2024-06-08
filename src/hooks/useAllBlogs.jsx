import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllBlogs = () => {
  // tanstack query
  const axiosSecure = useAxiosSecure();
  const {
    data: allBlogs = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allBlogs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-blogs");
      return res.data;
    },
  });
  return [allBlogs, refetch, isLoading];
};

export default useAllBlogs;
