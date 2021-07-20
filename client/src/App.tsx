import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Landing from "./components/layout/Landing";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./action-creators/auth";
import Navbar from "./components/layout/NavBar";
import PrivateRoute from "./utils/PrivateRoute";
import ErrorAlert from "./components/alerts/ErrorAlert";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App: React.FC = () => {
  useEffect(() => {
    store.dispatch(loadUser() as any);
  }, []);
  return (
    <Provider store={store}>
      <Navbar />
      <Router>
        <React.Fragment>
          <ErrorAlert />
          <PrivateRoute exact path="/landing" component={Landing} />
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </React.Fragment>
      </Router>
    </Provider>
  );
};

export default App;
