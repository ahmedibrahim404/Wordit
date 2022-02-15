import React from 'react';
import PropTypes from 'prop-types';
import styles from './GuessWordHome.module.css';
import Navbar from '../../main-components/Navbar/Navbar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Fab } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import GuessWordPanel from '../GuessWordPanel/GuessWordPanel';

const options = [
  {
    name:'Create Contest',
    link:'/guessword/createcontest/'
  },
  {
    name:'Join Contest',
    link:'/guessword/joincontest/'
  }
]

const GuessWordHome = () => (
  <div className={styles.GuessWordHome} data-testid="GuessWordHome">
      <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
        {
          options.map((option) => {
            return (
              <Link to={`${option.link}`} style={{ width:'100%', textDecoration: 'none', color:'white' }}>
                <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
                  <Button variant="contained" style={{minWidth:'70%', minHeight:'50px', margin:'25px'}}>
                    {option.name}
                  </Button>
                </Grid>
              </Link>
            );
          })
        }


        <Link to={"/"}> 
          <Box sx={{ '& > :not(style)': { m: 1 } }} style={{position:"fixed", left:15, bottom:15}}>
            <Fab variant="extended"><ArrowBackIcon sx={{ mr: 1 }}  /></Fab>
          </Box>
        </Link>

      </Grid>
  </div>
);

GuessWordHome.propTypes = {};

GuessWordHome.defaultProps = {};

export default GuessWordHome;
