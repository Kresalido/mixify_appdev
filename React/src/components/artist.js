import React from 'react';
// import './artist.css'; // Import CSS file
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Col, Row, Container } from 'react-bootstrap';

const Artist = () => {
    return (
        <>
            {/* Insert modal code here */}
            <Container fluid>
                <Row xs={1}>
                    <Col className="bg-white" xs={3}>
                        <p>
                            Nice
                        </p>
                    </Col>
                    <Col className="bg-white" xs={7}>
                        <p>
                            Hi Kres
                        </p>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Artist;
