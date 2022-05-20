import React from 'react'
import { Button, TextField } from '@mui/material';
import MuiPhoneInput from 'material-ui-phone-number';
import '../App.css';
import * as Yup from "yup";
import axios from "axios"; 
import {ErrorMessage, useFormik} from 'formik'; //useFormikformik is return all Formik state
import { useNavigate } from "react-router-dom";

function Register() {
    let history = useNavigate();

    //validation
    const validationSchema = Yup.object({
        username: Yup.string().min(5,'The length of username is at least 8').max(15, 'The length of username is at most 15').required(),
        password: Yup.string().min(8,'The length of password is at least 8').required(),
        email: Yup.string().email("Enter a correct email").required(),
        phone: Yup.string().required(),
    });
    
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            email: '',
            phone: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            axios.post(`${process.env.REACT_APP_API_URL}/users/register`, values).then((response) => {
                if (response.data === "sucess")  // when registration is sucess navigate to login 
                    history("/login")
            });
        },
    });
    
    return (
        <div className="auth">
            <form className="box" onSubmit={formik.handleSubmit}>
                <label > Register </label>
                <div className="row">
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                    />
                    {formik.touched.email && Boolean(formik.errors.email) ? (
                        <div className="div-error">{formik.errors.email}</div>
                    ) : null}
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
                        autoFocus
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                    />
                    {formik.touched.password && Boolean(formik.errors.password) ? (
                        <div className="div-error">{formik.errors.password}</div>
                    ) : null}
                </div>
                <div className="row">
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        onChange={formik.handleChange}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                    />
                    {formik.touched.username && Boolean(formik.errors.username) ? (
                        <div className="div-error">{formik.errors.username}</div>
                    ) : null}
                </div>
                <div className="row">
                    <MuiPhoneInput
                        defaultCountry='ps'
                        regions={['north-america' ,'south-america', 'central-america', 'carribean', 'european-union', 'ex-ussr', 'middle-east', 'north-africa']}
                        margin="normal"
                        required
                        fullWidth
                        name="phone"
                        id="phone"
                        autoFocus
                        label="Phone"
                        variant="outlined"
                        onChange={e => formik.handleChange({
                            target: {
                              name: 'phone',
                              value: e
                            }
                          })}
                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                    />
                    {formik.touched.phone && Boolean(formik.errors.phone) ? (
                        <div className="div-error">{formik.errors.phone}</div>
                    ) : null}
                </div>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Register
                </Button>
            </form>
        </div>
    )
}

export default Register
