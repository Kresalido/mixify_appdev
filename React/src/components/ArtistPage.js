import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Row, Stack, Col, Image, Form, Button } from 'react-bootstrap';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import UserSideBar from './UserSideBar';
import SongItem from './items/SongItem';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import ArtistSongList from './items/ArtistSongList';
import ArtistAlbumItem from './items/ArtistAlbumItem';
import pfp from '../pfp-placeholder.jpg';

function ArtistPage() {
    const [songs, setSongs] = useState([]);
    const [artist, setArtist] = useState(null);
    const [albums, setAlbums] = useState([]);
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
        axios.get(`http://127.0.0.1:8000/api/songs/${id}`)
            .then(response => {
                setSongs(response.data);
                // console.log("SONG DATA", response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });

        axios.get(`http://127.0.0.1:8000/api/artist/${id}`)
            .then(response => {
                setArtist(response.data.name);
                // console.log(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });

        axios.get(`http://127.0.0.1:8000/api/albums/${id}`)
            .then(response => {
                setAlbums(response.data);
                // console.log(response.data);
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
            <Container fluid >
                {/* <div className='circle circle-left' />
                <div className='circle circle-right' /> */}
                <Row className='vh-100'>
                    <UserSideBar />
                    <Col className='flex-grow-1 bg-user bg-user-dashboard'>
                        <Row className=" flex-grow-1 d-flex p-3">
                            <Col className='custom-scrollbar d-block'>
                                <Row className='flex-grow-1 align-items-center user-white-text p-5 user-header bg-artist'>
                                    <Col>
                                        <Image src={pfp} roundedCircle className='user-pfp mx-3' />
                                        {artist === null ? (
                                            <Spinner animation="border" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </Spinner>
                                        ) : (
                                            <>
                                                {artist}
                                            </>
                                        )}
                                        <Row className='h-10'>
                                            {/* <Col xs={1}>
                                                <Button variant='danger' className='absolute'>Follow</Button>
                                            </Col> */}
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className='px-5 mt-2 user-white-text'>
                                    <p className='user-header-2'>
                                        Albums
                                    </p>
                                </Row>
                                <Row className='user-white-text justify-content-center px-5'>
                                    <Stack direction='horizontal' gap={3} className='song-container overflow-x-auto overflow-hidden'>
                                        {albums.map(album => (
                                            <ArtistAlbumItem key={album.album_id} album={album} />
                                        ))}
                                    </Stack>
                                </Row>
                                <Row className='px-5 mt-2 user-white-text'>
                                    <p className='user-header-2'>
                                        Artist Songs
                                    </p>
                                </Row>
                                <Row className='px-5 mb-5'>
                                    <ArtistSongList showImage={true} songs={songs} currentSong={currentSong} setCurrentSong={setCurrentSong} setSongDetails={setSongDetails} playerRef={playerRef} />
                                </Row>
                                <Row className='mb-5'>
                                </Row>
                                <Row className='mb-5'>
                                </Row>
                                <Row className='mb-5'>
                                </Row>
                            </Col>
                        </Row>

                        <div className='user-player position-absolute bottom-0 d-flex'>

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
                            <div className='w-50'>
                                <AudioPlayer ref={playerRef} src={currentSong} autoPlay showJumpControls={false} showSkipControls={true} className='mixify-player h-100' />
                            </div>
                            <div className='w-25'>
                                Extra options
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default ArtistPage;