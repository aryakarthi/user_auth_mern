import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Home, Register, Login, Profile, UpdateProfile, Error } from "./pages";
import { RootLayout, ProtectedRoutes } from "./components";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> }, // index: true = path: "/"
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      {
        element: <ProtectedRoutes />,
        children: [
          { path: "/profile", element: <Profile /> },
          { path: "/updateprofile", element: <UpdateProfile /> },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
