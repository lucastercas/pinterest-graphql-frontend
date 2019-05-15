import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./custom.scss";

require('dotenv').config()

ReactDOM.render(<App/>, document.getElementById("root"));
