import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import NavBarVersionTwo from "../layout/NavBarVersionTwo";
import SideDrawer from "../layout/SideDrawer";
import { Button, Grid, TextField } from "@material-ui/core";
import TimeField from "react-simple-timefield";
import { useState } from "react";

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

  const [runTiming, setRunTiming] = useState("12:30");

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBarVersionTwo />
      <SideDrawer />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>Add your IPPT Training results</Typography>
        <form onSubmit={(e) => console.log("a")}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="pushUps"
            label="Push Ups"
            name="pushUps"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              console.log("a")
            }
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="sitUps"
            label="Sit Ups"
            id="sitUps"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              console.log("a")
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
