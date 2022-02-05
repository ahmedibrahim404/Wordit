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

          <Card key = {index} sx={{ maxWidth: 345, m: 2 }}>
        
          <CardHeader
              title={
              game.gameName
            }
          />
          
          <CardMedia
            component="img"
            height="140"
            image="https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/72bda89f-9bbf-4685-910a-2f151c4f3a8a/NicolaSturgeon_2019T-embed.jpg?w=512"
            alt="Nicola Sturgeon on a TED talk stage"
          />
        
          <CardContent>
              <Typography variant="body2" color="text.secondary" component="p">
                {game.info}
              </Typography>
              <Button variant="contained">Play {game.gameName}</Button>
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
    <Navbar />
    <GameButtons />
  </div>
);

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
