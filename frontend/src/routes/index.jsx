
import React from "react";
import Layout from "../pages/Home/HomeLayout";
import HomePage from "../pages/Home/HomePage";
import ProductDetailPage from "../pages/Home/ProductDetailPage";
import SearchPage from "../pages/Home/SearchPage";
import CartPage from "../pages/Home/CartPage";

export const routes = [
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "", element: <HomePage /> },
        { path: "search", element: <SearchPage /> },
        { path: "product/:id", element: <ProductDetailPage/> },
        { path: "cart", element: <CartPage /> },
      ],
    },
    // { path: "/account", element: <AccountPage /> },
  ];