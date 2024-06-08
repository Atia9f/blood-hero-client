import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const usePublishedBlogs = () => {
  // tanstack query
  const axiosPublic = useAxiosPublic();
  const {
    data: publishedBlogs = [],
    refetch,
    isPending,
  } = useQuery({
    queryKey: ["pendingRequest"],
    queryFn: async () => {
      const res = await axiosPublic.get("/published-blogs");
      return res.data;
    },
  });
  return [publishedBlogs, refetch, isPending];
};

export default usePublishedBlogs;
