import { Container, Row, Stack, Col, Image, Form } from 'react-bootstrap';
import PlayButton from '../.././play-solid.svg';


function SongItem({ song, currentSong, setCurrentSong, setSongDetails, playerRef }) {
    const handleClick = async () => {
        if (currentSong === song.hashed_name) {
            playerRef.current.audio.current.currentTime = 0;
            playerRef.current.audio.current.play();
        } else {
            console.log(song.hashed_name);
            let songUrl = `http://127.0.0.1:8000/storage/songs/${song.hashed_name}`;
            setCurrentSong(songUrl);
            setSongDetails({
                name: song.display_name,
                author: song.user.name,
                photo: `http://127.0.0.1:8000/storage/album_images/${song.album.cover_photo}`
            });
        }

        playerRef.current.audio.current.currentTime = 0;
        try {
            await playerRef.current.audio.current.play();
        } catch (error) {
            console.error('Failed to play the song:', error);
        }
    };

    return (
        <div onClick={handleClick}>
            <div className='song-item' style={{ height: '220px', width: '150px' }}>
                <div>
                    <Row className='d-flex justify-content-center p-2'>
                        <Image src={`http://127.0.0.1:8000/storage/album_images/${song.album.cover_photo}`} className='px-0' style={{ height: '125px', width: '125px', objectFit: 'cover' }} />
                    </Row>
                    <Row className='d-flex justify-content-center song-container-name'>
                        {song.display_name}
                    </Row>
                    <Row className='text-center d-flex justify-content-center song-container-artist'>
                        {song.user.name}
                    </Row>
                </div>
            </div>
        </div>
    );
}

export default SongItem;