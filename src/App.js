import React, { useState } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import LandingScreen from './pages/LandingScreen';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Home from './pages/Home';
import BuildProfile from './pages/BuildProfile';


function App() {
  const [user, setUser] = useState();
  return (
    <Router>
    <AuthProvider setUser={setUser}>
      <Routes>
        <Route path="/" element={<LandingScreen />} />
        <Route path="/signup" element={<SignUp  user={user}/>} />
        <Route path="/login" element={<Login user={user}/>} />
        <Route element={<PrivateRoute user={user} redirectPath="/login" />}>
            <Route path="/home" element = {<Home user={user}/>} />
            <Route path="/buildprofile" element = {<BuildProfile user={user}/>} />
        </Route>
      </Routes>
    </AuthProvider>
  </Router>
  );
}

export default App;
