import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import NavBarVersionTwo from "./NavBarVersionTwo";
import SideDrawer from "./SideDrawer";
import TrainingSessionCard from "../training/TrainingSessionCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { bindActionCreators } from "redux";
import { trainingSessionActionCreators } from "../../action-creators";
import { useEffect } from "react";
import { TrainingSessionsState } from "../../reducers/trainingSession";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
    feed: {
      padding: theme.spacing(3),
    },
    cardPadding: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
  })
);

const Home = () => {
  const classes = useStyles();
  const state: TrainingSessionsState = useSelector(
    (state: RootState) => state.trainingSession
  );
  const { trainingSessions } = state;
  const dispatch = useDispatch();
  const { initLoadTrainingSession } = bindActionCreators(
    trainingSessionActionCreators,
    dispatch
  );

  // TODO: change the logic on when this should reload again
  useEffect(() => {
    initLoadTrainingSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBarVersionTwo />
      <SideDrawer />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {trainingSessions.map((session) => (
          <div className={classes.cardPadding} key={session._id}>
            <TrainingSessionCard hydratedTrainingSession={session} />
          </div>
        ))}
      </main>
    </div>
  );
};

export default Home;
