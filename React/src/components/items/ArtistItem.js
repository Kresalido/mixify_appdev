import { Container, Row, Stack, Col, Image, Form } from 'react-bootstrap';
import pfp from '../../pfp-placeholder.jpg';

function ArtistItem({ picture, name, id }) {
    return (
        <Col xs={3} className='d-flex h-100 align-items-center justify-content-center item'
            onClick={() => {
                window.location.href = `/artist/${id}`;
            }}
        >
            <Row className='p-3'>
                <Image src={picture ? `http://127.0.0.1:8000/storage/profile_pics/${picture}` : pfp} className='artist-image d-flex justify-content-center flex-grow-1' roundedCircle />
                <div className="play">
                </div>
            </Row>
            <Row className='p-3'>
                <h4 className='d-flex justify-content-center'>{name}</h4>
            </Row>
        </Col>
    );
}

export default ArtistItem;