import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Card, Form, Button, Alert, Modal } from "react-bootstrap";
import Navbar from '../../landing/Navbar.js';
import Footer from '../../landing/Footer.js';

const DailyTaskDetail = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [jawaban, setJawaban] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [hasSubmittedToday, setHasSubmittedToday] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchTask();
  }, [id]);
  
  useEffect(() => {
    if (task) {
      displaySubmittedAnswer(task.id_task, localStorage.getItem('partisipan_id'));
    }
  }, [task]);
  
  const fetchTask = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/daily-tasks/${id}`);
      setTask(response.data);
      displaySubmittedAnswer(response.data.id_task); // Pass the task ID to displaySubmittedAnswer
    } catch (error) {
      setError("Error fetching task data. Please try again later.");
      console.error("Error fetching task data:", error);
    }
  };

  const displaySubmittedAnswer = async (taskId, participantId) => {
    try {
      const response = await axios.get(`http://localhost:8080/cbt-responses/task-participant/${taskId}/${participantId}`);
      if (response.data) {
        setJawaban(response.data.jawaban); // Set the answer retrieved from the backend to the state
        setHasSubmittedToday(true); // Indicate that the user has submitted a response for today
      } else {
        setJawaban(""); // Clear the answer if no answer has been submitted for today
        setHasSubmittedToday(false); // Indicate that the user has not submitted a response for today
      }
    } catch (error) {
      console.error('Failed to load the submitted answer:', error);
    }
  };
  

  const handleResponseSubmit = async (e) => {
    e.preventDefault();
    const id_partisipan = localStorage.getItem('partisipan_id');

    if (!id_partisipan) {
      setError("Participant ID not found in local storage.");
      return;
    }

    if (!jawaban.trim()) {
      setError("Please provide a response.");
      return;
    }

    if (hasSubmittedToday) {
      setError("Sorry, you have already submitted a response today. Please try again tomorrow.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/cbt-responses", {
        id_task: task.id_task,
        id_partisipan,
        jawaban,
        submission_date: new Date().toISOString().split("T")[0],
      });

      if (response.status === 400) {
        setError(response.data.messages.error);
        return;
      }

      if (response.status === 300) {
        setError(response.data.messages.error);
        return;
      }

      setSuccess("Response submitted successfully!");
      setJawaban("");
      setHasSubmittedToday(true);

      // Menampilkan modal jika id_task adalah 14 dan id_session adalah 4
      if (task.id_session === 4 && task.id_task === 14) {
        setShowModal(true);
      }
    } catch (error) {
      setError("Error submitting response. Please try again later.");
      console.error("Error submitting response:", error);
      console.error("Server response:", error.response);
      if (error.response && error.response.data && error.response.data.messages && error.response.data.messages.error) {
        setError(error.response.data.messages.error);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Navbar />
      <Container>
        {task ? (
          <Container>
            <div className="container text-center">
              <h6 className="section-title mb-2 tfonts" style={{ marginTop: "10px", marginBottom: "100px" }}>
                Welcome to Day {task.no_hari}
              </h6>
            </div>
            <Card className="mb-4" style={{ borderRadius: "25px", backgroundColor: "#25B7D3", color: "white" }}>
              <Card.Body>
                <Card.Title>{task.judul_task}</Card.Title>
                <Card.Text>{task.deskripsi_task}</Card.Text>
              </Card.Body>
            </Card>
            <Card className="mb-4" style={{ borderRadius: "25px", backgroundColor: "#FFD2DD" }}>
              <Card.Body>
                <Card.Title>Tips</Card.Title>
                <Card.Text>{task.tips_task}</Card.Text>
              </Card.Body>
            </Card>
            <Form onSubmit={handleResponseSubmit}>
              <Form.Group controlId="formResponse">
                <Form.Label>Your Response</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={jawaban}
                  onChange={(e) => setJawaban(e.target.value)}
                  readOnly={hasSubmittedToday} // Membuat textarea menjadi readonly jika sudah submit hari ini
                />
              </Form.Group>
              <Button variant="primary" type="submit" style={{ marginBottom: "60px", marginTop: "30px" }} disabled={hasSubmittedToday}>
                Submit
              </Button>
            </Form>
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            {success && <Alert variant="success" className="mt-3">{success}</Alert>}
            {/* Modal untuk menampilkan pesan selamat */}
            <Modal show={showModal} onHide={handleCloseModal}>
              <Modal.Header closeButton>
                <Modal.Title>Congratulations!</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              Congratulations on successfully completing the CBT intervention!
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Close
                </Button>
                <Button variant="primary" href="/srq">
                  Go to SRQ
                </Button>
              </Modal.Footer>
            </Modal>
          </Container>
        ) : (
          <p>Loading task details...</p>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default DailyTaskDetail;
