
import React from "react";
import Layout from "../pages/Home/HomeLayout";
import HomePage from "../pages/Home/HomePage";

export const routes = [
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "", element: <HomePage /> },
        { path: "search", element: <Search /> },
        // { path: "preview-lesson", element: <PreviewPage /> }
      ],
    },
    // { path: "/account", element: <AccountPage /> },
  ];