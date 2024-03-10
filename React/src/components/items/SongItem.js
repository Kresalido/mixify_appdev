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
                photo: `http://127.0.0.1:8000/storage/images/${song.photo_hashed_name}`
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
        <Col xs={3} className='d-flex h-100 align-items-center justify-content-center item' onClick={handleClick}>
            <Row className='p-3'>
                <img src={`http://127.0.0.1:8000/storage/images/${song.photo_hashed_name}`} />
                <div className="play">
                    <span className="fa">
                        <Image src={PlayButton} className='icon' />
                    </span>
                </div>
            </Row>
            <Row className='p-3'>
                <h4>{song.display_name}</h4>
                <p>{song.user.name}</p>
            </Row>
        </Col>
    );
}

export default SongItem;