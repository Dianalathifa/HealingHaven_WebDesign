import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Button, Container, Card, Row, Modal } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import Navbar from '../../landing/Navbar.js';
import Footer from '../../landing/Footer.js';
import breathing1 from '../../video/mindfulness-breathing1.mp4';
import bodyscan1 from '../../video/mindfulness-bodyscan1.mp4';
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import checklistImage from '../../images/checklist-stress.png';

const MBSR4 = () => {
  const [error, setError] = useState(null);
  const [experience, setExperience] = useState('');
  const [completedStatus, setCompletedStatus] = useState(Array(7).fill(false));
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [quote, setQuote] = useState('');
  const [notification, setNotification] = useState('');
  const [showCongratulationsModal, setShowCongratulationsModal] = useState(false);

  const history = useHistory();

  const quotes = [
    "Luar biasa! Setiap tarikan napas membawa ketenangan dalam tubuhmu.",
    "Hebat! Kamu telah menemukan kedamaian dalam setiap tarikan napas dan sensasi tubuhmu.",
    "Bagus sekali! Hari ini kamu telah merasakan kedamaian dalam setiap bagian tubuhmu.",
    "Keren! Mindful body scan membantu melepaskan beban pikiran dan tubuhmu.",
    "Setiap napas yang kamu ambil membawa kedamaian dalam dirimu.",
    "Teruslah berlatih mindful body scan dan breathing. Setiap napas adalah langkah menuju ketenangan.",
    "Kamu hebat! Hari ini kamu telah merasakan kedamaian dalam setiap tarikan napas dan sensasi tubuhmu."
  ];

  useEffect(() => {
    const fetchDailyStatuses = async () => {
      const idPartisipan = localStorage.getItem("partisipan_id");
      try {
        const response = await axios.get(`http://localhost:8080/api/mindfulness/daily-statuses/${idPartisipan}`);
        const dailyStatuses = response.data;

        const newCompletedStatus = [...completedStatus];
        dailyStatuses.forEach(status => {
          const day = parseInt(status.intervention_day);
          if (status.intervention_week === '4' && day >= 1 && day <= 7) {
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
        intervention_week: '4',
        intervention_day: day,
        is_completed: !completedStatus[day - 1]
      });

      console.log(response.data.message);
      const newCompletedStatus = [...completedStatus];
      newCompletedStatus[day - 1] = !completedStatus[day - 1];
      setCompletedStatus(newCompletedStatus);
      localStorage.setItem('completedStatusWeek4', JSON.stringify(newCompletedStatus));
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
        intervention_week: '4',
        experience: experience
      });
      console.log('Saved meditation experience:', experience);
      setError(null);
    } catch (error) {
      setError("Failed to save meditation experience");
    }
  };

  const handleRedirectToSRQTest = () => {
    history.push("/post-test");
  };

  return (
    <>
      <Navbar />
      <Container>
        <div className="container text-center" style={{ marginTop: "10px" }}>
          <h6 className="section-title mb-2" style={{ color: "#EBBCBC", fontWeight: "bold", fontSize: "35px" }}>
          <br />Welcome to Week Four!<br />Let's Learn About Mindfulness Breathing and Body Scan Practices<br /></h6>        </div>
        <Row className="justify-content-center">
          <Col md={5}>
            <Card className="about-us-card" style={{ backgroundColor: "#EBBCBC", marginTop: "50px", padding: "47px" }}>
              <Card.Body>
                <h5 style={{ fontSize: "18px", color: "white", fontWeight: "bold" }}>
                  <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: "10px", textAlign: "left" }} />
                  Mindfulness Breathing Practice:                  <br></br>
                </h5>
                <p style={{ fontSize: "14px", textAlign: "justify", }}>
                  <br></br>
                  1. &nbsp;Find a comfortable position, either sitting or lying down.<br></br>
2. &nbsp;Close your eyes or let your gaze gently look down.<br></br>
3. &nbsp;Focus your attention on the sensation of your breath. Feel the air coming in through your nose and out through your mouth or nose.<br></br>
4. &nbsp;Notice your belly rising and falling as you breathe.<br></br>
5. &nbsp;Your mind will wander, that's normal. Gently bring your attention back to your breath as you come to.<br />
6. &nbsp;Do this for 5-10 minutes or longer if comfortable.<br />
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={5}>
            <Card className="about-us-card" style={{ backgroundColor: "#EBBCBC", marginTop: "50px", padding: "5px" }}>
              <Card.Body>
                <h5 style={{ fontSize: "18px", color: "white", fontWeight: "bold" }}>
                  <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: "10px", textAlign: "left" }} />
                  Mindfulness Body Scan Practice:
                  <br></br>
                </h5>
                <p style={{ fontSize: "14px", textAlign: "justify" }}>
                  <br></br>
                  1. &nbsp;Same position as mindful breathing.<br></br>
2. &nbsp;Take a deep breath in and exhale slowly.<br></br>
3. &nbsp;Start focusing your attention on the top of your head. Feel any sensations there, such as warmth, tingling, or relaxation. There is no need to judge.<br></br>
4. &nbsp;Slowly scan your attention across your body, area by area. Neck, shoulders, arms, chest, back, and so on down to your toes.<br></br>
5. &nbsp;When you find an area of ​​tension, try to imagine your breath flowing there and softening the tension.<br />
6. &nbsp;Continue scanning until your entire body is covered.<br />
7. &nbsp;When you are finished, take a moment to feel your entire body.<br />
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <section className="section before-content" style={{ color: "#141313", marginTop: "5px", paddingTop: "10px", paddingBottom: "100px" }}>
        <Container>
          <h6 className="mb-4 tfonts-2 text-center" style={{ color: "white" }}>Mindfulness Body Scan & Breathing Exercise </h6>
          <Row style={{ marginLeft: "5px" }}>
            <Col md={5} className="d-flex align-items-center justify-content-center" style={{ marginLeft: "100px" }}>
              <video src={breathing1} controls style={{ width: "100%", height: "auto", maxWidth: "600px", maxHeight: "100%", marginBottom: "60px" }} />
            </Col>
            <Col md={5} className="d-flex align-items-center justify-content-center">
              <video src={bodyscan1} controls style={{ width: "100%", height: "auto", maxWidth: "600px", maxHeight: "100%", marginBottom: "60px" }} />
            </Col>
          </Row>
          <section className="section before-content" style={{ color: "#141313", marginTop: "5px", paddingTop:"30px"}}>          

          <Row className="justify-content-center">
          <h6 className="mb-4 text-center">Complete the intervention and fill out the following checklist!</h6>

            <Col md={3}>
              <h6 className="mb-4" style={{ marginLeft: "50px", marginTop: "30px" }}>
"Come on, let's practice now! Follow this intervention for 7 days. Every day, practice Mindfulness and check your experience on the daily checklist below!"              </h6><div className="text-center mb-3">
              
                <img src={checklistImage} alt="Checklist Mindfulness" style={{ maxWidth: "70%", height: "auto" }} />
              </div>
            </Col>
            <Col md={5} style={{marginTop:"100px"}}>
              <Container className="mt-5">
                {[...Array(7)].map((_, index) => (
                  <Button
                    key={index + 1}
                    variant="outline-light"
                    className="mb-3 mx-2"
                    onClick={() => handleSaveDailyStatus(index + 1)}
                    disabled={completedStatus[index]}
                    style={{ marginTop: "15px", outlineColor: "black", backgroundColor: "#EBBCBC" }}
                  >
                    {`Day ${index + 1}`}
                  </Button>
                ))}
              </Container>

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
              {notification && <p className="mt-3">{notification}</p>}

              <Modal show={showQuoteModal} onHide={() => setShowQuoteModal(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>Motivasi untukmu hari ini</Modal.Title>
                </Modal.Header>
                <Modal.Body>{quote}</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setShowQuoteModal(false)}>
                    Tutup
                  </Button>
                </Modal.Footer>
              </Modal>

              <Modal show={showCongratulationsModal} onHide={() => setShowCongratulationsModal(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>Congratulations!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                Thank you for joining MentalWell’s anxiety intervention by learning MBSR! You have shown incredible commitment. May this mindfulness practice bring more calm and well-being into your life.
Remember, every moment of mindfulness you practice is an important step towards reducing anxiety.
Keep practicing and trust that you have the strength to face any challenge. We at MentalWell are always supporting you on your journey to well-being.
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setShowCongratulationsModal(false)}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleRedirectToSRQTest}>
                  Proceed to SRQ Test
                  </Button>
                </Modal.Footer>
              </Modal>
            </Col>
          </Row>
          </section>

        </Container>
      </section>
    </>
  );
};

export default MBSR4;