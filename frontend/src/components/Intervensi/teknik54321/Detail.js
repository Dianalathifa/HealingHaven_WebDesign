import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import MotivationalModal from '../MotivationModal';
import Navbar from "../../landing/Navbar.js";
import { Toast, ToastContainer, Card, Button, Col, Row, Container, CardBody, Image } from 'react-bootstrap';
import checklistImage from '../../images/checklist-cemas.png'; // Adjust the path as needed
import { useInView } from 'react-intersection-observer';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../../style/Intervensi.css';

const getYouTubeVideoID = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|youtu.be\?v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

const quotes = [
"That's great! The small steps you took today helped calm your mind and bring you closer to true peace. Keep going, you're making a big difference.",
"Amazing! Every time you practice this technique, you gain more control over your anxiety. Remember, every day is an opportunity to feel better and you're on the right track.",
"That's great! Every practice brings you closer to peace. Believe in yourself, you have the power to overcome this.",
"You're doing great! Dealing with anxiety takes courage, and you're doing great. Keep up the fight, you deserve peace.",
"Keep going! Every day you get better with the small steps you take. Never underestimate the progress you've made.",
"Keep going! Your anxiety doesn't define you. You're stronger than you think and every day is proof of your strength.",
"Awesome! Every check mark is a step towards inner peace. Keep up the good work, you're creating a calmer future.",
"You're strong! This anxiety is temporary and you have the power to overcome it. Every day is a new opportunity to feel better.",
"Fantastic! You are making real progress today. Every small step towards sobriety is a victory worth celebrating.",
"Cheer up! Your sobriety is getting closer with every effort you make. Never underestimate the power of small steps you take.",
"Have faith! You are mastering today so well. Every day is an opportunity to be better and you are on the right track.",
"Super! Your anxiety is decreasing with every step you take. Keep it up, you are making positive changes in your life.",
"Keep it up! Every day is a new opportunity to feel better. Believe in yourself, you have the ability to overcome this.",
"Great! You are stronger than your anxiety. Each check mark is a testament to your strength and courage to face and overcome anxiety.",
];

const getRandomQuote = () => {
    return quotes[Math.floor(Math.random() * quotes.length)];
};

const Checklist = ({ partisipanId, handleCheck, checklist }) => {
    return (
        <Card className="text-center" style={{ backgroundColor: "#C5C0FC", marginTop: "20px" }}>
            <Card.Body>
                <Card.Title className="mb-3 tfonts-2" style={{ color: "white" }}>Daily Checklist</Card.Title>
                <CardBody>
                <p style={{color:"white", fontWeight:"bold"}}>
                    Selesaikan intervensi dan checklist ketika kamu sudah melakukannya!
                </p>
                </CardBody>
                {Array.from({ length: 14 }, (_, i) => i + 1).map((day) => (
                    <Button
                        key={day}
                        variant="outline-light"
                        className="mb-3 mx-2"
                        onClick={() => handleCheck(day)}
                        disabled={checklist.some(item => item.hari >= day)}
                        style={{ marginTop: "15px", outlineColor: "white", backgroundColor: "#7F91D8" }}
                    >
                        Day {day} Checklist
                    </Button>
                ))}
            </Card.Body>
        </Card>
    );
};

const Teknik54321 = () => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const [checklist, setChecklist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [partisipanId, setPartisipanId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [quote, setQuote] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [isDay14, setIsDay14] = useState(false);

    useEffect(() => {
        const id = localStorage.getItem('partisipan_id');
        if (id) {
            setPartisipanId(id);
            fetchChecklist(id);
        } else {
            setError('Participant ID not found');
            setLoading(false);
        }
    }, []);

    const fetchChecklist = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/cemas/checklist`, {
                params: { id_partisipan: id }
            });
            setChecklist(response.data);
        } catch (error) {
            setError('Error fetching checklist');
        } finally {
            setLoading(false);
        }
    };

    const handleCheck = async (day) => {
        try {
            await axios.post(`http://localhost:8080/cemas/checklist/check-day`, {
                id_partisipan: partisipanId,
                hari: day,
                status: 'true'
            });
            fetchChecklist(partisipanId);
            setQuote(getRandomQuote());
            setIsDay14(day === 14);
            setShowModal(true);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setToastMessage("Sorry, today you have done the daily checklist for recording the daily progress of the intervention. Come back tomorrow.");
                setShowToast(true);
            } else {
                setError('Error updating checklist');
            }
        }
    };

    const handleClose = () => setShowModal(false);

    const videoId = getYouTubeVideoID("https://youtu.be/_8WwqwzGoTo?si=YUQR5kzvF13b8heX");
    const videoUrl = `https://www.youtube.com/embed/${videoId}`;

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            <Navbar />
            <Container>
                <div className="container text-center" style={{ marginTop: "150px" }}>
                    <h6 className="section-title mb-2 tfonts-2" style={{ borderColor: "#FFD2DD", color: "#25B7D3", fontWeight: "bold" }}>
                    Let's Start Grounding 5-4-3-2-1 <br />to Overcome Anxiety<br />
                    </h6>
                </div>
                <br />
                <Col md={16} className="d-flex align-items-center justify-content">
                    <div className="container text-center">
                        <div ref={ref}>
                            {inView && (
                                <iframe
                                    
                                    src={videoUrl}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    title="Teknik Grounding 54321"
                                    style={{ width: "700px", height: "400px", maxWidth: "100%", maxHeight: "100%"  }}
                                />
                            )}
                        </div>
                        <br /><br /><br />
                    </div>
                </Col>
            </Container>
            <Container className="my-6">
                <Row className="justify-content-center">
                    <Col md={5} className="d-flex justify-content-center align-items-center">
                        <div>
                            <p>
                            "Come on, let's practice together now! Follow this intervention for 14 days. 
                            Every day, practice the '5-4-3-2-1' technique and check your experience on the daily checklist beside!"                            </p>
                            <Image src={checklistImage} alt="Intervensi Cemas" className="img-fluid" style={{ maxWidth: '250px' }} />
                        </div>
                    </Col>
                    <Col md={7}>
                        <Checklist
                            partisipanId={partisipanId}
                            handleCheck={handleCheck}
                            checklist={checklist}
                        />
                    </Col>
                </Row>
            </Container>
            <MotivationalModal show={showModal} handleClose={handleClose} quote={quote} isDay14={isDay14} />
            <ToastContainer position="top-end" className="p-3">
                <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
                    <Toast.Body>{toastMessage}</Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    );
};

export default Teknik54321;
