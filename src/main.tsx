import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { queryClient } from "./lib/queryClients.ts";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: "999px",
            background: "var(--off-white)",
            color: "var(--text-primary)",
          },
        }}
      />
    </QueryClientProvider>
  </StrictMode>
);
