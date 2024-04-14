import React, { useState, useEffect } from 'react';
import { Container, Row, Stack, Col, Image, Form, Button } from 'react-bootstrap';
import 'react-h5-audio-player/lib/styles.css';
import UserSideBar from './UserSideBar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PlaylistItem from './items/PlaylistItem';
import Modal from 'react-bootstrap/Modal';
import backendUrl from '../config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LibraryPage() {


    // Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // LOADING
    const [loading, setLoading] = useState(false);

    const upload_failed = (message) => {
        toast.error(message, {
            // position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "dark",
            onClose: () => {
                localStorage.setItem('justRegistered', 'false');
            }
        });
    }

    useEffect(() => {

    }, []);

    const navigate = useNavigate();

    const [isCreateButtonDisabled, setIsCreateButtonDisabled] = useState(false);

    const createPlaylist = async (e) => {
        setIsCreateButtonDisabled(true);
        try {
            const token = localStorage.getItem("jwt_token");
            axios.post(`${backendUrl}/api/playlist/create`, {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
                .then(response => {
                    console.log('Playlist created:', response.data);
                    setIsCreateButtonDisabled(false);
                    navigate(`/playlist/${response.data.id}`);
                })
                .catch(error => {
                    setIsCreateButtonDisabled(false);
                    console.error('Failed to create playlist:', error);
                });
        } catch (e) {
            setIsCreateButtonDisabled(false);
            console.error('Failed to create playlist:', e);
        }
    }

    return (
        <>
            <Container fluid>
                <Row className='vh-100'>
                    <Col className=' bg-user bg-user-dashboard'>
                        <Row className=" flex-grow-1 d-flex p-3">
                            <Col className='custom-scrollbar'>
                                <Stack direction='vertical' gap={1} className='mb-5'>
                                    <Row className='px-5 d-flex'>
                                    </Row>
                                    <Row className='d-flex user-white-text p-5 user-header'>
                                        <Col className='text-nowrap d-flex justify-content-between'>
                                            My Library
                                            <Button variant='light-outline' className='d-flex align-items-center' onClick={() => createPlaylist()}>
                                                <i className='fa fa-plus d-flex icon-white align-items-center icon-lg' />
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Row className='user-white-text'>
                                        <Col className='px-5'>
                                            <PlaylistItem />
                                        </Col>
                                    </Row>
                                    <Row className='mb-5'>
                                        .
                                    </Row>
                                    <Row className='mb-5'>
                                        .
                                    </Row>
                                    <Row className='mb-5'>
                                        .
                                    </Row>
                                </Stack>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default LibraryPage;