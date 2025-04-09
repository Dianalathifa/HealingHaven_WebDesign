import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Col, Row } from "react-bootstrap";
import Navbar from '../../landing/Navbar.js';
import donothing from '../../images/stressCoping/donothing.png';

const DoNothing = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = () => {
        axios.get('http://localhost:8080/video-stress')
            .then(response => {
                setVideos(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the videos!', error);
            });
    };

    return (
        <>
         <Navbar />
      <section className="section before-content" style={{ backgroundColor: "#7F91D8", color: "#141313", marginTop: "10px", paddingTop: "10px", padding: "70px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: 0, width: "100%", height: "50%", backgroundColor: "white", zIndex: 1 }}></div>
        <div style={{ position: "relative", zIndex: 2 }}>
          <Col md={16} className="d-flex align-items-center justify-content">
            <div className="container text-center">
              <h6 className="tfonts-2" style={{ fontWeight: "bold", color: "white" }}>Do Nothing For 2 Minutes</h6>
            </div>
          </Col>
          <br /><br /><br />
          <div className="container text-center">
            <img src={donothing} style={{ width: "350px", height: "250px", maxWidth: "100%", maxHeight: "100%" }} alt="tidur-sehat" />
          </div>
        </div>
      </section>

      <Container className="mt-3" style={{ maxWidth: '800px', marginBottom:"50px" }}>
        <Col md={16} className="d-flex align-items-center justify-content">
          <div className="container text-center">
            <p style={{ fontSize: "16px", fontWeight: "bold", color: "#7F91D8" }}>
            "Give yourself a 2-minute break of doing nothing! Choose a two-minute video below to support you during this break.
Make the most of it and allow yourself to truly relax for two full minutes.
Your brain will thank you for the break!"
            </p>
          </div>
        </Col>
        </Container>
        
        <Container>
          <Row className="video-list align-items-center justify-content-center" style={{marginBottom:"100px"}}>
            {videos.map(video => (
              <Col key={video.id} md={3} className="video-container mb-3 d-flex flex-column align-items-center">
                <h3 className="video-title text-center" style={{ fontWeight: "bold", fontSize: "16px" }}>{video.judul}</h3>
                <div className="video-player">
                  <iframe
                    title={video.judul}
                    width="100%"
                    height="215"
                    src={`https://www.youtube.com/embed/${getYouTubeVideoID(video.url)}`}
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
        </>
    );
};

// Fungsi untuk mendapatkan ID video YouTube dari URL
const getYouTubeVideoID = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

export default DoNothing;
