"use client";

import useNetworkStatus from "@/hooks/use-network-status";
import { getMessagesQuery, MessagesKeys } from "@/services/messages";
import { useQuery } from "@tanstack/react-query";

function MessagesList() {
  const [status, loaded] = useNetworkStatus();

  const {
    isError,
    isLoading,
    data: messages,
  } = useQuery({
    queryFn: getMessagesQuery,
    queryKey: [MessagesKeys.MESSAGES],
  });

  return (
    <section className="w-2xs max-w-full mx-auto">
      <h2 className="mb-4 text-gray-500">Messages:</h2>

      <ul className="flex flex-col items-stretch gap-2">
        {isLoading && (
          <li className="text-center text-gray-500">Items are loading...</li>
        )}

        {messages?.data.map((message) => (
          <li
            key={message.id}
            className="bg-blue-100 rounded-xl px-3 py-2 rounded-bl-none flex items-start gap-2"
          >
            <span>{"-"}</span>
            <p>{message.content}</p>
          </li>
        ))}

        {isError && loaded && status === "Online" && (
          <li className="text-center text-red-600">Failed to load items.</li>
        )}

        {loaded && status === "Offline" && (
          <li className="text-center text-blue-600">
            Messages are loaded as soon as the user comes online.
          </li>
        )}
      </ul>
    </section>
  );
}

export default MessagesList;
