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
    const [selectedGenres, setSelectedGenres] = useState({});
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

    const clearData = () => {
        setMediaFiles([]);
        setAlbumPhoto(null);
        setAlbumDescription('');
        setAlbumTitle('');
        setSelectedGenres([]);
    }

    const submitHandler = () => {
        setLoading(true);

        if (!albumTitle) {
            upload_failed('Album title is missing.');
            setLoading(false);
            return;
        }
        if (!albumDescription) {
            upload_failed('Album description is missing.');
            setLoading(false);
            return;
        }
        if (!albumPhoto) {
            upload_failed('Album photo is missing.');
            setLoading(false);
            return;
        }
        if (mediaFiles.length === 0) {
            upload_failed('Please upload at least 1 song.');
            setLoading(false);
            return;
        }

        const songsWithEmptyGenres = mediaFiles.filter(file => !selectedGenres[file.path] || selectedGenres[file.path].length === 0);
        if (songsWithEmptyGenres.length > 0) {
            const songNames = songsWithEmptyGenres.map(file => file.name).join(', ');
            upload_failed(`The following songs do not have genres: ${songNames}`);
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('album_name', albumTitle);
        formData.append('album_description', albumDescription);
        formData.append('album_photo', albumPhoto);

        mediaFiles.forEach((file, index) => {
            formData.append(`songs[${index}]`, file);
            formData.append(`displayNames[${index}]`, file.displayName);
            const genres = selectedGenres[file.path];
            genres.forEach((genre, genreIndex) => {
                formData.append(`genres[${index}][${genreIndex}]`, genre.value);
            });
        });

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
                setLoading(false);
                toast.success('Song uploaded successfully!');
                console.log(data);
                clearData();
                setShow(false);
            })
            .catch((error) => {
                setLoading(false);
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

    const handleGenreChange = (selectedGenres) => {
        setSelectedGenres(selectedGenres);
    };


    return (
        <>
            <Modal show={show} size='lg' onHide={!loading ? handleClose : null} centered backdrop="static">
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
                            <SongDropzone onDrop={handleMediaDrop} onGenreChange={handleGenreChange} isLoading={loading} uploadText='Upload or Drop Songs here' iconClass='fa fa-upload upload-icon' uploadTextClass='upload-text' />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer className="artist-upload-modal">
                    <Button variant="danger" onClick={submitHandler} disabled={loading}>
                        {loading ? 'Uploading...' : 'Upload'}
                    </Button>
                </Modal.Footer>
            </Modal>
            <Container fluid>
                {/* <div className='circle circle-left' />
            <div className='circle circle-right' /> */}
                <Row className='vh-100'>
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
                                        <Col className='px-5'>
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
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default ArtistUploadPage;