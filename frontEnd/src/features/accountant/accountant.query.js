import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import  { approveFeePayment, fundMaintenance, getAgreedMaintenance, getFundLog, getPaidFees, getPendingFees } from "../../api/api";

/* =====================================================
   QUERIES
===================================================== */
export const useGetFundLog = () => {
  return useQuery({
    queryKey: ["accountant", "fundLog"],
    queryFn: getFundLog,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};

export const useGetPaidFees = () => {
  return useQuery({
    queryKey: ["accountant", "paidFees"],
    queryFn: getPaidFees,
    retry: false,
  });
};

export const useGetPendingFees = () => {
  return useQuery({
    queryKey: ["accountant", "pendingFees"],
    queryFn: getPendingFees,
    retry: false,
  });
};

export const useGetAgreedMaintenance = () => {
  return useQuery({
    queryKey: ["accountant", "maintenance"],
    queryFn: getAgreedMaintenance,
    retry: false,
  });
};

/* =====================================================
   MUTATIONS
===================================================== */
export const useFundMaintenance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ requestId, data }) =>
      fundMaintenance(requestId, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["accountant", "maintenance"]);
      queryClient.invalidateQueries(["accountant", "fundLog"]);
    },
  });
};

export const useApproveFeePayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: approveFeePayment,
    onSuccess: () => {
      queryClient.invalidateQueries(["accountant", "paidFees"]);
      queryClient.invalidateQueries(["accountant", "pendingFees"]);
      queryClient.invalidateQueries(["accountant", "fundLog"]);
    },
  });
};
