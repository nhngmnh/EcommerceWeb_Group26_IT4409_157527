
import React from "react";
import Layout from "../pages/Home/HomeLayout";
import HomePage from "../pages/Home/HomePage";

export const routes = [
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "", element: <HomePage /> },
        // { path: "preview-lesson", element: <PreviewPage /> }
      ],
    },
    // { path: "/account", element: <AccountPage /> },
  ];