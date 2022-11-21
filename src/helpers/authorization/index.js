import { useAuthStore } from "@/stores/auth";

export function isAuthenticated() {
  const authStore = useAuthStore();
  if (!authStore.authenticated) {
    return "/";
  }
}
