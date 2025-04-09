import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Col, Card, Button, Form, Table, Row, Modal } from "react-bootstrap";
import Navbar from '../../landing/Navbar.js';
import makan from '../../images/activityTerapi/makan.jpg';
import "../../style/Intervensi.css";

const PolaMakan = () => {
  const [makanan, setMakanan] = useState([]);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    tanggal: "",
    jenis_makanan: "",
    deskripsi_makanan: "",
    kalori: "",
    karbohidrat: "",
    protein: "",
    lemak: "",
    keterangan_tambahan: ""
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const partisipanId = localStorage.getItem("partisipan_id");
    try {
      const response = await axios.get(`http://localhost:8080/api/pola-makan/${partisipanId}`);
      setMakanan(response.data);
    } catch (error) {
      console.error("Failed to collect regular eating pattern data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const partisipanId = localStorage.getItem("partisipan_id");
    try {
      const response = await axios.post(`http://localhost:8080/api/pola-makan`, { ...formData, id_partisipan: partisipanId });
      setMakanan([...makanan, response.data]);
      setFormData({
        tanggal: "",
        jenis_makanan: "",
        deskripsi_makanan: "",
        kalori: "",
        karbohidrat: "",
        protein: "",
        lemak: "",
        keterangan_tambahan: ""
      });
      setShowSuccessModal(true);
      fetchData(); // Fetch data after adding new entry
    } catch (error) {
      console.error("Failed to add regular eating pattern data:", error);
      setShowErrorModal(true);
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
              <h6 className="tfonts-2" style={{ fontWeight: "bold", color: "white" }}>Regular Eating Pattern</h6>
            </div>
          </Col>
          <br /><br /><br />
          <div className="container text-center">
            <img src={makan} style={{ borderRadius: "60px", width: "400px", height: "250px", maxWidth: "100%", maxHeight: "100%" }} alt="kegiatan" />
          </div>
        </div>
      </section>

      <Container className="mt-3" style={{ maxWidth: '800px', marginTop: "100px", marginBottom: "40px" }}>
        <Col md={16} className="d-flex align-items-center justify-content">
          <div className="container text-center">
            <p style={{ fontSize: "16px", fontWeight: "bold", color: "#25B7D3" }}>
            "Take care of your mental health by setting a fun activity schedule! Let's start planning your favorite activities now! By having a regular activity schedule, you can feel the benefits in improving overall mental and emotional well-being. Not only that, in this feature, you can also track your favorite activities from day to day and improve your quality of life. Don't let your free time go to waste, let's fill it with activities that are useful for yourself. Starting today, schedule your favorite activities and feel the happiness!"
            regular eating pattern
            </p>
          </div>
        </Col>
      </Container>
      <Container className="mt-3" style={{ maxWidth: '800px', marginTop: "100px", marginBottom: "100px" }}>
        <Container className="mt-3 justify-content-center" >
        </Container>
        <Card style={{ backgroundColor: "#e0ffff" }}>
          <Card.Body>
            {makanan.length === 0 && <p>There are no food patterns available yet.</p>}
            {makanan.length > 0 && (
              <Table responsive bordered striped>
                <thead style={{ backgroundColor: "#25B7D3", color: "#ffffff" }}>
                  <tr>
                    <th>ID Partisipan</th>
                    <th>Date</th>
                    <th>Type of Food</th>
                    <th>Food Description</th>
                    <th>Calories</th>
                    <th>Carbohydrate</th>
                    <th>Protein</th>
                    <th>Fat</th>
                    <th>Additional information</th>
                  </tr>
                </thead>
                <tbody>
                  {makanan.map((makananItem, index) => (
                    <tr key={index}>
                      <td>{makananItem.id_partisipan}</td>
                      <td>{makananItem.tanggal}</td>
                      <td>{makananItem.jenis_makanan}</td>
                      <td>{makananItem.deskripsi_makanan}</td>
                      <td>{makananItem.kalori}</td>
                      <td>{makananItem.karbohidrat}</td>
                      <td>{makananItem.protein}</td>
                      <td>{makananItem.lemak}</td>
                      <td>{makananItem.keterangan_tambahan}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
            <hr />
            <h3 style={{ color: "#25B7D3", fontSize: "26px", fontWeight: "bold" }}>Add Healthy Diet</h3><br />
            <Form onSubmit={handleSubmit} className="mt-3">
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formTanggal">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="Masukkan tanggal"
                      name="tanggal"
                      value={formData.tanggal}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formJenisMakanan">
                    <Form.Label>Type of Food</Form.Label>
                    <Form.Control
                      as="select"
                      name="jenis_makanan"
                      value={formData.jenis_makanan}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Food Type</option>
<option value="breakfast">Breakfast</option>
<option value="lunch">Lunch</option>
<option value="dinner">Dinner</option>
<option value="snack">Snack</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Form.Group controlId="formDeskripsiMakanan">
                    <Form.Label>Food Description</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Input food description"
                      name="deskripsi_makanan"
                      value={formData.deskripsi_makanan}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={3}>
                  <Form.Group controlId="formKalori">
                    <Form.Label>Calories</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="input calories"
                      name="kalori"
                      value={formData.kalori}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group controlId="formKarbohidrat">
                    <Form.Label>Carbohydrate</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Input carbohydrate"
                      name="karbohidrat"
                      value={formData.karbohidrat}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group controlId="formProtein">
                    <Form.Label>Protein</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Input protein"
                      name="protein"
                      value={formData.protein}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group controlId="formLemak">
                    <Form.Label>Fat</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Input fat"
                      name="lemak"
                      value={formData.lemak}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group controlId="formKeteranganTambahan">
                <Form.Label>Additional information</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="input additional information"
                  name="keterangan_tambahan"
                  value={formData.keterangan_tambahan}
                  onChange={handleInputChange}
                />
              </Form.Group><br />
              <Button style={{ backgroundColor: "#25B7D3", color: "white", fontWeight: "bold" }} variant="light" type="submit">
              add regular eating patterns
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>


      {/* Success Modal */}
      <Modal show={showSuccessModal} backdrop={true} backdropClassName="backdrop-modal" style={{ zIndex: 1050 }} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Succsess!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Diet data successfully added.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSuccessModal(false)}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Error Modal */}
      <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)} backdrop={true} backdropClassName="backdrop-modal" style={{ zIndex: 1050 }}>
        <Modal.Header closeButton>
          <Modal.Title>Oops!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Failed to add diet data.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowErrorModal(false)}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PolaMakan;
