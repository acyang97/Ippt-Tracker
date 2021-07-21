import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import NavBarVersionTwo from "../layout/NavBarVersionTwo";
import SideDrawer from "../layout/SideDrawer";
import { Button, TextField } from "@material-ui/core";
import TimeField from "react-simple-timefield";
import { useState } from "react";
import { bindActionCreators } from "redux";
import { trainingSessionActionCreators } from "../../action-creators";
import { useDispatch } from "react-redux";
import AlertComponent from "../alerts/AlertComponent";
import { setAlert } from "../../action-creators/alert";

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

const AddTraining = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { createTraining } = bindActionCreators(
    trainingSessionActionCreators,
    dispatch
  );
  const [runTiming, setRunTiming] = useState("12:30");
  const [pushUps, setPushUps] = useState(0);
  const [sitUps, setSitUps] = useState(0);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pushUps < 0 || sitUps < 0) {
      dispatch(
        setAlert("Push-Ups and Sit-Ups have to be positive", "error") as any
      );
      return;
    }
    createTraining(pushUps, sitUps, runTiming);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBarVersionTwo />
      <SideDrawer />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <AlertComponent />
        <Typography paragraph>Add your IPPT Training results</Typography>
        <form onSubmit={(e) => onSubmit(e)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="number"
            id="pushUps"
            label="Push Ups"
            name="pushUps"
            value={pushUps}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPushUps(Number(e.target.value))
            }
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="number"
            name="sitUps"
            label="Sit Ups"
            id="sitUps"
            value={sitUps}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSitUps(Number(e.target.value))
            }
          />
          <TimeField
            value={runTiming}
            input={
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="run"
                label="2.4km Run Timing"
                id="run"
              />
            }
            onChange={(e) => setRunTiming(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Add
          </Button>
        </form>
      </main>
    </div>
  );
};

export default AddTraining;
