import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography, TextField } from '@material-ui/core';
import LandscapeIcon from '@material-ui/icons/Landscape';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import ClearIcon from '@material-ui/icons/Clear';
import SaveIcon from '@material-ui/icons/Save';
import PhotoOutlinedIcon from '@material-ui/icons/PhotoOutlined';

const useStyles = makeStyles(theme => ({
  form: { // this centers the form vertically
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingBottom: theme.spacing.unit,
  },
  contentField: { // this makes the text field wider
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
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
    marginRight: theme.spacing.unit
  },
  leftIcon: {
    fontSize: 20,
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    fontSize: 20,
    marginRight: theme.spacing.unit
  },
  button: { // spreads out the form a bit
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit,
    marginLeft: 0,
  }
}))

export default function CreatePin() {
  const classes = useStyles();
  const [text, setText] = useState({
    title: '',
    content: '',
  })
  const [image, setImage] = useState('');

  const handleTextChange = e => {
    const { name, value } = e.target;
    setText({
      ...text,
      [name]: value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    console.log({text, image});
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
        >
          <ClearIcon className={classes.leftIcon} />
          Discard
        </Button>
        <Button
          type='submit'
          className={classes.button}
          variant='contained'
          color='secondary'
          disabled={!text.title || !text.content || !image}
        >
          Submit
          <SaveIcon className={classes.rightIcon} />
        </Button>
      </div>
    </form>
  )
}
