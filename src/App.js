import React, { lazy, Suspense, useContext } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import User from "./components/User";
import UserClass from "./components/UserClass";
import RestroMenu from "./components/RestroPage";
import Footer from "./components/Footer";
import UserContext from "./utils/UserContext";

const AppLayout = () => {
  return (
    <div className="App">
      <UserContext.Provider value={{ loggedInUser: "SSG" }}>
        <UserContext.Provider value={{ loggedInUser: "Elon" }}>
          <Header />
        </UserContext.Provider>

        <Outlet />
        {/* <Footer /> */}
      </UserContext.Provider>
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/restaurants/:resId",
        element: <RestroMenu />,
      },
    ],
    errorElement: <Error />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
