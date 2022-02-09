import React from 'react';
import PropTypes from 'prop-types';
import styles from './GuessWordPanel.module.css';
import Grid from '@mui/material/Grid';
import GuessWordPanelRow from '../Objects/GuessWordPanelRow/GuessWordPanelRow';
import {replaceStringCharacter, isAlpha, isCharacterInWord} from '../../../utilities';

class GuessWordPanel extends React.Component {
  
  constructor(props){
    super(props);

    let wordResult = [];
    let results = [];
    for(let i=0;i<5;i++) wordResult.push(0);
    for(let i=0;i<5;i++) results.push(wordResult);


    this.state = {
      numberOfWords: 5,
      numberOfTiles: 5,
      words:[],
      results:results,
      currentWord: 0,
      currentWordIndex:0,
      correctWord:"AHMED"
    }

    while(this.state.words.length < this.state.numberOfWords) this.state.words.push(" ".repeat(this.state.numberOfTiles));
    this.pressFunction = this.pressFunction.bind(this);
  }
  
  componentDidMount(){
    document.addEventListener("keydown", this.pressFunction, false);
  }
  
  componentWillUnmount(){
    document.removeEventListener("keydown", this.pressFunction, false);
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

    this.setState({
      ...this.state,
      currentWord: this.state.currentWord+1,
      currentWordIndex:0
    });
    
  }

  checkWord(wordIndex){

    let currentResults = [0, 0, 0, 0, 0];

    const correctWord = this.state.correctWord;
    const currentWord = this.state.words[wordIndex];

    for(let characterIndex in currentWord){
      if(correctWord[characterIndex] == currentWord[characterIndex]){
        currentResults[characterIndex] = 1;
      } else if(isCharacterInWord(currentWord[characterIndex], correctWord)){
        currentResults[characterIndex] = 2;
      } else {
        currentResults[characterIndex] = 3;
      }
    }
    
    let results = this.state.results;
    results[wordIndex] = currentResults;

    this.setState({
      ...this.state,
      results:results
    });

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
      {this.state.words.map((word, index) => <GuessWordPanelRow key={index} currentWord={word} numberOfTiles={this.state.numberOfTiles} result={this.state.results[index]} />)}
    </Grid>
    );
  }
}

export default GuessWordPanel;
