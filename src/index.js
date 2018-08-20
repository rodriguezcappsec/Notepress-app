import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter } from "react-router-dom";
import HomeAuth from "./components/Home-Auth/Home-Auth.jsx";

// ReactDOM.render(
//   <BrowserRouter>
//     <App isLoggedIn={true} />
//   </BrowserRouter>,
//   document.getElementById("root")
// );
ReactDOM.render(
  <HomeAuth />,
  document.getElementById("root")
);
registerServiceWorker();
