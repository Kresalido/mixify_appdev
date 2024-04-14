import React, { useEffect, useState } from "react";
import { Col, Row, Image } from "react-bootstrap";

function AlbumItem() {
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('jwt_token');

        fetch('http://127.0.0.1:8000/api/albums', {
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
                {playlists.map(playlist => (
                    <div key={playlist.album_id} className='py-2'>
                        <div className='d-flex bg-success flex-column mx-2'>
                            <div className="d-flex">
                                <Image
                                    rounded
                                    src={`http://127.0.0.1:8000/storage/album_images/${playlist.cover_photo}`}
                                    style={{ width: '15vw', height: '15vw', objectFit: 'cover', borderRadius: '2%', minWidth: '100px', minHeight: '100px' }}
                                />
                            </div>
                            <div>
                                <div className='d-flex align-items-start'>
                                    {playlist.album_name}
                                    {/* {playlist} */}
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