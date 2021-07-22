import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./action-creators/auth";
import PrivateRoute from "./utils/PrivateRoute";
import Home from "./components/layout/Home";
import AddTraining from "./components/training/AddTraining";
import FindUsers from "./components/user/FindUsers";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App: React.FC = () => {
  useEffect(() => {
    store.dispatch(loadUser() as any);
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <React.Fragment>
          <PrivateRoute exact path="/home" component={Home} />
          <PrivateRoute exact path="/add-training" component={AddTraining} />
          <PrivateRoute exact path="/find-users" component={FindUsers} />
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
