import './App.css';

import Home from './components/Home/Home';
import GuessWordHome from './components/GuessWord/Home/GuessWordHome';
import GuessWordPlay from './components/GuessWord/GuessWordPlay/GuessWordPlay';
import Navbar from './components/main-components/Navbar/Navbar';
import CreateContestForm from './components/GuessWord/Objects/CreateContestForm/CreateContestForm';
import JoinContestForm from './components/GuessWord/Objects/JoinContestForm/JoinContestForm';

// import backgroundH from "./vid.gif";

import { createTheme } from '@mui/material/styles';
import MuiThemeProvider from '@mui/material/styles/ThemeProvider';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import {SocketContext, socket} from './utilities/socket';

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
    <SocketContext.Provider value={socket}>
      <MuiThemeProvider theme={theme}>
        <Navbar />
        <div
          style={{
            backgroundImage: "linear-gradient(#D3D3D3, #696969)",
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
    </SocketContext.Provider>
  );
}

export default App;
