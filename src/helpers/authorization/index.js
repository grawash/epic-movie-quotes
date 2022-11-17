import axios from "@/config/axios/index.js";

export function userLoggedIn() {
  return axios
    .get("user")
    .then((response) => {
      console.log(response);
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
}
export async function isAuthenticaded() {
  const result = await userLoggedIn();
  if (result === false) {
    return "/";
  }
}
