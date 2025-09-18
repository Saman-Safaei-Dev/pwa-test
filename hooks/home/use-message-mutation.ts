import {
  createMessageMutation,
  MessagesKeys,
  MessagesResponse,
} from "@/services/messages";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useMessageMutation() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createMessageMutation,
    onSuccess: async (res) => {
      await queryClient.cancelQueries({ queryKey: [MessagesKeys.MESSAGES] });
      queryClient.setQueryData<MessagesResponse>(
        [MessagesKeys.MESSAGES],
        (oldData) => {
          if (!oldData) return [res.data];
          return [...oldData, res.data];
        },
      );
    },
  });

  return { mutate, isPending };
}

export default useMessageMutation;
