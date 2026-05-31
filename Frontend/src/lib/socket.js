import { io } from "socket.io-client";

export const socket = io("https://talent-iq-xa1d.onrender.com", {
  withCredentials: true,
});
