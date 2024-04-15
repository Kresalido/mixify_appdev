import React, { useEffect, useState } from "react";
import { Col, Row, Image } from "react-bootstrap";
import playlistPlaceholder from '../../playlist-placeholder.png';
import pfp from '../../pfp-placeholder.jpg';
import { useNavigate } from 'react-router-dom';

function TopArtistList() {
    const [artists, setArtists] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('jwt_token');

        fetch('http://127.0.0.1:8000/api/most-listened-artist/5', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setArtists(data.artists);
                console.log(data);
            }
            );
    }, []);

    return (
        <>
            <Col className="d-flex flex-wrap text-white">
                {/* {playlists.length === 0 && <div className="text-center w-100">No playlists found</div>} */}
                {artists.map(artist => (
                    <div key={artist.id} onClick={() => navigate(`/artist/${artist.user.id}`)} className='py-2'>
                        <div className='artist-item d-flex flex-column mx-2 px-4 py-3'>
                            <div className="d-flex">
                                <Image
                                    roundedCircle
                                    src={pfp}
                                    className="artist-image"
                                />
                            </div>
                            <div className="my-3 d-flex flex-column justify-content-center">
                                <div className='d-flex align-items-center flex-column justify-content-center'>
                                    <div className="mx-1">
                                        {artist.user.name}
                                    </div>
                                </div>
                                <div className='d-flex align-items-center my-2 flex-column justify-content-center'>
                                    <div className="song-details text-gray mx-1">
                                        Total Listens: {artist.total_listens}
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

export default TopArtistList;