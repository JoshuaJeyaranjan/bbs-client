import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import HomePage from './Pages/HomePage/HomePage'
import PlayerPage from './Pages/PlayerPage/PlayerPage';
import TeamPage from './Pages/TeamPage/TeamPage';
import LoginPage from './Pages/LoginPage/LoginPage';
import SignUpPage from './Pages/SignUpPage/SignUpPage';
import TeamListPage from './Pages/TeamListPage/TeamListPage';
import PlayerListPage from './Pages/PlayerListPage/PlayerListPage';

function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/players/:id" element={<PlayerPage />} />
        <Route path="/players" element={<PlayerListPage />} />
        <Route path="/teams/:id" element={<TeamPage />} />
        <Route path="/teams" element={<TeamListPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
    </Routes>
    </BrowserRouter>
   
  );
}

export default App;
