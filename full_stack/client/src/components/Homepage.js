import './Components.css';
import my_image from './logo.jpeg';
import React from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import axios from "axios";
import { Grid } from "@mui/material";

import Typography from '@mui/material/Typography';


const Homepage = (props) => {

    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()
    const [detected, setDetected] = useState()
    const [semantic, setSemantic] = useState()
    const [toolslist, setTools] = useState()
    const [processing1, setProcessing1] = useState(false)
    const [processing2, setProcessing2] = useState(false)


    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
        setDetected();
        setSemantic();
        console.log(e.target.files)
        setSelectedFile(e.target.files[0])
    }


    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }
        console.log(selectedFile);
        const objectUrl = URL.createObjectURL (selectedFile)
        console.log(objectUrl);
        setPreview(objectUrl)
        return () => URL.revokeObjectURL (objectUrl)
    }, [selectedFile])


    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function detect() {
        console.log(selectedFile)
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }
        let formData = new FormData ();
        formData.append(
            "file",
            selectedFile)

        axios.post('http://localhost:8000/object-to-img', formData, config)
            .then(res => {
                setProcessing1(true);
                setTools(res.data.result);
                var encode_image = JSON.parse(res.data.img.body)['image'];
                var image = new Image();
                image.src = 'data:image/png;base64,' + encode_image;
                console.log(typeof image)
                setDetected('data:image/png;base64,' + encode_image);
                setProcessing1(false)
            })
            .catch(err => console.log(err));
    }

    return (
      <div className="home">
        <div className="mainhome">
          <Grid
            container
            // spacing={2}
            // style={{ paddingLeft: "30px", paddingTop: "10px" }}
          >
            <Grid>
              <Typography
                align="center"
                variant="h3"
                id="heading"
                style={{ fontFamily: "Josefin Sans" }}
                marginTop="3rem"
              >
                Welcome, {props.details.user.name}
                <Button
                  style={{ margin: "0 0 0 3rem", fontFamily: "Josefin Sans" }}
                  variant="contained"
                  color="info"
                  onClick={() => props.details.setLoginUser({})}
                >
                  Logout
                </Button>
              </Typography>
            </Grid>
          </Grid>
          <br />
          <div className="superdiv">
            <Box>
              <div className="homepage">
                <input type="file" onChange={onSelectFile} /> <br />
                <br />
                {selectedFile && (
                  <img
                    style={{ borderRadius: "1rem" }}
                    src={preview}
                    // style={{ maxWidth: "800px", maxHeight: "600px" }}
                  />
                )}
                <br /> <br />
                <Button variant="contained" color="info" onClick={detect}>
                  Detect Image
                </Button>
                <br />
                <br />
              </div>
            </Box>
            {processing1 && processing2 ? (
              <h1>Processing image....!</h1>
            ) : (
              <div className="subhome">
                {detected && <h1>Bounding Box: </h1>}
                <Grid

                // style={{ paddingLeft: "200px", paddingTop: "10px" }}
                >
                  <Grid>
                    <div>
                      {detected && (
                        <img
                          style={{ borderRadius: "1rem" }}
                          src={detected}
                          // style={{ maxWidth: "800px", maxHeight: "600px" }}
                        />
                      )}
                    </div>
                  </Grid>
                  <Grid>
                    <div>
                      {detected && <h2>Detected Person: </h2>}
                      {detected && (
                        <ul>
                          {toolslist.length > 0 &&
                            toolslist.map((item) => (
                              <li key={item}>
                                {" "}
                                <h3 id="">{item}</h3>{" "}
                              </li>
                            ))}
                        </ul>
                      )}
                    </div>
                  </Grid>
                </Grid>
              </div>
            )}
          </div>
        </div>
      </div>
    );
} 
export default Homepage;