import React, { useRef, useState, useContext, useEffect } from 'react';
import { Image } from 'react-bootstrap';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import axios from 'axios';
import backendUrl from '../config';
import { useNavigate } from 'react-router-dom';

// Context
import MusicContext from '../context/MusicContext';

const MusicPlayer = () => {
    const playerRef = useRef();
    const { queue, currentSongIndex, setCurrentSongIndex }= useContext(MusicContext);

    const [songDetails, setSongDetails] = useState(null);
    const [currentSong, setCurrentSong] = useState(null);


    const handleSongDetails = (song) => {
        setSongDetails(song);
    }

    const handleCurrentSong = (song) => {
        setCurrentSong(song);
    }

    const handleNextSong = () => {
        if (currentSongIndex < queue.length - 1) {
            setCurrentSongIndex(currentSongIndex + 1);
        }
    }

    const handlePreviousSong = () => {
        if (currentSongIndex > 0) {
            setCurrentSongIndex(currentSongIndex - 1);
        }
    }

    const navigate = useNavigate();

    useEffect(() => {
        playSong();
    }, [queue, currentSongIndex]);

    const playSong = async () => {
        if (queue.length === 0) {
            console.log('No songs in queue');
            return;
        }

        const songID = queue[currentSongIndex].id;
        try {
            axios.get(`${backendUrl}/api/song/${songID}/details`)
                .then(response => {
                    handleSongDetails(response.data);
                    console.log('Song details:', response.data)
                    const songUrl = `${backendUrl}/api/play/${response.data.hashed_name}`;
                    fetch(songUrl)
                        .then(response => response.blob())
                        .then(blob => {
                            const audioBlobURL = URL.createObjectURL(blob);
                            handleCurrentSong(audioBlobURL);
                        });
                })
        } catch (error) {
            console.error('Failed to fetch song:', error);
        }
    };

    return (
        <div className='user-player bottom-0 d-flex'>
            <div className='d-flex align-items-center w-25'>
                <div className='d-flex p-5'>
                    <div>
                        {songDetails && <Image src={`${backendUrl}/storage/album_images/${songDetails.album.cover_photo}`} className='song-cover-image' />}
                    </div>
                    <div className='d-flex align-items-center mx-2'>
                        <div className='song-details d-flex flex-column'>
                            <h4 className='song-name' onClick={() => navigate(`/artist/${songDetails.user.id}/${songDetails.album.album_id}`)}>
                                {songDetails && songDetails.display_name}
                            </h4>
                            <p className='playlist-clickable' onClick={() => navigate(`/artist/${songDetails.user.id}`)}>
                                {songDetails && songDetails.user.name}
                            </p>

                        </div>
                    </div>

                </div>
            </div>
            <div className='w-35'>
                <AudioPlayer ref={playerRef} src={currentSong} autoPlay showJumpControls={false} showSkipControls={true} onPlay={e => console.log("onPlay")} className='mixify-player h-100' />
            </div>
            <div className=''>
                Extra options
            </div>
        </div>
    );
}

export default MusicPlayer;