import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/login.component'
import SignUp from './components/signup.component'
import Dashboard from './components/dashboard.component'
import Logout from './components/logout.component'
import Admin from './components/admin/AdminDashboard'
import ArtistDashboard from './components/admin/ArtistDashboard'
import Home from './components/UserHomePage'
import ArtistUploadMusic from './components/ArtistUploadMusic'
import Artist from './components/ArtistPage'

function RedirectToLogin() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/log-in');
  }, [navigate]);

  return null;
}


function App() {
  return (
    <Router>
      <div className="App">
        <ToastContainer />
        <Routes>
          <Route path="/" element={<RedirectToLogin />} />
          <Route exact path="/log-in" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="/artist-upload" element={<ArtistUploadMusic/>} />
          <Route path="/artist/:id" element={<Artist />} />
          <Route path="/artist-dashboard" element={<ArtistDashboard/>} />
        </Routes>
      </div>
    </Router>
  )
}
export default App