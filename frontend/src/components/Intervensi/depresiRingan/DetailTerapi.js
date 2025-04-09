import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Button, Container, Row, Card, Alert } from 'react-bootstrap';
import { Link } from "react-router-dom/cjs/react-router-dom.min.js";
import Navbar from '../../landing/Navbar.js';
import Footer from '../../landing/Footer.js';
import depresiDetail from "../../images/activityTerapi/depresi-detail.png"; // Import gambar
import "../../style/Intervensi.css";
import terapi1 from '../../images/activityTerapi/1.png';
import terapi2 from '../../images/activityTerapi/2.png';
import terapi3 from '../../images/activityTerapi/3.png';
import terapi4 from '../../images/activityTerapi/4.png';
import terapi5 from '../../images/activityTerapi/5.png';
import WaveSurfer from 'wavesurfer.js';
import '@fortawesome/fontawesome-free/css/all.min.css';

const DepresiDetail = () => {
  const terapi = [
    { id: 1, image: terapi1, link: "/jadwal-tidur" },
    { id: 2, image: terapi2, link: "/jadwal-olahraga" },
    { id: 3, image: terapi3, link: "/jadwal-tujuan" },
    { id: 4, image: terapi4, link: "/jadwal-kegiatan" },
    { id: 5, image: terapi5, link: "/pola-makan" }
  ];

  const [voiceOver, setVoiceOver] = useState(null);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [waveSurfer, setWaveSurfer] = useState(null);

  useEffect(() => {
    fetchVoiceOverById(21); 
  }, []);

  useEffect(() => {
    if (waveSurfer) {
      waveSurfer.on('finish', () => {
        setIsPlaying(false);
      });
    }
  }, [waveSurfer]);

  const fetchVoiceOverById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/voiceovers/${id}`);
      setVoiceOver(response.data);
    } catch (error) {
      setError("Error fetching voice-over data. Please try again later.");
      console.error("Error fetching voice-over data:", error);
    }
  };

  const playPauseAudio = (url) => {
    if (waveSurfer) {
      if (isPlaying) {
        waveSurfer.pause();
        setIsPlaying(false);
      } else {
        waveSurfer.play();
        setIsPlaying(true);
      }
    } else {
      const newWaveSurfer = WaveSurfer.create({
        container: `#waveform`,
        waveColor: '#25B7D3',
        progressColor: '#C4EAF4',
        height: 60,
        barWidth: 2,
        responsive: true
      });

      newWaveSurfer.load(url);

      setWaveSurfer(newWaveSurfer);
      setIsPlaying(true);

      newWaveSurfer.on('ready', () => {
        newWaveSurfer.play();
      });

      newWaveSurfer.on('finish', () => {
        setIsPlaying(false);
      });
    }
  };

  return (
    <>
      <Navbar />
      <Container style={{ marginTop: "20px", maxWidth: "1000px" }}>
      <Container style={{ padding:"40px",backgroundColor:"#C4EAF4", borderRadius:"50px"}}>
          <Row className="justify-content-center">
            <Col md={5}>
              <h6 style={{ fontSize: "18px", marginTop:"10px", fontWeight:"bold" }}>
              Mild Depression Intervention
              </h6>
              <h6 style={{ fontSize: "25px",  fontWeight:"bold", marginBottom:"20px" }}>
                Activity Therapy 
              </h6>

              {/* Display Voice Over */}
              {error && <Alert variant="danger">{error}</Alert>}
              {voiceOver && (
                <Card className="card-voice">
                  <Card.Body>
                    <Row className="align-items-center">
                      <Col xs="auto">
                        <Button
                          style={{marginTop:"-15px"}}
                          variant="light"
                          size="sm"
                          onClick={() => playPauseAudio(`http://localhost:8080/voiceovers/audio/${voiceOver.file_voice}`)}
                        >
                          <i className={isPlaying ? "fas fa-pause" : "fas fa-play"}></i>
                        </Button>
                      </Col>
                      <Col>
                        <div id="waveform" style={{ width: "90%", marginTop:"-30px" }}></div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              )}
              <Link to="/depresi-daily-checklist">
                <Button
                  variant="light"
                  className="custom-button"
                  style={{
                    marginTop:"20px",
                    borderRadius: "50px",
                    fontWeight: "bold",
                    padding: '10px 15px',
                    fontSize: '12px'
                  }}
                >
              Let's Start a Daily Checklist!
                </Button>
              </Link>
            </Col>
            <Col md={5} className="d-flex align-items-center justify-content-center">
              <img src={depresiDetail} alt="Image" style={{ maxWidth: "100%", maxHeight: "100%" }} />
            </Col>
          </Row>
        </Container>

        <div className="container text-center">
        </div>
        <div className="container">
          <Row className="justify-content-center no-gutters">
            {terapi.map((terapi) => (
              <InterventionCard key={terapi.id} intervention={terapi} />
            ))}
          </Row>
        </div>
      </Container>
    </>
  );
};

const InterventionCard = ({ intervention }) => {
  const { image, link } = intervention;
  return (
    <Col xs={6} sm={4} md={2} className="mb-4" style={{ paddingLeft: "15px", paddingRight: "15px",  marginTop:"50px" }}>
      <Card style={{ width: '100%', margin: '0 auto' }}>
        <Card.Img variant="top" src={image} style={{ height: '230px', objectFit: 'cover', objectPosition: 'top' }} />
        <Link to={link} className="stretched-link"></Link>
      </Card>
    </Col>
  );
};

export default DepresiDetail;
