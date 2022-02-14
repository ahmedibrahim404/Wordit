import React from 'react';
import PropTypes from 'prop-types';
import styles from './Navbar.module.css';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import logoImg from '../../../scrabble.png';
import { games } from '../../../config';

const Navbar = () => {

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const style = {
    textShadow: `1px 1px 0 #000,
    -1px 1px 0 #000,
    1px -1px 0 #000,
    -1px -1px 0 #000,
    0px 1px 0 #000,
    0px -1px 0 #000,
    -1px 0px 0 #000,
    1px 0px 0 #000,
    2px 2px 0 #000,
    -2px 2px 0 #000,
    2px -2px 0 #000,
    -2px -2px 0 #000,
    0px 2px 0 #000,
    0px -2px 0 #000,
    -2px 0px 0 #000,
    2px 0px 0 #000,
    1px 2px 0 #000,
    -1px 2px 0 #000,
    1px -2px 0 #000,
    -1px -2px 0 #000,
    2px 1px 0 #000,
    -2px 1px 0 #000,
    2px -1px 0 #000,
    -2px -1px 0 #000`,
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' },justifyContent: 'center', alignItems: 'center' }}
          >
            <img src={logoImg} style={{height:"50px", width:"50px", padding:"10px"}} />
            <div style={{color:"#A4A4A4", textShadow:style.textShadow}}>Wordit</div>
          </Typography>


          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } , justifyContent: 'center', alignItems: 'center'}}
          >
            <img src={logoImg} style={{height:"50px", width:"50px", padding:"10px"}} />
            <div style={{color:"#A4A4A4", textShadow:style.textShadow}}>Wordit</div>
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>


  );
}
Navbar.propTypes = {};

Navbar.defaultProps = {};

export default Navbar;
