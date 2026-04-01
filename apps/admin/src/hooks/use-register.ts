import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function useRegister() {
  return useMutation({
    mutationFn: api.auth.register,
  });
}
