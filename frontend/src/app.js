import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import About from "./Screens/About";
import Contact from "./Screens/Contact";
import Error from "./components/Error";
import Login from "./Screens/Login";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import UserProfile from "./components/Userprofile";
import HomeScreen from "./Screens/HomeScreen";

const App = () => {
  return (
    <React.StrictMode>
      <Header />
      <Outlet />
      <Footer />
    </React.StrictMode>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomeScreen />,
      },
      {
        path: "/users",
        element: <Body />,
        children: [
          {
            path: "/users/:username",
            element: <UserProfile />,
            errorElement: <Error />,
          },
        ],
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
    errorElement: <Error />,
  },
  {
    path: "/users/login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/users/logout",
    element: <Login />,
    errorElement: <Error />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
