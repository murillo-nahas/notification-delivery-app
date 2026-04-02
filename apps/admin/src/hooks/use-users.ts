import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => api.users.findAll(),
  })
}