import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useAllDonationRequest = () => {
  // tanstack query
  const axiosSecure = useAxiosSecure();
  const {
    data: allDonationRequest = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allDonationRequest"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-donation-request");
      return res.data;
    },
  });
  return [allDonationRequest, refetch, isLoading];
};

export default useAllDonationRequest;
