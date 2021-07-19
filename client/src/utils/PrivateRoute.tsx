import { useSelector } from "react-redux";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { RootState } from "../reducers";
import Spinner from "./Spinner";

interface PrivateRouteProps extends RouteProps {
  // tslint:disable-next-line:no-any
  component: any;
}

const PrivateRoute = (props: PrivateRouteProps) => {
  const { component: Component, ...rest } = props;
  const state = useSelector((state: RootState) => state.auth);
  const { isLoading, isAuthenticated } = state;
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        isLoading ? (
          <Spinner />
        ) : isAuthenticated ? (
          <Component {...routeProps} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
