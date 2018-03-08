import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {getMuiTheme, green500, MuiThemeProvider} from "material-ui";
import {BrowserRouter} from "react-router-dom";


ReactDOM.render(
    <MuiThemeProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </MuiThemeProvider>
    , document.getElementById('root'));