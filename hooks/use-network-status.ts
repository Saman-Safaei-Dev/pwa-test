import { useEffect, useLayoutEffect, useState } from "react";

type Status = "Online" | "Offline";

/**
 * This function will return the network status of the user in a reactive way.
 * @returns Status of the user's network, `Online` or `Offline`
 */
function useNetworkStatus() {
  const [loaded, setLoaded] = useState(false);
  const [status, setStatus] = useState<Status>("Offline");

  useLayoutEffect(() => {
    setStatus(navigator.onLine ? "Online" : "Offline");
    setLoaded(true);
  }, []);

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

  return [status, loaded] as const;
}

export default useNetworkStatus;
