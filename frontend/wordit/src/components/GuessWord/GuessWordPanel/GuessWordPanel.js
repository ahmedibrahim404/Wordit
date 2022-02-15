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

    let wordResult = [];
    let results = [];
    for(let i=0;i<5;i++) wordResult.push(0);
    for(let i=0;i<5;i++) results.push(wordResult);

    this.io = socket;
    this.state = {
      numberOfWords: 5,
      numberOfTiles: 5,
      words:[],
      results:results,
      currentWord: 0,
      currentWordIndex:0,
      mainPlayer:props.mainPlayer,
      ownerID:props.ownerID
    }

    while(this.state.words.length < this.state.numberOfWords) this.state.words.push(" ".repeat(this.state.numberOfTiles));
    this.pressFunction = this.pressFunction.bind(this);
    this.changeWordResult = this.changeWordResult.bind(this);
  }
  
  componentDidMount(){
    this.onContestStart();
    this.io.on('player-state-update', ({user, guessAnswer}) => {
      if(user == this.state.ownerID){
        this.changeWordResult(guessAnswer);
      }
    });
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
    
    if(wordIndex >= words.length) return;
    if(characterIndex >= words[wordIndex].length) return;
    if(!isAlpha(newCharacter)) return;
    
    words[wordIndex] = replaceStringCharacter(words[wordIndex], characterIndex, newCharacter);
    
    this.setState({
      ...this.state,
      words:words,
      currentWordIndex: characterIndex+1
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
      currentWordIndex: characterIndex-1
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
      currentWord: this.state.currentWord+1,
      currentWordIndex:0
    });
  }

  checkWord(wordIndex){

    const wordEntered = this.state.words[wordIndex];
    this.io.emit('enter-word', {
      wordIndex:0,
      wordEntered
    });
    
  }

  changeWordResult(currentResults){
    //console.log(currentResults);
    if(currentResults.error) return;
    let wordIndex = currentResults.numberOfTrials;

    let results = this.state.results;
    results[wordIndex] = currentResults.guessAnswer.map((i) => i+1);

    this.setState({
      ...this.state,
      results:results
    });

    this.advanceWord();
  }


  pressFunction(event){
    const newKey = event.key;
    const currentWord = this.state.currentWord;
    const currentWordIndex = this.state.currentWordIndex;

    if(newKey == "Backspace"){
      this.eraseLastCharacter(currentWord, currentWordIndex);
    } else if(newKey == "Enter"){
      this.enterWord(currentWord, currentWordIndex);
    } else {
      this.updateWord(currentWord, currentWordIndex, newKey);
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
