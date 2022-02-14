import logo from './logo.svg';
import './App.css';
import Home from './components/Home/Home';
import GuessWordHome from './components/GuessWord/Home/GuessWordHome';
import GuessWordPanelRow from './components/GuessWord/Objects/GuessWordPanelRow/GuessWordPanelRow';
import Grid from '@mui/material/Grid';
import GuessWordPlay from './components/GuessWord/GuessWordPlay/GuessWordPlay';
import { createTheme } from '@mui/material/styles';
import MuiThemeProvider from '@mui/material/styles/ThemeProvider';
import backgroundH from "./vid.gif";
import Navbar from './components/main-components/Navbar/Navbar';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateContestForm from './components/GuessWord/Objects/CreateContestForm/CreateContestForm';
import JoinContestForm from './components/GuessWord/Objects/JoinContestForm/JoinContestForm';

const theme = createTheme({
  palette: {
    primary:{
      main:'#2E2E2E',
    },
    secondary: {
      main: '#E33E7F'
    }
  }
});


function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Navbar />
      <div
        style={{
          //backgroundImage: "url(" + backgroundH + ")",
          backgroundSize: "cover",
          height: "100vh",
        }}
      >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/guessword" element={<GuessWordHome />} />
          <Route path="/guessword/play" element={<GuessWordPlay />} />
          <Route path="/guessword/createcontest" element={<CreateContestForm />} />
          <Route path="/guessword/joincontest" element={<JoinContestForm />} />
        </Routes>
      </BrowserRouter>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
