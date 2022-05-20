import React,  {useContext } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useNavigate} from "react-router-dom";
import {AuthContext} from "../helpers/AuthContext";
import "../App.css";
import axios from "axios"; 

function Login() {

    let history = useNavigate();

    const  {setAuthState} = useContext(AuthContext)

    //form submition 
    const handleSubmit = (event) => {
        event.preventDefault();
        const dataForm = new FormData(event.currentTarget);
        const data = { 
            username: dataForm.get('username'), 
            password: dataForm.get('password') 
        };
        
        // pass data to api 
        axios.post(`${process.env.REACT_APP_API_URL}/users/login`, data).then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            } else {
                localStorage.setItem("accessToken", response.data);
                setAuthState(true);
                history("/home");
            }
        });
    };

    return (
        <div className="auth">
            <Box className="box" component="form" onSubmit={handleSubmit}>
                <label > Login In</label>
                <div className="row">
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username "
                        name="username"
                        autoComplete="username"
                        autoFocus
                    />
                </div>
                <div className="row">
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                </div>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign In
                </Button>
            </Box>
        </div>
    )
}

export default Login
