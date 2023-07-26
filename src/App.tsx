import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./routes/root";
import CreateEmployee from "./routes/createEmployee";
import { AppBar, Toolbar } from "@mui/material";
import UpdateEmployee from "./routes/updateEmployee";
import { SnackbarContextProvider } from "./contexts/SnackbarContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/createEmployee",
    element: <CreateEmployee />,
  },
  {
    path: "/employee/:id",
    element: <UpdateEmployee />,
  },
]);

const App: React.FC = () => {
  return (
    <SnackbarContextProvider>
      <AppBar position="relative">
        <Toolbar>
          <h3>Employees</h3>
        </Toolbar>
      </AppBar>
      <RouterProvider router={router} />;
    </SnackbarContextProvider>
  );
};

export default App;
