import axiosInstance from "@/lib/axios";

export enum MessagesKeys {
  MESSAGES = "MESSAGES",
}

type MessagesResponse = {
  id: number;
  content: string;
}[];

export const getMessagesQuery = () =>
  axiosInstance.get<MessagesResponse>("/messages");
