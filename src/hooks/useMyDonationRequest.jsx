import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";

const useMyDonationRequest = () => {
  // tanstack query
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: myDonationRequest = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["myDonationRequest", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/my-donation-request?email=${user.email}`
      );
      return res.data;
    },
  });
  return [myDonationRequest, refetch, isLoading];
};

export default useMyDonationRequest;
