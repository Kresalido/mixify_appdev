import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Stack, Col, Image, Form, Button, Dropdown, Modal, CloseButton } from 'react-bootstrap';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import UserSideBar from './UserSideBar';
import SongItem from './items/SongItem';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import ArtistSongList from './items/ArtistSongList';
import ArtistAlbumItem from './items/ArtistAlbumItem';
import pfp from '../pfp-placeholder.jpg';
import playlistPlaceholder from '../playlist-placeholder.png';

// Table
import { DataTable } from 'primereact/datatable';
import { InputSwitch } from 'primereact/inputswitch';
import { Column } from 'primereact/column';
import 'primeflex/primeflex.css';

import PlaylistTable from './tables/PlaylistTable';
import AddToPlaylistTable from './tables/AddToPlaylistTable';
import backendUrl from '../config';


const imageTemplate = (photoUrl) => {
    return photoUrl ? (
        <Image src={`http://127.0.0.1:8000/storage/album_images/${photoUrl}`} rounded style={{ width: '50px', height: '50px' }} />
    ) : (
        <Image src={playlistPlaceholder} rounded style={{ minWidth: '50px', minHeight: '50px' }} />
    );
}

function PlaylistPage() {
    const [songs, setSongs] = useState([]);
    const [playlist, setPlaylist] = useState(null);
    const [album, setAlbum] = useState([]);
    const { id, album_id } = useParams();

    const [addSongsState, setAddSongsState] = useState(false);

    const navigate = useNavigate();

    // Modal Confirmation
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleClick = () => {
        navigate(-1)
    }

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/playlist/${id}/songs`)
            .then(response => {
                setSongs(response.data.songs);
                console.log("song data", response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });

        axios.get(`http://127.0.0.1:8000/api/playlist/${id}`)
            .then(response => {
                setPlaylist(response.data);
                // console.log(response.data);
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

    const [isDeleteDisabled, setIsDeleteDisabled] = useState(false);

    const handleDeletePlaylist = () => {
        setIsDeleteDisabled(true);

        axios.delete(`${backendUrl}/api/playlist/${id}/delete`,{
            headers: {
                Authorization : `Bearer ${localStorage.getItem('jwt_token')}`
            }
        })
        .then(response => {
            console.log(response);
            navigate(-1);
        })
        .catch(error => {
            console.error('There was an error!', error);
            setIsDeleteDisabled(false);
        })
    }



    return (
        <>
            <Modal show={show} onHide={handleClose} centered backdrop="static">
                <Modal.Header className="artist-upload-modal">
                    <Modal.Title>Delete Playlist?</Modal.Title>
                    <CloseButton variant='white' onClick={handleClose} />
                </Modal.Header>
                <Modal.Body className="artist-upload-modal">
                    This will delete
                    <strong> {playlist ? playlist.name : null} </strong>
                    PERMANENTLY
                </Modal.Body>
                <Modal.Footer className="artist-upload-modal">
                    <Button variant='secondary' disabled={isDeleteDisabled}>
                        Cancel
                    </Button>
                    <Button variant='danger' disabled={isDeleteDisabled} onClick={() => handleDeletePlaylist()}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
            <Container className='g-0' fluid >
                {/* <div className='circle circle-left' />
                <div className='circle circle-right' /> */}
                <Row className='vh-100'>
                    <Col className='flex-grow-1 bg-user bg-user-dashboard'>
                        <Row className=" flex-grow-1 d-flex p-3">
                            <Col className='custom-scrollbar d-block'>
                                <Row className='flex-grow-1 align-items-center user-white-text p-5 user-header bg-artist'>
                                    <div onClick={handleClick} className='position-absolute album-back-btn'>
                                        <i className="fa fa-chevron-left" />
                                    </div>
                                    <Col className='d-flex'>
                                        <div>
                                            <Image src={playlistPlaceholder} className='mx-3' style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                                        </div>
                                        <div className='d-flex align-items-end'>
                                            {playlist === null ? (
                                                <Spinner animation="border" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </Spinner>
                                            ) : (
                                                <div>
                                                    <div>
                                                        {playlist.name}
                                                    </div>
                                                    <div className='playlist-details playlist-clickable' onClick={(e) => { e.stopPropagation(); navigate(`/artist/${playlist.creator.id}`) }}>
                                                        {playlist.creator.name}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </Col>
                                </Row>
                                <Row className='px-5 mt-2 user-white-text'>
                                </Row>
                                <Row className=' justify-content-center px-5 p-1'>
                                    <div className='flex-row d-flex'>
                                        <Button variant="link" >
                                            <div className='bg-light p-1 px-3 rounded-circle' style={{ height: 50, width: 50 }}>
                                                <i className='fa fa-play text-black icon-md playlist-play' />
                                            </div>
                                        </Button>
                                        <div className='fs-sm align-items-center d-flex'>
                                            <Dropdown className="custom-dropdown">
                                                <Dropdown.Toggle id="dropdown-basic">
                                                    <i className="fa fa-ellipsis-h ellipsis icon-lg" />
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu variant="dark">
                                                    <Dropdown.Item onClick={handleShow}>
                                                        Delete Playlist
                                                    </Dropdown.Item>
                                                    <Dropdown.Item onClick={() => { }}>
                                                        Add to queue
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </Row>
                                <Row className='px-5 mb-5 text-white'>
                                    <PlaylistTable />
                                </Row>
                                <Row className='p-5 d-flex text-white'>
                                    <div className='justify-content-end d-flex'>
                                        <Button variant='light-outline' className='text-white' onClick={() => setAddSongsState(!addSongsState)}>
                                            {addSongsState ? (
                                                <i className='fa fa-times icon-lg' />
                                            )
                                                : (
                                                    <>
                                                        Add More Songs
                                                    </>
                                                )}
                                        </Button>
                                    </div>
                                    {addSongsState ? (
                                        <AddToPlaylistTable />
                                    ) : (
                                        <>

                                        </>
                                    )}
                                </Row>
                                <Row className='mb-5 h-25'>
                                </Row>
                                <Row className='mb-5'>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row >
            </Container >
        </>
    );
}

export default PlaylistPage;