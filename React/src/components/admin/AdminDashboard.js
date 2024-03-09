import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Stack, Col, Image } from 'react-bootstrap';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import pfp from '../.././img/pfp.jpg';
import song from '../.././img/song.png';
import podcast from '../.././img/podcast.png';
import videocast from '../.././img/videocast.png';

ChartJS.register(ArcElement, Tooltip, Legend);

export const dummyData = {
    labels: ['Listeners', 'Artists'],
    datasets: [{
        data: [12, 19], // Replace with your actual data
        backgroundColor: [
            'rgba(193, 22, 22, 0.8)', // Red
            'rgba(77, 77, 77, 0.8)' // Grey
        ],
        borderColor: [
            'rgba(193, 22, 22, 1)', // Red
            'rgba(77, 77, 77, 1)' // Grey
        ],
        borderWidth: 1,
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    }]
}

function AdminDashboard() {

    return (

        <Container fluid>
            <Row className='vh-100'>
                <Col xs={12} sm={6} md={4} lg={3} xl={3} className='bg-admin-sidebar admin-sidebar-text'>
                    <Row className='h-20 d-flex justify-content-center align-items-center'>
                        <div className='d-flex'>
                            <Image src={pfp} roundedCircle className='admin-pfp' />
                            <div className='d-flex justify-content-center align-items-center p-3 admin-name'>
                                Superadmin
                            </div>
                        </div>
                    </Row>
                    <Row className='h-60 admin-sidebar-main'>
                        <Stack direction='vertical' gap={4}>
                            <Link to={'/admin'} className='links'> Dashboard</Link>
                            <Link to={'/admin/manage-users'}> Manage Users</Link>
                            <Link to={'/tickets'}> Subscription Settings</Link>
                            <Link to={'/revenue'}> Revenue</Link>
                        </Stack>
                    </Row>
                    <Row className='h-20 d-flex align-items-end admin-sidebar-main'>
                        <Link to={'/'}> Logout</Link>
                    </Row>
                </Col>
                <Col className='bg-admin-dashboard'>
                    <Row className='h-20 admin-white-text d-flex align-items-end p-5'>
                        <h1>
                            Dashboard
                        </h1>
                    </Row>
                    <Row className='h-20'>
                        <Stack direction='horizontal' gap={5}>
                            <div className="d-flex shadow-lg p-3 admin-dashboard-item rounded flex-grow-1">
                                <Col className='d-flex justify-content-center align-items-center p-3'>
                                    <Image src={song} className='admin-dashboard-item-icon' />
                                </Col>
                                <Col xs={9}>
                                    <Row className='h-60 justify-content-center align-items-end'>
                                        <h1 className='d-flex justify-content-center'>
                                            123,971
                                        </h1>
                                    </Row>
                                    <Row className='justify-content-center'>
                                        <h2 className='d-flex justify-content-center'>
                                            Total Songs
                                        </h2>
                                    </Row>
                                </Col>
                            </div>
                            <div className="d-flex shadow p-3 admin-dashboard-item rounded flex-grow-1">
                                <Col className='d-flex justify-content-center align-items-center p-3'>
                                    <Image src={podcast} className='admin-dashboard-item-icon' />
                                </Col>
                                <Col xs={9}>
                                    <Row className='h-60 justify-content-center align-items-end flex-grow-1'>
                                        <h1 className='d-flex justify-content-center'>
                                            61,120
                                        </h1>
                                    </Row>
                                    <Row className='justify-content-center'>
                                        <h2 className='d-flex justify-content-center'>
                                            Total Podcasts
                                        </h2>
                                    </Row>
                                </Col>
                            </div>
                            <div className="d-flex shadow p-3 admin-dashboard-item rounded flex-grow-1">
                                <Col className='d-flex justify-content-center align-items-center'>
                                    <Image src={videocast} className='admin-dashboard-item-icon' />
                                </Col>
                                <Col xs={9}>
                                    <Row className='h-60 justify-content-center align-items-end'>
                                        <h1 className='d-flex justify-content-center'>
                                            182,092
                                        </h1>
                                    </Row>
                                    <Row className='justify-content-center'>
                                        <h2 className='d-flex justify-content-center'>
                                            Total Videocast
                                        </h2>
                                    </Row>
                                </Col>
                            </div>
                        </Stack>
                    </Row>
                    <Row className='h-20 admin-dashboard-item-long-box mb-3'>
                        <Stack direction='horizontal' gap={3} className='d-flex flex-grow-1admin-dashboard-item-long-box'>
                            <div className='flex-grow-1 '>
                                <Col className='justify-content-center admin-dashboard-item-text'>
                                    <Row>
                                        <h1 className='d-flex justify-content-center'>
                                            182,092
                                        </h1>
                                    </Row>
                                    <Row >
                                        <h2 className='d-flex justify-content-center'>
                                            Active Monthly Users
                                        </h2>
                                    </Row>
                                </Col>
                            </div>
                            <div className='flex-grow-1 '>
                                <Col className='justify-content-center admin-dashboard-item-text'>
                                    <Row>
                                        <h1 className='d-flex justify-content-center'>
                                            182,092
                                        </h1>
                                    </Row>
                                    <Row >
                                        <h2 className='d-flex justify-content-center'>
                                            Registered Users
                                        </h2>
                                    </Row>
                                </Col>
                            </div>
                            <div className='flex-grow-1 '>
                                <Col className='justify-content-center admin-dashboard-item-text'>
                                    <Row>
                                        <h1 className='d-flex justify-content-center'>
                                            182,092
                                        </h1>
                                    </Row>
                                    <Row >
                                        <h2 className='d-flex justify-content-center'>
                                            Monthly Users
                                        </h2>
                                    </Row>
                                </Col>
                            </div>
                        </Stack>
                    </Row>
                    <Row className='h-30'>
                        <Col xs={4} className='p-3'>
                            <div className='admin-dashboard-item-container p-3 '>
                                <h1 className='d-flex justify-content-center'>
                                    User Composition
                                </h1>
                                <div className='justify-content-center d-flex' id='chart-wrapper'>
                                    <Pie data={dummyData} />
                                </div>
                            </div>
                        </Col>
                        <Col className='bg-primary'>
                            Map
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default AdminDashboard;