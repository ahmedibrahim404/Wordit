import React from 'react';
import PropTypes from 'prop-types';
import styles from './GuessWordPanel.module.css';
import Grid from '@mui/material/Grid';
import GuessWordPanelRow from '../Objects/GuessWordPanelRow/GuessWordPanelRow';

const GuessWordPanel = () => (
  <Grid style={{marginTop:"20px"}}>
    <GuessWordPanelRow />
    <GuessWordPanelRow />
    <GuessWordPanelRow />
    <GuessWordPanelRow />
    <GuessWordPanelRow />
  </Grid>
);

GuessWordPanel.propTypes = {};

GuessWordPanel.defaultProps = {};

export default GuessWordPanel;
