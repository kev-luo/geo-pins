import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import AccessTime from "@material-ui/icons/AccessTime";
import FaceIcon from "@material-ui/icons/Face";
import UserContext from "../../utils/UserContext";

export default function PinContent() {
  const classes = useStyles();
  const { state } = useContext(UserContext);
  const { title, content, author, createdAt, comments } = state.currentPin;
  return (
    <div className={classes.root}>
      <Typography component="h2" variant="h4" color="primary" gutterBottom>
        {title}
      </Typography>
      <Typography
        className={classes.text}
        component="h3"
        variant="h6"
        color="inherit"
        gutterBottom
      >
        <FaceIcon className={classes.icon} /> {author.name}
      </Typography>
      <Typography
        className={classes.text}
        variant="subtitle2"
        color="inherit"
        gutterBottom
      >
        <AccessTime classname={classes.icon} />
        {createdAt}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>{content}</Typography>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {},
  text: {},
  icon: {},
}));
