import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles';
import CssBseline from '@material-ui/core/CssBaseline';
import theme from '../theme';

import Header from '../components/Header';

const Home = () => (
  <ThemeProvider theme={ theme }>
    <CssBseline />
    <Header />
  </ThemeProvider>
)

export default Home