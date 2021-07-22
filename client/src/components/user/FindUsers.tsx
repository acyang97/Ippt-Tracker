import React, { useEffect } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import NavBarVersionTwo from "../layout/NavBarVersionTwo";
import SideDrawer from "../layout/SideDrawer";
import { bindActionCreators } from "redux";
import { userActionCreators } from "../../action-creators";
import { useDispatch, useSelector } from "react-redux";
import AlertComponent from "../alerts/AlertComponent";
import { UserState } from "../../reducers/user";
import { RootState } from "../../reducers";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    timeField: {},
  })
);

const FindUsers = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state: UserState = useSelector((state: RootState) => state.user);
  const { users } = state;
  const { findUsers } = bindActionCreators(userActionCreators, dispatch);

  useEffect(() => {
    findUsers();
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBarVersionTwo />
      <SideDrawer />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <AlertComponent />
        <Typography paragraph>Find other Users</Typography>
        {users.map((user) => (
          <div key={user._id}>
            <div>{user.name}</div>
            <div>{user.age}</div>
            <div>{user.email}</div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default FindUsers;
