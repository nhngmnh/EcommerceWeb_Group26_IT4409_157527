import { Outlet } from "react-router-dom";
import React from "react";
const DefaultPage = () => {
  return (
    <div>
      <h1>Welcome to Default Page</h1>
      <Outlet /> 
    </div>
  );
};

export default DefaultPage;
