import React, { useState, useEffect } from 'react';
import { Container, Row, Stack, Col, Image, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import pfp from '../pfp-placeholder.jpg';
import axios from 'axios';
import backendUrl from '../config';

function UserSideBar() {

    const [username, setUsername] = useState(null);
    const [role, setRole] = useState(null);

    const storedName = localStorage.getItem('name');
    const storedRole = localStorage.getItem('role');

    const [profilePicUrl, setProfilePicUrl] = useState(null);
    const navigate = useNavigate();

    fetch('http://127.0.0.1:8000/api/auth/me', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
        },
    })
        .then(response => response.json())
        .then(data => {
            if (data.name !== storedName) {
                setUsername(data.name);
                setRole(data.role);
                localStorage.setItem('name', data.name);
                localStorage.setItem('role', data.role);
            }

            if (data.profile_pic_name) {
                setProfilePicUrl(`http://127.0.0.1:8000/storage/profile_pics/${data.profile_pic_name}`);
                // setProfilePicUrl(`../pfp-placeholder.jpg`);
                console.log(profilePicUrl)
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    const handleLogout = () => {
        console.log('this ran')
        localStorage.clear();
        window.location.reload();
    };



    return (
        <div className='bg-user-sidebar'>
            <Row className='h-20 d-flex justify-content-center align-items-center'>
                <div className='d-flex'>
                    <Image src={profilePicUrl ? profilePicUrl : pfp} roundedCircle className='user-pfp' />
                    <div className='d-flex justify-content-center align-items-center p-3 user-name'>
                        {storedName}
                    </div>
                </div>
            </Row>
            <Row className='h-60 user-sidebar-main text-nowrap'>
                <Stack direction='vertical' gap={2}>
                    <div className='px-4 user-sidebar-item d-flex'>
                        <Link to={'/'} className='links'> Home</Link>
                    </div>
                    <div className='px-4 user-sidebar-item d-flex'>
                        <Link className='links'> Browse</Link>
                    </div>
                    <div className='px-4 user-sidebar-item d-flex'>
                        <Link className='links'> Settings</Link>
                    </div>
                    <div className='px-4 user-sidebar-item d-flex'>
                        <Link className='links'> Songs</Link>
                    </div>
                    <div className='px-4 user-sidebar-item d-flex'>
                        <Link className='links'> Videos</Link>
                    </div>
                    <div className='px-4 user-sidebar-item d-flex'>
                        <Link className='links'> Podcasts</Link>
                    </div>
                    <div className='px-4 user-sidebar-item d-flex'>
                        <Link to={'/library'} className='links'> My Library</Link>
                    </div>
                    {storedRole === 'artist' && (
                        <div className='px-4 sub-header d-flex'>
                            ARTISTS
                        </div>
                    )}
                    {storedRole === 'artist' && (
                        <div className='px-4 user-sidebar-item d-flex'>
                            <Link to={'/artist-upload'} className='links'> Upload</Link>
                        </div>
                    )}
                </Stack>
            </Row>
            <Row className='h-20 d-flex align-items-end admin-sidebar-main'>
                <Link onClick={ () => handleLogout()}> Logout</Link>
            </Row>
        </div>
    )
}

export default UserSideBar;