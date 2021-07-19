import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { RootState } from "../../reducers";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { authActionCreators } from "../../action-creators";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

const NavBar = () => {
  const classes = useStyles();
  const isAuthenticated = useSelector((state: RootState) => state.auth);
  // const { isAuthenticated } = state;
  const dispatch = useDispatch();
  const { logout, register } = bindActionCreators(authActionCreators, dispatch);

  const logoutUser = (e: React.SyntheticEvent) => {
    e.preventDefault();
    logout();
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          {isAuthenticated && (
            <Button color="inherit" onClick={(e) => logoutUser(e)}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
