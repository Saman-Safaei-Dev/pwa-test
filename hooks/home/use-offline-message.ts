import { useEffect, useState, useCallback } from "react";

function useOfflineMessage(onOnlineSubmit: (msg: string) => Promise<void>) {
  const [queue, setQueue] = useState<string[]>([]);

  const handleOnline = useCallback(
    async (items?: string[]) => {
      if (items && items.length > 0) {
        for (const item of items) {
          await onOnlineSubmit(item);
          setQueue((prev) => prev.slice(1));
        }

        return;
      }

      if (queue.length === 0) return;

      for (const item of queue) {
        await onOnlineSubmit(item);
        setQueue((prev) => prev.slice(1));
      }
    },
    [queue, onOnlineSubmit],
  );

  useEffect(() => {
    const savedItemsString = localStorage.getItem("queue");
    if (!savedItemsString) return;

    try {
      const savedItems: string[] = JSON.parse(savedItemsString);
      setQueue(savedItems);
      if (navigator.onLine) handleOnline(savedItems);
    } catch {
      localStorage.removeItem("queue");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem("queue", JSON.stringify(queue));
  }, [queue]);

  const addToQueue = useCallback((message: string) => {
    setQueue((prev) => [...prev, message]);
  }, []);

  useEffect(() => {
    const handler = () => handleOnline();
    window.addEventListener("online", handler);
    return () => window.removeEventListener("online", handler);
  }, [handleOnline]);

  return { addToQueue, queue };
}

export default useOfflineMessage;
