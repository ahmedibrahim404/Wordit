import React from 'react';
import PropTypes from 'prop-types';
import styles from './GuessWordPanel.module.css';
import Grid from '@mui/material/Grid';
import GuessWordPanelRow from '../Objects/GuessWordPanelRow/GuessWordPanelRow';
import {replaceStringCharacter, isAlpha, isCharacterInWord} from '../../../utilities';
import { socket } from '../../../utilities/socket';


class GuessWordPanel extends React.Component {
  constructor(props){
    
    super(props);
    
    this.io = socket;
    this.state = {
      numberOfWords: this.props.numberOfWords,
      numberOfTiles: 5,
      numberOfAttempts:this.props.numberOfAttempts,
      currentWordIndex:this.props.currentWordIndex,

      words:[],
      results:this.props.results,
      
      currentRowIndex: 0,
      currentCharIndex:0,
      
      mainPlayer:props.mainPlayer,
      ownerID:props.ownerID
    }

    this.pressFunction = this.pressFunction.bind(this);
    this.changeWordResult = this.changeWordResult.bind(this);
    this.clearGrid = this.clearGrid.bind(this);
  }

  clearGrid(currentWordIndex, resultsGiven=null){
    let results = [];
    if(resultsGiven == null){
      let wordResult = [];
      for(let i=0;i<5;i++) wordResult.push(0);
      for(let i=0;i<5;i++) results.push(wordResult);
    } else {
      results = [...resultsGiven];
    }
    let idx = 0;
    let words = [];

    while(idx < this.state.numberOfAttempts){
      words.push(" ".repeat(this.state.numberOfTiles));
      idx++;
    }

    this.setState({
      ...this.state,
      results,
      words,
      currentRowIndex:0,
      currentCharIndex:0,
      currentWordIndex
    });


  }
  
  componentDidMount(){
    this.clearGrid(this.state.currentWordIndex);
    this.onContestStart();
    this.io.on('player-state-update', ({user, guessAnswer}) => {
      if(user == this.state.ownerID && guessAnswer.wordIndex == this.state.currentWordIndex){
        this.changeWordResult(guessAnswer);
      }
    });
  }

  componentDidUpdate(prevProp){
    if(this.props.currentWordIndex == prevProp.currentWordIndex && this.props.results == prevProp.results) return;
    this.clearGrid(this.props.currentWordIndex, this.props.results);
  }

  onContestStart(){
    if(this.state.mainPlayer)document.addEventListener("keydown", this.pressFunction, false);
  }

  onContestEnd(){
    if(this.state.mainPlayer)document.removeEventListener("keydown", this.pressFunction, false);
  }
  
  componentWillUnmount(){
    this.onContestEnd();
  }
  

  updateWord(wordIndex, characterIndex, newCharacter){
    let words = [...this.state.words];
    
    newCharacter = newCharacter.toLowerCase();
    
    if(wordIndex >= words.length) return;
    if(characterIndex >= words[wordIndex].length) return;
    if(!isAlpha(newCharacter)) return;
    
    words[wordIndex] = replaceStringCharacter(words[wordIndex], characterIndex, newCharacter);
    
    this.setState({
      ...this.state,
      words:words,
      currentCharIndex: characterIndex+1
    });
  }

  eraseLastCharacter(wordIndex, characterIndex){
    let words = [...this.state.words];
    
    if(wordIndex >= words.length) return;
    if(characterIndex === 0) return;

    words[wordIndex] = replaceStringCharacter(words[wordIndex], characterIndex-1, ' ');

    this.setState({
      ...this.state,
      words:words,
      currentCharIndex: characterIndex-1
    });
  }

  enterWord(wordIndex, characterIndex){
    let words = [...this.state.words];
    
    if(wordIndex >= words.length) return;
    if(characterIndex !== words[wordIndex].length) return;

    this.checkWord(wordIndex);  
  }

  advanceWord(){
    this.setState({
      ...this.state,
      currentRowIndex: this.state.currentRowIndex+1,
      currentCharIndex:0
    });
  }

  checkWord(wordIndex){

    const wordEntered = this.state.words[wordIndex];
    this.io.emit('enter-word', {
      wordIndex:this.state.currentWordIndex,
      wordEntered
    });
    
  }

  changeWordResult(currentResults){
    //console.log(currentResults);
    if(currentResults.error) return;
    let wordIndex = currentResults.numberOfTrials;

    let results = this.state.results;
    results[wordIndex] = currentResults.guessAnswer;

    this.setState({
      ...this.state,
      results:results
    });

    this.advanceWord();
  }


  pressFunction(event){
    const newKey = event.key;
    const currentRowIndex = this.state.currentRowIndex;
    const currentCharIndex = this.state.currentCharIndex;

    if(newKey == "Backspace"){
      this.eraseLastCharacter(currentRowIndex, currentCharIndex);
    } else if(newKey == "Enter"){
      this.enterWord(currentRowIndex, currentCharIndex);
    } else {
      this.updateWord(currentRowIndex, currentCharIndex, newKey);
    }
  }

  render(){
    return (
    <Grid style={{marginTop:"20px"}}>
      {this.state.words.map((word, index) => <GuessWordPanelRow key={index} mainPlayer={this.state.mainPlayer} currentWord={word} numberOfTiles={this.state.numberOfTiles} result={this.state.results[index]} />)}
    </Grid>
    );
  }
}

export default GuessWordPanel;
