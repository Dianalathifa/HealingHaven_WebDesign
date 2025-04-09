import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button, Col, Card, Row } from 'react-bootstrap';
import Navbar from '../landing/Navbar';
import Footer from '../landing/Footer';
import { useHistory } from 'react-router-dom'; // Import useHistory
import "../style/Intervensi.css";


const KuisionerPage = () => {
  const [questions] = useState([
    "S-ex : male",
"A-ge : less than 19 years or more than 45 years",
"D-epression : MRS patients with depression or decreased concentration, sleep disturbance, eating disorders, and/or libido disorders",
"P-revious suicide : history of suicide attempts or psychiatric treatment",
"E-xcessive alcohol : alcohol dependence or drug use",
"R-ational thinking loss : loss of rational thinking : psychosis, organic brain syndrome",
"S-eparated : divorced or widowed",
"O-rganized plan : shows an organized suicide plan or serious intention",
"N-o social support : no support",
"S-ickness : suffering from chronic illness"
  ]);

  const [answers, setAnswers] = useState(new Array(questions.length).fill(null));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [idPartisipan, setIdPartisipan] = useState(null);
  const history = useHistory(); // Initialize useHistory

  useEffect(() => {
    // Ambil id_partisipan dari localStorage
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
      
      // Lakukan pengiriman data jawaban ke backend
      const response = await axios.post('http://localhost:8080/api/suicide/save', {
        id_partisipan: idPartisipan,
        jawaban: answers
      });
      history.push('/hasil-test-suicide');
      console.log('Response:', response.data);
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
            <h6 className="section-title mb-2 tfonts" style={{color:"#25B7D3", marginBottom:"20px"}}>Tes Suicide</h6>
          </div>
          <Col md={10}>
                        <Card className="about-us-card" style={{ backgroundColor: "#FFD2DD"}}>
                            <Card.Body>
                            <h5 style={{ fontSize: "20px", color:"#25B7D3", fontWeight: "bold" }}>Petunjuk Pengisian :</h5><br></br>
                            <p style={{ fontSize: "16px" }}>
                          1. It can be answered by an officer, family, friend, or the user who understands the questions listed in the questionnaire below.
                          <br />
                          2. Answer all the questions based on your current condition or what you are experiencing or feeling.
                          <br />
                          3. Each answered question will receive a score.
                          <br />
                          4. The results of the assessment will be used as a basis for determining intervention steps or further actions.
                          <br />&nbsp;&nbsp;&nbsp;&nbsp;Good luck!
                      </p>

                            </Card.Body>
                        </Card>
                    </Col>
                    </Row>
      </Container>
        </Col>
      </section>

      <Container>
      {questions.map((question, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <p style={{ fontSize: '20px' }}>{index + 1}. {question}</p>
          <div>
            <br />
            <Button
              variant={answers[index] === 1 ? 'primary' : 'outline-primary'}
              onClick={() => handleAnswer(index, 1)}
              disabled={isSubmitting}
              className="m-2" // Menggunakan kelas margin dari Bootstrap untuk margin yang konsisten
              style={{ width: '150px', borderRadius: '20px' }}
            >
              YES
            </Button>
            <Button
              variant={answers[index] === 0 ? 'danger' : 'outline-danger'}
              onClick={() => handleAnswer(index, 0)}
              disabled={isSubmitting}
              className="m-2" // Menggunakan kelas margin dari Bootstrap untuk margin yang konsisten
              style={{ width: '150px', borderRadius: '20px' }}
            >
              NO
            </Button>
          </div>
        </div>
      ))}
      <br />
      <Row className="justify-content-center" style={{ marginTop: '60px', marginBottom: "60px" }}>
        <Col xs="auto">
          <Button
            variant="light"
            className="custom-button" // Tambahkan kelas custom-button di sini
            style={{
              borderRadius: "50px",
              fontWeight: "bold",
              padding: '15px 25px', // Atur padding untuk mengatur ukuran tombol
              fontSize: '17px'
            }}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            Submit Answer
          </Button>
        </Col>
      </Row>
    </Container>

    <br/><br/>
    <Footer />
    </>
  );
};

export default KuisionerPage;
