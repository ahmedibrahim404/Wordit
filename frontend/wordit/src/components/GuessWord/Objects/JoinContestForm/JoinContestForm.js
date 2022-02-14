import React from 'react';
import PropTypes from 'prop-types';
import styles from './JoinContestForm.module.css';
import { Button, Fab, Grid, TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';

const JoinContestForm = () => (
  <div style={{display: 'flex',alignItems: 'center',justifyContent: 'center', margin:'10px'}} data-testid="JoinContestForm">

    <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
        <h2>Join Word Guess Contest</h2>
        <TextField id="username" label="Username" variant="standard" style={{minWidth:"50%"}} />
        <TextField id="contest-code" label="Contest ID(leave empty if none)" variant="standard" style={{minWidth:"50%"}}  />
        <Button variant="contained" style={{minWidth:'50%', minHeight:'40px', margin:'25px'}}>Join Contest</Button>    
    </Grid>


    <Link to={"/guessword"}> 
      <Box sx={{ '& > :not(style)': { m: 1 } }} style={{position:"fixed", left:15, bottom:15}}>
        <Fab variant="extended"><ArrowBackIcon sx={{ mr: 1 }}  /></Fab>
      </Box>
    </Link>
  </div>
);

JoinContestForm.propTypes = {};

JoinContestForm.defaultProps = {};

export default JoinContestForm;
