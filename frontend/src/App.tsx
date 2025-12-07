import { RouterProvider } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { router } from "./router";
import { toasterIconsList } from "./utils/toaster-icons-list";

function App() {
  return (
    <>
      <Toaster {...toasterIconsList} />
      <RouterProvider router={router} />;
    </>
  );
}

export default App;
