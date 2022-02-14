import React from 'react';
import PropTypes from 'prop-types';
import styles from './GuessWordPlay.module.css';
import GuessWordPanel from '../GuessWordPanel/GuessWordPanel';
import Navbar from '../../main-components/Navbar/Navbar';
import Scoreboard from '../Objects/Scoreboard/Scoreboard';
import MuiGrid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';

const Grid = styled(MuiGrid)(({ theme }) => ({
  width: '100%',
  ...theme.typography.body2,
  '& [role="separator"]': {
    margin: theme.spacing(0, 2),
  },
}));


const GuessWordPlay = () => (
  <div className={styles.GuessWordPlay} data-testid="GuessWordPlay">

  <Scoreboard />

  <Grid container spacing={2}>
    <Grid item xs={8}>

      <GuessWordPanel mainPlayer={true}/>

    </Grid>
    <Divider orientation="vertical" flexItem style={{marginTop:"50px"}} />

    <Grid item xs={3}>

    <GuessWordPanel mainPlayer={false}/>
    <GuessWordPanel mainPlayer={false}/>
    <GuessWordPanel mainPlayer={false}/>

    </Grid>
  </Grid>


  </div>
);

GuessWordPlay.propTypes = {};

GuessWordPlay.defaultProps = {};

export default GuessWordPlay;
