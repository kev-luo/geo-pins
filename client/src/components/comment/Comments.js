import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core";
import { formatDistanceToNow } from 'date-fns';

export default function Comments({ comments }) {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      {comments.map((comment, index) => {
        return (
          <ListItem key={index}>
            <ListItemAvatar>
              <Avatar src={comment.author.picture} alt={comment.author.name} />
            </ListItemAvatar>
            <ListItemText
              primary={comment.text}
              secondary={
                <>
                  {comment.author.name} | {formatDistanceToNow(Number(comment.createdAt), { addSuffix: true })}
                </>
              }
            />
          </ListItem>
        );
      })}
    </List>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));
