import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/trpc";
import { PersonForm } from "./components/person-form";
import { People } from "./components/people";
import "./App.css";
import { ThemeProvider } from "./lib/theme-provider";
export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="flex justify-center p-5">
          <div className="flex flex-col gap-5 w-xl ">
            <PersonForm />
            <hr />
            <People />
          </div>
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
