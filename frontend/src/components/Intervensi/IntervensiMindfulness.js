import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Col, Button, Row, Alert, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navbar from '../landing/Navbar.js';
import mindfulness1 from '../images/intervensi/mindfulness1.png';
import mindfulness2 from '../images/intervensi/mindfulness2.png';
import mindfulness3 from '../images/intervensi/mindfulness3.png';
import mindfulness4 from '../images/intervensi/mindfulness4.png';
import cemas from "../images/intervensi/cemas2.png"; // Import gambar
import Footer from '../landing/Footer.js';
import "../style/Intervensi.css";
import WaveSurfer from 'wavesurfer.js';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome

const Mindfulness = () => {
  const interventions = [
    { id: 1, image: mindfulness1,  link: "/intro-mbsr" },
    { id: 2, image: mindfulness2, link: "/mindfulness-exercise" },
    { id: 3, image: mindfulness3, link: "/body-scan-breathing" },
    { id: 4, image: mindfulness4, link: "/mbsr-implementation" }
  ];

  const [voiceOver, setVoiceOver] = useState(null);
    const [error, setError] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [waveSurfer, setWaveSurfer] = useState(null);

    useEffect(() => {
        fetchVoiceOverById(19); // Fetch voice-over with ID 2
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
                waveColor: '#C6BCCA',
                progressColor: '#DFE1E6',
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
      <Container style={{ marginTop: "130px", maxWidth: "900px" }}>
                <Container className="mt-5" style={{ padding: "40px", backgroundColor: "#C6BCCA", borderRadius: "30px", marginBottom:"5px" }}>
                    <Row className="justify-content-center">
                        <Col md={6}>
                            <h6 style={{ fontSize: "18px", marginTop: "20px", fontWeight: "bold" }}>
                                Intervensi Cemas Sedang
                            </h6>
                            <h6 style={{ fontSize: "30px", fontWeight: "bold", marginBottom:"20px" }}>
                            Mindfulness-Based Stress Reduction.
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

                        </Col>
                        <Col md={5} className="d-flex align-items-center justify-content-center">
                            <img src={cemas} alt="Image" style={{ maxWidth: "100%", maxHeight: "100%" }} />
                        </Col>
                    </Row>
                </Container>
     
      <div className="container">
        <div className="row">
          {interventions.map((intervention) => (
            <InterventionCard key={intervention.id} intervention={intervention} />
          ))}
        </div>
      </div>
      </Container>
    </>
  );
};

const InterventionCard = ({ intervention }) => {
  const { image, text, link } = intervention;
  return (
    <div className="col-md-3 mb-3 justify-content-center">
      <Card style={{ width: '17rem', margin:"15px",borderRadius:"15px"}}>
        <Card.Img variant="top" src={image} style={{ height: '250px' }} />
          <Link to={link} className="stretched-link"></Link>
      </Card>
    </div>
  );
};

export default Mindfulness;
