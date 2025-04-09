import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Button, Container, Card, Row, Modal } from 'react-bootstrap';
import walking from '../../video/mindfulness-walking.mp4'; 
import Navbar from '../../landing/Navbar.js';
import Footer from '../../landing/Footer.js';
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import checklistImage from '../../images/checklist-stress.png';
import '../../style/Intervensi.css'; 

const MBSR = () => {
  const [error, setError] = useState(null);
  const [experience, setExperience] = useState('');
  const [completedStatus, setCompletedStatus] = useState(Array(7).fill(false));
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [quote, setQuote] = useState('');
  const [notification, setNotification] = useState('');

  const quotes = [
    "Luar biasa! Setiap momen meditasi membawa ketenangan dalam pikiranmu.",
    "Hebat! Hari ini kamu telah meluangkan waktu untuk dirimu sendiri. Teruskan!",
    "Setiap napas yang kamu ambil adalah langkah menuju kedamaian batin.",
    "Keren! Meditasi hari ini membantu mengurangi beban kecemasanmu.",
    "Kamu luar biasa! Setiap meditasi memperkuat pikiran dan hatimu.",
    "Teruslah bermeditasi, setiap sesi membawa kedamaian lebih dekat.",
    "Hari ini kamu telah menemukan ketenangan dalam keheningan. Teruskan perjalanan ini!"
  ];

  useEffect(() => {
    const fetchDailyStatuses = async () => {
      const idPartisipan = localStorage.getItem("partisipan_id");
      try {
        const response = await axios.get(`http://localhost:8080/api/mindfulness/daily-statuses/${idPartisipan}`);
        const dailyStatuses = response.data;

        // Update completedStatus based on fetched data
        const newCompletedStatus = [...completedStatus];
        dailyStatuses.forEach(status => {
          const day = parseInt(status.intervention_day);
          if (status.intervention_week === '2' && day >= 1 && day <= 7) {
            newCompletedStatus[day - 1] = true;
          }
        });

        setCompletedStatus(newCompletedStatus);
      } catch (error) {
        console.error('Failed to fetch daily statuses:', error);
      }
    };

    fetchDailyStatuses();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  };

  const handleSaveDailyStatus = async (day) => {
    const idPartisipan = localStorage.getItem("partisipan_id");

    try {
      const response = await axios.post('http://localhost:8080/api/mindfulness/save-daily-status', {
        id_partisipan: idPartisipan,
        intervention_category: 'mindfulness',
        intervention_week: '2',
        intervention_day: day,
        is_completed: !completedStatus[day - 1]
      });

      console.log(response.data.message);
      const newCompletedStatus = [...completedStatus];
      newCompletedStatus[day - 1] = !completedStatus[day - 1];
      setCompletedStatus(newCompletedStatus);
      localStorage.setItem('completedStatusWeek2', JSON.stringify(newCompletedStatus));
      setError(null);

      setQuote(getRandomQuote());
      setShowQuoteModal(true);

    } catch (error) {
      console.error('Error saving daily status:', error);
      setError("Gagal menyimpan status harian");
      if (error.response && error.response.data && error.response.data.messages && error.response.data.messages.error) {
        setNotification(error.response.data.messages.error);
      } else {
        setNotification("An error occurred while saving daily status");
      }
    }
  };

  const handleSaveMeditationExperience = async () => {
    const idPartisipan = localStorage.getItem("partisipan_id");
    try {
      await axios.post('http://localhost:8080/api/mindfulness/save-meditation-experience', {
        id_partisipan: idPartisipan,
        intervention_week: '2',
        experience: experience
      });
      console.log('Saved meditation experience:', experience);
      setError(null);
    } catch (error) {
      setError("Failed to save meditation experience");
    }
  };

  return (
    <>
      <Navbar />
      <Container>
        <div className="container text-center" style={{ marginTop: "10px" }}>
          <h6 className="section-title mb-2" style={{ color: "#EBBCBC", fontWeight: "bold", fontSize: "35px" }}>
            <br />Welcome to the second week !<br />Let's Practice Mindfulness Walking<br />
          </h6>
        </div>
        <Row className="justify-content-center">
          <Col md={10}>
            <Card className="about-us-card" style={{ backgroundColor: "#EBBCBC", marginTop: "50px" }}>
              <Card.Body>
                <h5 style={{ fontSize: "20px", color: "white", fontWeight: "bold" }}>
                  <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: "10px", textAlign: "left" }} />
                  Latihan Mindful Walking:
                  <br></br>
                </h5>
                <p style={{ fontSize: "16px" }}>
                  <br></br>
                  1. &nbsp;Choose a quiet and safe place to walk.<br></br>
2. &nbsp;Walk slowly and pay attention to each step you take.<br></br>
3. &nbsp;Feel the sensation of your feet touching the ground.<br></br>
4. &nbsp;Pay attention to the movement of your body as you walk.<br></br>
5. &nbsp;If your mind wanders, bring your attention back to your footsteps.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <section className="section before-content" style={{ color: "#141313", marginTop: "5px", paddingTop: "10px", paddingBottom: "100px" }}>
        <Container>
          <h6 className="mb-4 tfonts-2 text-center" style={{ color: "white" }}>Mindfulness Walking Exercise</h6>
          <Row>
            <Col md={5} className="d-flex align-items-center justify-content-center" style={{ marginLeft: "130px", marginTop:"50px" }}>
              <div className="text-center">
                <video src={walking} controls style={{ width: "100%", height: "auto" }} />
              </div>
            </Col>
            <Col md={5}>
              <h6 className="mb-4" style={{ marginLeft: "50px", marginTop: "50px" }}>
"Come on, let's practice now! Follow this intervention for 7 days. Every day, practice Mindfulness and check your experience on the daily checklist below!"              </h6>

              <Container className="mt-5">
                <Row className="align-items-center">
                  <Col md={5} className="d-flex justify-content-center">
                    <img src={checklistImage} alt="Intervensi Cemas" className="img-fluid" style={{ maxWidth: '250px' }} />
                  </Col>
                  <Col md={7} className="d-flex flex-column align-items-start">
                    <div className="mt-3">
                      {[...Array(7)].map((_, index) => (
                        <Button
                          key={index + 1}
                          variant="outline-light"
                          className="mb-3"
                          onClick={() => handleSaveDailyStatus(index + 1)}
                          disabled={completedStatus[index]}
                          style={{ marginTop: "15px", outlineColor: "black", backgroundColor: "#EBBCBC" }}
                        >
                          {`Day ${index + 1}`}
                        </Button>
                      ))}
                    </div>
                    {completedStatus[6] && (
                      <>
                        <br />
                        <Card>
                          <Card.Body>
                            <form>
                              <div className="form-group">
                                <label>Write your meditation experience for 1 week:</label>
                                <textarea className="form-control" rows="3" value={experience} onChange={(e) => setExperience(e.target.value)} />
                              </div>
                              <Button variant="primary" onClick={handleSaveMeditationExperience}>Save Experience</Button>
                            </form>
                          </Card.Body>
                        </Card>
                      </>
                    )}
                    {error && <p className="mt-3 text-danger">{error}</p>}
                    {notification && <p className="mt-3" style={{ color: "#4A4A4A" }}>{notification}</p>}
                  </Col>
                </Row>
              </Container>
              <Modal show={showQuoteModal} backdrop={true} backdropClassName="backdrop-modal" style={{ zIndex: 1050 }}>
                <Modal.Header closeButton>
                  <Modal.Title>Daily Quotes</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p>{quote}</p>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setShowQuoteModal(false)}>Close</Button>
                </Modal.Footer>
              </Modal>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default MBSR;
