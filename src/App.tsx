import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import Home from "./pages";
import Admin from "./pages/admin";
import Login from "./pages/login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
