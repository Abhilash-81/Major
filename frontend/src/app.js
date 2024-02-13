import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { Provider } from "react-redux";
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
import Tweet from "./components/Tweet";
import UpdateProfile from "./components/UpdateProfile";
import appStore from "./utils/appStore";
import Logout from "./Screens/Logout";

const App = () => {
  return (
    <React.StrictMode>
      <Provider store={appStore}>
        <Header />
        <Outlet />
        <Footer />
      </Provider>
    </React.StrictMode>
  );
};

const appRouter = (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomeScreen />} />
        <Route path="/users" element={<Body />} />
        <Route path="/users/:username" element={<UserProfile />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/communities" element={<Communities />} />
        <Route path="/api/v1/hashtags/:id" element={<Community />} />
        <Route path="/api/v1/signup" element={<Signup />} />
        <Route path="/api/v1/login" element={<Login />} />
        <Route path="/api/v1/logout" element={<Logout />} />
        <Route path="/api/v1/tweets" element={<Tweet />} />
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  </Router>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(appRouter);
