import React from 'react';
import PropTypes from 'prop-types';
import styles from './GuessWordPanelRow.module.css';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

class GuessWordPanelTile extends React.Component {

  

  render(){
    return (
      <div style={{
        backgroundColor:"grey",
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
    for(let i=0;i<this.numberOfTiles;i++) this.tiles.push(<GuessWordPanelTile key={i} currentCharacter={this.word.length <= i ? '' : this.word[i]} />);
  }



  render(){
    this.addTiles();
    this.word = "H"
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
