import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles';
import CssBseline from '@material-ui/core/CssBaseline';
import theme from '../theme';

import Header from '../components/Header';
import Map from '../components/Map';

const Home = () => (
  <ThemeProvider theme={ theme }>
    <CssBseline />
    <Header />
    <Map />
  </ThemeProvider>
)

export default Home