import React, { useState } from "react";
import { Link, redirect } from 'react-router-dom';
import { Col, Container, Row, Form, Stack, FormControl, Button, InputGroup } from "react-bootstrap";
import Outernavbar from "./outernavbar.component";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ArtistSignup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register-artist', {
                name: name,
                email: email,
                password: password,
                confirmPassword: confirmPassword
            });

            console.log(response.data);
            toast.success('Registration Successful! Please login to continue.');
        } catch (error) {
            console.error('There was an error!', error);
            toast.error(`Registration Failed: ${error.response.data.message}`);
        }
    };

    return (
        <Container className="artist-registration vh-100" fluid>
            <Row className="h-100">
                <Col xs={5} className="p-5">
                    <Row className="d-flex justify-content-center align-items-center h-100">
                        <Form className='sign-form' onSubmit={handleSubmit}>
                            <h1 className="mb-4">Sign up as Artist</h1>
                            <Form.Group className="mb-4">
                                <InputGroup>
                                    <FormControl
                                        type="text"
                                        onChange={handleNameChange}
                                        name="name"
                                        value={name}
                                        placeholder="Name"
                                        className='input'
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <InputGroup>
                                    <FormControl
                                        type="text"
                                        onChange={handleEmailChange}
                                        name="email"
                                        value={email}
                                        placeholder="Email"
                                        className='input'
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <InputGroup>
                                    <FormControl
                                        type="password"
                                        onChange={handlePasswordChange}
                                        name="password"
                                        value={password}
                                        placeholder="Password"
                                        className='input'
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <InputGroup>
                                    <FormControl
                                        type="password"
                                        onChange={handleConfirmPasswordChange}
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        placeholder="Re-enter Password"
                                        className='input'
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Button type="submit" className="btn-dark">
                                Sign up
                            </Button>
                        </Form>
                    </Row>
                </Col>
                <Col xs={7} className="px-5">
                    <Outernavbar />
                </Col>
            </Row>
        </Container>
    );
}

export default ArtistSignup;