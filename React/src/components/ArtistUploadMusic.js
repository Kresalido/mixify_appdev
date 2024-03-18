import React, { useState, useEffect } from 'react';
import { Container, Row, Stack, Col, Image, Form, Button } from 'react-bootstrap';
import 'react-h5-audio-player/lib/styles.css';
import UserSideBar from './UserSideBar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AlbumItem from './items/AlbumItem';
import Modal from 'react-bootstrap/Modal';
import SongDropzone from './dropzone/SongDropzone';
import AlbumPhotoDropzone from './dropzone/AlbumPhotoDropzone';

function ArtistUploadPage() {

    // Files
    const [mediaFiles, setMediaFiles] = useState([]);
    const [albumPhoto, setAlbumPhoto] = useState(null);
    const [albumTitle, setAlbumTitle] = useState('');
    const [albumDescription, setAlbumDescription] = useState('');


    const [username, setUsername] = useState(null);
    const [role, setRole] = useState(null);

    // Song upload
    const [songName, setSongName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedSong, setSelectedSong] = useState();
    const [selectedImage, setSelectedImage] = useState();
    const [imageUrl, setImageUrl] = useState();

    // Album
    const [albums, setAlbums] = useState([]);
    const [selectedAlbum, setSelectedAlbum] = useState('');
    const [newAlbumName, setNewAlbumName] = useState('');
    const [newAlbumDescription, setNewAlbumDescription] = useState('');
    const [createNewAlbum, setCreateNewAlbum] = useState(true);
    const [newAlbumPhoto, setNewAlbumPhoto] = useState(null);
    const [newAlbumPhotoUrl, setNewAlbumPhotoUrl] = useState(null);

    // Toastify
    const songUploadSuccess = localStorage.getItem('songUploadSuccess');

    // Modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    useEffect(() => {
        // if (songUploadSuccess === 'true') {
        //     toast.success('Song uploaded successfully!');
        //     localStorage.removeItem('songUploadSuccess');
        // }

        // fetch('http://127.0.0.1:8000/api/albums', {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
        //     },
        // })
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log(data)
        //         setAlbums(data);
        //         if (data.length > 0) {
        //             setSelectedAlbum(data[0].id);
        //         }
        //     })
        //     .catch((error) => {
        //         console.error('Error:', error);
        //     });
    }, []);

    const submitHandler = () => {
        const formData = new FormData();
        formData.append('album_name', albumTitle);
        formData.append('album_description', albumDescription);
        formData.append('album_photo', albumPhoto);

        mediaFiles.forEach((file, index) => {
            formData.append(`songs[${index}]`, file);
            formData.append(`displayNames[${index}]`, file.displayName);
        });

        console.log(mediaFiles);

        fetch('http://127.0.0.1:8000/api/create-album/upload-songs', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`,
                'Accept': 'application/json'
            },
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                toast.success('Song uploaded successfully!');
                console.log(data);
                setShow(false);
            })
            .catch((error) => {
                console.error('Error:', error);
                toast.error('Error uploading song: ' + error);
            });
    };

    // Dropzone
    const handleAlbumCoverDrop = (acceptedFiles) => {
        setAlbumPhoto(acceptedFiles[0]);
        console.log(acceptedFiles[0].name);
    };

    const handleMediaDrop = (acceptedFiles) => {
        setMediaFiles(acceptedFiles);
        acceptedFiles.forEach(file => {
            console.log(file.name);
        });
    };

    // Player Related
    // const [currentSong, setCurrentSong] = useState(null);
    // const playerRef = useRef();
    // const [songDetails, setSongDetails] = useState({ name: '', author: '', photo: '' });

    return (
        <>
            <Modal show={show} size='lg' onHide={handleClose} centered backdrop="static" >
                <Modal.Header className="artist-upload-modal" closeButton>
                    <Modal.Title>Create Album</Modal.Title>
                </Modal.Header>
                <Modal.Body className="artist-upload-modal">
                    <Row className='mb-3'>
                        <Col className='d-flex'>
                            <div style={{ width: '150px', height: '150px' }}>
                                <AlbumPhotoDropzone onDrop={handleAlbumCoverDrop} uploadText='Upload or Drop Album Photo here' />
                            </div>
                            <Col className='px-3'>
                                <Form>
                                    <Form.Group controlId="formAlbumName">
                                        <Form.Label>Album name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter album name"
                                            value={albumTitle}
                                            onChange={e => setAlbumTitle(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formAlbumDescription">
                                        <Form.Label>Album Description</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            placeholder="Enter album description"
                                            value={albumDescription}
                                            onChange={e => setAlbumDescription(e.target.value)}
                                        />
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='vh-30 overflow-auto'>
                            <SongDropzone onDrop={handleMediaDrop} uploadText='Upload or Drop Songs here' iconClass='fa fa-upload upload-icon' uploadTextClass='upload-text' />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer className="artist-upload-modal">
                    <Button variant="danger" onClick={submitHandler}>
                        Upload
                    </Button>
                </Modal.Footer>
            </Modal>
            <Container fluid>
                {/* <div className='circle circle-left' />
            <div className='circle circle-right' /> */}
                <Row className='vh-100'>
                    {/* SIDE BAR */}
                    <UserSideBar />
                    <Col className=' bg-user bg-user-dashboard'>
                        <Row className=" flex-grow-1 d-flex p-3">
                            <Col className='custom-scrollbar'>
                                <Stack direction='vertical' gap={1}>
                                    <Row className='px-5 d-flex'>
                                    </Row>
                                    <Row className='d-flex justify-content-between flex-row align-items-center user-white-text p-5 user-header'>
                                        <Col>
                                            Artist Content
                                        </Col>
                                        <Col className='d-flex justify-content-end'>
                                            <Button variant='danger' className='upload-button' onClick={handleShow}>
                                                <i className="fa fa-plus-square px-2" aria-hidden="true" />
                                                CREATE
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Row className='user-white-text'>
                                        <Col className='p-5'>
                                            <Row>
                                                <Col xs={2} className='d-flex'>
                                                    Album
                                                </Col>
                                                <Col className='d-flex align-items-center'>
                                                </Col>
                                                <Col className='d-flex align-items-center'>
                                                    Date
                                                </Col>
                                            </Row>
                                            <AlbumItem />
                                        </Col>
                                    </Row>
                                </Stack>
                            </Col>
                        </Row>
                        {/* <div className='user-player position-absolute bottom-0 d-flex'>
                        <Col xs={3} className='d-flex align-items-center '>
                            <Row className='h-100 p-4 flex-grow-1'>
                                <Col xs={4} className=' d-flex align-items-center'>
                                    {songDetails.photo && <Image src={songDetails.photo} className='song-cover-image' />}
                                </Col>
                                <Col xs={8} className='p-3 h-100 align-items-center song-details'>
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
                    </div> */}
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default ArtistUploadPage;