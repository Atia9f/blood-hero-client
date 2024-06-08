import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useUpazilas = () => {
  // tanstack query
  const axiosPublic = useAxiosPublic();
  const {
    data: upazilas = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["upazilas"],
    queryFn: async () => {
      const res = await axiosPublic.get("/upazilas");
      return res.data;
    },
  });
  return [upazilas, refetch, isLoading];
};

export default useUpazilas;
