import React from 'react';
import PropTypes from 'prop-types';
import styles from './GuessWordPanelRow.module.css';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

let colors = ['Grey', 'Green', 'Yellow', 'Red'];

class GuessWordPanelTile extends React.Component {

  render(){
    return (
      <div style={{
        backgroundColor:colors[this.props.color],
        height:"60px",
        width:"60px",
        textAlign:"center",
        alignContent:"center",
        verticalAlign:"center",
        margin:"2px",
        borderRadius:"5px"
      }}>
        {this.props.currentCharacter}
      </div>  
    );
  }

}



class GuessWordPanelRow extends React.Component{ 

  numberOfTiles = this.props.numberOfTiles || 5;
  tiles = [];
  word = "";
  
  addTiles(){
    this.tiles = [];
    this.word = this.props.currentWord || "";    
    for(let i=0;i<this.numberOfTiles;i++) this.tiles.push(<GuessWordPanelTile key={i} color={this.props.result[i]} currentCharacter={this.word.length <= i ? '' : this.word[i]} />);
  }



  render(){
    this.addTiles();
    while(this.props.result.length < this.props.numberOfTiles) this.props.result.push(0);
    return (
        <Box style={{marginTop:"2px", marginBottom:"0px"}}>
          <Grid container spacing={2}>
            <Grid item container spacing={0} direction="row" justifyContent="center">
              {
                  this.tiles.map((tile) => tile)
              }
            </Grid>
          </Grid>
        </Box>
      );
  }
}

GuessWordPanelRow.propTypes = {};

GuessWordPanelRow.defaultProps = {};

export default GuessWordPanelRow;
