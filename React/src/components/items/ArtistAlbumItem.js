import { Container, Row, Stack, Col, Image, Form } from 'react-bootstrap';
import backendUrl from '../../config';


function ArtistAlbumItem({ album, id}) {

    return (
        <div>
            <div className='song-item' onClick={() => {
                window.location.href = `/artist/${album.user.id}/${album.album_id}`;
            }}>
                <div>
                    <Row className='d-flex justify-content-center p-2'>
                        <Image src={`http://127.0.0.1:8000/storage/album_images/${album.cover_photo}`} className='px-0' style={{ height: '125px', width: '125px', objectFit: 'cover' }} />
                    </Row>
                    <Row className='d-flex mx-2'>
                        <h5 className='song-container-name'>
                            {album.album_name}
                        </h5>
                    </Row>
                </div>
                {/* <div>
                    <Row className='text-center d-flex justify-content-center song-container-artist mb-2'>
                        {album.user}
                    </Row>
                </div> */}
            </div>
        </div>
    );
}

export default ArtistAlbumItem;