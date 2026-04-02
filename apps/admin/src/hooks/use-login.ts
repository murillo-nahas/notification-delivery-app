import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useAuth } from "@/contexts/auth-context";
import { useNavigate } from "react-router";

export function useLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: api.auth.login,
    onSuccess: (response) => {
      login(response.accessToken);
      navigate("/home");
    },
  });
}
