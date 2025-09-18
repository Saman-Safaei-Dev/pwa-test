"use client";

import useMessageMutation from "@/hooks/home/use-message-mutation";
import MessagesList from "@/components/home/messages-list";
import SendMessageForm from "@/components/home/send-message-form";
import useOfflineMessage from "@/hooks/home/use-offline-message";
import OfflineMessages from "./offline-messages";
import InstallBtn from "./install-btn";

function HomeContent() {
  const { mutateAsync } = useMessageMutation();

  const { addToQueue, queue } = useOfflineMessage(async (msg) => {
    mutateAsync(msg);
  });

  return (
    <>
      <SendMessageForm addToQueue={addToQueue} />
      <OfflineMessages queue={queue} />
      <MessagesList />
    </>
  );
}

export default HomeContent;
