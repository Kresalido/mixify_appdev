import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Stack, Col, Image } from 'react-bootstrap';
import pfp from '.././img/user-pfp.jpg';

function Home() {

    return (
        <Container fluid>
            <div className='circle circle-left' />
            <div className='circle circle-right' />
            <Row className='vh-100'>
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
                <Col className='d-flex flex-grow-1 bg-user bg-user-dashboard position-relative'>
                    <Row className="position-relative flex-grow-1">
                        <div className='user-player position-absolute bottom-0'>
                            <Row className='h-100'>
                                <Col xs={3} className='d-flex align-items-center '>
                                    <Row className='h-100 p-4 flex-grow-1'>
                                        <Col xs={4} className='h-100 d-flex align-items-center h-100'>
                                            <Image src={pfp} className='song-cover-image' />
                                        </Col>
                                        <Col xs={8} className='p-3 h-100 align-items-center h-100 song-details'>
                                            <Row className='h-60 align-items-end song-name'>
                                                Song Name
                                            </Row>
                                            <Row className='h-40'>
                                                Author Name
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs={6} className='bg-primary'>
                                </Col>
                                <Col xs={3} className='bg-warning'>
                                </Col>
                            </Row>
                        </div>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;