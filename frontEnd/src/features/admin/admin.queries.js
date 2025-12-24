// src/queries/admin.queries.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getEmployees,

} from "../../api/api"; 


export const useEmployeesQuery = () => {
  return useQuery({
    queryKey: ["admin", "employees"],
    queryFn: async () => {
      const res = await getEmployees();
      return res.data?.data || [];
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: false,
  });
};



