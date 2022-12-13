import Echo from "laravel-echo";
import Pusher from "pusher-js";
Pusher.Runtime.createXHR = function () {
  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  return xhr;
};
window.Pusher = Pusher;
const EchoInstance = (window.Echo = new Echo({
  broadcaster: "pusher",
  authEndpoint: import.meta.env.VITE_API_BASE_URL + "broadcasting/auth",
  key: import.meta.env.VITE_PUSHER_APP_KEY,
  cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
  withCredentials: true,
  forceTLS: true,
  enableTransports: ["ws", "wss"],
}));
export default EchoInstance;
