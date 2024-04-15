import React, { useEffect, useState } from "react";
import { Col, Row, Image } from "react-bootstrap";
import playlistPlaceholder from '../../playlist-placeholder.png';
import pfp from '../../pfp-placeholder.jpg';
import { useNavigate } from 'react-router-dom';

function ArtistList() {
    const [playlists, setPlaylists] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('jwt_token');

        fetch('http://127.0.0.1:8000/api/artists', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setPlaylists(data);
                console.log(data);
            }
            );
    }, []);

    return (
        <>
            <Col className="d-flex flex-wrap text-white">
                {/* {playlists.length === 0 && <div className="text-center w-100">No playlists found</div>} */}
                {playlists.map(artist => (
                    <div key={artist.id} onClick={() => navigate(`/artist/${artist.id}`)} className='py-2'>
                        <div className='artist-item d-flex flex-column mx-2 px-4 py-3'>
                            <div className="d-flex">
                                {/* <Image
                                    rounded
                                    src={`http://127.0.0.1:8000/storage/album_images/${artist.cover_photo}`}
                                    style={{ width: '15vw', height: '15vw', objectFit: 'cover', borderRadius: '2%', minWidth: '100px', minHeight: '100px' }}
                                /> */}
                                <Image
                                    roundedCircle
                                    src={pfp}
                                    className="artist-image"
                                />
                            </div>
                            <div className="my-3 d-flex justify-content-center">
                                <div className='d-flex align-items-start flex-column justify-content-center'>
                                    <div className="mx-1">
                                        {artist.name}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
                }
            </Col>
        </>
    );
}

export default ArtistList;