
import React from "react";
import Layout from "../pages/Home/HomeLayout";
import HomePage from "../pages/Home/HomePage";
import ProductDetailPage from "../pages/Home/ProductDetailPage";

export const routes = [
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "", element: <HomePage /> },
        // { path: "search", element: <Search /> },
        { path: "product/:id", element: <ProductDetailPage/> },
      ],
    },
    // { path: "/account", element: <AccountPage /> },
  ];