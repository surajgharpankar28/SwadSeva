import { useEffect, useState } from "react";

const useOnlineStatus = () => {
  const [onlineStatus, setOnlineStatus] = useState(true);
  //check if online
  useEffect(() => {
    // addEventListener version
    window.addEventListener("online", (event) => {
      console.log("You are now connected to the network.");
      setOnlineStatus(true);
    });
    window.addEventListener("offline", (event) => {
      console.log("You are now connected to the network.");
      setOnlineStatus(false);
    });
  }, []);
  //return boolean value - status
  return onlineStatus;
};

export default useOnlineStatus;
