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
                <UserSideBar />
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
                                    New Artists
                                </p>
                                <Row className='song-container justify-content-start'>
                                    {artists.map(artist => (
                                        <Col xs={2} className='p-3'>
                                            <ArtistItem key={artist.id} picture={artist.profile_pic_name} name={artist.name} id={artist.id} />
                                        </Col>
                                    ))}
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
                    <div className='user-player position-absolute bottom-0 d-flex'>
                        <Col xs={3} className='d-flex align-items-center '>
                            <Row className='h-100 p-4 flex-grow-1'>
                                <Col xs={4} className=' d-flex align-items-center'>
                                    {songDetails.photo && <Image src={songDetails.photo} className='song-cover-image' />}
                                </Col>
                                <Col xs={8} className='h-100 align-items-center song-details'>
                                    <Row className='h-60 align-items-end song-name'>
                                        {songDetails.name}
                                    </Row>
                                    <Row className='h-40'>
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
    );
}

export default Home;