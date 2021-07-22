import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FavoriteIcon from "@material-ui/icons/Favorite";
import HomeIcon from "@material-ui/icons/Home";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { trainingSessionActionCreators } from "../../action-creators";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
  })
);

const SideDrawer = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const { initLoadTrainingSession } = bindActionCreators(
    trainingSessionActionCreators,
    dispatch
  );

  const onHomeButtonClicked = (): void => {
    history.push("/home");
    initLoadTrainingSession();
    // need to do something to load the training sessions again after click on this
  };

  const onAddTrainingButtonClicked = (): void => {
    history.push("/add-training");
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem button key={"home"} onClick={onHomeButtonClicked}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={"Home"} />
        </ListItem>
        <ListItem button key={"addpost"} onClick={onAddTrainingButtonClicked}>
          <ListItemIcon>
            <FavoriteIcon />
          </ListItemIcon>
          <ListItemText primary={"Add Training"} />
        </ListItem>
      </List>
      <Divider />
    </Drawer>
  );
};

export default SideDrawer;
