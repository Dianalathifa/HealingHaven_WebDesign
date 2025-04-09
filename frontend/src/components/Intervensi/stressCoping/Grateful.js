import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Col, Form, Button, Card, Table } from "react-bootstrap";
import Navbar from '../../landing/Navbar.js';
import grateful from '../../images/stressCoping/grateful.png';
import "../../style/Intervensi.css";

const GratefulPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [inputs, setInputs] = useState({
    id_partisipan: localStorage.getItem('partisipan_id'),
    tanggal: new Date().toISOString().slice(0, 10),
    hal_disyukuri: ['', '', '', '', '']
  });
  const [gratefulList, setGratefulList] = useState([]);

  useEffect(() => {
    fetchGratefulList();
  }, []);

  const fetchGratefulList = async () => {
    const partisipanId = localStorage.getItem("partisipan_id");
    try {
      const response = await axios.get(`http://localhost:8080/grateful/${partisipanId}`);
      setGratefulList(response.data);
    } catch (error) {
      console.error('Error fetching grateful list:', error);
    }
  };

  const handleInputChange = (index, value) => {
    const newInputs = [...inputs.hal_disyukuri];
    newInputs[index] = value;
    setInputs({ ...inputs, hal_disyukuri: newInputs });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/grateful', inputs);
      fetchGratefulList(); // Refresh the list after adding new data
      setInputs({
        id_partisipan: localStorage.getItem('partisipan_id'),
        tanggal: new Date().toISOString().slice(0, 10),
        hal_disyukuri: ['', '', '', '', '']
      });
      setShowForm(false);
    } catch (error) {
      console.error('Error submitting data:', error);
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
              <h6 className="tfonts-2" style={{ fontWeight: "bold", color: "white" }}>Grateful !</h6>
            </div>
          </Col>
          <br /><br /><br />
          <div className="container text-center">
            <img src={grateful} style={{ width: "350px", height: "250px" }} alt="grateful" />
          </div>
        </div>
      </section>

      <Container className="mt-3" style={{ maxWidth: '800px' }}>
        <Col md={16} className="d-flex align-items-center justify-content">
          <div className="container text-center">
            <p style={{ fontSize: "16px", fontWeight: "bold", color: "#25B7D3", marginBottom:"50px" }}>
            "Let's write down 5 things you are grateful for today! Appreciating the little things in life can have a big impact on our well-being.
By taking a moment to reflect on the things we are grateful for, we can change our perspective to be more positive and grateful.
Let's start by acknowledging the little blessings that are often overlooked in everyday life. From small moments to big achievements,
every single thing has its own value in our lives.
So, let's write down 5 things that make you grateful today and feel how abundant the blessings we have received!"
            </p>
          </div>
        </Col>        
        <Col>
          <Card.Title className="container text-center" style={{ fontSize: "20px", fontWeight: "bold" }}>
            {showForm ? 'Tambah Hal yang Disyukuri' : 'Klik tombol di bawah untuk menambah hal yang disyukuri'}
          </Card.Title> <br/>
          {showForm ? (
            <div style={{ backgroundColor: "#25B7D3", padding: "20px", borderRadius: "10px" }}>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formTanggal">
                  <Form.Label style={{ color: "white" }}>Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="tanggal"
                    value={inputs.tanggal}
                    onChange={(e) => setInputs({ ...inputs, tanggal: e.target.value })}
                  /><br />
                </Form.Group>
                {inputs.hal_disyukuri.map((hal, index) => (
                  <Form.Group key={index} controlId={`formHal${index}`}>
                    <Form.Label style={{ color: "white" }}>Things to be Grateful For {index + 1}</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={`Enter something you are grateful for ${index + 1}`}
                      value={hal}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                    /><br />
                  </Form.Group>
                ))}
                <Button variant="light" type="submit" style={{ backgroundColor: "white", color: "#25B7D3", fontWeight: "bold" }}>
                  Submit
                </Button>
              </Form>
            </div>
          ) : (
            <Button variant="light" onClick={() => setShowForm(true)} style={{ width:"118px", height:"35px", fontSize:"12px", backgroundColor: "#25B7D3", color: "white", fontWeight: "bold", marginTop: '10px' }}>
              + Add New
            </Button>
          )}<br/>
        </Col>
        
        <br/>
        <Col>
          <Card className="container text-center" style={{ borderRadius: "20px", fontWeight: "bold", fontSize: "20px", backgroundColor: "#25B7D3", color: "white", marginBottom:"50px" }}>
            <Card.Body>
              <br />
              <Card.Title style={{ fontSize: "20px", fontWeight: "bold" }}>Daftar Hal yang Disyukuri</Card.Title><br /><br />
              {gratefulList.length === 0 ? (
                <p>There is no record of things to be grateful for.</p>
              ) : (
                <Table className="modern-table" striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th className="text-left">No</th>
                      <th className="text-left">Date</th>
                      <th className="text-center">Things to be Grateful For</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gratefulList.map((item, index) => (
                      <tr key={item.id_grateful}>
                        <td className="text-left">{index + 1}</td>
                        <td className="text-left">{item.tanggal}</td>
                        <td className="text-center">
                          <ul>
                            {item.hal_disyukuri.split(',').map((hal, idx) => (
                              <li key={idx}>{hal.trim()}</li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Container>
    </>
  );
};

export default GratefulPage;
