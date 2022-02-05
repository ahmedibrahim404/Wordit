import logo from './logo.svg';
import './App.css';
import Home from './components/Home/Home';
import GuessWordHome from './components/GuessWord/Home/GuessWordHome';
import GuessWordPanelRow from './components/GuessWord/Objects/GuessWordPanelRow/GuessWordPanelRow';
import Grid from '@mui/material/Grid';
import GuessWordPlay from './components/GuessWord/GuessWordPlay/GuessWordPlay';

function App() {
  return (
    <div>
      <GuessWordPlay />
    </div>
  );
}

export default App;
