import { z } from "zod";
import { publicProcedure, router } from "../config/trpc";
import { Pollinations } from "../lib/pollinations";
import { randomUUID } from "crypto";
import { success } from "zod/v4";

type Person = {
  id: string;
  name: string;
  acronym: string;
  createdAt: Date;
};

let people: Person[] = [];

export const personRouter = router({
  create: publicProcedure
    .input(z.object({ fullName: z.string() }))
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
});
