import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/login.component'
import SignUp from './components/signup.component'
import Dashboard from './components/dashboard.component'
import Logout from './components/logout.component'
import Admin from './admincomponents/AdminDashboard'
import ArtistDashboard from './admincomponents/ArtistDashboard'
import Artist from './components/artist'

function App() {
  return (
    <Router>
      <ToastContainer />
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/admin" element={<Admin/>} />
              <Route path="/artistdashboard" element={<ArtistDashboard/>} />
              <Route path="/artist" element={<Artist/>} />
            </Routes>
    </Router>
  )
}
export default App