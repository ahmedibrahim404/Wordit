import React from 'react';
import PropTypes from 'prop-types';
import styles from './CreateContestForm.module.css';
import { Button, Fab, Grid, TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';

const CreateContestForm = () => (
  <div style={{display: 'flex',alignItems: 'center',justifyContent: 'center', margin:'10px'}} data-testid="CreateContestForm">

    <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
        <h2>Create Word Guess Contest</h2>
        <TextField id="playerscount" label="Players Count" variant="standard" style={{minWidth:"50%"}} />
        <TextField id="duration" label="Contest Duration (in minutes)" variant="standard" style={{minWidth:"50%"}} />
        <TextField id="wordscount" label="Words Count" variant="standard" style={{minWidth:"50%"}} />
        <TextField id="guessescount" label="Guesses per word count" variant="standard" style={{minWidth:"50%"}} />
        <TextField id="contestcode" label="Contest Code" disabled={true} variant="standard" style={{minWidth:"50%"}} />
        <Button variant="contained" style={{minWidth:'50%', minHeight:'40px', margin:'25px'}}>Create Contest</Button>    
    </Grid>

    <Link to={"/guessword"}> 
      <Box sx={{ '& > :not(style)': { m: 1 } }} style={{position:"fixed", left:15, bottom:15}}>
        <Fab variant="extended"><ArrowBackIcon sx={{ mr: 1 }}  /></Fab>
      </Box>
    </Link>
  </div>
);

CreateContestForm.propTypes = {};

CreateContestForm.defaultProps = {};

export default CreateContestForm;
