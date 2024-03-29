import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Row, Stack, Col, Image, Form, Button } from 'react-bootstrap';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import UserSideBar from './UserSideBar';
import SongItem from './items/SongItem';
import axios from 'axios';

function ArtistPage() {
    const [songs, setSongs] = useState([]);
    const [artist, setArtist] = useState(null);
    const { id } = useParams();

    // MODAL
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }


    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/songs/${id}`) // This checks for user_id
            .then(response => {
                setSongs(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });

        axios.get(`http://127.0.0.1:8000/api/artist/${id}`) // This checks for user_id
            .then(response => {
                setArtist(response.data.name);
                console.log(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });

    }, []);

    // Player Related
    const [currentSong, setCurrentSong] = useState(null);
    const playerRef = useRef();
    const [songDetails, setSongDetails] = useState({ name: '', author: '', photo: '' });

    return (
        <>
            <Container fluid>
                {/* <div className='circle circle-left' />
            <div className='circle circle-right' /> */}
                <Row className='vh-100'>
                    <UserSideBar />
                    <Col className='flex-grow-1 bg-user bg-user-dashboard'>
                        <Row className=" flex-grow-1 d-flex p-3">
                            <Col className='custom-scrollbar d-block'>
                                <Row className='flex-grow-1 align-items-center user-white-text p-5 user-header bg-artist'>
                                    <Col>
                                        {artist === null ? (
                                            <p>
                                                Loading...
                                            </p>
                                        ) : (
                                            <>
                                                {artist}
                                            </>
                                        )}
                                        <Row className='h-10'>
                                            <Col xs={1}>
                                                <Button variant='danger' className='absolute'>Follow</Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className='px-3 mt-2 user-white-text'>
                                    <p className='user-header-2'>
                                        Latest Release
                                    </p>
                                </Row>
                                {/* <Row className='user-white-text justify-content-start p-4 mb-5'>
                                    {songs.map(song => (
                                        <Col xs={2} className='song-container'>
                                            <SongItem key={song.id} song={song} currentSong={currentSong} setCurrentSong={setCurrentSong} setSongDetails={setSongDetails} playerRef={playerRef} />
                                        </Col>
                                    ))}
                                </Row> */}
                                <Row className='user-white-text justify-content-start p-4 mb-10 overflow-x-auto'>
                                    <Stack direction='horizontal' gap={3}className='song-container mb-4'>
                                        {songs.map(song => (
                                            <SongItem key={song.id} song={song} currentSong={currentSong} setCurrentSong={setCurrentSong} setSongDetails={setSongDetails} playerRef={playerRef} />
                                        ))}
                                    </Stack>
                                </Row>

                                {/* <Stack direction='vertical' gap={2} className='p-3'>
                                <Row className='user-white-text'>
                                    <p className='user-header-2'>
                                        Latest Release
                                    </p>
                                    <Stack direction='horizontal' gap={4} className='song-container'>
                                        {<Col xs={3} className='d-flex h-100 align-items-center justify-content-center item'
                                            onClick={() => {
                                                if (currentSong === musicTest) {
                                                    playerRef.current.audio.current.currentTime = 0;
                                                    playerRef.current.audio.current.play();
                                                } else {
                                                    setCurrentSong(musicTest);
                                                    setSongDetails({ name: 'Same Ground', author: 'Kitchie Nadal', photo: kitchiePhoto });
                                                }
                                            }}
                                        >
                                            <Row className='p-3'>
                                                <img src={kitchiePhoto} />
                                                <div className="play">
                                                    <span className="fa">
                                                        <Image src={PlayButton} className='icon' />
                                                    </span>
                                                </div>
                                            </Row>
                                            <Row className='p-3'>
                                                <h4>Same Ground</h4>
                                                <p>Kitchie Nadal</p>
                                            </Row>
                                        </Col>}
                                        {songs.map(song => (
                                            <SongItem key={song.id} song={song} currentSong={currentSong} setCurrentSong={setCurrentSong} setSongDetails={setSongDetails} playerRef={playerRef} />
                                        ))}
                                    </Stack>
                                </Row>
                            </Stack> */}
                            </Col>
                        </Row>
                        <div className='user-player position-absolute bottom-0 d-flex'>
                            <Col xs={3} className='d-flex align-items-center '>
                                <Row className='h-100 px-4 flex-grow-1'>
                                    <Col className=' d-flex justify-content-end align-items-center'>
                                        {songDetails.photo && <Image src={songDetails.photo} className='song-cover-image' />}
                                    </Col>
                                    <Col className='h-100 align-items-center song-details'>
                                        <Row className='h-50 align-items-end song-name'>
                                            {songDetails.name}
                                        </Row>
                                        <Row className='h-50'>
                                            {songDetails.author}
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={6} className=''>
                                <AudioPlayer ref={playerRef} src={currentSong} autoPlay onPlay={e => console.log("onPlay")} className='mixify-player h-100' />
                            </Col>
                            <Col xs={3}>
                                Extra options
                            </Col>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default ArtistPage;