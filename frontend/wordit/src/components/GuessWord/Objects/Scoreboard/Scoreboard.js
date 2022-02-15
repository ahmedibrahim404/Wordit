import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import PeopleIcon from '@mui/icons-material/People';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import {socket} from '../../../../utilities/socket';
import { Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function TablePaginationActions(props) {
  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }} ></Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};


/**
 * Sorts an array based on score descending 
 * Array structure = ([username, score])
 * @param arr array to be sorted
 */
const sortScores = (arr) => {
  return arr.sort((a, b) => (a[1] > b[1] ? -1 : 1));
}


function ScoreboardData(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  
  let navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const playAgain = () => {
    navigate('/');
  }

  let rows = [...props.scoreboard];
  return (
    <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
      <TableContainer component={Paper} style={{position:"fixed", top:"20%", maxWidth:350}}>
        <Table aria-label="custom pagination table">
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <TableRow key={row[0]}>
                <TableCell component="th" scope="row">
                  {row[0]}
                </TableCell>
                <TableCell align="right">
                  {row[1]}
                </TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 
                  10, 25,
                  { label: 'All', value: -1 }
                  ]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      {props.isContestRunning ? null :(
        <Button variant="contained" style={{position:"fixed", top:"50%"}} onClick={playAgain}>Play Again!</Button>
      )}
    </Grid>
  );
}


class Scoreboard extends React.Component {
   
  constructor(props){
    super(props);
    this.io = socket;
    this.state = {
      open:false,
      scoreboard:[],
      isContestRunning:true
    }
    
  }

  componentDidMount(){
    this.io.on('send-scoreboard', ({scoreboard}) => {
      this.setScoreboard(scoreboard);
    });

    this.io.on('end-contest', ({scoreboard}) => {
      this.setScoreboard(scoreboard);
      this.setState({isContestRunning:false});
      this.setOpen(true);
    });

  }
  
  /**
   * set state with the new scoreboard data
   * @param  {} scoreboard scoreboard data from back-end
   */
  setScoreboard(scoreboard){
    this.setState({
      ...this.state,
      scoreboard: sortScores(scoreboard)
    });
  }

  /**
   * method to toggle scoreboard
   * @param {bool} val indicates state of scoreboard (true=open/false=close)
   */
  setOpen(val){
    this.setState({
      ...this.state,
      open:val
    });
  }
  
  handleOpen = () => {
    this.io.emit('get-scoreboard');
    this.setOpen(true);
  };


  handleClose = () => {
    if(!this.state.isContestRunning) return;
    this.setOpen(false);
  };


  render(){
    return (
        <div>
            <Box sx={{ '& > :not(style)': { m: 1 } }} onClick={this.handleOpen} style={{position:"fixed", left:15, bottom:15}}>
              <Fab variant="extended">
              <PeopleIcon sx={{ mr: 1 }}  />
                  Scoreboard
              </Fab>
            </Box>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={this.state.open}
                onClose={this.handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={this.state.open}>
                  <div>
                    <ScoreboardData isContestRunning={this.state.isContestRunning} scoreboard={this.state.scoreboard} />
                  </div>
                </Fade>
            </Modal>
        </div>
    );
  }
}

export default Scoreboard;