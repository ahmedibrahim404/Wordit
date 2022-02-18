import React from 'react';
import PropTypes from 'prop-types';
import styles from './GuessWordPlay.module.css';
import GuessWordPanel from '../GuessWordPanel/GuessWordPanel';
import Scoreboard from '../Objects/Scoreboard/Scoreboard';
import MuiGrid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import { socket } from '../../../utilities/socket';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Box } from '@mui/material';
import Timer from '../Objects/Timer/Timer';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';

const Grid = styled(MuiGrid)(({ theme }) => ({
  width: '100%',
  ...theme.typography.body2,
  '& [role="separator"]': {
    margin: theme.spacing(0, 2),
  },
  container:true,
  spacing:0,
  direction:"column",
  alignItems:"center",
}));


class GuessWordPlay extends React.Component {

  constructor(props){
    super(props);
    this.io = socket;

    this.state = {
      users:[],
      wordNumbers:2,
      attemptsNumber: 5,
      currentWordIndex:0,
      currentWordAnswers:{},
      isRunning:false,

      contestDuration:0
    }

    this.goNextWord = this.goNextWord.bind(this);
    
  }


  componentDidMount(){
    this.io.on('players-joined', ({users}) => {
      this.setState({
        ...this.state,
        users
      });
    });

  this.io.on('send-players-word-result', ({results}) => {
    this.setState({
      currentWordAnswers: results
    });
  });

  this.io.on('start-contest', ({contestDuration, numberOfWords, numberOfTrials}) => {
    this.setState({
      isRunning:true,
      contestDuration,
      wordNumbers: numberOfWords,
      attemptsNumber: numberOfTrials
    });
  });


  }

  goNextWord(){
    if(this.state.currentWordIndex >= this.state.wordNumbers-1) return;
    this.setState({
      currentWordIndex:this.state.currentWordIndex+1
    });  
    this.io.emit('get-players-word-result', {wordIndex:this.state.currentWordIndex+1});
  }

  render(){
    return (
    <div className={styles.GuessWordPlay} data-testid="GuessWordPlay">

    <Scoreboard />
    
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={!this.state.isRunning}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
          timeout: 500,
      }}>
        <div>
          <h1 style={{position:'fixed', color:'white', top:'50%', left:'25%'}}>
            CONTEST WILL START SOON
          </h1>
        </div>
    </Modal>  

    <Grid container spacing={2}>
    
      <Timer time={this.state.contestDuration} />
    
      <Grid item xs={8}>
    
      <Box textAlign='center'>
        <ButtonGroup variant="text" aria-label="text button group">
          <Button disabled={true}>Word #{this.state.currentWordIndex+1}</Button>
          <Button disabled={this.state.currentWordIndex >= this.state.wordNumbers-1} onClick={this.goNextWord}>Next Word</Button>
        </ButtonGroup>
      </Box>
    
      <GuessWordPanel mainPlayer={true} numberOfWords={this.state.wordNumbers} numberOfAttempts={this.state.attemptsNumber}
       currentWordIndex={this.state.currentWordIndex} ownerID={localStorage.getItem('player-id')}
        results={this.state.currentWordAnswers[localStorage.getItem('player-id')]}/>
    
      </Grid>
    
      <Divider orientation="vertical" flexItem style={{marginTop:"50px"}} />

      <Grid item xs={3}>

      {
        this.state.users.map((user) => (user != localStorage.getItem('player-id') ? 
          <GuessWordPanel numberOfWords={this.state.wordNumbers} numberOfAttempts={this.state.attemptsNumber}
           currentWordIndex={this.state.currentWordIndex} ownerID={user}
            mainPlayer={false} results={this.state.currentWordAnswers[user]} />
          : null))
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
