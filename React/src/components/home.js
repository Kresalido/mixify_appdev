import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Stack, Col, Image } from 'react-bootstrap';
import pfp from '.././img/user-pfp.jpg';

function Home() {

    return (
        <Container fluid>
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
                        </Stack>
                    </Row>
                    <Row className='h-20 d-flex align-items-end admin-sidebar-main'>
                        <Link to={'/'}> Logout</Link>
                    </Row>
                </div>
                {/* <div className='bg-'>

                </div> */}
                <Col className='bg-success d-flex flex-grow-1'>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;