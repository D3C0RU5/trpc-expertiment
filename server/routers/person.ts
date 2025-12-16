import { z } from "zod";
import { publicProcedure, router } from "../config/trpc";
import { Pollinations } from "../lib/pollinations";
import { randomUUID } from "crypto";

type Person = {
  id: string;
  name: string;
  acronym: string;
  createdAt: Date;
};

let people: Person[] = [];

export const personRouter = router({
  create: publicProcedure
    .input(z.object({ fullName: z.string(), role: z.string() }))
    .mutation(async ({ input }) => {
      const { fullName } = input;
      const generatedAcronym = await Pollinations.generateAcronym(fullName);

      const newPerson: Person = {
        id: randomUUID(),
        name: fullName,
        acronym: generatedAcronym || "!!!",
        createdAt: new Date(),
      };
      people.push(newPerson);

      return {
        success: true,
        acronym: generatedAcronym,
      };
    }),
  list: publicProcedure.query(async () => {
    return {
      success: true,
      people,
    };
  }),
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const { id } = input;

      people = people.filter((p) => p.id != id);

      return {
        success: true,
      };
    }),
});
