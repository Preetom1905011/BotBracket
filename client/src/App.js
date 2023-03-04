import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Bracket from './pages/Bracket'
import Roster from './pages/Roster'
import Tournaments from './pages/Tournaments'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/roster" element={<Roster />}/>
            <Route path="/bracket" element={<Bracket />}/>
            <Route path="/tournaments" element={<Tournaments />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<Signup />}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
