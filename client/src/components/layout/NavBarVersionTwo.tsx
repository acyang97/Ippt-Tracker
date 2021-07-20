import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { RootState } from "../../reducers";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { authActionCreators } from "../../action-creators";
import React from "react";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
  })
);

const NavBarVersionTwo = () => {
  const classes = useStyles();
  const { isAuthenticated, isLoading } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();
  const { logout } = bindActionCreators(authActionCreators, dispatch);

  const logoutUser = (e: React.SyntheticEvent) => {
    e.preventDefault();
    logout();
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          {/* <LeftDrawer /> */}
          <Typography variant="h6" className={classes.title}>
            IPPT Tracker - Road to Gold
          </Typography>
          {!isLoading && (
            <React.Fragment>
              {isAuthenticated && (
                <Button color="inherit" onClick={(e) => logoutUser(e)}>
                  Logout
                </Button>
              )}
            </React.Fragment>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBarVersionTwo;
