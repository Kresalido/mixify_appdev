import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Stack, Col, Image, Form } from 'react-bootstrap';
import pfp from '.././img/user-pfp.jpg';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

function Home() {

    return (
        <Container fluid>
            <div className='circle circle-left' />
            <div className='circle circle-right' />
            <Row className='vh-100'>
                {/* SIDE BAR */}
                <div className='bg-user-sidebar'>
                    <Row className='h-20 d-flex justify-content-center align-items-center'>
                        <div className='d-flex'>
                            <Image src={pfp} roundedCircle className='user-pfp' />
                            <div className='d-flex justify-content-center align-items-center p-3 user-name'>
                                User
                            </div>
                        </div>
                    </Row>
                    <Row className='h-60 user-sidebar-main'>
                        <Stack direction='vertical' gap={2}>
                            <div className='px-4 user-sidebar-item d-flex'>
                                <Link to={'/admin'} className='links'> Home</Link>
                            </div>
                            <div className='px-4 user-sidebar-item d-flex'>
                                <Link to={'/admin'} className='links'> Browse</Link>
                            </div>
                            <div className='px-4 user-sidebar-item d-flex'>
                                <Link to={'/admin'} className='links'> Settings</Link>
                            </div>
                            <div className='px-4 user-sidebar-item d-flex'>
                                <Link to={'/admin'} className='links'> Songs</Link>
                            </div>
                            <div className='px-4 user-sidebar-item d-flex'>
                                <Link to={'/admin'} className='links'> Videos</Link>
                            </div>
                            <div className='px-4 user-sidebar-item d-flex'>
                                <Link to={'/admin'} className='links'> Podcasts</Link>
                            </div>
                        </Stack>
                    </Row>
                    <Row className='h-20 d-flex align-items-end admin-sidebar-main'>
                        <Link to={'/'}> Logout</Link>
                    </Row>
                </div>
                <Col className='flex-grow-1 bg-user bg-user-dashboard'>
                    <Row className=" flex-grow-1 d-flex p-3">
                        <Col className='custom-scrollbar'>
                            <Stack direction='vertical' gap={2}>
                                <Row className='px-5 d-flex'>
                                    <Form.Control type="text" placeholder="What do you want to listen to?" />
                                </Row>
                                <Row className='d-flex justify-content-space-around align-items-center user-white-text p-5 user-header'>
                                    Home
                                    <a href='' className='h-100 user-clickable'>Notifications</a>
                                </Row>
                            </Stack>
                        </Col>
                    </Row>
                    <div className='user-player position-absolute bottom-0 d-flex'>
                        <Col xs={3} className='d-flex align-items-center '>
                            <Row className='h-100 p-4 flex-grow-1'>
                                <Col xs={4} className=' d-flex align-items-center'>
                                    <Image src={pfp} className='song-cover-image' />
                                </Col>
                                <Col xs={8} className='p-3 h-100 align-items-center song-details'>
                                    <Row className='h-60 align-items-end song-name'>
                                        Song Name
                                    </Row>
                                    <Row className='h-40'>
                                        Author Name
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={6} className=''>
                            <AudioPlayer autoPlay onPlay={e => console.log("onPlay")} className='mixify-player h-100' />
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