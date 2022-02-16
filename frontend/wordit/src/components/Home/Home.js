import React from 'react';
import styles from './Home.module.css';
import Navbar from '../main-components/Navbar/Navbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import { games } from '../../config';
import { Link } from 'react-router-dom';

import gameImage from './puzzle.png';

const GameButtons = () => (
  
  <Grid
      container
      spacing={0}
      direction="row"
      align = "center" justify = "center" 
      style={{ minHeight: '100vh' }
    }
  >

  {
  
    games.map((game, index) => {
  
      return (
        <Grid key={index} item item xs = {false} sm = {4} md = {6} style={{textAlign: "center"}} >

          <Card key = {index} sx={{ maxWidth: 345, m: 2 }} style={{backgroundColor:'rgb(232 215 255)'}}>
        
          <CardHeader
              title={
              game.gameName
            }
          />
          
          <CardMedia
            component="img"
            height="200"
            image={gameImage}
            alt="game image"
          />
        
          <CardContent>
              <Typography variant="body2" color="text.secondary" component="p">
                {game.info}
              </Typography>
              <Link to={"/guessword"}> <Button variant="contained" >
                Play {game.gameName}
              </Button></Link>
          </CardContent>
        
        </Card>

      </Grid>   
     
      );
    })
    
  }
    
  
  </Grid>
);

const Home = () => (
  <div className={styles.Home} data-testid="Home">
    <GameButtons />
  </div>
);

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
