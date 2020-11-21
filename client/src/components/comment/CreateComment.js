import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { InputBase, IconButton, Divider } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import SendIcon from "@material-ui/icons/Send";

export default function CreateComment() {
  const classes = useStyles();
  return (
    <>
      <form className={classes.form}>
        <IconButton className={classes.clearButton}>
          <ClearIcon />
        </IconButton>
        <InputBase
          className={classes.input}
          placeholder="Add comment..."
          multiline
        />
        <IconButton className={classes.sendButton}>
          <SendIcon />
        </IconButton>
      </form>
      <Divider />
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    alignItems: "center",
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  clearButton: {
    padding: 0,
    color: "red",
  },
  sendButton: {
    padding: 0,
    color: theme.palette.secondary.dark,
  },
}));
