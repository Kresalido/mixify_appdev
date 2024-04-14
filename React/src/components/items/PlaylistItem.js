import React, { useEffect, useState } from "react";
import { Col, Row, Image } from "react-bootstrap";
import playlistPlaceholder from '../../playlist-placeholder.png';
import { useNavigate } from 'react-router-dom';

function AlbumItem() {
    const [playlists, setPlaylists] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('jwt_token');

        fetch('http://127.0.0.1:8000/api/playlists', {
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
            <Col className="d-flex flex-wrap">
                {/* {playlists.length === 0 && <div className="text-center w-100">No playlists found</div>} */}
                {playlists.map(playlist => (
                    <div key={playlist.id} onClick={() => navigate(`/playlist/${playlist.id}`)} className='py-2'>
                        <div className='playlist-item d-flex flex-column mx-2'>
                            <div className="d-flex">
                                {/* <Image
                                    rounded
                                    src={`http://127.0.0.1:8000/storage/album_images/${playlist.cover_photo}`}
                                    style={{ width: '15vw', height: '15vw', objectFit: 'cover', borderRadius: '2%', minWidth: '100px', minHeight: '100px' }}
                                /> */}
                                <Image
                                    rounded
                                    src={playlistPlaceholder}
                                    className="playlist-image"
                                />
                            </div>
                            <div>
                                <div className='d-flex align-items-start flex-column'>
                                    <div className="mx-1">
                                        {playlist.name}
                                    </div>
                                    <div className="d-flex playlist-details">
                                        <div className="mx-1">
                                            By
                                        </div>
                                        <div className="playlist-clickable" onClick={(e) => {e.stopPropagation(); navigate(`/artist/${playlist.creator.id}`)}}>
                                            {playlist.creator.name}
                                        </div>
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

export default AlbumItem;