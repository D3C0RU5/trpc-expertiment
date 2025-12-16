import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { queryClient, trpc } from "@/utils/trpc";

type Props = {
  personId: string;
};

export const DeleteButton = ({ personId }: Props) => {
  const { mutate, isPending } = useMutation(
    trpc.person.delete.mutationOptions({
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: trpc.person.list.queryKey(),
        });
      },
    })
  );

  const handleDelete = async () => {
    mutate({ id: personId });
  };

  return (
    <Button
      type="submit"
      variant="destructive"
      className="cursor-pointer"
      disabled={isPending}
      onClick={handleDelete}
    >
      <Trash2 className="w-5 h-5" />
    </Button>
  );
};
