"use client";

import { useQuery } from "@tanstack/react-query";
import useNetworkStatus from "@/hooks/use-network-status";
import { getMessagesQuery, MessagesKeys } from "@/services/messages";

function MessagesList() {
  const [status, loaded] = useNetworkStatus();

  const {
    isError,
    isLoading,
    isSuccess,
    data: messages,
  } = useQuery({
    queryKey: [MessagesKeys.MESSAGES],
    queryFn: () => getMessagesQuery().then((res) => res.data),
  });

  return (
    <section className="w-2xs max-w-full mx-auto">
      {isSuccess && messages.length > 0 && (
        <h3 className="mb-4 text-gray-500">Messages:</h3>
      )}

      <div className="mb-2">
        {isLoading && loaded && status === "Online" && (
          <p className="text-center text-gray-500">Items are loading...</p>
        )}

        {loaded && status === "Offline" && (
          <p className="text-center text-blue-600">
            Messages are loaded as soon as the user comes online.
          </p>
        )}

        {isError && loaded && status === "Online" && (
          <p className="text-center text-red-600">Failed to load items.</p>
        )}
      </div>

      {isSuccess && messages.length > 0 && (
        <ul className="flex flex-col items-stretch gap-2">
          {messages.toReversed().map((message) => (
            <li
              key={message.id}
              className="bg-blue-100 rounded-xl px-3 py-2 rounded-bl-none"
            >
              {message.content}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default MessagesList;
