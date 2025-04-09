import React, { useState, useEffect } from 'react';
import { Col, Button, Container, Row, Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navbar from '../../landing/Navbar.js';
import Footer from '../../landing/Footer.js';
import depresiDetail from "../../images/activityTerapi/depresi-detail.png"; // Import gambar
import WaveSurfer from 'wavesurfer.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import CBT1 from '../../images/CBT/CBT1.png';
import CBT2 from '../../images/CBT/CBT2.png';
import CBT3 from '../../images/CBT/CBT3.png';
import "../../style/Intervensi.css";
import axios from 'axios';

const CBT = () => {
  const [sessions, setSessions] = useState([]);
  const [voiceOver, setVoiceOver] = useState(null);
    const [error, setError] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [waveSurfer, setWaveSurfer] = useState(null);

    useEffect(() => {
        fetchVoiceOverById(18); // Fetch voice-over with ID 2
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
                waveColor: '#F5A5AD',
                progressColor: '#F5A5AD80',
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

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await axios.get("http://localhost:8080/cbt-sessions");
      setSessions(response.data);
    } catch (error) {
      setError("Error fetching session data. Please try again later.");
      console.error("Error fetching session data:", error);
    }
  };

  const CBTSections = [
    { id: 1, image: CBT1, link: "/cbt-pikiran" },
    { id: 2, image: CBT2, link: "/cbt-perasaan" },
    { id: 3, image: CBT3, link: "/cbt-percaya-diri" },
  ];

  return (
    <>
      <Navbar />
      <Container style={{ marginTop: "10px", maxWidth: "900px"}}>
        <Container className="mt-5" style={{ padding: "30px", backgroundColor: "#F5A5AD80", borderRadius: "30px" }}>
          <Row className="justify-content-center">
            <Col md={7}>
              <h6 style={{ fontSize: "18px", marginTop: "30px", fontWeight: "bold" }}>
              Moderate Depression Intervention              </h6>
              <h6 style={{ fontSize: "25px", fontWeight: "bold", marginBottom:"30px" }}>
                CBT (Cognitive Behavior Therapy)
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
            <Col md={4} className="d-flex align-items-center justify-content-center" >
              <img src={depresiDetail} alt="Image" style={{ maxWidth: "100%", maxHeight: "100%" }} />
            </Col>
          </Row>
        </Container>
      </Container>
      
      <div className="container content-center">
        <div className="row">
          {CBTSections.map((CBT) => (
            <InterventionCard key={CBT.id} intervention={CBT} />
          ))}
        </div>
      </div>
    </>
  );
};

const InterventionCard = ({ intervention }) => {
  const { image, link } = intervention;
  return (
    <div style={{ marginTop: '30px', marginLeft: '150px' }}>
      <Card style={{ width: '15rem' }}>
        <Card.Img 
          variant="top" 
          src={image} 
          style={{ height: '250px', objectFit: 'cover', objectPosition: 'center' }} 
        />
        <Link to={link} className="stretched-link"></Link>
      </Card>
    </div>
  );
};


export default CBT;
