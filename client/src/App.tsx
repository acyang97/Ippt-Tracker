import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Landing from "./components/layout/Landing";
import store from "./store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <React.Fragment>
        <Router>
          <Route exact path="/" component={Landing} />
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </Router>
      </React.Fragment>
    </Provider>
  );
};

export default App;
