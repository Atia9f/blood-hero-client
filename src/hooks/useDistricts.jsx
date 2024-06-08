import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useDistricts = () => {
  // tanstack query
  const axiosPublic = useAxiosPublic();
  const {
    data: districts = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["districts"],
    queryFn: async () => {
      const res = await axiosPublic.get("/districts");
      return res.data;
    },
  });
  return [districts, refetch, isLoading];
};

export default useDistricts;
