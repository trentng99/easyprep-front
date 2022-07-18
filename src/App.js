import './App.css';
import ThemeSwitcher from './components/ThemeSwitches';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function App() {
  return (
    <Router>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<ThemeSwitcher />} />
        {/* <Route element={<PrivateRoute user={user} redirectPath="/login" />}>
          <Route path="dashboard" element = {<Dashboard />} />
        </Route> */}
      </Routes>
    </AuthProvider>
  </Router>
  );
}

export default App;
