import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import About from "./Screens/About";
import Contact from "./Screens/Contact";
import Error from "./components/Error";
import Login from "./Screens/Login";
import UserProfile from "./components/Userprofile";
import HomeScreen from "./Screens/HomeScreen";
import Signup from "./Screens/Signup";
import Communities from "./components/communities/Communities";
import Community from "./components/communities/Community";

const App = () => {
  return (
    <React.StrictMode>
      <Header />
      <Outlet />
      <Footer />
    </React.StrictMode>
  );
};

const appRouter = (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomeScreen />} />
        <Route path="/users" element={<Body />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/communities" element={<Communities />} />
        <Route path="/api/v1/hashtags/:id" element={<Community />} />
      </Route>
      <Route path="/users/auth" element={<Login />} />
      <Route path="/users/register" element={<Signup />} />
      <Route path="/users/logout" element={<Login />} />
      <Route path="/users/:username" element={<UserProfile />} />
      <Route path="*" element={<Error />} />
    </Routes>
  </Router>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(appRouter);
