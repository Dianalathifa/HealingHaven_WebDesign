import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import Footer from "../landing/Footer.js";
import Navbar from "../landing/Navbar.js";
import image10 from "../images/image10.png"; // Import image
import Test1 from "../images/mentalwell-test1.png"; // Import image
import Test2 from "../images/mentalwell-test2.png"; // Import image
import skrining from "../images/skrining.png";
import hasil from "../images/menerima-hasil.png";
import lanjutan from "../images/tes-lanjutan.png";
import stress from "../images/intervensi/dass-stress.png";
import cemas from "../images/intervensi/dass-cemas.png";
import depresi from "../images/intervensi/dass-depresi.png";
import suicide from "../images/intervensi/suicide.png";
import "../style/TestPage.css";

const TampilanAwal = () => {
  return (
    <>
      <Navbar />
      <section id="psikolog-list" style={{ color: "#0c426c", marginTop: "60px" }}>
        <div className="container text-center">
          <h6 className="test-page-section-title mb-2 test-page-tfonts">Healing Haven Services</h6>
        </div>
      </section>

      <Container className="my-6">
        <Row className="justify-content-center text-center">
          <Col md={3}>
            <Card className="test-page-mentalwell-card" style={{ backgroundColor: "#FFEFD2", marginTop: "30px" }}>
              <Card.Body>
                <h1 style={{ fontSize: "17px", fontWeight: "bold", marginBottom: "15px", color: "#ecac00" }}>
                  <br />The Importance of <br />Mental Health
                </h1>
                <p style={{ fontSize: "16px", color: "#FEA503" }}>
                  "According to the World Health Organization (WHO), optimal health is defined as a state in which an individual has complete physical, mental, and social well-being."
                </p>
                <br />
              </Card.Body>
            </Card>
          </Col>
          <Col md={5} className="text-left">
            <h1 style={{ fontWeight: "bold", fontSize: "20px", marginTop: "90px" }}>
              Mental Health Screening Test (SRQ-20)
            </h1>
            <p style={{ fontSize: "16px", marginTop: "10px" }}>
              Recognizing mental health issues as early as possible is much better than letting them persist too long, which can disrupt daily functioning. Early detection will also facilitate treatment and care.
            </p>
          </Col>
          <Col md={3} className="d-flex align-items-center justify-content-center">
            <img src={image10} alt="Image" style={{ maxWidth: "100%", maxHeight: "100%" }} />
          </Col>
        </Row>
      </Container>

      <Container className="my-6">
        <Row className="justify-content-center">
          <Col md={{ span: 2, offset: 0.5 }}>
            <h1 style={{ fontSize: "15px", fontWeight: "bold", color: "#0C38B5" }}>
              <br /><br />Everyone Who <br />Needs Help
            </h1>
            <p style={{ fontSize: "14px", color: "#0C38B5" }}>
              Psychiatrists and Psychologists <br />are a safe place <br />to consult <br />about mental health issues.
            </p>
          </Col>
          <Col md={2} className="d-flex align-items-center">
            <img src={Test1} alt="Image" style={{ maxWidth: "100%", maxHeight: "100%" }} />
          </Col>
          <Col md={2} className="d-flex align-items-center">
            <img src={Test2} alt="Image" style={{ maxWidth: "100%", maxHeight: "100%" }} />
          </Col>
          <Col md={{ span: 2, offset: 0.5 }}>
            <h1 style={{ fontSize: "15px", fontWeight: "bold", color: "#0C38B5" }}>
              <br />Quick Screening <br />Quick Help
            </h1>
            <p style={{ fontSize: "14px", color: "#0C38B5" }}>
              Psychological screening is a <br />first step to <br />seek help <br />for your mental health issues.
            </p>
          </Col>
        </Row>
      </Container>

      <section id="mentalwell" className="section sebelum-content">
        <div className="container text-center">
          <div>
            <h6 className="test-page-tfonts-2 mb-2">Mental Health Screening Process</h6>
            <br />
          </div>
          <Row className="text-center align-items-center">
            <Col>
              <img src={skrining} className="mb-6 test-page-small-img" />
              <Card.Title className="test-page-subtitle">Step 1</Card.Title>
              <p>Take the online psychological  <br />screening testto evaluate your <br />psychological complaints/symptoms.</p>
            </Col>
            <Col>
              <img src={hasil} className="mb-6 test-page-small-img" />
              <Card.Title className="test-page-subtitle">Step 2</Card.Title>
              <p>Receive test results that <br />will provide recommendations <br />for interventions <br />and professional handling.</p>
            </Col>
            <Col>
              <img src={lanjutan} className="mb-6 test-page-small-img" />
              <Card.Title className="test-page-subtitle">Step 3</Card.Title>
              <p>The test results you receive <br />will generate recommendations based on <br/>your current condition. <br />Follow the solutions provided!</p>
            </Col>
          </Row>
        </div>
      </section>

      <Col md={14} className="text-center">
        <Link to="/srqtest-user">
          <Button
            variant="light"
            className="test-page-custom-button"
            style={{
              borderRadius: "50px",
              fontWeight: "bold",
              padding: '15px 20px',
              fontSize: '20px'
            }}
          >
            Start Screening
          </Button>
        </Link>
      </Col>

      <section id="mentalwell" className="section sebelum-content" style={{ marginTop: "20px" }}>
        <div className="container text-center">
          <h6 className="test-page-tfonts-2 mb-2">More Mental Health Test Services</h6>
          <br />
          <Row className="justify-content-center">
            <Col md={5}>
              <Card className="test-page-dass-card test-page-small-card" style={{ backgroundColor: "#FFD2DD" }}>
                <Card.Body style={{ textAlign: "left" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img src={stress} alt="Stress" style={{ width: "170px", height: "170px", marginRight: "20px" }} />
                    <div>
                      <h5 className="test-page-h5">DASS-Stress</h5>
                      <p className="test-page-p">
                        This test helps to determine the level of stress you are experiencing. We are ready to assist you in overcoming it!
                      </p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={5}>
              <Card className="test-page-dass-card test-page-medium-card" style={{ backgroundColor: "#D2FFD2" }}>
                <Card.Body>
                  <img src={cemas} alt="Cemas" style={{ width: "160px", height: "160px", marginRight: "20px" }} />
                  <h5 className="test-page-h5">DASS-Anxiety</h5>
                  <p className="test-page-p">
                    Calm yourself and find solutions. We will help reduce your anxiety!
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={5}>
              <Card className="test-page-dass-card test-page-large-card" style={{ backgroundColor: "#D2E0FF" }}>
                <Card.Body>
                  <h5 className="test-page-h5">DASS-Depression</h5>
                  <p className="test-page-p">
                    This test measures the level of depression you are experiencing. Don't give up! We are ready to provide solutions.
                  </p>
                  <img src={depresi} alt="depression" style={{ width: "230px", height: "230px", marginRight: "20px" }} />
                </Card.Body>
              </Card>
            </Col>
            <Col md={5}>
              <Card className="test-page-dass-card test-page-small-card-suicide" style={{ backgroundColor: "#FFEFD2" }}>
                <Card.Body style={{ textAlign: "left" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img src={suicide} alt="suicide" style={{ width: "160px", height: "160px", marginRight: "20px" }} />
                    <div>
                      <h5 className="test-page-h5">Suicide Screening</h5>
                      <p className="test-page-p">We will assess your current condition to help you. Don't hesitate to reach out!</p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </section>

      <Footer className="test-page-footer" />
    </>
  );
};

export default TampilanAwal;
