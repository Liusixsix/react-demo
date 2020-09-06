import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HashRouter as Router } from "react-router-dom";
import { renderRoutes } from 'react-router-config'
import "lib-flexible";
import routes from './routes'
import store from "./store";
import './index.css'

ReactDOM.render(
  <Provider store={store}>
    <Router>
     {renderRoutes(routes)}
    </Router>
  </Provider>,
  document.getElementById("root")
);
