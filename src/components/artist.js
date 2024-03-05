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
        // <div className="admin-name">
        //   <div className="row">
        //     <nav className="col-md-2 d-none d-md-block bg-light sidebar">
        //       <div className="sidebar-sticky">
        //         <div className="artist">Artist</div>
        //         <ul className="nav flex-column">
        //           <li className="home">Home</li>
        //           <li className="browse">Browse</li>
        //           <li className="settings">Setting</li>
        //           <li className="songs">Song</li>
        //           <li className="videos">Videos</li>
        //           <li className="podcasts">Podcast</li>
        //           <li className="library">
        //             <a className="nav-link" href="#">LIBRARY</a>
        //           </li>
        //           <li className="playlist-1">Playlist#1</li>
        //           <li className="playlist-2">Playlist#2</li>
        //           <li className="recently-played">
        //             <a className="nav-link" href="#">RECENTLY PLAYED</a>
        //           </li>
        //           <li className="liked">Liked</li>
        //           <li className="albums">Albums </li>
        //           <li className="made-for-you">Made For You</li>
        //           <li className="premium">
        //             <a className="nav-link" href="#">PREMIUM</a>
        //           </li>
        //           <li className="subscriptions">Subscriptions</li>
        //           <li className="log-out">Log Out
        //           </li>
        //         </ul>
        //       </div>
        //     </nav>

        //     <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-">
        //       {/* Your main content goes here */}
        //     </main>
        //   </div>
        // </div>
    );
};

export default Artist;
