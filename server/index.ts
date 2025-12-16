import { createHTTPServer } from "@trpc/server/adapters/standalone";
import cors from "cors";
import { personRouter } from "./routers/person";
import { router } from "./config/trpc";

const appRouter = router({
  person: personRouter,
});

export type AppRouter = typeof appRouter;

createHTTPServer({
  middleware: cors(),
  router: appRouter,
  createContext() {
    return {};
  },
}).listen(2022);
