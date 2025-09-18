"use client";

import { Button } from "@/components/client";
import { useEffect, useRef, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
}

function InstallBtn() {
  const installPrompt = useRef<BeforeInstallPromptEvent>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      installPrompt.current = event as BeforeInstallPromptEvent;
      setVisible(true);
    });
  }, []);

  const clickListener = async () => {
    if (!installPrompt.current) return;

    await installPrompt.current.prompt();
    installPrompt.current = null;
    setVisible(false);
  };

  return (
    <Button
      onPress={clickListener}
      className={`${visible ? "block" : "hidden"} bg-green-500 text-white px-4 py-1 rounded-lg cursor-pointer pressed:bg-green-600 self-center ml-auto mr-1`}
    >
      Install
    </Button>
  );
}

export default InstallBtn;
