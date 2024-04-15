import React, { useEffect, useState } from 'react'
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
import ArtistSignup from './components/artist.signup.component';
import AlbumPage from './components/AlbumPage'
import LibraryPage from './components/LibraryPage'
import PlaylistPage from './components/PlaylistPage'

import UserLayout from './layouts/UserLayout';

// Context
import MusicContext from './context/MusicContext';

function App() {

  const [songs, setSongs] = useState([]);
  const [updateSongs, setUpdateSongs] = useState(false);

  const [currentSong, setCurrentSong] = useState(null);
  const [queue, setQueue] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  


  return (
    <Router>
      <div className="App">
        <ToastContainer />
        <MusicContext.Provider value={{ songs, setSongs, updateSongs, setUpdateSongs, currentSong, setCurrentSong, queue, setQueue, currentSongIndex, setCurrentSongIndex }}>
          <Routes>
            <Route path="/" element={<UserLayout />} >
              <Route index element={<Home />} />
              <Route path="/artist-upload" element={<ArtistUploadMusic />} />
              <Route path="/artist/:id" element={<Artist />} />
              <Route path="/artist-dashboard" element={<ArtistDashboard />} />
              <Route path="/artist/:id/:album_id" element={<AlbumPage />} />
              <Route path="/playlist/:id" element={<PlaylistPage />} />
              <Route path="/library" element={<LibraryPage />} />
            </Route>
            {/* <Route path="/" element={<RedirectToLogin />} /> */}
            {/* <Route path="/home" element={<Home />} /> */}
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-up/artist" element={<ArtistSignup />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </MusicContext.Provider>
      </div>
    </Router >
  )
}
export default App