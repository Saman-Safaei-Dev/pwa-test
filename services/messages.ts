import axiosInstance from "@/lib/axios";

export enum MessagesKeys {
  MESSAGES = "MESSAGES",
  CREATE_MESSAGE = "CREATE_MESSAGE",
}

// Get Messages ---------------------------------------------------------------

export type MessagesResponse = {
  id: string;
  content: string;
}[];

export const getMessagesQuery = () =>
  axiosInstance.get<MessagesResponse>("/messages");

// Create Message -------------------------------------------------------------

export type CreateMessageResponse = {
  id: string;
  content: string;
};

export const createMessageMutation = (message: string) =>
  axiosInstance.post<CreateMessageResponse>("/messages", { content: message });
