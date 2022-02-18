import React from 'react';
import { Button, Fab, Grid, TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import { socket } from '../../../../utilities/socket';
import Alerts from '../../../main-components/Alerts/Alerts';

class CreateContestForm extends React.Component {
  constructor(props) {
    super(props);

    this.createContest = this.createContest.bind(this);
    this.io = socket;
    this.state = {
      slotsAvailable:2,
      contestDuration:10,
      wordsPerContest:1,
      trialsPerWord:5,
      contestCode:'',
      contestCodeCopied:false
    };

    this.contstraints = {
      slotsAvailable:[1, 5, 'Players Count'],
      contestDuration:[1, 10, 'Contest Duration'],
      wordsPerContest:[1, 10, 'Words Count'],
      trialsPerWord:[2, 10, 'Guesses per Word Count']
    }

    this.handleChange = this.handleChange.bind(this);
    this.createContest = this.createContest.bind(this);
    this.copyCode = this.copyCode.bind(this);
    this.checkConstraints = this.checkConstraints.bind(this);
  }

  componentDidMount(){
    this.io.on('private-contest-code', ({contestCode}) => {
      this.setState({
        ...this.state,
        contestCode
      });
    });
  }

  createContest(){
    let slotsAvailable = this.state.slotsAvailable, contestDuration = this.state.contestDuration*1000*60, wordsPerContest = this.state.wordsPerContest, trialsPerWord = this.state.trialsPerWord;
    
    if(!this.checkConstraints()) return;

    this.io.emit('create-private-contest', {
      slotsAvailable, contestDuration, wordsPerContest, trialsPerWord
    });

    this.showAlert(1, 'Contest was created succesfully! Press Copy to copy the code');

  }

  checkConstraints(){
    // loop through all 4 inputs, and check if the number entered is true
    let values = ['slotsAvailable', 'contestDuration', 'wordsPerContest', 'trialsPerWord'];
    for(let value of values){
      let min = this.contstraints[value][0], max=this.contstraints[value][1];
      if(this.state[value] > max || this.state[value] < min) {
        this.showAlert(0, this.contstraints[value][2] + ' should be between ' + min + ' and ' + max);
        return false;
      }
    }

    return true;
  }

  handleChange(e){
    let targetID = e.target.id;
    let targetVal = e.target.value;
    if(!(/^\d+$/.test(targetVal))) return;
    this.setState({
      ...this.state,
      [targetID]: targetVal
    });    
  }

  copyCode(){
    navigator.clipboard.writeText(this.state.contestCode);
    this.setState({
      ...this.state,
      contestCodeCopied:true
    });
  }

  showAlert(alertType, alertMessage){
    this.setState({
      alertType, alertMessage
    });
  }

  render(){
      return (
        <div style={{display: 'flex',alignItems: 'center',justifyContent: 'center'}} data-testid="CreateContestForm">
          <Alerts alertType={this.state.alertType} alertMessage={this.state.alertMessage} />
          <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
              <h2>Create Word Guess Contest</h2>
              <TextField id="slotsAvailable" pattern="[0-9]*" InputLabelProps={{style:{color:"#000"}}} value={this.state.slotsAvailable} onChange={this.handleChange} label="Players Count" variant="standard" inputProps={{color:'white'}} style={{textInput:'white', minWidth:"50%"}} />
              <TextField id="contestDuration" pattern="[0-9]*" InputLabelProps={{style:{color:"#000"}}} label="Contest Duration (in minutes)" value={this.state.contestDuration} onChange={this.handleChange} variant="standard" style={{textInput:'white', minWidth:"50%"}} />
              <TextField id="wordsPerContest" pattern="[0-9]*" InputLabelProps={{style:{color:"#000"}}} label="Words Count" variant="standard" value={this.state.wordsPerContest} onChange={this.handleChange} style={{textInput:'white', minWidth:"50%"}} />
              <TextField id="trialsPerWord" pattern="[0-9]*" InputLabelProps={{style:{color:"#000"}}} label="Guesses per word count" value={this.state.trialsPerWord} onChange={this.handleChange} variant="standard" style={{textInput:'white', minWidth:"50%"}} />
              <TextField id="contestCode" label="Contest Code" disabled={true} InputLabelProps={{style:{color:"#000"}}} value={this.state.contestCode} onChange={this.handleChange} variant="standard" style={{textInput:'white', minWidth:"50%"}} />
              {this.state.contestCode == '' ? 
                <Button onClick={this.createContest} variant="contained" style={{backgroundColor:'#181818', fontWeight:'bold' , minWidth:'50%', minHeight:'40px', margin:'25px'}}>Create Contest</Button>      
              : !this.state.contestCodeCopied ? <Button onClick={this.copyCode} variant="contained" style={{minWidth:'50%', minHeight:'40px', margin:'25px'}}>Copy Code</Button>    
              : <Button onClick={this.copyCode} variant="contained" style={{minWidth:'50%', minHeight:'40px', margin:'25px'}}>Copied! (Click to Copy Again)</Button>
            }
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
CreateContestForm.propTypes = {};

CreateContestForm.defaultProps = {};

export default CreateContestForm;
