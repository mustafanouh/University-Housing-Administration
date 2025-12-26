import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelRoommate, checkHousing, getRoommate, getStudentFees, sendHousingRequest } from "../../api/api";




/* =====================================================
   QUERIES
===================================================== */
export const useCheckHousing = () => {
  return useQuery({
    queryKey: ["student", "housingStatus"],
    queryFn: checkHousing,
    retry: false,
  });
};

export const useGetRoommate = () => {
  return useQuery({
    queryKey: ["student", "roommate"],
    queryFn: getRoommate,
    retry: false,
  });
};

export const useGetStudentFees = () => {
  return useQuery({
    queryKey: ["student", "fees"],
    queryFn: getStudentFees,
    retry: false,
  });
};

/* =====================================================
   MUTATIONS
===================================================== */
export const useCancelRoommate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelRoommate,
    onSuccess: () => {
      queryClient.invalidateQueries(["student", "roommate"]);
      queryClient.invalidateQueries(["student", "housingStatus"]);
    },
  });
};

export const useSendHousingRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendHousingRequest,
    onSuccess: () => {
      queryClient.invalidateQueries(["student", "housingStatus"]);
    },
  });
};
