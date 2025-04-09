import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button, Col, Modal, Card, Row } from 'react-bootstrap';
import Navbar from '../landing/Navbar';
import Footer from '../landing/Footer';
import { useHistory } from 'react-router-dom';
import { Element, scroller } from 'react-scroll';
import "../style/Intervensi.css";

const KuisionerPage = () => {
  const questions = [
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
  ];

  const [answers, setAnswers] = useState(new Array(questions.length).fill(null));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [idPartisipan, setIdPartisipan] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const partisipanId = localStorage.getItem('partisipan_id');
    setIdPartisipan(partisipanId);
  }, []);

  const handleAnswer = (index, answer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = answer;
    setAnswers(updatedAnswers);

    const nextSection = Math.floor((index + 1) / 10) * 10 + 1;
    if ((index + 1) % 10 === 0 && nextSection < questions.length) {
      scrollToSection(`section-${nextSection}`);
    }
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

      await axios.post('http://localhost:8080/api/jawaban-srq', {
        id_partisipan: idPartisipan,
        jawaban: answers
      });
      console.log('Answer successfully sent:', answers);
      setShowModal(true);
    } catch (error) {
      console.error('Error submitting answers:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRunPython = async () => {
    try {
      setIsSubmitting(true);

      await axios.post('https://algoritma.mentalwell.id/start_analysis_api');
      console.log('Klasifikasi di Python berhasil dimulai');
      history.push('/hasil-klasifikasi-srq');
    } catch (error) {
      console.error('Error running Python classification:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => setShowModal(false);

  const scrollToSection = (section) => {
    scroller.scrollTo(section, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart'
    });
  };

  const renderQuestions = () => (
    <Element name="question-section">
      {questions.map((question, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <p style={{ fontSize: '20px' }}>{index + 1}. {question}</p>
          <div>
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
    </Element>
  );

  return (
    <>
      <Navbar />
      <Container>
        <section id="psikolog-list" className="section" style={{ color: "#141313", marginTop: "10px" }}>
          <Col md={{ span: 10, offset: 1 }} className="d-flex align-items-center justify-content-center">
            <Container className="my-6">
              <Row className="justify-content-center">
                <div className="container text-center">
                  <h6 className="section-title mb-2 tfonts" style={{ color: "#25B7D3", marginBottom: "30px" }}>SRQ Test</h6>
                </div>
                <Col md={10}>
                  <Card className="about-us-card" style={{ backgroundColor: "#FFD2DD" }}>
                    <Card.Body>
                      <h5 style={{ fontSize: "20px", color: "#25B7D3", fontWeight: "bold" }}>Test Instructions :</h5>
                      <p style={{ fontSize: "16px" }}>
                      1. The method: self-filled (confidential).<br />
                      2. Answer all the questions according to what you have experienced or felt over the past 30 days.<br />
                      3. Each answer will be scored.<br />
                      4. The more accurately it reflects your experience, the more precise and correct the test results will be.<br />
                      5. Make sure all questions are answered, and only after all questions are completed, click "View Test Results" to obtain your test results.<br /><br /> 
                        Good luck!
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </Col>
        </section>
        {renderQuestions()}
        <Row className="justify-content-center">
          <Button
            variant="light"
            className="custom-button"
            style={{
              borderRadius: "50px",
              fontWeight: "bold",
              padding: '12px 20px',
              fontSize: '17px',
              marginTop: '20px',
              marginBottom: '20px'
            }}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            Submit Answer
          </Button>
        </Row>
      </Container>
      <Footer />

      {/* Modal untuk Jalankan Klasifikasi */}
      <Modal show={showModal} onHide={handleCloseModal} centered backdrop="static" keyboard={false} style={{ zIndex: 1050 }}>
        <Modal.Header closeButton>
          <Modal.Title>Klasifikasi Gangguan Kesehatan Mental</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Apakah kamu ingin mengetahui hasil klasifikasi gangguan kesehatan mental?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Tutup</Button>
          <Button variant="primary" onClick={handleRunPython} disabled={isSubmitting}>
            Ya, Saya ingin tahu
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default KuisionerPage;
