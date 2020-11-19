import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography, TextField } from '@material-ui/core';
import LandscapeIcon from '@material-ui/icons/Landscape';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import ClearIcon from '@material-ui/icons/Clear';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles(themes => ({
  form: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingBottom: themes.spacing.unit,
  },
  contentField: {
    marginLeft: themes.spacing.unit,
    marginRight: themes.spacing.unit,
    width: '95%',
  }
}))

export default function CreatePin() {
  const classes = useStyles();
  return (
    <form className={classes.form}>
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
        />
        <input 
          accept='image/*'
          id='image'
          type='file'
          className={classes.input}
        />
        <label htmlFor='image'>
          <Button
            component='span'
            size='small'
            className={classes.button}
          ><AddAPhotoIcon /></Button>
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
        >
          Submit
          <SaveIcon className={classes.rightIcon} />
        </Button>
      </div>
    </form>
  )
}
