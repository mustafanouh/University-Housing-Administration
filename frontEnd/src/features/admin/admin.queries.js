// src/queries/admin.queries.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getEmployees,
  getAllMaintenanceRequests,
  agreeMaintenanceRequest,
  getUnits,
  getUnitRooms,
  setUnitGender,
  setUnitRoomCap

} from "../../api/api";



/* =====================================================
                  ADMIN – MANAGEMENT
===================================================== */
export const useEmployeesQuery = () => {
  return useQuery({
    queryKey: ["admin", "employees"],
    queryFn: async () => {
      const res = await getEmployees();
      return res.data || [];
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: false,
  });
};

/* =====================================================
               ADMIN – MAINTENANCE
===================================================== */

export const useGetAllMaintenanceRequest = () => {
  return useQuery({
    queryKey: ["admin", "allMaintenanceRequest"],
    queryFn: async () => {
      const res = await getAllMaintenanceRequests();
      return res.data || [];
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: false,
  });
}
export const useGetMaintenanceProgress = () => {
  return useQuery({
    queryKey: ["admin", "maintenanceProgress"],
    queryFn: async () => {
      const res = await getMaintenanceProgress();
      return res.data || [];
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: false,
  });
}

export const useAgreeMaintenanceRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (requestId) => {
      const res = await agreeMaintenanceRequest(requestId);
      return res.data || [];
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["admin", "allMaintenanceRequest"]);
    },
  });
}


// admin UNITS
export const useGetAllUnit = () => {
  return useQuery({
    queryKey: ["admin", "allUnits"],
    queryFn: async () => {
      const res = await getUnits();
      return res.data || [];
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: false,
  });
}
export const useGetUnitRooms = (unitId) => {
  return useQuery({
    queryKey: ["admin", "unitRooms", unitId],
    queryFn: async () => {
      const res = await getUnitRooms(unitId);
      return res.data || [];
    },
    enabled: !!unitId,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: false,
  });
}

export const useSetUnitGender = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ unitId, data }) => {
      const res = await setUnitGender(unitId, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["admin", "allUnits"]);
    },
  });
};


  export const useSetUnitRoomCap = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ unitId, data }) => {
      return setUnitRoomCap(unitId, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["admin", "allUnits"]);
    },
  });
};





