import React, { useState, useEffect } from 'react';
import { Container, Row, Stack, Col, Image, Form, Button } from 'react-bootstrap';
import 'react-h5-audio-player/lib/styles.css';
import UserSideBar from './UserSideBar';
import { toast } from 'react-toastify';
import AlbumItem from './items/AlbumItem';
import Modal from 'react-bootstrap/Modal';
import MultiStep from "react-multistep";

function ArtistUploadPage() {

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
        if (songUploadSuccess === 'true') {
            toast.success('Song uploaded successfully!');
            localStorage.removeItem('songUploadSuccess');
        }

        fetch('http://127.0.0.1:8000/api/albums', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setAlbums(data);
                if (data.length > 0) {
                    setSelectedAlbum(data[0].id);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    const submitHandler = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('display_name', songName);
        formData.append('song', selectedSong);
        formData.append('image', selectedImage);
        if (createNewAlbum) {
            formData.append('new_album_name', newAlbumName);
            formData.append('new_album_description', newAlbumDescription);
            formData.append('new_album_photo', newAlbumPhoto);
        } else {
            formData.append('album_id', selectedAlbum);
        }

        fetch('http://127.0.0.1:8000/api/upload-song', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`,
                'Accept': 'application/json'
            },
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // Form clearing
                setSongName('');
                setSelectedSong(null);
                setSelectedImage(null);
                setImageUrl(null);
                setNewAlbumName('');
                setNewAlbumDescription('');
                setNewAlbumPhoto(null);
                setNewAlbumPhotoUrl(null);
                if (!createNewAlbum) {
                    setSelectedAlbum(albums[0].id);
                }
                localStorage.setItem('songUploadSuccess', 'true');
                window.location.reload();
            })
            .catch((error) => {
                console.error('Error:', error);
                // handle error
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
                    <Row className='vh-50'>
                        <Col className='d-flex'>
                            <div>
                                <Image
                                    rounded
                                    src={"https://via.placeholder.com/100"}
                                    style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '2%' }}
                                />
                            </div>
                            <Col className='px-3'>
                                <Row>
                                    Album name
                                </Row>
                                <Row>
                                    Album Description
                                </Row>
                            </Col>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Dropzone
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer className="artist-upload-modal">
                    <Button variant="secondary" onClick={handleClose}>
                        Ok
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
                                                <i class="fa fa-plus-square px-2" aria-hidden="true" />
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
                                            <AlbumItem />z
                                            {/* <Form onSubmit={submitHandler}>
                                            <Stack direction='vertical' gap={4} className='song-container'>
                                                <Form.Group controlId="formSongName">
                                                    <Form.Label>Song Name</Form.Label>
                                                    <Form.Control className='input' type="text" placeholder="Enter song name" value={songName} onChange={e => setSongName(e.target.value)} />
                                                </Form.Group>
                                                <Form.Group controlId="formAlbum">
                                                    <Form.Label>Album</Form.Label>
                                                    <Form.Control as="select" value={selectedAlbum} onChange={e => {
                                                        setSelectedAlbum(e.target.value);
                                                        if (e.target.value === 'new') {
                                                            setCreateNewAlbum(true);
                                                        } else {
                                                            setCreateNewAlbum(false);
                                                        }
                                                    }}>
                                                        {albums.map(album => (
                                                            <option key={album.album_id} value={album.album_id}>{album.album_name}</option>
                                                        ))}
                                                        <option value="new">--- CREATE NEW ALBUM ---</option>
                                                    </Form.Control>
                                                </Form.Group>
                                                {createNewAlbum && (
                                                    <>
                                                        <Form.Group controlId="formNewAlbumName">
                                                            <Form.Label>New Album Name</Form.Label>
                                                            <Form.Control type="text" placeholder="Enter new album name" value={newAlbumName} onChange={e => setNewAlbumName(e.target.value)} />
                                                        </Form.Group>
                                                        <Form.Group controlId="formNewAlbumDescription">
                                                            <Form.Label>New Album Description</Form.Label>
                                                            <Form.Control type="text" placeholder="Enter new album description" value={newAlbumDescription} onChange={e => setNewAlbumDescription(e.target.value)} />
                                                        </Form.Group>
                                                        <Form.Group controlId="formNewAlbumPhoto">
                                                            <Form.Label>New Album Photo</Form.Label>
                                                            <Row className='d-flex flex-grow-1 p-3 '>
                                                                {newAlbumPhotoUrl && <Image src={newAlbumPhotoUrl} alt="Uploaded" className='upload-file-container p-3' style={{ width: '200px', height: '100%' }} />}
                                                            </Row>
                                                            <Form.Control type="file" onChange={e => {
                                                                setNewAlbumPhoto(e.target.files[0]);
                                                                setNewAlbumPhotoUrl(URL.createObjectURL(e.target.files[0]));
                                                            }} />
                                                        </Form.Group>
                                                    </>
                                                )}

                                                <Form.Group controlId="formSongFile">
                                                    <Form.Label>Song File</Form.Label>
                                                    <Form.Control type="file" accept=".mp3,.wav,.ogg" onChange={e => {
                                                        setSelectedSong(e.target.files[0]);
                                                        console.log(e.target.files[0]);
                                                    }} />
                                                </Form.Group>

                                                <Form.Group controlId="formImageFile">
                                                    <Form.Label>Image File</Form.Label>
                                                    <Row className='d-flex flex-grow-1 p-3 '>
                                                        {imageUrl && <Image src={imageUrl} alt="Uploaded" className='upload-file-container p-3' style={{ width: '200px', height: '100%' }} />}
                                                    </Row>
                                                    <Form.Control type="file" accept=".jpeg,.jpg,.png,.gif" onChange={e => {
                                                        setSelectedImage(e.target.files[0]);
                                                        setImageUrl(URL.createObjectURL(e.target.files[0]));
                                                        console.log(e.target.files[0]);
                                                    }} />
                                                </Form.Group>
                                                <Button className="custom-danger-button" variant="danger" type="submit">
                                                    Submit
                                                </Button>
                                            </Stack>
                                        </Form> */}
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