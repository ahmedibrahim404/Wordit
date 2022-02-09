import React from 'react';
import PropTypes from 'prop-types';
import styles from './GuessWordPanel.module.css';
import Grid from '@mui/material/Grid';
import GuessWordPanelRow from '../Objects/GuessWordPanelRow/GuessWordPanelRow';

class GuessWordPanel extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      numberOfWords: 5,
      words:[]
    }
    while(this.state.words.length < this.state.numberOfWords) this.state.words.push("");
  }

  render(){
    return (
    <Grid style={{marginTop:"20px"}}>
      {this.state.words.map((word, index) => <GuessWordPanelRow key={index} currentWord={word} numberOfTiles={5} />)}
    </Grid>
    );
  }
}

export default GuessWordPanel;
