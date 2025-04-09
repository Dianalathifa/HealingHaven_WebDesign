import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Button, Container, Row, Alert, Card } from 'react-bootstrap';
import { Link } from "react-router-dom/cjs/react-router-dom.min.js";
import Navbar from '../../landing/Navbar.js';
import Footer from '../../landing/Footer.js';
import cemas from "../../images/intervensi/cemas2.png"; // Import gambar
import "../../style/Intervensi.css";
import WaveSurfer from 'wavesurfer.js';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome

const Teknik54321 = () => {
    const [voiceOver, setVoiceOver] = useState(null);
    const [error, setError] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [waveSurfer, setWaveSurfer] = useState(null);

    useEffect(() => {
        fetchVoiceOverById(2); // Fetch voice-over with ID 2
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
                waveColor: 'violet',
                progressColor: 'purple',
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
            <Container style={{ marginTop: "30px", maxWidth: "1000px" }}>
                <Container className="mt-5" style={{ padding: "30px", backgroundColor: "#C5C0FC", borderRadius: "30px", marginBottom:"10px" }}>
                    <Row className="justify-content-center">
                        <Col md={5}>
                            <h6 style={{ fontSize: "18px", marginTop: "20px", fontWeight: "bold" }}>
                            Mild Anxiety Intervention
                            </h6>
                            <h6 style={{ fontSize: "30px", fontWeight: "bold", marginBottom:"20px" }}>
                                5-4-3-2-1 Method
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

                            <Link to="/groundingdetail-user">
                                <Button
                                    variant="light"
                                    className="custom-button"
                                    style={{
                                        marginTop: "20px",
                                        borderRadius: "50px",
                                        fontWeight: "bold",
                                        padding: '10px 15px',
                                        fontSize: '12px'
                                    }}
                                >
                                Let's Follow the Steps!
                                </Button>
                            </Link>
                        </Col>
                        <Col md={5} className="d-flex align-items-center justify-content-center">
                            <img src={cemas} alt="Image" style={{ maxWidth: "100%", maxHeight: "100%" }} />
                        </Col>
                    </Row>
                </Container>

                <Container className="my-5">
                    <Row style={{ marginTop: "40px", marginLeft: "5px", marginBottom:"10px" }}>
                        <Col md={4} style={{ backgroundColor: "#7F91D8", borderRadius: "20px", padding: "20px", marginLeft: "10px" }}>
                            <p style={{ fontSize: "13px", marginTop: "30px", paddingLeft: "20px" }}>
                            If you’re struggling to cope with your anxiety symptoms, you’re not alone.
Anxiety is one of the most common mental health issues today.
People experience different types of anxiety ranging from mild to extremely debilitating.
                            </p>
                        </Col>

                        <Col md={3} style={{ backgroundColor: "#BCE5EB", borderRadius: "20px", padding: "20px", marginLeft: "10px" }}>
                            <p style={{ fontSize: "13px", marginTop: "10px", marginLeft: "20px" }}>
                            Anxiety is associated with many different intense emotional states.
It’s hard to focus or feel in control when you’re experiencing waves of panic or overwhelming feelings of anxiety.
Often everything feels blurry.
                            </p>
                        </Col>

                        <Col md={4} style={{ backgroundColor: "#F5A5AD", borderRadius: "20px", paddingleft: "20px", marginLeft: "10px" }}>
                            <p style={{ fontSize: "13px", marginTop: "45px", paddingLeft: "20px" }}>
                            The good news is that there are many effective ways to reduce anxiety symptoms.
One very effective technique that you can use anytime, anywhere,
is grounding, which uses simple practices to activate your senses in a way that helps combat anxiety symptoms.<br /><br />
                            </p>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </>
    );
};

export default Teknik54321;
