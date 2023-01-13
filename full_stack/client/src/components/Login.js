import './Components.css';
import Logo from './logo.jpeg';
import axios from "axios"
import React, {useState} from "react"
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const Login = ({ setLoginUser}) => {
    const navigate = useNavigate();
    const [ user, setUser] = useState({
        username:'',
        password:''
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const login = () => {
        axios.post("http://localhost:3001/login", user)
        .then (res => {
            setLoginUser (res.data.user)
            if (!res.data.user) {
              alert ('Username not found...!')
            }
            navigate("/")
        })
    }

    return (
      <div>
        {/* <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{ fontFamily: 'Josefin Sans', fontSize: '1.3rem' }}>
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
            className="login"
            // style={{ boxShadow: "0px 10px 30px 1px rgba(0, 0, 0, 0.75)" }}
          >
            <h1
              style={{
                color: "#2F4550",
                fontSize: "2.8rem",
                marginBotton: "1.5rem",
                // backgroundColor: "#586F7C",
                padding: "1rem",
                // border: "1px solid #999",
              }}
            >
              Login
            </h1>
            <img
              src={Logo}
              style={{ border: "1px solid black", borderRadius: "1rem" }}
            />
            <br />
            <br />
            <div className="inputs">
              <TextField
                variant="filled"
                color="primary"
                style={{ width: "100%" }}
                type="text"
                label="Username"
                name="username"
                value={user.username}
                onChange={handleChange}
              />
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
              />
            </div>{" "}
            <br />
            <br />
            <Button
              className="normal"
              variant="contained"
              color="info"
              id="siin"
              onClick={login}
            >
              Login
            </Button>
            &ensp;
            <Button
              variant="contained"
              color="info"
              style={{ marginLeft: "5rem" }}
              id="siup"
              onClick={() => navigate("/signup")}
            >
              Sign-Up
            </Button>
          </div>
        </Box>
      </div>
    );
}

export default Login