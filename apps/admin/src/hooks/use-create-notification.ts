import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.notifications.createNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}
