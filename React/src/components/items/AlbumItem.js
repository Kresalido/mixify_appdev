import React, { useEffect, useState } from "react";
import { Col, Row, Image } from "react-bootstrap";

function AlbumItem() {
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('jwt_token');

        fetch('http://127.0.0.1:8000/api/albums', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => setAlbums(data));
    }, []);

    return (
        <>
            {albums.map(album => (
                <Row key={album.album_id} className='py-2'>
                    <Col xs={2} className='d-flex'>
                        <Image
                            rounded
                            src={`http://127.0.0.1:8000/storage/album_images/${album.cover_photo}`}
                            style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '2%' }}
                        />
                    </Col>
                    <Col className='d-flex align-items-center'>
                        {album.album_name}
                    </Col>
                    <Col className='d-flex align-items-center'>
                        {new Date(album.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </Col>
                </Row>
            ))
            }
        </>
    );
}

export default AlbumItem;