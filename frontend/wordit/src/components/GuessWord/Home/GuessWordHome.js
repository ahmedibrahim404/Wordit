import React from 'react';
import PropTypes from 'prop-types';
import styles from './GuessWordHome.module.css';
import Navbar from '../../main-components/Navbar/Navbar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const options = [
  {
    name:'Create Game'
  },
  {
    name:'Enter Game'
  }
]

const GuessWordHome = () => (
  <div className={styles.GuessWordHome} data-testid="GuessWordHome">
      <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
        {
          options.map((option) => {
            console.log(option);
            return <Button variant="contained" style={{minWidth:'70%', minHeight:'50px', margin:'25px'}}>{option.name}</Button>
          })
        }
      </Grid>
  </div>
);

GuessWordHome.propTypes = {};

GuessWordHome.defaultProps = {};

export default GuessWordHome;
