import React from 'react';
import PropTypes from 'prop-types';
import styles from './JoinContestForm.module.css';
import { Button, Fab, Grid, TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import { socket } from '../../../../utilities/socket';
import { Navigator } from '../Navigator/Navigator';

class JoinContestForm extends React.Component {

  constructor(props){
    super(props);
    this.io = socket;
    this.state = {
      username:'',
      contestCode:''
    };

    this.handleChange = this.handleChange.bind(this);
    this.joinContest = this.joinContest.bind(this);
    this.joinGlobalContest = this.joinGlobalContest.bind(this);
    this.joinPrivateContest = this.joinPrivateContest.bind(this);
    
  }

  componentDidMount(){
    this.io.on('enter-queue-wait', () => {
      this.props.myNavigation("/guessword/play/");
    });
  }

  joinContest(){
    let username = this.state.username;
    if(username == '') return;
    let contestCode = this.state.contestCode;
    if(contestCode == '') return this.joinGlobalContest();
    return this.joinPrivateContest();
  }

  joinGlobalContest(){
    let username = this.state.username;
    this.io.emit('enter-queue', {
      username
    });
  }

  joinPrivateContest(){
    let username = this.state.username;
    let contestCode = this.state.contestCode;
    this.io.emit('enter-private-queue', {
      username, contestCode
    });
  }

  handleChange(e){
    let targetID = e.target.id;
    let targetVal = e.target.value;
    this.setState({
      ...this.state,
      [targetID]: targetVal
    });    
  }

  
  render(){
    return (
      <div style={{display: 'flex',alignItems: 'center',justifyContent: 'center'}} data-testid="JoinContestForm">

        <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
            <h2>Join Word Guess Contest</h2>
            <TextField id="username" onChange={this.handleChange} value={this.state.username} label="Username" variant="standard" style={{minWidth:"50%"}} />
            <TextField id="contestCode" onChange={this.handleChange} value={this.state.contestCode} label="Contest ID(leave empty if none)" variant="standard" style={{minWidth:"50%"}}  />
            <Button variant="contained" onClick={this.joinContest} style={{backgroundColor:'#181818', fontWeight:'bold' , minWidth:'50%', minHeight:'40px', margin:'25px'}}>Join Contest</Button>    
        </Grid>


        <Link to={"/guessword"}> 
          <Box sx={{ '& > :not(style)': { m: 1 } }} style={{position:"fixed", left:15, bottom:15}}>
            <Fab variant="extended"><ArrowBackIcon sx={{ mr: 1 }}  /></Fab>
          </Box>
        </Link>
      </div>
    );
  }
}

JoinContestForm.propTypes = {};

JoinContestForm.defaultProps = {};

export default Navigator(JoinContestForm);
