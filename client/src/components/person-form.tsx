import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { queryClient, trpc } from "@/utils/trpc";

export function PersonForm() {
  const [fullName, setFullName] = useState("");

  const { mutate, isPending, error } = useMutation(
    trpc.person.create.mutationOptions({
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: trpc.person.list.queryKey(),
        });
      },
    })
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;

    mutate({ fullName, role: "admin" });
    setFullName("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          placeholder="Ex: Din Djarin"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>

      <Button type="submit" disabled={!fullName || isPending}>
        {isPending ? "Generating..." : "Create Acronym"}
      </Button>

      {error && <p className="text-sm text-red-500">Erro ao gerar acrônimo</p>}
    </form>
  );
}
