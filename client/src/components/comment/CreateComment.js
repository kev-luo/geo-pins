import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { InputBase, IconButton, Divider } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import SendIcon from "@material-ui/icons/Send";

import { CREATE_COMMENT_MUTATION } from "../../utils/graphql/mutations";
import { useClient } from "../../utils/graphQlClient";
import UserContext from '../../utils/UserContext';

export default function CreateComment() {
  const classes = useStyles();
  const client = useClient();
  const { state, dispatch } = useContext(UserContext);
  const [comment, setComment] = useState("");

  const handleSubmitComment = async() => {
    const variables = { pinId: state.currentPin._id, text: comment }
    // NOTE: don't need this since we're subscribing to updates to pins on map component
    // const { createComment } = 
    await client.request(CREATE_COMMENT_MUTATION, variables);
    // NOTE: don't need this since we're subscribing to updates to pins on map component
    // dispatch({ type: "CREATE_COMMENT", payload: createComment })
    setComment('');
  }

  return (
    <>
      <form className={classes.form}>
        <IconButton
          onClick={() => setComment("")}
          disabled={!comment.trim()}
          className={classes.clearButton}
        >
          <ClearIcon />
        </IconButton>
        <InputBase
          className={classes.input}
          placeholder="Add comment..."
          multiline
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <IconButton onClick={handleSubmitComment} disabled={!comment.trim()} className={classes.sendButton}>
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
