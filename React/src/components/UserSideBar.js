import React, { useState, useEffect } from 'react';
import { Container, Row, Stack, Col, Image, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import pfp from '../pfp-placeholder.jpg';


function UserSideBar() {

    const [username, setUsername] = useState(null);
    const [role, setRole] = useState(null);

    const storedName = localStorage.getItem('name');
    const storedRole = localStorage.getItem('role');

    const [profilePicUrl, setProfilePicUrl] = useState(null);

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
                // console.log(profilePicUrl)
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    const handleLogout = () => {
        localStorage.clear();
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
            <Row className='h-60 user-sidebar-main'>
                <Stack direction='vertical' gap={2}>
                    <div className='px-4 user-sidebar-item d-flex'>
                        <Link to={'/home'} className='links'> Home</Link>
                    </div>
                    <div className='px-4 user-sidebar-item d-flex'>
                        <Link to={'/admin'} className='links'> Browse</Link>
                    </div>
                    <div className='px-4 user-sidebar-item d-flex'>
                        <Link to={'/admin'} className='links'> Settings</Link>
                    </div>
                    <div className='px-4 user-sidebar-item d-flex'>
                        <Link to={'/admin'} className='links'> Songs</Link>
                    </div>
                    <div className='px-4 user-sidebar-item d-flex'>
                        <Link to={'/admin'} className='links'> Videos</Link>
                    </div>
                    <div className='px-4 user-sidebar-item d-flex'>
                        <Link to={'/admin'} className='links'> Podcasts</Link>
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
                <Link to={'/'} onClick={handleLogout}> Logout</Link>
            </Row>
        </div>
    )
}

export default UserSideBar;