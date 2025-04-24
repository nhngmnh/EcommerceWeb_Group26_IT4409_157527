import NotFound from "./pages/NotFound";
import React from "react";
import { routes } from "./routes";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// import { useDispatch } from "react-redux";
// import { useEffect, useState } from "react";

function App() {
  // const dispatch = useDispatch();
  return (
    <div className="App">
      <Routes>
        {routes?.map((route, index) => (
          <Route
            key={`first-route${index}`}
            path={route?.path}
            element={route?.element}
          >
            {route?.children?.map((childRoute, index1) => (
              <Route
                key={`child-route${index1}`}
                path={childRoute?.path}
                element={childRoute?.element}
              />
            ))}
          </Route>
        ))}

        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;