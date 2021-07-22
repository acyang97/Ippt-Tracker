/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { IHydratedUser } from "../../interfaces/User.interface";
import { Button } from "@material-ui/core";
import { AuthState } from "../../interfaces/Auth.interface";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { useState } from "react";
import { useEffect } from "react";
import { isNil } from "lodash";
import { bindActionCreators } from "redux";
import { userActionCreators } from "../../action-creators";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: "auto",
      maxHeight: "auto",
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: red[500],
    },
  })
);

const UserCard = (props: { user: IHydratedUser }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const authState: AuthState = useSelector((state: RootState) => state.auth);
  // const userState: UserState = useSelector((state: RootState) => state.user);
  const [following, setFollowing] = useState(false);
  const dispatch = useDispatch();
  const { followUser } = bindActionCreators(userActionCreators, dispatch);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    console.log(
      props.user.followersListOfUser.followers.find(
        (u) => u._id === authState.user?._id
      )
    );
    if (
      props.user.followersListOfUser.followers.find(
        (u) => u._id === authState.user?._id
      )
    ) {
      setFollowing(true);
    }
  }, []);

  // need a useEffect fo find out if the user already

  const { name, age, _id: idOfUser } = props.user;

  // create the function to follow user
  const followSelectedUser = () => {
    followUser(idOfUser);
    setFollowing(true);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {!isNil(name) && name[0].toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={name}
        subheader={`Age: ${age}`}
      />
      <CardContent>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
        ></Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button
          variant="contained"
          color={following ? "secondary" : "primary"}
          disabled={following}
          onClick={followSelectedUser}
        >
          {following ? "Followed" : "Follow"}
        </Button>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default UserCard;
