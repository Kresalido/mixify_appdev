import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
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

function AlbumPage() {
    const [songs, setSongs] = useState([]);
    const [artist, setArtist] = useState(null);
    const [album, setAlbum] = useState([]);
    const { id, album_id } = useParams();

    const navigate = useNavigate();

    // MODAL
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const handleClick = () => {
        navigate(-1)
    }

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/album/${album_id}/songs`)
            .then(response => {
                setSongs(response.data);
                console.log("song data", response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });

        axios.get(`http://127.0.0.1:8000/api/artist/${id}`)
            .then(response => {
                setArtist(response.data.name);
                console.log(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });

        axios.get(`http://127.0.0.1:8000/api/album/${album_id}`)
            .then(response => {
                setAlbum(response.data);
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
            <Container fluid >
                {/* <div className='circle circle-left' />
                <div className='circle circle-right' /> */}
                <Row className='vh-100'>
                    <UserSideBar />
                    <Col className='flex-grow-1 bg-user bg-user-dashboard'>
                        <Row className=" flex-grow-1 d-flex p-3">
                            <Col className='custom-scrollbar d-block'>
                                <Row className='flex-grow-1 align-items-center user-white-text p-5 user-header bg-artist'>
                                    <div onClick={handleClick} className='position-absolute album-back-btn'>
                                        <i className="fa fa-chevron-left" />
                                    </div>
                                    <Col>
                                        <Image src={`http://127.0.0.1:8000/storage/album_images/${album.cover_photo}`} className='mx-3' style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                                        {artist === null ? (
                                            <Spinner animation="border" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </Spinner>
                                        ) : (
                                            <>
                                                {album.album_name}
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
                                </Row>
                                <Row className='user-white-text justify-content-center px-5'>
                                    <Stack direction='horizontal' gap={3} className='song-container overflow-x-auto overflow-hidden'>
                                        {/* {albums.map(album => (
                                            <ArtistAlbumItem key={album.album_id} album={album} />
                                        ))} */}
                                    </Stack>
                                </Row>
                                <Row className='px-5 mt-2 user-white-text'>
                                    <Col className='d-flex align-items-center' xs={1}>
                                        #
                                    </Col>
                                    <Col className='d-flex align-items-center'>
                                        Title
                                    </Col>
                                    <Col className='d-flex align-items-center justify-content-center'>
                                        Date Published
                                    </Col>
                                    <Col className='d-flex align-items-center justify-content-center'>
                                        Listens
                                    </Col>
                                </Row>
                                <Row className='px-5 mb-5'>
                                    <ArtistSongList songs={songs} currentSong={currentSong} setCurrentSong={setCurrentSong} setSongDetails={setSongDetails} playerRef={playerRef} />
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
                                <AudioPlayer ref={playerRef} src={currentSong} autoPlay showJumpControls={false} showSkipControls={true} onPlay={e => console.log("onPlay")} className='mixify-player h-100' />
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

export default AlbumPage;