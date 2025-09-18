import axiosInstance from "@/lib/axios";

export enum MessagesKeys {
  MESSAGES = "MESSAGES",
}

// Get Messages ---------------------------------------------------------------

export type MessagesResponse = {
  id: number;
  content: string;
}[];

export const getMessagesQuery = () =>
  axiosInstance.get<MessagesResponse>("/messages");

// Create Message -------------------------------------------------------------

export type CreateMessageResponse = {
  id: number;
  content: string;
};

export const createMessageMutation = (message: string) =>
  axiosInstance.post<CreateMessageResponse>("/messages", { content: message });
