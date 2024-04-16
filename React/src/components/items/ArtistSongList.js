import React, { useEffect, useState } from "react";
import { Col, Row, Image } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import backendUrl from '../../config';


function SongList({ songs, currentSong, setCurrentSong, setSongDetails, playerRef, showImage }) {
    // const [songs, setSongs] = useState([]);

    const handleClick = async (song) => {
        if (currentSong === song.hashed_name) {
            playerRef.current.audio.current.currentTime = 0;
            playerRef.current.audio.current.play();
        } else {
            // console.log(song.hashed_name);
            const songUrl = `${backendUrl}/api/play/${song.hashed_name}`;
            fetch(songUrl)
                .then(response => response.blob())
                .then(blob => {
                    const audioblob = URL.createObjectURL(blob);
                    setCurrentSong(audioblob)
                    setSongDetails({
                        name: song.display_name,
                        author: song.user.name,
                        photo: `http://127.0.0.1:8000/storage/album_images/${song.album.cover_photo}`
                    })
                });
        }

        playerRef.current.audio.current.currentTime = 0;
        try {
            await playerRef.current.audio.current.play();
        } catch (error) {
            console.error('Failed to play the song:', error);
        }
    };

    if (!songs) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {songs.map((song, index) => (
                <Row key={song.album.album_id} className='py-2 song-list-item' onClick={() => handleClick(song)}>
                    {showImage && (
                        <Col xs={2} className='d-flex justify-content-center'>
                            <Image
                                rounded
                                src={`http://127.0.0.1:8000/storage/album_images/${song.album.cover_photo}`}
                                style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '2%' }}
                            />
                        </Col>
                    )}
                    <Col className='d-flex align-items-center' xs={1}>
                        {index + 1}
                    </Col>
                    <Col className='d-flex align-items-center'>
                        {song.display_name}
                    </Col>
                    <Col className='d-flex align-items-center justify-content-center'>
                        {new Date(song.album.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </Col>
                    <Col className='d-flex align-items-center justify-content-center'>
                        {(Math.floor(Math.random() * (30000 - 300 + 1)) + 300).toLocaleString()}
                    </Col>
                </Row>
            ))
            }
        </>
    );
}

export default SongList;