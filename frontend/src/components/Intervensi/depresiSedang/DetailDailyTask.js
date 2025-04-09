import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Card, Form, Button, Alert, Modal } from "react-bootstrap";
import Navbar from '../../landing/Navbar.js';

const DailyTaskDetail = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [jawaban, setJawaban] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [hasSubmittedToday, setHasSubmittedToday] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [quote, setQuote] = useState("");
  const [specialQuote, setSpecialQuote] = useState("");

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
      displaySubmittedAnswer(response.data.id_task, localStorage.getItem('partisipan_id')); // Pass the task ID to displaySubmittedAnswer
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

      if (response.status === 400 || response.status === 300) {
        setError(response.data.message); // Update this to the actual error message format returned by your API
        return;
      }

      setSuccess("Jawaban kamu berhasil disimpan!");
      setJawaban("");
      setHasSubmittedToday(true);
      setQuote(getRandomQuote()); // Set random quote

      // Menampilkan modal jika id_task adalah 14 dan id_session adalah 4
      if (task.id_session === 4 && task.id_task === 14) {
        setShowModal(true);
        setSpecialQuote(getSpecialQuote()); // Set special quote
      }
    } catch (error) {
      console.error("Error submitting response:", error);
      console.error("Server response:", error.response);

      if (error.response && error.response.data && error.response.data.messages && error.response.data.messages.error) {
        setError(error.response.data.messages.error);
      } else {
        setError("Error submitting response. Please try again later.");
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const getRandomQuote = () => {
    const quotes = [
"Hi, buddy! Today we will start an exciting adventure, Together with MentalWell, let's try to find a way out of your complicated mind labyrinth!",
"Your mind is like a chaotic zoo, But together with MentalWell, we can definitely make it more organized!",
"Depression is like a clown who likes to appear uninvited, But together with MentalWell, we can be the ringmaster who controls it!",
"You are stronger than ice cream that lasts a long time in the freezer, Together with MentalWell, we will melt all the burdens that exist!",
"Every step you take is like a horse's step in the race arena, Together with MentalWell, let's show the world how fast we can bounce back!",
"Today is the beginning of a new adventure in the game of life, Together with MentalWell, let's change the setting to easy mode!",
"Keep walking like a penguin running a marathon, Together with MentalWell, we can definitely reach the finish line without falling!",
"You are a hero who is fighting against the badmood army, Together with MentalWell, let's train the muscles of happiness to be stronger!",
"No one can cancel your ticket to happiness, Together with MentalWell, we change the language from 'sad' to 'super happy fun time'!",
"Today, let's make a 'playlist' of upbeat songs, Together with MentalWell, we can definitely be DJs who make our hearts sway!",
"You are an emotional ninja who is fighting the army of sadness, Together with MentalWell, we practice the kung fu movements of happiness!",
"Keep believing in your hidden superpowers, Together with MentalWell, we can definitely be superheroes in our own life stories!",
"In your heart there is a dolphin jumping happily, Together with MentalWell, we make sure that every jump brings happiness!",
"Today, let's make a crime plan to fight depression, Together with MentalWell, we will be a team of kind-hearted villains",
"You are the CEO of your own life company, Together with MentalWell, we optimize the strategy so that your happiness business is even more successful!",
"The first step is to replace the army of sadness with the army of joy, Together with MentalWell, we will create a revolutionary anti-sad device!",
"Today, let's change our behavioral records from 'daydreaming' to 'gliding', Together with MentalWell, we will explore every moment with passion!",
"You are the main designer of the little events in your life, Together with MentalWell, we create an unforgettable adventure!",
"Nothing can stop you from becoming the best version of yourself, Together with MentalWell, we create a colorful work of living art!",
"Today, let's leave our brave footprints on the sand, Together with MentalWell, we create extraordinary adventure stories!"
    ];
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  };

  const getSpecialQuote = () => {
    return "Thank you for accompanying us on this journey, Together with MentalWell, let's continue dancing on the rainbow bridge towards true happiness!";  };

  return (
    <>
      <Navbar />
      <Container className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "100vh", paddingTop: "30px" }}>
        {task ? (
          <Container className="text-center">
            <h6 className="section-title mb-4 tfonts-2">
              Welcome to {task.no_hari}
            </h6>
            <Card className="mb-4" style={{ borderRadius: "25px", color: "#4A4A4A", backgroundColor: "#C5C0FC80", fontWeight: "bold", maxWidth: "600px" }}>
              <Card.Body>
                {/* <Card.Title>{task.judul_task}</Card.Title> */}
                <Card.Text>{task.deskripsi_task}</Card.Text>
              </Card.Body>
            </Card>
            <Card className="mb-4" style={{ borderRadius: "25px", backgroundColor: "#FFD2DD", maxWidth: "600px" }}>
              <Card.Body>
                <Card.Text>{task.tips_task}</Card.Text>
              </Card.Body>
            </Card>
            <Form onSubmit={handleResponseSubmit} style={{ maxWidth: "600px", width: "100%" }}>
              <Form.Group controlId="formResponse">
                <Form.Label>Your Response :</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={jawaban}
                  onChange={(e) => setJawaban(e.target.value)}
                  readOnly={hasSubmittedToday} // Membuat textarea menjadi readonly jika sudah submit hari ini
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3 mb-5" disabled={hasSubmittedToday}>
                Kirim
              </Button>
            </Form>
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            {success && <Alert variant="success" className="mt-3">{success}</Alert>}
            {/* Modal untuk menampilkan pesan selamat */}
            <Modal show={showModal} onHide={handleCloseModal} backdrop={true} backdropClassName="backdrop-modal" style={{ zIndex: 1050 }}>
              <Modal.Header closeButton>
                <Modal.Title>Congratulations!</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {task.id_task === 14 && task.id_session === 4 ? (
                  <>
                    <p>{specialQuote}</p>
                  </>
                ) : (
                  <>
                    <p>{quote}</p>
                  </>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Close
                </Button>
                {task.id_task === 14 && task.id_session === 4 ? (
                  <Button variant="primary" href="/post-test">
                    Go to post-test
                  </Button>
                ) : null}
              </Modal.Footer>
            </Modal>
          </Container>
        ) : (
          <p>Loading task details...</p>
        )}
      </Container>
    </>
  );
};

export default DailyTaskDetail;

