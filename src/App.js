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
import BuildAllergies from './pages/BuildAllergies';
import BuildCuisine from './pages/BuildCuisine';


function App() {
  const [user, setUser] = useState({});
  const [state, setState] = useState({
    user_id: '',
    name:'',
    email:'',
    allergies:[],
    cuisines:[]
  })

  return (
    <Router>
    <AuthProvider user={user} setUser={setUser}>
      <Routes>
        <Route path="/" element={<LandingScreen />} />
        <Route path="/signup" element={<SignUp  user={user} state={state} setState={setState}/>} />
        <Route path="/login" element={<Login user={user}/>} />
        <Route element={<PrivateRoute user={user} redirectPath="/login" />}>
            <Route path="/home" element = {<Home user={user}/>} />
            <Route path="/buildallergies" element = {<BuildAllergies user={user} state={state} setState={setState}/>} />
            <Route path="/buildcuisine" element = {<BuildCuisine user={user} state={state} setState={setState}/>} />
        </Route>
      </Routes>
    </AuthProvider>
  </Router>
  );
}

export default App;
