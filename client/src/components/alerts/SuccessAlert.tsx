import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { ErrorAlert as ErrorAlertInterface } from "../../interfaces/Alert.interface";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
  })
);

const SuccessAlert = () => {
  const classes = useStyles();
  const alerts: ErrorAlertInterface[] = useSelector(
    (state: RootState) => state.alert
  ); // the alerts

  return (
    <React.Fragment>
      {alerts.map((alert) => (
        <div className={classes.root} key={alert.id}>
          <Alert severity="success">{alert.message}</Alert>
        </div>
      ))}
    </React.Fragment>
  );
};

export default SuccessAlert;
