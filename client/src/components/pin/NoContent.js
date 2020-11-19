import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import ExploreIcon from "@material-ui/icons/Explore";

const useStyles = makeStyles((themes) => ({
  root: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  icon: {
    margin: themes.spacing.unit,
    fontSize: "80px",
  },
}));

export default function NoContent() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ExploreIcon className={classes.icon} />
      <Typography
        noWrap
        component="h2"
        variant="h6"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        Click on the map to add a pin
      </Typography>
    </div>
  );
}
