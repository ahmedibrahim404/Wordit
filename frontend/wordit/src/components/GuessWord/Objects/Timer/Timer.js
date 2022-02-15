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
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function Timer(props) {
  const [progress, setProgress] = React.useState(0);

  let duration = props.time;
  React.useEffect(() => {
    const timer = setInterval(() => {        
      setProgress((prevProgress) => {
          if(prevProgress >= duration) clearInterval(timer);
        return (prevProgress >= duration ? duration : (prevProgress + 1000));;
      })
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Grid   container alignItems="center" justifyContent="center" style={{ minHeight: '50px' }}>
        <Box sx={{ width: '60%'  }}>
        <LinearProgressWithLabel value={progress/duration*100} />
        </Box>
    </Grid>
  );
}
