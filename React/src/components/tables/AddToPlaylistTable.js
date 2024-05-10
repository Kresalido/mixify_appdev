import React, { useState, useRef, useEffect, useContext } from 'react';
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

// pagination
import { Paginator } from 'primereact/paginator';
import { InputText } from 'primereact/inputtext';

// context
import MusicContext from '../../context/MusicContext';

const imageTemplate = (photoUrl) => {
    return photoUrl ? (
        <Image src={`http://127.0.0.1:8000/storage/album_images/${photoUrl}`} rounded style={{ width: '50px', height: '50px' }} />
    ) : (
        <Image src={playlistPlaceholder} rounded style={{ minWidth: '50px', minHeight: '50px' }} />
    );
}

function AddToPlaylistTable() {
    const [songs, setSongs] = useState([]);
    const [playlistSongs, setPlaylistSongs] = useState([]);
    const { id } = useParams();


    const navigate = useNavigate();


    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const playlistResponse = await axios.get(`http://127.0.0.1:8000/api/playlist/${id}/songs`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const playlistSongs = playlistResponse.data.songs.data;
                console.log(playlistResponse.data.songs.data);
                setPlaylistSongs(playlistSongs);

                const songsResponse = await axios.get(`http://127.0.0.1:8000/api/songs`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const allSongs = songsResponse.data;
                const filteredSongs = allSongs.filter(song => !playlistSongs.find(ps => ps.id === song.id));
                setSongs(filteredSongs);
            } catch (error) {
                console.error('There was an error!', error);
            }
        };
        fetchSongs();
    }, []);


    // Player Related
    const [currentSong, setCurrentSong] = useState(null);
    const [songDetails, setSongDetails] = useState({ name: '', author: '', photo: '' });
    const [metaKey, setMetaKey] = useState(true);
    const playerRef = useRef();

    const [isAdding, setIsAdding] = useState({});

    const addSongToPlaylist = async (songId) => {
        setIsAdding(prevState => ({ ...prevState, [songId]: true }));
        console.log(songId);
        await axios.post(`${backendUrl}/api/playlist/${id}/${songId}/add`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
            }
        });
        setIsAdding(prevState => ({ ...prevState, [songId]: false }));
        setSongs(prevSongs => prevSongs.filter(song => song.id !== songId));
    }

    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');

    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
    };

    const onSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredSongs = songs.filter(song => song.display_name.toLowerCase().includes(searchTerm.toLowerCase()));


    const { setQueue, setCurrentSongIndex } = useContext(MusicContext);


    return (
        <>
            <div className='text-nowrap'>
                ADD SONGS
            </div>
            <div className='custom-table'>
                <InputText value={searchTerm} onChange={onSearchChange} placeholder="Search" />
                <DataTable value={filteredSongs} className='custom-table p-datatable' rowHover
                    selectionMode="single"
                    paginator
                    rows={5}
                    onSelectionChange={(e) => {
                        if (e.value) {
                            setCurrentSong(e.value);
                            console.log(e.value);
                            const songId = [e.value]
                            setQueue(songId);
                            setCurrentSongIndex(0);
                        }
                    }}

                    selection={currentSong}
                    dataKey="id"
                    stripedRows
                >
                    <Column body={(rowData) => imageTemplate(rowData.album.cover_photo)} style={{ width: '5%' }} />
                    <Column style={{ width: '65%' }} body={(rowData) => {
                        return (
                            <>
                                <div>
                                    <div>
                                        {rowData.display_name}
                                    </div>
                                    <div className='playlist-details playlist-clickable d-inline' onClick={(e) => { e.stopPropagation(); navigate(`/artist/${rowData.user.id}`) }}>
                                        {rowData.user.name}
                                    </div>
                                </div>
                            </>
                        );
                    }} />
                    <Column style={{ width: '30%' }} body={(rowData) => {
                        return (
                            <div className='text-gray playlist-clickable d-inline' onClick={(e) => { e.stopPropagation(); navigate(`/artist/${rowData.user.id}/${rowData.album.album_id}`) }}>
                                {rowData.album.album_name}
                            </div>
                        );
                    }} />
                    <Column field="id" body={(rowData) => {
                        return (
                            <Button variant='outline-light' disabled={isAdding[rowData] || false} onClick={() => addSongToPlaylist(rowData.id)}>
                                Add
                            </Button>
                        );
                    }} style={{ width: '10%' }} />
                </DataTable>
            </div>
        </>

    );
}

export default AddToPlaylistTable;