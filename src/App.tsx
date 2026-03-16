import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./components/utils/ProtectedRoutes";
import "./index.css";
import Home from "./pages";
import AdminPage from "./pages/admin";
import LoginPage from "./pages/login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    // THE GUARD
    element: <ProtectedRoute />,
    children: [
      {
        path: "/admin",
        element: <AdminPage />,
      },
    ],
  },

  {
    path: "/login",
    element: <LoginPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
