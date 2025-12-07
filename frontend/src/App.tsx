import { RouterProvider } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { router } from "./router";
import { toasterIconsList } from "./utils/objects/toaster-icons-list";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster {...toasterIconsList} richColors position="top-right" />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
