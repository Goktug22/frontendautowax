import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function LoginComponent() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const [showAlert, setShowAlert] = useState(false);

    const handleError = (message) => {
        setError(message);
        setShowAlert(true);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        try {
            delete axios.defaults.headers.common["Authorization"];
            const response = await axios.post('http://localhost:8081/api/v1/authenticate', { username, password });
            console.log(response.data.jwt);
            localStorage.setItem('jwt', response.data.jwt);
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt')}`;
            setLoggedIn(true);
        } catch (error) {
            setError('Giriş başarısız');
            handleError('Giriş başarısız');
        }
    };

    return (
        <div className="container">
            {loggedIn && <Navigate to="/home" replace={true} />}

           

    <Container className="">
        <Row className="justify-content-center">
            <Col xs={12} md={6} lg={4}>

            <h2 className="mb-3">Giriş</h2>
                {showAlert && (
                <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                    {error}
                </Alert>
                )}
                <Form onSubmit={handleSubmit}>
                    <FloatingLabel
                        controlId="floatingInputUsername"
                        label="Kullanıcı Adı"
                        className="mb-3"
                    >
                        <Form.Control
                            type="text"
                            placeholder="Kullanıcı Adı"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="floatingPassword"
                        label="Şifre"
                        className="mb-3"
                    >
                        <Form.Control
                            type="password"
                            placeholder="Şifre"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            
                        />
                    </FloatingLabel>

                    <Button style={ {marginTop: "10px", backgroundColor: '#454541', color: 'white', borderColor: 'black'} } type="submit">Giriş Yap</Button>
                </Form>
            </Col>
        </Row>
    </Container>
        </div>
    );
}

export default LoginComponent;
