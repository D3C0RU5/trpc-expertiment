import { useQuery } from "@tanstack/react-query";
import { trpc } from "../utils/trpc";
import { inferProcedureOutput } from "@trpc/server";
import { AppRouter } from "../../../server";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { DeleteButton } from "./delete-button";

type People = inferProcedureOutput<AppRouter["person"]["list"]>["people"];

export const People = () => {
  const { data } = useQuery(trpc.person.list.queryOptions());

  const people = data?.people ?? [];

  return (
    <Table>
      <TableCaption>List of persons</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Full name</TableHead>
          <TableHead>Acronym</TableHead>
          <TableHead className="text-right">Created at</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {people?.map((person) => (
          <TableRow key={person.id}>
            <TableCell className="font-medium">{person.name}</TableCell>
            <TableCell>{person.acronym}</TableCell>
            <TableCell className="text-right">
              {new Date(person.createdAt).toLocaleString()}
            </TableCell>
            <TableCell>
              <DeleteButton />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
