import React from 'react';
import PropTypes from 'prop-types';
import styles from './GuessWordPanelRow.module.css';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const GuessWordPanelTile = () => (
  <div style={{
    backgroundColor:"grey",
    height:"60px",
    width:"60px",
    textAlign:"center",
    alignContent:"center",
    verticalAlign:"center",
    margin:"2px",
    borderRadius:"5px"
  }}>
    A
  </div>
);


const GuessWordPanelRow = () => (
  <Box style={{marginTop:"2px", marginBottom:"0px"}}>
    <Grid container spacing={2}>
      <Grid item container spacing={0} direction="row" justifyContent="center">
        <GuessWordPanelTile />
        <GuessWordPanelTile />
        <GuessWordPanelTile />
        <GuessWordPanelTile />
        <GuessWordPanelTile />
      </Grid>
    </Grid>
  </Box>
);

GuessWordPanelRow.propTypes = {};

GuessWordPanelRow.defaultProps = {};

export default GuessWordPanelRow;
