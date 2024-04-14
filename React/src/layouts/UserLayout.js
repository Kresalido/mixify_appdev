import React, { useEffect, useState, useContext} from 'react';
import { Container } from 'react-bootstrap';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import backendUrl from '../config';



// Components
import UserSideBar from '../components/UserSideBar';
import MusicPlayer from '../components/MusicPlayer';

const UserLayout = () => {

    return (
        <Container fluid className='d-flex g-0'>
            <UserSideBar />
            <Container className='g-0 overflow-hidden w-100' fluid>
                <MusicPlayer />
                <Outlet />
            </Container>
        </Container>
    );
}

export default UserLayout;