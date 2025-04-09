import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Footer from "../landing/Footer";
import Navbar from "../landing/Navbar";
import "../style/PsikologSection.css"; // Import your CSS file for styles

const PsikologList = () => {
  const [psikologs, setPsikologs] = useState([]);

  useEffect(() => {
    const fetchPsikologs = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/psikolog");
        setPsikologs(response.data);
      } catch (error) {
        console.error("Error fetching psikologs:", error);
      }
    };

    fetchPsikologs();
  }, []);

  return (
    <div>
      <Navbar />
      <section id="psikolog-list" className="section before-content" style={{ color: "#003366", paddingTop: "30px" }}>
        <div className="container text-center">
          <h6 className="section-title mb-2 tfonts-2" style={{ marginBottom: "10px" }}>Our Recommendations<br /></h6>
          <h6 className="subtitle" style={{ fontSize: "16px", marginBottom: "20px" }}>
            Providing information about nearby medical professionals for appropriate handling by specialists when your mental health condition requires referral.
          </h6>
        </div>
      </section>

      <section>
        <Container className="my-5" style={{ paddingBottom: "200px", marginTop: "20px" }}>
          <Row className="justify-content-center">
            {psikologs.map((psikolog, index) => (
              <Col md={4} sm={4} xs={12} className="mb-4" key={index}>
                <a href={psikolog.url_psikolog} className="psikolog-card-link">
                  <Card className="psikolog-card">
                    <Card.Img
                      src={`http://localhost:8080/images/psikolog/${psikolog.image_psikolog}`}
                      alt="Psikolog Image"
                      className="psikolog-card-img"
                    />
                    <Card.Body className="card-body">
                      <Card.Title className="card-title">{psikolog.nama_psikolog}</Card.Title>
                      <Card.Text className="card-text">
                        {psikolog.deskripsi_psikolog.length > 50 ? psikolog.deskripsi_psikolog.substring(0, 100) + "..." : psikolog.deskripsi_psikolog}
                      </Card.Text>
                      <p className="location-text">Location: {psikolog.lokasi_psikolog}</p>
                      <p className="telephone-text">Telephone: {psikolog.telephone_psikolog}</p>
                      <Button variant="light" className="btn-light">Contact now</Button>
                    </Card.Body>
                  </Card>
                </a>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      <Footer />
    </div>
  );
};

export default PsikologList;
