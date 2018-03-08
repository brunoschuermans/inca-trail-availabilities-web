import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {MuiThemeProvider} from "material-ui";
import {BrowserRouter} from "react-router-dom";
import "whatwg-fetch";

ReactDOM.render(
    <MuiThemeProvider>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </MuiThemeProvider>
    , document.getElementById('root'));