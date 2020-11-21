import React, { useState, useContext } from 'react'
import { GraphQLClient } from 'graphql-request';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography, TextField } from '@material-ui/core';
import LandscapeIcon from '@material-ui/icons/Landscape';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import ClearIcon from '@material-ui/icons/Clear';
import SaveIcon from '@material-ui/icons/Save';
import PhotoOutlinedIcon from '@material-ui/icons/PhotoOutlined';

import UserContext from '../../utils/UserContext';
import { CREATE_PIN_MUTATION } from '../../utils/graphql/mutations';

const useStyles = makeStyles(theme => ({
  form: { // this centers the form vertically
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingBottom: theme.spacing(1),
  },
  contentField: { // this makes the text field wider
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '95%',
  },
  input: { // this hides the input field where you add a photo
    display: 'none',
  },
  alignCenter: { // makes the title a little less spread out
    display: 'flex',
    alignItems: 'center',
  },
  iconLarge: {
    fontSize: 40,
    marginRight: theme.spacing(1)
  },
  leftIcon: {
    fontSize: 20,
    marginRight: theme.spacing(1),
  },
  rightIcon: {
    fontSize: 20,
    marginRight: theme.spacing(1)
  },
  button: { // spreads out the form a bit
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(1),
    marginLeft: 0,
  }
}))

export default function CreatePin() {
  const classes = useStyles();
  const { state, dispatch } = useContext(UserContext);
  const initialState = { title: '', content: '' }
  const [text, setText] = useState(initialState)
  const [image, setImage] = useState('');
  // disable button when mutation is in flight so it can't be submitted multiple times
  const [submitting, setSubmitting] = useState(false);

  const handleTextChange = e => {
    const { name, value } = e.target;
    setText({
      ...text,
      [name]: value
    })
  }

  const handleImageUpload = async() => {
    // console.log(image);
    const data = new FormData(); // info about image we want to upload
    data.append('file', image);
    data.append('upload_preset', 'geopins') // geopins is the name of our upload preset we set up on their website
    data.append('cloud_name', 'dvpfe3cch') // dvpfe3cch is our username on cloudinary
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dvpfe3cch/image/upload",
      data
    )
    return response.data.url
  }

  const handleDelete = () => {
    setText(initialState);
    setImage('');
    dispatch({ type: 'DELETE_DRAFT'})
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setSubmitting(true)
      const idToken = window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token;
      const url = await handleImageUpload();
      // console.log(url);
      const client = new GraphQLClient('http://localhost:4000/graphql', {
        headers: { authorization: idToken }
      })
      const { latitude, longitude } = state.draft
      const { title, content } = text;
      const variables = { title, image: url, content, latitude, longitude }
      const { createPin } = await client.request(CREATE_PIN_MUTATION, variables)
      console.log("pin created", createPin)
      handleDelete();
    } catch(err) {
      setSubmitting(false)
      console.error("error creating pin", err);
    }
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Typography
        className={classes.alignCenter}
        component="h2"
        variant="h4"
        color="secondary"
      >
      <LandscapeIcon className={classes.iconLarge} /> Pin Location
      </Typography>
      <div>
        <TextField 
          name='title'
          label='Title'
          placeholder='Insert pin title'
          onChange={handleTextChange}
        />
        <input 
          accept='image/*'
          id='image'
          type='file'
          className={classes.input}
          onChange={e => setImage(e.target.files[0])}
        />
        <label htmlFor='image'>
          <Button
            component='span'
            size='small'
            className={classes.button}
          >
          {image ? <PhotoOutlinedIcon /> : <AddAPhotoIcon />}
          </Button>
        </label>
      </div>
      <div className={classes.contentField}>
        <TextField 
          name='content'
          label='content'
          multiline
          rows='6'
          margin='normal'
          fullWidth
          variant='outlined'
          onChange={handleTextChange}
        />
      </div>
      <div>
        <Button
          className={classes.button}
          variant='contained'
          color='primary'
          onClick={handleDelete}
        >
          <ClearIcon className={classes.leftIcon} />
          Discard
        </Button>
        <Button
          type='submit'
          className={classes.button}
          variant='contained'
          color='secondary'
          disabled={!text.title || !text.content || !image || submitting}
        >
          Submit
          <SaveIcon className={classes.rightIcon} />
        </Button>
      </div>
    </form>
  )
}
