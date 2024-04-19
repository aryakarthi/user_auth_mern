import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Home, Register, Login, Profile, UpdateProfile, Error } from "./pages";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
