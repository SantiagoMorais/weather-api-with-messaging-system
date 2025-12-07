import { RouterProvider } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { router } from "./router";
import { toasterIconsList } from "./utils/objects/toaster-icons-list";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeTogglerProvider } from "./contexts/theme-toggler-context/theme-toggler-provider";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeTogglerProvider>
        <Toaster {...toasterIconsList} richColors position="top-right" />
        <RouterProvider router={router} />
      </ThemeTogglerProvider>
    </QueryClientProvider>
  );
}

export default App;
