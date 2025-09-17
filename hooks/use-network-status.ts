import { useEffect, useState } from "react";

type Status = "Online" | "Offline";

/**
 * This function will return the network status of the user in a reactive way.
 * @returns Status of the user's network, `Online` or `Offline`
 */
function useNetworkStatus() {
  const [status, setStatus] = useState<Status>("Offline");

  useEffect(() => {
    const onlineHandler = () => setStatus("Online");
    const offlineHandler = () => setStatus("Offline");

    window.addEventListener("online", onlineHandler);
    window.addEventListener("offline", offlineHandler);

    return () => {
      window.removeEventListener("online", onlineHandler);
      window.removeEventListener("offline", offlineHandler);
    };
  }, []);

  return status;
}

export default useNetworkStatus;
