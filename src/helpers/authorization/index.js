import axios from "axios";
import { getJwtToken } from "@/helpers/jwtToken/index.js";

let token = getJwtToken();

export function userLoggedIn() {
  return axios
    .post(
      "http://127.0.0.1:8000/api/authorized-user",
      {
        token,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      console.log(response);
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
}
