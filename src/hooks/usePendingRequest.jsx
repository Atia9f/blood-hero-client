import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const usePendingRequest = () => {
  // tanstack query
  const axiosPublic = useAxiosPublic();
  const {
    data: pendingRequest = [],
    refetch,
    isPending,
  } = useQuery({
    queryKey: ["pendingRequest"],
    queryFn: async () => {
      const res = await axiosPublic.get("/pending-request");
      return res.data;
    },
  });
  return [pendingRequest, refetch, isPending];
};

export default usePendingRequest;
