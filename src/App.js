import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Header from "./components/Header";
const AppLayout = () => {
  return (
    <div className="App">
      <Header />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    // children: [
    //   {
    //     path: "/",
    //     element: <Body />,
    //   },
    //   {
    //     path: "/about",
    //     element: (
    //       <Suspense fallback={<h1>Loading...</h1>}>
    //         <About />
    //       </Suspense>
    //     ),
    //   },
    //   {
    //     path: "/contact",
    //     element: <Contact />,
    //   },
    //   {
    //     path: "/restaurants/:resId",
    //     element: <RestroMenu />,
    //   },
    // ],
    // errorElement: <Error />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
