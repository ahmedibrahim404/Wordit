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
      currentWordIndex:0,
      currentWordAnswers:{}
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

    <Grid container spacing={2}>
      <Grid item xs={8}>
      <Box textAlign='center'>
        <ButtonGroup variant="text" aria-label="text button group">
          <Button disabled={true}>Word #{this.state.currentWordIndex+1}</Button>
          <Button disabled={this.state.currentWordIndex >= this.state.wordNumbers-1} onClick={this.goNextWord}>Next Word</Button>
        </ButtonGroup>
      </Box>
      <GuessWordPanel mainPlayer={true} numberOfWords={5} numberOfAttempts={5}
       currentWordIndex={this.state.currentWordIndex} ownerID={localStorage.getItem('player-id')}
        results={this.state.currentWordAnswers[localStorage.getItem('player-id')]}/>
      </Grid>
      <Divider orientation="vertical" flexItem style={{marginTop:"50px"}} />

      <Grid item xs={3}>

      {
        this.state.users.map((user) => (user != localStorage.getItem('player-id') ? 
          <GuessWordPanel numberOfWords={5} numberOfAttempts={5}
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
