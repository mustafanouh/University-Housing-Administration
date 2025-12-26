

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getRoomStudents, mentorGetUnitRooms, mentorGetUnits, mentorGetUnitStorage, sendFeeRequest, sendMaintenanceRequest } from "../../api/api";



/* =====================================================
                       MENTOR
===================================================== */


/* ===================== QUERIES ===================== */

export const useMentorGetUnits = () =>
  useQuery({
    queryKey: ["mentor", "units"],
    queryFn: mentorGetUnits,
    staleTime: 5 * 60 * 1000,
  });

export const useMentorGetUnitStorage = (unitId) =>
  useQuery({
    queryKey: ["mentor", "unitStorage", unitId],
    queryFn: () => mentorGetUnitStorage(unitId),
    enabled: !!unitId,
  });

export const useMentorGetUnitRooms = (unitId) =>
  useQuery({
    queryKey: ["mentor", "unitRooms", unitId],
    queryFn: () => mentorGetUnitRooms(unitId),
    enabled: !!unitId,
  });

export const useGetRoomStudents = (roomId) =>
  useQuery({
    queryKey: ["mentor", "roomStudents", roomId],
    queryFn: () => getRoomStudents(roomId),
    enabled: !!roomId,
  });

/* ===================== MUTATIONS ===================== */

export const useSetRoomState = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ roomId, data }) => setRoomState(roomId, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["mentor", "unitRooms"]);
    },
  });
};

export const useSendMaintenanceRequest = () =>
  useMutation({
    mutationFn: sendMaintenanceRequest,
  });

export const useSendFeeRequest = () =>
  useMutation({
    mutationFn: sendFeeRequest,
  });
