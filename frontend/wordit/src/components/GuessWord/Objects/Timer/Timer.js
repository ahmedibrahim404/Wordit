import * as React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary" style={{whiteSpace:"nowrap"}}>{`${Math.round(
          props.timeLeft,
        )}s left`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function Timer(props) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    let duration = props.time;
    const timer = setInterval(() => {        
      setProgress((prevProgress) => {
        console.log(prevProgress + " " + duration);
          if(prevProgress >= duration) clearInterval(timer);
        return (prevProgress >= duration ? duration : (prevProgress + 1000));;
      })
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [props.time]);

  return (
    <Grid   container alignItems="center" justifyContent="center" style={{ minHeight: '50px' }}>
        <Box sx={{ width: '60%'  }}>
        <LinearProgressWithLabel value={Math.floor((props.time-progress)/props.time * 100)} timeLeft={(props.time-progress)/1000} />
        </Box>
    </Grid>
  );
}
