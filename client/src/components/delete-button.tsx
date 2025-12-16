import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";

export const DeleteButton = () => {
  const handleDelete = async () => {};

  return (
    <Button
      type="submit"
      variant="destructive"
      className="cursor-pointer"
      onClick={handleDelete}
    >
      <Trash2 className="w-5 h-5" />
    </Button>
  );
};
