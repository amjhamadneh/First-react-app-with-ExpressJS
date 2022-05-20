
import './App.css'
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import { useState, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route, Link, Navigate} from 'react-router-dom';
import { AuthContext } from "./helpers/AuthContext";
import axios from 'axios';  // to link with api
import { Button } from '@mui/material';

function App() {

    const [authState, setAuthState] = useState(false); // state to check if he auth  or not 
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/users/auth`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        }).then((response) => {
            if (response.data.error) {
                setAuthState(false);
            } else {
                setAuthState(true);
            }
        });
    }, []);

    // logout function
    const  logout  = () => {
        localStorage.removeItem("accessToken"); // remove token from localstorage
        setAuthState(false); // change state auth to false
    };

    return (
        <>
            <AuthContext.Provider value={{ authState, setAuthState }}> 
                <Router>
                    <div className="navbar">
                        {!authState ? (
                            <>
                                <Link to="/register" >Register</Link>
                                <Link to="/login" >Login</Link>
                            </>

                        ) : (
                            <>
                                <Link to="/home">Home</Link>
                                <Button onClick={logout} style={{ marginLeft:10, color:'white'}} >Logout</Button>
                            </>
                        )}
                    </div>
                    <Routes>
                        <Route path="*" element={
                            authState ? <Navigate  to="/home" /> : <Navigate  to="/login" />
                        }/>
                        <Route path="/home" element={<Home/>}/>
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </Router>
            </AuthContext.Provider>
        </>
    );
}

export default App;
