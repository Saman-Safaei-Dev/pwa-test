"use client";

import {
  Button,
  FieldError,
  Input,
  Label,
  TextField,
} from "@/components/client";
import useMessageMutation from "@/hooks/home/use-message-mutation";
import useOfflineMessage from "@/hooks/home/use-offline-message";
import useNetworkStatus from "@/hooks/use-network-status";
import { useState } from "react";

function SendMessageForm() {
  const [error, setError] = useState("");
  const [status, loaded] = useNetworkStatus();
  const textColor = status === "Online" ? "text-green-600" : "text-red-600";

  const { mutate, mutateAsync, isPending } = useMessageMutation();

  const { addToQueue, queue } = useOfflineMessage(async (message) => {
    await mutateAsync(message);
  });

  const offlineHandler = (message: string) => addToQueue(message);
  const onlineHandler = (message: string) => mutate(message);

  const submitHandler = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setError("");

    const formData = new FormData(ev.currentTarget);
    const message = formData.get("message");

    if (typeof message !== "string") return;
    if (!message.trim()) return setError("This field is required!");

    if (status === "Online") onlineHandler(message);
    else offlineHandler(message);

    ev.currentTarget.reset();
  };

  return (
    <>
      <form
        noValidate
        autoComplete="off"
        onSubmit={submitHandler}
        className="flex flex-col items-center w-2xs max-w-full mx-auto gap-3 mb-8"
      >
        <TextField isInvalid={!!error.trim()} className="w-full" name="message">
          <Label className="text-gray-500 mb-2 block">Message:</Label>
          <Input className="block w-full bg-gray-100 py-2 px-3" />
          <FieldError className="text-red-600 text-sm">{error}</FieldError>
        </TextField>

        <div className="flex justify-between w-full items-start">
          <p>
            <span className="text-gray-400">Status:</span>{" "}
            <span className={`${textColor} font-bold`}>
              {loaded ? status : "..."}
            </span>
          </p>

          <Button
            type="submit"
            isDisabled={isPending}
            className="bg-blue-500 text-white px-5 py-2 rounded-lg disabled:bg-gray-600"
          >
            Send
          </Button>
        </div>
      </form>

      {queue.length > 0 && (
        <div className="w-2xs max-w-full mx-auto mb-8">
          <h3 className="text-red-600 mb-4">Offline Messages:</h3>
          <ul className="flex flex-col items-stretch gap-2">
            {queue.toReversed().map((item, index) => (
              <li
                key={index}
                className="bg-red-100 rounded-xl px-3 py-2 rounded-bl-none"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default SendMessageForm;
