import { RouterProvider } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { router } from "./router";
import { toasterIconsList } from "./utils/toaster-icons-list";

function App() {
  return (
    <>
      <Toaster {...toasterIconsList} richColors position="top-right" />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
