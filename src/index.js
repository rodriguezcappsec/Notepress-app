import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import HomeAuth from "./components/Home-Auth/Home-Auth.jsx";

ReactDOM.render(<HomeAuth />, document.getElementById("root"));
registerServiceWorker();
