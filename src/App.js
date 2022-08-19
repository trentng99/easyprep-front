import React, { useState, useEffect}  from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { db } from "./firebase-config";
import {
  getDoc,
  doc
} from "firebase/firestore";
import PrivateRoute from './components/PrivateRoute';
import LandingScreen from './pages/LandingScreen';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Home from './pages/Home';
import BuildAllergies from './pages/BuildAllergies';
import BuildCuisine from './pages/BuildCuisine';
import RecipePage from './pages/RecipePage';
import Profile from './pages/Profile';
import SavedRecipes from './pages/SavedRecipes';


function App() {
  const [user, setUser] = useState({});
  const [userdata, setUserData] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [state, setState] = useState({
    user_id: '',
    name:'',
    email:'',
    allergies:[],
    cuisines:[],
    cooked:[],
    liked:[]
  })

  useEffect(() => {
    if(user) {
      if (user.email) {
        const usersCollectionRef = doc(db, "users", user.email);
        const getUsers = async () => {
          const data = await getDoc(usersCollectionRef);
          setUserData(data.data());
        };
        getUsers();
      }
    }
  }, [user]);

  return (
    <Router>
    <AuthProvider user={user} setUser={setUser}>
      <Routes>
        <Route path="/" element={<LandingScreen user={user}/>} />
        <Route path="/signup" element={<SignUp  user={user} state={state} setState={setState}/>} />
        <Route path="/login" element={<Login user={user}/>} />
        <Route element={<PrivateRoute user={user} redirectPath="/login" />}>
            <Route path="/home" element = {<Home recipes={recipes} setRecipes={setRecipes} userdata={userdata}/>} />
            <Route path="/buildallergies" element = {<BuildAllergies user={user} state={state} setState={setState}/>} />
            <Route path="/buildcuisine" element = {<BuildCuisine user={user} state={state} setState={setState}/>} />
            <Route path="/profile" element = {<Profile userdata={userdata}/>} />
            <Route path="/profile/saved-recipes" element = {<SavedRecipes userdata={userdata} recipes={recipes} setRecipes={setRecipes}/>} />
            <Route path="/recipe/:Name" element = {<RecipePage user={user} userdata={userdata} setUserData={setUserData}/> }/>
        </Route>
      </Routes>
    </AuthProvider>
  </Router>
  );
}

export default App;
