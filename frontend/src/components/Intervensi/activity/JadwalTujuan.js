import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import Navbar from '../../landing/Navbar.js';
import Footer from '../../landing/Footer.js';

const JadwalTujuan = () => {
  const [goals, setGoals] = useState([]);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    to_do: "",
    in_progress: "",
    done: ""
  });

  useEffect(() => {
    const partisipanId = localStorage.getItem("partisipan_id");
    
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/tujuan/${partisipanId}`);
        setGoals(response.data);
        setError(null);
      } catch (error) {
        setError("Failed to retrieve destination schedule");
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTodoSubmit = async (e) => {
    e.preventDefault();
    const partisipanId = localStorage.getItem("partisipan_id");
    try {
      const response = await axios.post(`http://localhost:8080/api/tujuan`, { ...formData, id_partisipan: partisipanId } );
      setGoals([...goals, formData]);
      setFormData({
        ...formData,
        to_do: ""
      });
      setError(null);
    } catch (error) {
      setError("Failed to add destination schedule");
    }
  };

  const handleInProgressSubmit = async (e) => {
    e.preventDefault();
    const partisipanId = localStorage.getItem("partisipan_id");
    try {
      const response = await axios.post(`http://localhost:8080/api/tujuan`, { ...formData, id_partisipan: partisipanId } );
      setGoals([...goals, formData]);
      setFormData({
        ...formData,
        in_progress: ""
      });
      setError(null);
    } catch (error) {
      setError("Failed to add destination schedule");
    }
  };

  const handleDoneSubmit = async (e) => {
    e.preventDefault();
    const partisipanId = localStorage.getItem("partisipan_id");
    try {
      const response = await axios.post(`http://localhost:8080/api/tujuan`, { ...formData, id_partisipan: partisipanId } );
      setGoals([...goals, formData]);
      setFormData({
        ...formData,
        done: ""
      });
      setError(null);
    } catch (error) {
      setError("Failed to add destination schedule");
    }
  };

  return (
    <>
      <Navbar/>
      <Container style={{marginTop:"150px"}}>
        <Col md={16} className="d-flex align-items-center justify-content">
          <div className="container text-center">
            <h6 className="subtitle" style={{ fontSize: "45px", fontWeight:"bold", color:"#25B7D3"}}>Destination Schedule</h6> 
          </div>
        </Col>
        <br/><br/><br/>      
        <Row>
          <Col>
            <Card style={{ borderRadius:"30px",fontWeight:"bold",backgroundColor: "#25B7D329", color: "#25B7D3" }}>
              <Card.Body>
                <h3 style={{ borderRadius:"30px",fontWeight:"bold",fontSize:"25px", color: "#25B7D3" }}>Form To Do</h3>
                <Form onSubmit={handleTodoSubmit}>
                  <Form.Group controlId="formToDo">
                    <br/>
                    <Form.Control
                      type="text"
                      placeholder="Masukkan tujuan"
                      name="to_do"
                      value={formData.to_do}
                      onChange={handleInputChange}
                    />
                  </Form.Group><br/>
                  <Button variant="light" type="submit" style={{color:"white", fontWeight:"bold", backgroundColor:"#25B7D3"}}>
                   Add Schedule
                  </Button>
                </Form>
              </Card.Body>
              <Card.Body ><hr/>
                <h3 style={{ borderRadius:"30px",fontSize:"25px",fontWeight:"bold", color: "#25B7D3" }}>goal result</h3><br/>
                {goals.map((goal, index) => (
                  <div key={index}>
                    {goal.to_do && (
                      <div style={{borderRadius:"20px",backgroundColor:"white"}}><br/>
                        <p><strong >&nbsp;&nbsp;ID Partisipan:</strong> {goal.id_partisipan}</p>
                        <p><strong>&nbsp;&nbsp;To Do:</strong> {goal.to_do}</p><br/>
                      </div>
                    )}<br/>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card style={{ borderRadius:"30px",fontWeight:"bold",backgroundColor: "#25B7D329", color: "#25B7D3" }}>
              <Card.Body>
                <h3 style={{ borderRadius:"30px",fontWeight:"bold",fontSize:"25px", color: "#25B7D3" }}>Form In Progress</h3>
                <Form onSubmit={handleInProgressSubmit}>
                  <Form.Group controlId="formInProgress">
                    <br/>
                    <Form.Control
                      type="text"
                      placeholder="Masukkan tujuan"
                      name="in_progress"
                      value={formData.in_progress}
                      onChange={handleInputChange}
                    />
                  </Form.Group><br/>
                  <Button variant="light" type="submit" style={{color:"white", fontWeight:"bold", backgroundColor:"#25B7D3"}}>
                    Tambah Tujuan
                  </Button>
                </Form>
              </Card.Body>
              <Card.Body ><hr/>
                <h3 style={{ borderRadius:"30px",fontSize:"25px",fontWeight:"bold", color: "#25B7D3" }}>In Progress</h3><br/>
                {goals.map((goal, index) => (
                  <div key={index}>
                    {goal.in_progress && (
                      <div style={{borderRadius:"20px",backgroundColor:"white"}}><br/>
                        <p><strong >&nbsp;&nbsp;ID Partisipan:</strong> {goal.id_partisipan}</p>
                        <p><strong>&nbsp;&nbsp;In Progress:</strong> {goal.in_progress}</p><br/>
                      </div>
                    )}<br/>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card style={{ borderRadius:"30px",fontWeight:"bold",backgroundColor: "#25B7D329", color: "#25B7D3" }}>
              <Card.Body>
                <h3 style={{ borderRadius:"30px",fontWeight:"bold",fontSize:"25px", color: "#25B7D3" }}>Form Done</h3>
                <Form onSubmit={handleDoneSubmit}>
                  <Form.Group controlId="formDone">
                    <br/>
                    <Form.Control
                      type="text"
                      placeholder="Masukkan tujuan"
                      name="done"
                      value={formData.done}
                      onChange={handleInputChange}
                    />
                  </Form.Group><br/>
                  <Button variant="light" type="submit" style={{color:"white", fontWeight:"bold", backgroundColor:"#25B7D3"}}>
                    Add Goals
                  </Button>
                </Form>
              </Card.Body>
              <Card.Body ><hr/>
                <h3 style={{ borderRadius:"30px",fontSize:"25px",fontWeight:"bold", color: "#25B7D3" }}>Done</h3><br/>
                {goals.map((goal, index) => (
                  <div key={index}>
                    {goal.done && (
                      <div style={{borderRadius:"20px",backgroundColor:"white"}}><br/>
                        <p><strong >&nbsp;&nbsp;ID Partisipan:</strong> {goal.id_partisipan}</p>
                        <p><strong>&nbsp;&nbsp;Done:</strong> {goal.done}</p><br/>
                      </div>
                    )}<br/>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <br/><br/><br/>
    </>
  );
};

export default JadwalTujuan;
