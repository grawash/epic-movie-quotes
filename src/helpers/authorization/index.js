import { getJwtToken } from "@/helpers/jwtToken/index.js";

export function isAuthenticated() {
  if (!getJwtToken()) {
    return "/";
  }
}