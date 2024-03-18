import React from "react";
import { Col, Container, Row, Image } from "react-bootstrap";

function AlbumItem() {
    return (
        <Row className='py-2'>
            <Col xs={2} className='d-flex'>
                <Image
                    rounded
                    src={"https://via.placeholder.com/100"}
                    style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '2%' }}
                />
            </Col>
            <Col className='d-flex align-items-center'>
                Album name
            </Col>
            <Col className='d-flex align-items-center'>
                January 1, 2024
            </Col>
        </Row>
    );
}

export default AlbumItem;