import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addStorageItem, updateStorageItem } from "../../api/api";



/* =====================================================
   QUERIES
===================================================== */
export const useGetStorageItems = () => {
  return useQuery({
    queryKey: ["storage", "items"],
    queryFn: getStorageItems,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};

/* =====================================================
   MUTATIONS
===================================================== */
export const useAddStorageItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addStorageItem,
    onSuccess: () => {
      queryClient.invalidateQueries(["storage", "items"]);
    },
  });
};

export const useUpdateStorageItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateStorageItem,
    onSuccess: () => {
      queryClient.invalidateQueries(["storage", "items"]);
    },
  });
};
