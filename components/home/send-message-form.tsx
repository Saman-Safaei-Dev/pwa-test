"use client";

import {
  Button,
  FieldError,
  Input,
  Label,
  TextField,
} from "@/components/client";
import useMessageMutation from "@/hooks/home/use-message-mutation";
import useNetworkStatus from "@/hooks/use-network-status";
import { useState } from "react";
import InstallBtn from "./install-btn";

type Props = {
  addToQueue: (message: string) => void;
};

function SendMessageForm(props: Props) {
  const { addToQueue } = props;

  const [error, setError] = useState("");
  const [status, loaded] = useNetworkStatus();
  const textColor = status === "Online" ? "text-green-600" : "text-red-600";

  const { mutate, isPending } = useMessageMutation();

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
    <form
      noValidate
      autoComplete="off"
      onSubmit={submitHandler}
      className="flex flex-col items-center w-2xs max-w-full mx-auto gap-3 mb-8"
    >
      <TextField isInvalid={!!error.trim()} className="w-full" name="message">
        <Label className="text-gray-500 mb-2 block">Message:</Label>
        <Input
          placeholder="Enter a text..."
          className="block w-full bg-gray-100 py-2 px-3 rounded-lg"
        />
        <FieldError className="text-red-600 text-sm">{error}</FieldError>
      </TextField>

      <div className="flex w-full items-start">
        <InstallBtn />

        <Button
          type="submit"
          isDisabled={isPending}
          className="block bg-blue-500 text-white px-4 py-1 rounded-lg disabled:bg-gray-600 cursor-pointer pressed:bg-blue-600"
        >
          Send
        </Button>
      </div>

      <p className="self-start text-sm">
        <span className="text-gray-400">Status:</span>{" "}
        <span className={`${textColor} font-bold`}>
          {loaded ? status : "..."}
        </span>
      </p>
    </form>
  );
}

export default SendMessageForm;
