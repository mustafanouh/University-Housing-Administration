import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addStorageItem, getStorageItems, updateStorageItem } from "../../api/api";



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
    mutationFn: async(data) => {
  return await addStorageItem(data);
},
onSuccess: () => {
  queryClient.invalidateQueries(["storage", "items"]);
},
  });
};





export const useUpdateStorageItem = (data) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      return await updateStorageItem(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["storage", "items"]);
    },
  });
};
