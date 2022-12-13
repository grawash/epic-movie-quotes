import axios from "@/config/axios/index.js";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
Pusher.Runtime.createXHR = function () {
  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  return xhr;
};
window.Pusher = Pusher;
const EchoInstance = window.Echo = new Echo({
  broadcaster: "pusher",
  authEndpoint: import.meta.env.VITE_API_BASE_URL + "broadcasting/auth",
  key: import.meta.env.VITE_PUSHER_APP_KEY,
  cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
  withCredentials: true,
  forceTLS: true,
  enableTransports: ["ws", "wss"],
  // transports: ["websocket", "polling", "flashsocket"],
  // authorizer: (channel, options) => {
  //   return {
  //     authorize: (socketId, callback) => {
  //       axios
  //         .post("http://127.0.0.1:8000/api/broadcasting/auth", {
  //           socket_id: socketId,
  //           channel_name: channel.name,
  //         })
  //         .then((response) => {
  //           callback(null, response.data);
  //           console.log("it worked");
  //         })
  //         .catch((error) => {
  //           callback(error);
  //         });
  //     },
  //   };
  // },
});
export default EchoInstance;
