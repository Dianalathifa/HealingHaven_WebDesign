import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button, Col, Card, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Navbar from '../landing/Navbar';
import Footer from '../landing/Footer';
import "../style/Intervensi.css";

const KuisionerPage = () => {
  const [questions] = useState([
   "Are you unable to see the positive in events?",
"Do you feel like you can't do anything anymore?",
"Are you pessimistic about things that will happen?",
"Do you feel sad and depressed easily?",
"Do you feel like you've lost interest in many things (e.g. eating, walking, socializing)?",
"Do you feel like you're worthless?",
"Do you feel like life is worthless?",
"Do you feel like you can't enjoy the things you used to do?",
"Do you feel hopeless and hopeless?",
"Do you have difficulty getting enthusiastic about many things?",
"Do you feel worthless?",
"Do you feel like there's no hope for the future",
"Do you feel like your life is meaningless?",
"Do you have difficulty taking the initiative to do things?"
  ]);

  const [answers, setAnswers] = useState(new Array(questions.length).fill(null));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [idPartisipan, setIdPartisipan] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const partisipanId = localStorage.getItem('partisipan_id');
    setIdPartisipan(partisipanId);
  }, []);

  const handleAnswer = (index, answer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = answer;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async () => {
    const isAllAnswered = answers.every(answer => answer !== null);

    if (!isAllAnswered) {
      alert('There are still blank answers. Please fill in all answers before submitting!');
      return;
    }

    const confirmSubmit = window.confirm('Are you sure you want to submit an answer?');

    if (!confirmSubmit) {
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await axios.post('http://localhost:8080/api/dass-stress', {
        id_partisipan: idPartisipan,
        jawaban: answers
      });

      console.log('Response:', response.data);

      history.push('/hasil-klasifikasi-dass-stress');
    } catch (error) {
      console.error('Error submitting answers:', error.response.data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <section id="psikolog-list" className="section before-content" style={{ color: "#141313", paddingTop: "10px" }}>
        <Col md={16} className="d-flex align-items-center justify-content-center">
        <Container className="my-6">
        <Row className="justify-content-center">
          <div className="container text-center">
            <h6 className="section-title mb-2 tfonts" style={{color:"#25B7D3", marginBottom:"20px"}}>DASS-42 Stress</h6>
          </div>
          <Col md={10}>
                        <Card className="about-us-card" style={{ backgroundColor: "#FFD2DD"}}>
                            <Card.Body>
                            <h5 style={{ fontSize: "20px", color:"#25B7D3", fontWeight:"bold" }}>Test Instructions :<br></br></h5>
                            <p style={{ fontSize: "16px" }}><br></br>1. Method: self-filled (confidential).<br></br>
                            2. Answer all the questions according to what you have experienced or felt over the last 7 days.
                            <br></br>3. Each question has a response scale from 0 to 3.
                            <br></br>4. Choose the answer that best matches your condition over the past 7 days.
                            <br></br>5. After completing all the questions, click "View Test Results" to see your results.
                            <br></br>&nbsp;&nbsp;&nbsp;&nbsp;Good luck!
                            </p>

                            </Card.Body>
                        </Card>
                    </Col>
                    </Row>
      </Container>
        </Col>
      </section>

      <Container fluid className="py-5">
        <Container>
          {questions.map((question, index) => (
            <Row key={index} className="mb-3">
              <Col md={12}>
                <h5 style={{ fontSize: '18px' }}>{index + 1}. {question}</h5>
              </Col>
              <Col md={12} className="d-flex flex-wrap mt-3">
                <Button
                  variant={answers[index] === 0 ? 'primary' : 'outline-primary'}
                  onClick={() => handleAnswer(index, 0)}
                  disabled={isSubmitting}
                  className="mb-2 mr-2"
                  style={{ minWidth: '120px', borderRadius:"20px" }}
                >
                  Not suitable
                </Button>
                <Button
                  variant={answers[index] === 1 ? 'primary' : 'outline-primary'}
                  onClick={() => handleAnswer(index, 1)}
                  disabled={isSubmitting}
                  className="mb-2 mr-2"
                  style={{ minWidth: '120px', borderRadius:"20px" }}
                >
                  Sometimes
                </Button>
                <Button
                  variant={answers[index] === 2 ? 'primary' : 'outline-primary'}
                  onClick={() => handleAnswer(index, 2)}
                  disabled={isSubmitting}
                  className="mb-2 mr-2"
                  style={{ minWidth: '120px', borderRadius:"20px" }}
                >
                  Quite Often
                </Button>
                <Button
                  variant={answers[index] === 3 ? 'primary' : 'outline-primary'}
                  onClick={() => handleAnswer(index, 3)}
                  disabled={isSubmitting}
                  className="mb-2"
                  style={{ minWidth: '120px', borderRadius:"20px" }}
                >
                  Very Suitable
                </Button>
              </Col>
            </Row>
          ))}
          <Row className="justify-content-center mt-4">
            <Button
              variant="light"
              className="custom-button"
              style={{
                borderRadius: "50px",
                fontWeight: "bold",
                padding: '15px 30px',
                fontSize: '17px'
              }}
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              Submit Answer
            </Button>
          </Row>
        </Container>
      </Container>

      <Footer />
    </>
  );
};

export default KuisionerPage;
