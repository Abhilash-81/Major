import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import HomeScreen from "./Screens/HomeScreen";
import Loading from "./components/Loading.js";
import appStore from "./utils/appStore";

const Header = lazy(() => import("./components/Header"));
const Body = lazy(() => import("./components/Body"));
const Footer = lazy(() => import("./components/Footer"));
const About = lazy(() => import("./Screens/About"));
const Contact = lazy(() => import("./Screens/Contact"));
const Error = lazy(() => import("./components/Error"));
const ProfilePic = lazy(() => import("./components/profilePic.js"));
const Login = lazy(() => import("./Screens/Login"));
const UserProfile = lazy(() => import("./components/Userprofile"));
const Signup = lazy(() => import("./Screens/Signup"));
const Communities = lazy(() => import("./components/communities/Communities"));
const Community = lazy(() => import("./components/communities/Community"));
const CreateTweet = lazy(() => import("./components/CreateTweet"));
const UpdateProfile = lazy(() => import("./components/UpdateProfile"));
const Logout = lazy(() => import("./Screens/Logout"));
const Tweets = lazy(() => import("./components/Tweets"));
const UserprofileAvatar = lazy(() => import("./components/UserProfileAvatar"));
const CreateComment = lazy(() => import("./components/CreateComment.js"));
const Rating = lazy(() => import("./components/Rating.js"));

const RatingsWithReviews = lazy(() =>
  import("./components/RatingsWithReviews.js")
);

const App = () => {
  let persistor = persistStore(appStore);
  return (
    <React.StrictMode>
      <Provider store={appStore}>
        <PersistGate persistor={persistor}>
          <Header />
          <Outlet />
          <Footer />
          <ToastContainer />
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
};

const appRouter = (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomeScreen />} />
        <Route
          path="/users"
          element={
            <Suspense fallback={<Loading />}>
              <Body />
            </Suspense>
          }
        />
        <Route
          path="/users/v1/:username"
          element={
            <Suspense fallback={<Loading />}>
              <UserprofileAvatar />
            </Suspense>
          }
        />
        <Route
          path="/api/v1/users/profile"
          element={
            <Suspense fallback={<Loading />}>
              <UpdateProfile />
            </Suspense>
          }
        />
        <Route
          path="/users/:username"
          element={
            <Suspense fallback={<Loading />}>
              <UserProfile />
            </Suspense>
          }
        />
        <Route
          path="/about"
          element={
            <Suspense fallback={<Loading />}>
              <About />
            </Suspense>
          }
        />
        <Route
          path="/contact"
          element={
            <Suspense fallback={<Loading />}>
              <Contact />
            </Suspense>
          }
        />
        <Route
          path="/communities"
          element={
            <Suspense fallback={<Loading />}>
              <Communities />
            </Suspense>
          }
        />
        <Route
          path="/api/v1/hashtags/:id"
          element={
            <Suspense fallback={<Loading />}>
              <Community />
            </Suspense>
          }
        />
        <Route
          path="/api/v1/signup"
          element={
            <Suspense fallback={<Loading />}>
              <Signup />
            </Suspense>
          }
        />
        <Route
          path="/api/v1/login"
          element={
            <Suspense fallback={<Loading />}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/api/v1/logout"
          element={
            <Suspense fallback={<Loading />}>
              <Logout />
            </Suspense>
          }
        />
        <Route
          path="/api/v1/profilePic"
          element={
            <Suspense fallback={<Loading />}>
              <ProfilePic />
            </Suspense>
          }
        />
        <Route
          path="/api/v1/tweets"
          element={
            <Suspense fallback={<Loading />}>
              <CreateTweet />
            </Suspense>
          }
        />
        <Route
          path="/api/v1/comments"
          element={
            <Suspense fallback={<Loading />}>
              <CreateComment />
            </Suspense>
          }
        />
        <Route
          path="/api/v1/AllTweets"
          element={
            <Suspense fallback={<Loading />}>
              <Tweets />
            </Suspense>
          }
        />
        <Route
          path="/api/v1/Rating"
          element={
            <Suspense fallback={<Loading />}>
              <Rating />
            </Suspense>
          }
        />
        <Route
          path="/api/v1/RatingWithReviews"
          element={
            <Suspense fallback={<Loading />}>
              <RatingsWithReviews />
            </Suspense>
          }
        />
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  </Router>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(appRouter);
