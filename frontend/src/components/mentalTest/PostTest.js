import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button, Col, Row, Card } from 'react-bootstrap';
import Navbar from '../landing/Navbar';
import Footer from '../landing/Footer';
import { useHistory } from 'react-router-dom';
import "../style/Intervensi.css";


const PostTestSRQPage = () => {
  const [questions] = useState([
    "Do you often have headaches?",
"Have you lost your appetite?",
"Do you sleep poorly?",
"Do you get scared easily?",
"Do you feel anxious, tense, or worried?",
"Do your hands shake?",
"Do you have digestive problems?",
"Do you find it difficult to think clearly?",
"Do you feel unhappy?",
"Do you cry more often?",
"Do you find it difficult to enjoy everyday activities?",
"Do you find it difficult to make decisions?",
"Are your daily tasks neglected?",
"Do you feel unable to function in life?",
"Have you lost interest in many things?",
"Do you feel worthless?",
"Do you have thoughts of ending your life?",
"Do you feel tired all the time?",
"Do you have a feeling of stomach ache?",
"Do you get tired easily?"
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

      await axios.post('http://localhost:8080/save-answer', {
        id_partisipan: idPartisipan,
        jawaban: answers
      });
      console.log('Answer successfully sent:', answers);

      history.push('/hasil-post-test');
    } catch (error) {
      console.error('Error submitting answers:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
     
      <section id="psikolog-list" className="section before-content" style={{ color: "#25B7D3",  marginTop: "110px" }}>
        <Col md={20} className="d-flex align-items-center justify-content-center">
          <div className="container text-center">
            <h6 className="section-title mb-2 tfonts">Post-Test SRQ</h6>
          </div>
        </Col>
        <Col md={10}>
                  <Card className="about-us-card" style={{ backgroundColor: "#FFD2DD"}}>
                    <Card.Body>
                    <h5 style={{ fontSize: "20px", color:"#25B7D3", fontWeight:"bold" }}>Test Instructions:<br></br></h5>
                      <p style={{ fontSize: "16px" }}>
                        <br></br>1. Method: self-filled (confidential).
                        <br></br>2. Answer all the questions based on your current condition or what you have experienced in the last 30 days.
                        <br></br>3. Each answered question will receive a score.
                        <br></br>4. The more accurately it reflects your experience, the more accurate and correct the test result will be.
                        <br></br>5. Make sure all questions have been answered, and only then click View Test Results to obtain the results.
                        <br/>&nbsp;&nbsp;&nbsp;&nbsp;Good luck!
                      </p>

                    </Card.Body>
                  </Card>
                </Col>
      </section>
      <br />
      <Container style={{marginLeft:"200px"}}>
        {questions.map((question, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <p style={{ fontSize: '18px' }}>{index + 1}. {question}</p>
            <div>
              <br />
              <Button
                variant={answers[index] === 1 ? 'primary' : 'outline-primary'}
                onClick={() => handleAnswer(index, 1)}
                disabled={isSubmitting}
                style={{ marginLeft: '26px', width: '150px', borderRadius: '20px' }}
              >
                YES
              </Button>
              <Button
                variant={answers[index] === 0 ? 'danger' : 'outline-danger'}
                onClick={() => handleAnswer(index, 0)}
                disabled={isSubmitting}
                style={{ marginLeft: '10px', width: '150px', borderRadius: '20px' }}
              >
                NO
              </Button>
            </div>
          </div>
        ))}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button
            variant="light"
            className="custom-button"
            style={{
              borderRadius: "50px",
              fontWeight: "bold",
              padding: '15px 25px',
              fontSize: '17px',
              marginRight:'200px'
            }}
            onClick={handleSubmit}
            disabled={isSubmitting}>
            {isSubmitting ? 'Saving Answers...' : 'Submit Answer'}
          </Button>
        </div>
      </Container>
      <br /><br /><br />
      <Footer />
    </>
  );
};

export default PostTestSRQPage;
