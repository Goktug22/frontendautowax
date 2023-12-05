import React, { useState } from 'react';
import axios from 'axios';

const LoginComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const headers = {
        'Content-Type': 'application/json'
      }
      

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        try {
            
            const response = await axios.post('http://localhost:8081/api/v1/authenticate', { "username" : username, "password" : password } , {
                headers: headers
              } );
            // Save the JWT token from response to local storage or context
            localStorage.setItem('jwt', response.data.jwt);
            console.log(response);


            // Redirect or change the component state upon successful login
            // For example, you can redirect to the home page or dashboard
        } catch (error) {
            // Handle login error (e.g., display error message)
            setError('Login failed: Incorrect username or password');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginComponent;
