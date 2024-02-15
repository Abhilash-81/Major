import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import CreateTweet from "./components/CreateTweet";
import UpdateProfile from "./components/UpdateProfile";
import appStore from "./utils/appStore";
import Logout from "./Screens/Logout";
import Tweets from "./components/Tweets";

const App = () => {
  return (
    <React.StrictMode>
      <Provider store={appStore}>
        <Header />
        <Outlet />
        <Footer />
        <ToastContainer />
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
        <Route path="/api/v1/users/profile" element={<UpdateProfile />} />
        <Route path="/users/:username" element={<UserProfile />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/communities" element={<Communities />} />
        <Route path="/api/v1/hashtags/:id" element={<Community />} />
        <Route path="/api/v1/signup" element={<Signup />} />
        <Route path="/api/v1/login" element={<Login />} />
        <Route path="/api/v1/logout" element={<Logout />} />
        <Route path="/api/v1/tweets" element={<CreateTweet />} />
        <Route path="/api/v1/AllTweets" element={<Tweets />} />
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  </Router>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(appRouter);
