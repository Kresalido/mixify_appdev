import React, { useRef, useState } from 'react';
import { Image } from 'react-bootstrap';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';


const MusicPlayer = () => {
    const playerRef = useRef();
    const [currentSong, setCurrentSong] = useState(null);
    const [songDetails, setSongDetails] = useState({ name: '', author: '', photo: '' });

    return (
        <div className='user-player bottom-0 d-flex'>
            <div className='d-flex align-items-center w-25'>
                <div className='d-flex p-5'>
                    <div>
                        {songDetails.photo && <Image src={songDetails.photo} className='song-cover-image' />}
                    </div>
                    <div className='d-flex align-items-center mx-2'>
                        <div className='song-details d-flex flex-column'>
                            <h4 className='song-name'>
                                {songDetails.name}
                            </h4>
                            <p>
                                {songDetails.author}
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