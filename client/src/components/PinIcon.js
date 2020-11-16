import React from 'react';
import PlaceTwoTone from '@material-ui/icons/PlaceTwoTone';

export default function PinIcon({ size, color, onClick }) {
  return(
    <PlaceTwoTone onClick={ onClick } style={{ fontSize: size, color}} />
  )
}