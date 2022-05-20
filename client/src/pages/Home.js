import '../App.css';
import * as React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { withStyles } from '@mui/styles';
import { Button, TextField } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react"
import { useFormik } from 'formik';
import axios from "axios"
import * as yup from 'yup';

//style
const styles = {
    superContainer: {
        overflowY: 'scroll',
        height: '700px',

    },
    container: {
        margin: 'auto',
        justifyContent: 'center',
        maxWidth: 1000,
        minHeight: 200,
    },
    header: {
        display: 'flex',
        justifyContent: 'center',
        background: '#406882',
        color: 'whitesmoke',
        borderRadius: 5,
        height: 35
    },
    text: {
        fontSize: 12,
        display: 'flex',
        justifyContent: 'center',
        borderRadius: 5,
    }
}

function Home(props) {
    const { classes } = props;

    const [listOfPosts, setListOfPosts] = useState([]); // output

    // update data after post 
    const update = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/posts`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        }).then((response) => {
            if (!response.data.error) {
                setListOfPosts(response.data)
            }
        })
    }

    // Fetching data  and set data of output
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/posts`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        }).then((response) => {
            if (!response.data.error) {
                setListOfPosts(response.data)
            }
        })
    }, []);


    const history = useNavigate();  // use to change page with url  

    //validation
    const validationSchema = yup.object({
        text: yup
            .string()
            .required('Write anything')
    });

    const formik = useFormik({
        initialValues: {
            text: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            axios.post(`${process.env.REACT_APP_API_URL}/posts`, values, {
                headers: {
                    accessToken: localStorage.getItem("accessToken"), // post when he logged in 
                },
            }).then((res) => {
                if (!res.data.error) { // check if not error
                    /* update posts */
                    update()
                }
                else{
                    history('/login')
                }
            });
        },
    });
    return (

        <div className={classes.superContainer}>
            {/* <NewPost /> */}
            <Card className={classes.container}>
                <CardContent>
                    {/* form to submit date with formik library */}
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            multiline
                            rows={4}
                            fullWidth
                            id="text"
                            name="text"
                            placeholder="Text here !"
                            value={formik.values.text}
                            onChange={formik.handleChange} // change value in formik
                            error={formik.touched.text && Boolean(formik.errors.text)} // error of validation
                        />
                        <Button
                            type="submit"
                            color="info"
                            variant="contained"
                            fullWidth
                            style={{ marginTop: 5 }}
                        >
                            Post
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <br />

            {listOfPosts.map(function (object, i) {
                return (
                    <div key={i}>
                        <Card className={classes.container}>
                            <CardContent>
                                <Typography className={classes.header} variant='h5'>
                                    {object.username}
                                </Typography>
                                <br />
                                <Typography className={classes.text}>
                                    {object.text}
                                </Typography>
                            </CardContent>
                        </Card>
                        <br />
                    </div>
                );
            })}
        </div>
    );
}

export default withStyles(styles)(Home);
