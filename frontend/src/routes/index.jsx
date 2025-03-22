import DefaultPage from "../pages/DefaultPage/DefaultPage";
import React from "react";

export const routes = [
    {
      path: "/",
      element: <DefaultPage />,
    //   children: [
    //     // { path: "", element: <HomePage /> },
    //     // { path: "preview-lesson", element: <PreviewPage /> }
    //   ],
    },
    // { path: "/account", element: <AccountPage /> },
  ];