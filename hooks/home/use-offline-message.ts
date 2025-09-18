import { useEffect, useState, useCallback } from "react";

function useOfflineMessage(onOnlineSubmit: (msg: string) => void) {
  const [queue, setQueue] = useState<string[]>([]);

  useEffect(() => {
    const savedItemsString = localStorage.getItem("queue");
    if (!savedItemsString) return;

    try {
      const savedItems: string[] = JSON.parse(savedItemsString);
      setQueue(savedItems);
    } catch {
      localStorage.removeItem("queue");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("queue", JSON.stringify(queue));
  }, [queue]);

  const addToQueue = useCallback((message: string) => {
    setQueue((prev) => [...prev, message]);
  }, []);

  useEffect(() => {
    const handleOnline = () => {
      if (queue.length === 0) return;
      queue.forEach((msg) => onOnlineSubmit(msg));
      setQueue([]);
    };

    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, [queue, onOnlineSubmit]);

  return { addToQueue, queue };
}

export default useOfflineMessage;
