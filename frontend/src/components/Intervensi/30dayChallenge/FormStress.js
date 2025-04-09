import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form, Modal, Container, Card } from 'react-bootstrap';
import Navbar from '../../landing/Navbar.js';

const FormPage = () => {
  const [intervention, setIntervention] = useState({});
  const [userAnswer, setUserAnswer] = useState('');
  const [submittedDate, setSubmittedDate] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [quote, setQuote] = useState('');
  const [specialQuote, setSpecialQuote] = useState('');
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  useEffect(() => {
    fetchIntervention();
  }, [id]);

  useEffect(() => {
    if (isAnswerSubmitted) {
      if (intervention.id_intervensi === '30') {
        fetchSpecialQuote();
        setShowModal(true); // Show modal immediately when day 30 is submitted
      } else {
        setQuote(getRandomQuote());
        setShowQuoteModal(true); // Show quote modal
      }
    }
  }, [isAnswerSubmitted]);

  const fetchIntervention = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/intervensi/${id}`);
      if (response.ok) {
        const data = await response.json();
        setIntervention(data);
        displaySubmittedAnswer();
      } else {
        console.error('Failed to load intervention data');
      }
    } catch (error) {
      console.error('There is an error:', error);
    }
  };

  const handleChange = (event) => {
    setUserAnswer(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const idPartisipan = localStorage.getItem('partisipan_id');
      const response = await fetch('http://localhost:8080/api/jawaban-intervensi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_intervensi: id, id_partisipan: idPartisipan, respon: userAnswer })
      });
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        console.log('Answer successfully sent ke database');
        setSubmittedDate(new Date().toISOString().slice(0, 10));
        setIsAnswerSubmitted(true);
        showNotification('Intervensi Hari Ini', 'Jawaban Anda berhasil disimpan');
  
        // Show modal with additional information
        setShowModal(true);
        
      } else if (response.status === 400) {
        const errorData = await response.json();
        console.error(errorData.message);
        setErrorMessage(errorData.message);
      } else if (response.status === 300) {
        console.error('Can not fill today, come back tomorrow');
showNotification('Cannot Fill', 'Sorry, cannot fill today, come back tomorrow');      } else {
        console.error('There is an error:', response.status);
      }
    } catch (error) {
      console.error('There is an error:', error);
    }
  };
  

  const displaySubmittedAnswer = async () => {
    const idPartisipan = localStorage.getItem('partisipan_id');
    try {
      const response = await fetch(`http://localhost:8080/api/jawaban-intervensi/${idPartisipan}`);
      if (response.ok) {
        const data = await response.json();
        const submittedAnswer = data.find(answer => answer.id_intervensi === id);
        if (submittedAnswer) {
          setUserAnswer(submittedAnswer.respon);
          setIsAnswerSubmitted(true);
        }
      } else {
        console.error('Failed to load submitted answer');      }
    } catch (error) {
      console.error('There is an error:', error);
    }
  };

  const getRandomQuote = () => {
    const quotes = [
         "Write every day, your heart will be relieved, Keep trying, stress will disappear.",
"The ship sails on the blue sea, Keep writing, your heart will not be sad.",
"The morning sun shines on the village, Your writing today is truly extraordinary!",
"The roses smell fragrant, Keep writing, your spirit will not crack.",
"Fish swim in the pond, By writing, stress disappears.",
"A gentle breeze blows, Every word written, brings happiness.",
"The bright blue sky is charming, Your writing today is truly amazing!",
"Birds chirp in the morning, Writing with your heart, makes you radiant.",
"Shady trees on the side of the road, Every writing you write, becomes hope.",
"A beautiful beach at dusk, By writing, stress disappears.",
"Sparkling stars in the night sky, Writing every day, your heart becomes calm.",
"White clouds drift slowly, Keep writing, never get bored.",
"Rain falls, wetting earth, Every writing of yours, brings peace to the heart.",
"Bright morning without clouds, Writing every day, your heart becomes calm.",
"Sparrows fly happily, Keep writing, your spirit becomes brighter.",
"Rice turns yellow in the vast fields, Every word you write, brings sincerity.",
"Beautiful dusk on the western horizon, Writing every day, stress is lifted.",
"Fishermen go to sea in the morning, Your writing today is very inspiring!",
"Morning dew refreshes flowers, Writing with the heart, brings peace of mind.",
"Bright moon on a silent night, Every writing of yours, brings calming peace.",
"Tall trees towering into the sky, Writing every day, makes you stronger.",
"Butterflies perch on flowers, Your writing today is full of color and meaning.",
"Swamps with green trees, Keep writing, stress will go away.",
"Green hills in the afternoon, Writing every day, your heart becomes cool and fresh.",
"Birds chirping in a peaceful morning, Your writing today is very soothing to the heart.",
"Small waves on the beach rustle, Keep writing, your spirit continues to flow.",
"Vast fields are green and cool, Write with the heart, life becomes full of blessings.",
"Flowers bloom in a beautiful garden, Every writing of yours, brings abundant spirit.",
"The sun rises on a bright morning, Keep writing, your spirit will never waver",
    ];
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  };

  const fetchSpecialQuote = () => {
    const specialQuotes = [
"Thank you for joining this writing challenge. Every piece of writing brings peace and inspiration. Keep up the spirit, you are great! Keep writing. Stress will go away, peace will come along."
    ];
    const randomIndex = Math.floor(Math.random() * specialQuotes.length);
    setSpecialQuote(specialQuotes[randomIndex]);
  };

  const showNotification = (title, body) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body });
    } else if ('Notification' in window && Notification.permission !== 'denied') {
      Notification.requestPermission().then(function (permission) {
        if (permission === 'granted') {
          new Notification(title, { body });
        }
      });
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowQuoteModal(false); // Close quote modal if open
  };

  return (
    <>
      <Navbar />
      <div style={{ marginTop: "70px" }}>
        <Container>
          {intervention && (
            <div className="text-center mb-6">
              <h5 style={{ fontSize: "40px" }}>{intervention.deskripsi_challenge}</h5>
            </div>
          )}
          <Card className="mb-4" style={{ borderRadius: "25px", backgroundColor: "#25B7D3", color: "white" }}>
            <Card.Body>
              <Form.Group controlId="userAnswer">
                <Form.Control
                  as="textarea"
                  rows={6}
                  value={userAnswer}
                  onChange={handleChange}
                  placeholder="Enter your answer here"
                  style={{ minHeight: '150px', fontSize: '20px' }}
                  readOnly={isAnswerSubmitted} // Text area is read-only if the answer is submitted
                />
              </Form.Group>
              <br />
              {!isAnswerSubmitted && (
                <Button
                  variant="light"
                  onClick={handleSubmit}
                  disabled={isAnswerSubmitted} // Button is disabled if the answer is submitted
                >
                  {isAnswerSubmitted ? "Answer Already Saved" : "Submit"}
                </Button>
              )}
            </Card.Body>
          </Card>
        </Container>
      </div>

     

      {/* Modal for completing intervention */}
      <Modal show={showModal} onHide={handleCloseModal}centered backdrop keyboard={false} style={{ zIndex: 1050 }}>
        <Modal.Header closeButton>
          <Modal.Title>{intervention.id_intervensi === '30' ? "Congratulations!" : "Success!"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {intervention.id_intervensi === '30' ? (
            <>
          Congratulations, you have completed the 30 Days Writing Challenge intervention challenge. Let's take the post test to find out the results of your evaluation.              <br />
              <strong>{specialQuote}</strong>
            </>
          ) : (
            <>
            Your answer was successfully saved.
              <br />
              Ada pantun untukmu nih: <strong>{quote}</strong>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          {intervention.id_intervensi === '30' && (
            <Button variant="primary" href="/post-test">
              Go to Post Test
            </Button>
          )}
        </Modal.Footer>
      </Modal>

    </>
  );
};

export default FormPage;
