import './Components.css';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const Register = () => {
    const navigate = useNavigate();
    const [ user, setUser] = useState({
        name: "", 
        username:"",
        password:"",
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const signup = () => {
        const { name, username, password } = user
        if( name && username && password){
            axios.post("http://localhost:3001/signup", user)
            .then( res => {
                alert(res.data.message)
                navigate("/login")
            })
            .catch(err => console.log("Request error!"));
        } else {
            alert("Please enter valid input!")
        }
    }

    return (
      <div>
        {/* <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              style={{ fontFamily: "Josefin Sans", fontSize: "1.3rem" }}>
                Electronic-Affidavit: Face Detection
            </Typography>
          </Toolbar>
        </AppBar> */}

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <div
            className="signup"
            // style={{ boxShadow: "0px 10px 30px 1px rgba(0, 0, 0, 0.75)" }}
          >
            {console.log("User", user)}
            <h1
              style={{
                color: "#2F4550",
                fontSize: "2.8rem",
                marginBottom: "1.5rem",
                // backgroundColor: "#586F7C",
                padding: "1rem",
                // border: "1px solid #999",
                // borderRadius: "0.5rem",
              }}
            >
              Create account
            </h1>
            <div className="inputs">
              <TextField
                style={{ width: "100%" }}
                variant="filled"
                color="primary"
                type="text"
                label="Name"
                name="name"
                value={user.name}
                onChange={handleChange}
              />{" "}
              <br />
              <br />
              <TextField
                style={{ width: "100%" }}
                variant="filled"
                color="primary"
                type="text"
                label="Username"
                name="username"
                value={user.username}
                onChange={handleChange}
              />{" "}
              <br />
              <br />
              <TextField
                style={{ width: "100%" }}
                variant="filled"
                color="primary"
                type="password"
                label="Password"
                name="password"
                value={user.password}
                onChange={handleChange}
              />{" "}
            </div>
            <br />
            <br />
            <Button variant="contained" color="info" onClick={signup}>
              Sign-Up
            </Button>
            &ensp;
            <Button
              variant="contained"
              color="info"
              style={{ marginLeft: "1rem" }}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </div>
        </Box>
      </div>
    );
}
export default Register