// import { useEffect } from "react";
// import socket from "../utils/socket";

// const useSocket = (setText) => {
//   useEffect(() => {
//     socket.on("connect", () => console.log("Connected to server"));

//     socket.on("newText", (receivedText) => {
//       setText(receivedText);
//     });

//     return () => {
//       socket.off("newText");
//     };
//   }, [setText]);
// };

// export default useSocket;
