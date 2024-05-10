import React, { useEffect, useState, useContext } from 'react';
import { Container } from 'react-bootstrap';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import backendUrl from '../config';



// Components
import UserSideBar from '../components/UserSideBar';
import MusicPlayer from '../components/MusicPlayer';

const UserLayout = () => {

    const navigate = useNavigate();
    const [token, setToken] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('jwt_token');

        if (token) {
            axios.get(`${backendUrl}/api/auth/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(response => {
                    setToken(token);
                    if(localStorage.getItem('name') === 'Guest') {
                        localStorage.clear();
                    }
                })
                .catch(error => {
                    console.error('Error fetching role:', error);
                    localStorage.removeItem('jwt_token');
                    setToken(null);
                    navigate('/sign-in');
                })
        } else {
            console.log('Token does not exist');
            navigate('/sign-in');
        }
    }, [token]);

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