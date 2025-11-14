"use client";

import { useQuery } from "@tanstack/react-query";
import { getAppointments as gettAppointments } from "@/lib/actions/appointments";

export function useGetAppointments() {
  const result = useQuery({
    queryKey: ["appointments"],
    queryFn: gettAppointments,
  });

  return result;
}