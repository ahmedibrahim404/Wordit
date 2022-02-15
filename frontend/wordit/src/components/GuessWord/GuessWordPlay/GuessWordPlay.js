import React from 'react';
import PropTypes from 'prop-types';
import styles from './GuessWordPlay.module.css';
import GuessWordPanel from '../GuessWordPanel/GuessWordPanel';
import Navbar from '../../main-components/Navbar/Navbar';
import Scoreboard from '../Objects/Scoreboard/Scoreboard';
import MuiGrid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import { socket } from '../../../utilities/socket';

const Grid = styled(MuiGrid)(({ theme }) => ({
  width: '100%',
  ...theme.typography.body2,
  '& [role="separator"]': {
    margin: theme.spacing(0, 2),
  },
}));


class GuessWordPlay extends React.Component {

  constructor(props){
    super(props);
    this.io = socket;

    this.state = {
      users:[]
    }
  }


  componentDidMount(){
    this.io.on('players-joined', ({users}) => {
      this.setState({
        users
      });
    });
  }

  render(){
    return (
    <div className={styles.GuessWordPlay} data-testid="GuessWordPlay">

    <Scoreboard />

    <Grid container spacing={2}>
      <Grid item xs={8}>

        <GuessWordPanel mainPlayer={true} ownerID={localStorage.getItem('player-id')}/>

      </Grid>
      <Divider orientation="vertical" flexItem style={{marginTop:"50px"}} />

      <Grid item xs={3}>

      {
        this.state.users.map((user) => (user != localStorage.getItem('player-id') ? <GuessWordPanel ownerID={user} mainPlayer={false}/> : null))
      }
      

      </Grid>
    </Grid>


    </div>
    );
  }
};

GuessWordPlay.propTypes = {};

GuessWordPlay.defaultProps = {};

export default GuessWordPlay;
