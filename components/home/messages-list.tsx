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

  if (!loaded) {
    return null;
  }

  if (status === "Offline") {
    return (
      <p className="text-center text-blue-600">
        Messages are loaded as soon as the user comes online.
      </p>
    );
  }

  if (isLoading && status === "Online") {
    return <p className="text-center text-gray-500">Items are loading...</p>;
  }

  if (isError) {
    return <p className="text-center text-red-600">Failed to load items.</p>;
  }

  if (isSuccess && messages.length === 0)
    return <p className="text-center">There isn&apos;t any saved message</p>;

  if (isSuccess)
    return (
      <section className="w-2xs max-w-full mx-auto">
        <h3 className="mb-4 text-gray-500">Messages:</h3>

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
      </section>
    );

  return null;
}

export default MessagesList;
