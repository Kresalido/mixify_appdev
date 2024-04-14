import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Stack, Col, Image, Form, Button, Dropdown } from 'react-bootstrap';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import playlistPlaceholder from '../../playlist-placeholder.png';

// Table
import { DataTable } from 'primereact/datatable';
import { InputSwitch } from 'primereact/inputswitch';
import { Column } from 'primereact/column';
import 'primeflex/primeflex.css';
import backendUrl from '../../config';


const imageTemplate = (photoUrl) => {
    return photoUrl ? (
        <Image src={`http://127.0.0.1:8000/storage/album_images/${photoUrl}`} rounded style={{ width: '50px', height: '50px' }} />
    ) : (
        <Image src={playlistPlaceholder} rounded style={{ minWidth: '50px', minHeight: '50px' }} />
    );
}

function PlaylistTable() {
    const [songs, setSongs] = useState([]);
    const [playlist, setPlaylist] = useState(null);
    const [album, setAlbum] = useState([]);
    const { id, album_id } = useParams();

    const [addSongsState, setAddSongsState] = useState(false);

    const navigate = useNavigate();


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
    }, []);

    const removeSong = async (songId) => {
        try {
            await axios.delete(`${backendUrl}/api/playlist/${id}/${songId}/remove`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
                }
            })
            .then(response => {
                console.log(response.data);
                setSongs(songs.filter(song => song.id !== songId));
                window.location.reload();
            });
        } catch (error) {
            console.error('There was an error!', error);
        }
    }

    // Player Related
    const [currentSong, setCurrentSong] = useState(null);
    const [songDetails, setSongDetails] = useState({ name: '', author: '', photo: '' });
    const [metaKey, setMetaKey] = useState(true);
    const playerRef = useRef();

    return (
        <div className='custom-table'>
            <DataTable value={songs} className='custom-table p-datatable' rowHover selectionMode="single"
                onSelectionChange={(e) => { setCurrentSong(e.value); console.log(e.value); }}
                selection={currentSong}
                dataKey="id"
                stripedRows
            >
                <Column body={(rowData, rowMeta) => rowMeta.rowIndex + 1} header="#" style={{ width: '10%' }} />
                <Column header="Title" body={(rowData) => imageTemplate(rowData.album.cover_photo)} style={{ width: '5%' }} />
                <Column style={{ width: '15%' }} body={(rowData) => {
                    return (
                        <>
                            <div>
                                <div>
                                    {rowData.display_name}
                                </div>
                                <div className='playlist-details playlist-clickable' onClick={() => {navigate(`/artist/${rowData.user.id}`)}}>
                                    {rowData.user.name}
                                </div>
                            </div>
                        </>
                    );
                }} />
                <Column style={{ width: '20%' }} body={(rowData) => {
                    return (
                        <>
                            <div>
                                <div className='text-gray playlist-clickable' onClick={() => navigate(`/artist/${rowData.user.id}/${rowData.album.album_id}`)}>
                                    {rowData.album.album_name}
                                </div>
                            </div>
                        </>
                    );
                }} />
                <Column header="Date Added" body={(rowData) => {
                    const createdAt = new Date(rowData.pivot.created_at);
                    return createdAt.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
                }} style={{ width: '30%' }} />
                <Column field="listens" header={<i className="fa fa-clock-o" />} style={{ width: '20%' }} body={() => { return <>--</> }} />
                <Column field="id" body={(rowData) => {
                    return (
                        <Dropdown className="custom-dropdown" onClick={() => { }}>
                            <Dropdown.Toggle id="dropdown-basic">
                                <i className="fa fa-ellipsis-h ellipsis" />
                            </Dropdown.Toggle>
                            <Dropdown.Menu variant="dark">
                                <Dropdown.Item onClick={() => removeSong(rowData.id)}>
                                    Remove from this playlist
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => { }}>
                                    Add to queue
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    );
                }} style={{ width: '10%' }} />
            </DataTable>
        </div>

    );
}

export default PlaylistTable;