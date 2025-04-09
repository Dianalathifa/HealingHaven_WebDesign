import React, {useState, useEffect}from 'react';
import axios from 'axios';
import { Col, Button, Container, Row, Card,Alert } from 'react-bootstrap';
import { Link } from "react-router-dom/cjs/react-router-dom.min.js";
import Navbar from '../../landing/Navbar.js';
import Footer from '../../landing/Footer.js';
import stress from "../../images/intervensi/strees2.png"; // Import gambar
import "../../style/Intervensi.css";
import ringan1 from '../../images/stressCoping/stressringan1.png';
import ringan2 from '../../images/stressCoping/stressringan2.png';
import ringan3 from '../../images/stressCoping/stressringan3.png';
import ringan4 from '../../images/stressCoping/stressringan4.png';
import WaveSurfer from 'wavesurfer.js';
import '@fortawesome/fontawesome-free/css/all.min.css';

const StressDetail = () => {
  const stressCoping = [
    { id: 1, image: ringan1,  link: "/stress-coping-grateful" },
    { id: 2, image: ringan2,  link: "/stress-coping-nothing-2minutes" },
    { id: 4, image: ringan3,  link: "/coloring" },
    { id: 5, image: ringan4,  link: "/puzzle&game" }
  ];
  const [voiceOver, setVoiceOver] = useState(null);
    const [error, setError] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [waveSurfer, setWaveSurfer] = useState(null);

    useEffect(() => {
        fetchVoiceOverById(20); // Fetch voice-over with ID 2
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
                progressColor: '#FFD5DF',
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
    <Container style={{ marginTop: "140px", maxWidth: "900px" }}>
    <Container className="mt-5" style={{padding:"30px",backgroundColor:"#F5A5AD", borderRadius:"50px"}}>
      <Row className="justify-content-center" >
        <Col md={5}>
              <h6 style={{ fontSize: "18px", marginTop:"5px", fontWeight:"bold" }}>
                Intervensi Stress Ringan
                </h6>
              <h6 style={{ fontSize: "30px",  fontWeight:"bold", marginBottom:"20px" }}>
                Stress Coping Strategies 
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
                 <Link to="/stress-daily-checklist">
          <Button
            variant="light"
            className="custom-button" // Tambahkan kelas custom-button di sini
            style={{
              marginTop:"5px",
              borderRadius: "50px",
              backgroundColor:"#7F91D8",
              fontWeight: "bold",
              padding: '10px 15px', // Atur padding untuk mengatur ukuran tombol
              fontSize: '13px' // Atur ukuran font teks tombol
            }}
          >
          Start Daily Checklist
         </Button>
        </Link>
        </Col>
        <Col md={4} className="d-flex align-items-center justify-content-center">
          <img src={stress} alt="Image" style={{ maxWidth: "100%", maxHeight: "100%" }} />
        </Col>
      </Row>
    </Container>
    </Container>

      <div className="container"style={{marginTop:"35px",maxWidth: "900px"}}>
        <div className="row">
          {stressCoping.map((stressCoping) => (
            <InterventionCard key={stressCoping.id} intervention={stressCoping} />
          ))}
        </div>
      </div>
        
      </>
    );
};

const InterventionCard = ({ intervention }) => {
  const { image,  link } = intervention;
  return (
    <div className="col-md-3 mb-3 justify-content-center">
      <Card style={{ width: '15rem', margin:"10px",borderRadius:"15px"}}>
      <Card.Img variant="top" src={image} style={{ height: '210px' }} />
          <Link to={link} className="stretched-link"></Link>
      </Card>
    </div>
  );
};
export default StressDetail;
