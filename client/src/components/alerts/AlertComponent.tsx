import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Alert, { Color } from "@material-ui/lab/Alert";
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

// I want this to access the alert state
const AlertComponent = () => {
  const classes = useStyles();
  const alerts: ErrorAlertInterface[] = useSelector(
    (state: RootState) => state.alert
  ); // the alerts

  const convertToColor = (messageType: string): Color => {
    return messageType as Color;
  };

  return (
    <React.Fragment>
      {alerts.map((alert) => (
        <div className={classes.root} key={alert.id}>
          <Alert severity={convertToColor(alert.messageType)}>
            {alert.message}
          </Alert>
        </div>
      ))}
    </React.Fragment>
  );
};

export default AlertComponent;
