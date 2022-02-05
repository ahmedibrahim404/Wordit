import React from 'react';
import PropTypes from 'prop-types';
import styles from './GuessWordPlay.module.css';
import GuessWordPanel from '../GuessWordPanel/GuessWordPanel';
import Navbar from '../../main-components/Navbar/Navbar';

const GuessWordPlay = () => (
  <div className={styles.GuessWordPlay} data-testid="GuessWordPlay">
    <Navbar />
    <GuessWordPanel />
  </div>
);

GuessWordPlay.propTypes = {};

GuessWordPlay.defaultProps = {};

export default GuessWordPlay;
