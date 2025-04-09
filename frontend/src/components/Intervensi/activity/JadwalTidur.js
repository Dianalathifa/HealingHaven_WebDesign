import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Col, Form, Button, Row, Card } from "react-bootstrap";
import Navbar from '../../landing/Navbar.js';
import tidur from '../../images/activityTerapi/tidur-sehat.png';

const JadwalTidurSehat = () => {
  const [latestSleepSchedule, setLatestSleepSchedule] = useState([]);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    tanggal: "",
    waktu_tidur: "",
    waktu_bangun: "",
    gangguan_tidur: ""
  });

  useEffect(() => {
    fetchLatestSleepSchedule();
  }, []);

  const fetchLatestSleepSchedule = async () => {
    const partisipanId = localStorage.getItem("partisipan_id");
    try {
      const response = await axios.get(`http://localhost:8080/api/jadwal-tidur/${partisipanId}`);
      if (response.data.length === 0) {
        setError("There is no healthy sleep schedule yet. Please add a sleep schedule.");
      } else {
        const latestSchedule = response.data[response.data.length - 1];
        setLatestSleepSchedule([latestSchedule]);
      }
    } catch (error) {
      setError("There is no healthy sleep schedule yet");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const partisipanId = localStorage.getItem("partisipan_id");
    try {
      const response = await axios.post(
        `http://localhost:8080/api/jadwal-tidur`,
        { ...formData, id_partisipan: partisipanId }
      );
      alert("Sleep schedule successfully added.");
  
      // Menampilkan data baru langsung setelah konfirmasi alert
      const isAlreadyAdded = latestSleepSchedule.some(schedule => schedule.id === response.data.id);
      if (!isAlreadyAdded) {
        setLatestSleepSchedule([response.data, ...latestSleepSchedule]);
      }
  
      setFormData({
        tanggal: "",
        waktu_tidur: "",
        waktu_bangun: "",
        gangguan_tidur: ""
      });
    } catch (error) {
      console.error("Failed to add sleep schedule:", error);
      setError("Failed to add sleep schedule");
    }
  };
  
  

  return (
    <>
      <Navbar />
      <section className="section before-content" style={{ backgroundColor: "#25B7D3", color: "#141313", marginTop: "10px", paddingTop: "10px", padding: "70px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: 0, width: "100%", height: "50%", backgroundColor: "white", zIndex: 1 }}></div>
        <div style={{ position: "relative", zIndex: 2 }}>
          <Col md={16} className="d-flex align-items-center justify-content">
            <div className="container text-center">
              <h6 className="tfonts-2" style={{ fontWeight: "bold", color: "white" }}>Healthy Sleep Schedule</h6>
            </div>
          </Col>
          <br /><br /><br />
          <div className="container text-center">
            <img src={tidur} style={{ borderRadius:"30px", width: "350px", height: "auto", maxWidth: "100%", maxHeight: "100%" }} alt="tidur-sehat" />
          </div>
        </div>
      </section>

      <Container className="mt-3" style={{ maxWidth: '800px', marginBottom:"100px" }}>
        <Col md={16} className="d-flex align-items-center justify-content" style={{ marginBottom:"100px" }}>
          <div className="container text-center">
            <p style={{ fontSize: "16px", fontWeight: "bold", color: "#25B7D3" }}>
            "Maintain your sleep quality, because adequate rest is the key to your health and well-being.
Let's start by setting your healthy sleep schedule now! By having a regular sleep schedule, you can feel the benefits in increasing energy, productivity, and overall health.
Not only that, in this feature, you can also track your sleep quality from day to day and improve its quality.
Don't let fatigue interfere with your days, let's prioritize quality sleep for long-term happiness and success.
Starting today, schedule your healthy sleep and feel the difference!"
            </p>
          </div>
        </Col>
        <Row>
          <Col>
            <Card className="container text-center " style={{ padding:"40px",borderRadius: "40px", fontWeight: "bold", fontSize: "20px", height: "500px", backgroundColor: "#25B7D329", color: "#25B7D3" }}>
              <Card.Body>
                <br />
                <Card.Title style={{ fontSize: "25px", fontWeight: "bold" }}>Sleep Schedule List</Card.Title><br /><br />
                {error ? (
                  <p>{error}</p>
                ) : (
                  <>
                    {latestSleepSchedule.length === 0 && (
                      <p>There is no healthy sleep schedule available yet.</p>
                    )}
                    {latestSleepSchedule.map((schedule, index) => (
                      <div key={index}>
                        <p>
                          <strong>Date&nbsp;: &nbsp;&nbsp;&nbsp;</strong> {schedule.tanggal}
                        </p>
                        <p>
                          <strong>bedtime&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;</strong> {schedule.waktu_tidur}
                        </p>
                        <p>
                          <strong>wake up calln&nbsp;:&nbsp;&nbsp;&nbsp;</strong>{" "}
                          {schedule.waktu_bangun}
                        </p>
                        <p>
                          <strong>Sleep Disorders&nbsp;:&nbsp;&nbsp;&nbsp;</strong>{" "}
                          {schedule.gangguan_tidur}
                        </p>
                      </div>
                    ))}
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ borderRadius: "40px", height: "500px", fontWeight: "bold", backgroundColor: "#25B7D329", color: "#25B7D3", padding:"10px" }}>
              <Card.Body>
                <Card.Title className="container text-center" style={{ fontSize: "20px", fontWeight: "bold", marginBottom:"15px" }}>Add Sleep Schedule</Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formTanggal">
                    <Form.Label>Tanggal</Form.Label>
                    <Form.Control
                      type="date"
                      name="tanggal"
                      value={formData.tanggal}
                      onChange={handleInputChange}
                    /><br />
                  </Form.Group>
                  <Form.Group controlId="formJamTidur">
                    <Form.Label>Jam Tidur</Form.Label>
                    <Form.Control
                      type="time"
                      name="waktu_tidur"
                      value={formData.waktu_tidur}
                      onChange={handleInputChange}
                    /><br />
                  </Form.Group>
                  <Form.Group controlId="formJamBangun">
                    <Form.Label>Jam Bangun</Form.Label>
                    <Form.Control
                      type="time"
                      name="waktu_bangun"
                      value={formData.waktu_bangun}
                      onChange={handleInputChange}
                    /><br />
                  </Form.Group>
                  <Form.Group controlId="formGangguanTidur">
                    <Form.Label>Gangguan Tidur</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Masukkan gangguan tidur"
                      name="gangguan_tidur"
                      value={formData.gangguan_tidur}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Button variant="light" type="submit" style={{ marginTop:"10px",backgroundColor: "#25B7D3", color: "white", fontWeight: "bold" }}>
                    Add +
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default JadwalTidurSehat;
