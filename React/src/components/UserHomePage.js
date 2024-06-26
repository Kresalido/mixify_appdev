import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import pfp from '.././img/user-pfp.jpg';
import { Container, Row, Stack, Col, Image, Form } from 'react-bootstrap';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import PlayButton from '.././play-solid.svg';
import musicTest from '.././music/sameground.mp3';
import kitchiePhoto from '.././img/Kitchie_album.jpg'
import UserSideBar from './UserSideBar';
import ArtistItem from './items/ArtistItem'
import ArtistList from './items/ArtistList'
import TopArtistList from './items/TopArtistList'
import Spinner from 'react-bootstrap/Spinner';

function Home() {
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/artists', { // Replace with your actual API endpoint
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
            },
        })
            .then(response => response.json())
            .then(data => {
                setArtists(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    // Player Related
    const [currentSong, setCurrentSong] = useState(null);
    const playerRef = useRef();
    const [songDetails, setSongDetails] = useState({ name: '', author: '', photo: '' });

    return (
        <Container fluid>
            {/* <div className='circle circle-left' />
            <div className='circle circle-right' /> */}
            <Row className='vh-100'>
                <Col className='d-flexflex-grow-1 bg-user bg-user-dashboard'>
                    <Row className=" flex-grow-1 d-flex p-3 custom-scrollbar">
                        <Col className='p-5'>
                            <Row className='px-3 d-flex position-absolute user-search-row align-items-center'>
                                <div className=''>
                                    <Form.Control className='d-flex user-search-bar' type="text" placeholder="What do you want to listen to?" />
                                </div>
                            </Row>
                            <Row className='d-flex justify-content-space-between align-items-center user-white-text p-5 user-header'>
                                <Col>
                                    Home
                                </Col>
                                <Col className='d-flex justify-content-end'>
                                    <a href='' className='h-100 user-clickable d-flex justify-content-end'>Notifications</a>
                                </Col>
                            </Row>
                            <Row className='d-flex justify-content-start mb-3'>
                                <p className='user-white-text'>
                                    Top Artists
                                </p>
                                <Row>
                                    <TopArtistList />
                                </Row>
                                <p className='user-white-text'>
                                    New Artists
                                </p>
                                <Row>
                                    <ArtistList />
                                </Row>
                                
                            </Row>
                            <Row className='d-flex justify-content-start mb-5'>
                                <p className='user-white-text'>
                                    New Uploads
                                </p>


                                <Row className='song-container justify-content-start'>
                                    <Col xs={2}>
                                        <Col className='d-flex h-100 align-items-center justify-content-center item'
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
                                                    <div className="fa">
                                                        <Image src={PlayButton} className='icon' />
                                                    </div>
                                                </div>
                                            </Row>
                                            <Row className='p-3'>
                                                <h4>Same Ground</h4>
                                                <p>Kitchie Nadal</p>
                                            </Row>
                                        </Col>
                                    </Col>
                                    <Col xs={2}>
                                        <Col className='d-flex h-100 align-items-center justify-content-center item'
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
                                        </Col>
                                    </Col>
                                    <Col xs={2}>
                                        <Col className='d-flex h-100 align-items-center justify-content-center item'
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
                                        </Col>
                                    </Col>
                                    <Col xs={2}>
                                        <Col className='d-flex h-100 align-items-center justify-content-center item'
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
                                        </Col>
                                    </Col>
                                    <Col xs={2}>
                                        <Col className='d-flex h-100 align-items-center justify-content-center item'
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
                                        </Col>
                                    </Col>
                                </Row>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;