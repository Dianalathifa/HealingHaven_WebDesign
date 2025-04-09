import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Footer from "../landing/Footer.js";
import Navbar from "../landing/Navbar.js";
import welcomeImage from "../images/intervensi/intervensi-detail.png";
import image1 from "../images/alur1.png";
import image2 from "../images/alur2.png";
import image3 from "../images/alur3.png";
import anxietyImage from "../images/intervensiStress/Cemas.png";
import stressImage from "../images/intervensiStress/Stress.png";
import depressionImage from "../images/intervensiStress/Depresi.png";
import mildAnxiety from "../images/intervensi/Cemas54321.png";
import moderateAnxiety from "../images/intervensi/MBSR.png";
import mildStress from "../images/intervensi/StressCoping.png";
import moderateStress from "../images/intervensi/30days.png";
import mildDepression from "../images/intervensi/Activity.png";
import moderateDepression from "../images/intervensi/CBT.png";
import '../style/Intervensi.css';

const IntervensiUser = () => {
  return (
    <div>
      <Navbar />
      <section id="intervention-list" className="section before-content-detail">
        <Container className="section-container">
          <Row className="align-items-center">
            <Col md={6} className="text-md-left">
              <h1 className="intervensi-title">Welcome to Healing Haven Interventions!</h1>
              <p className="subtitle-detail">Congratulations on reaching our intervention feature! We hope this feature helps you and provides significant benefits.</p>
            </Col>
            <Col md={6} className="text-center">
              <img src={welcomeImage} alt="Welcome" className="welcome-image" />
            </Col>
          </Row>
       
          <section>
            <Container>
              <Row>
                <Col md={9}>
                  <Card className="info-card">
                    <Card.Body className="info-card-body">
                      <div className="info-text-container">
                        <p className="info-text">
                          Get interventions according to your test results, ranging from 'Anxiety', 'Stress', to 'Depression'
                        </p>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <div className="info-image-container">
                    <img src={image1} alt="First Image" className="info-image" />
                  </div>
                </Col>
              </Row>
            </Container>
          </section>

          <section>
            <Container>
              <Row>
                <Col md={3}>
                  <div className="info-image-container">
                    <img src={image2} alt="Second Image" className="info-image-left" />
                  </div>
                </Col>
                <Col md={9}>
                  <Card className="info-card">
                    <Card.Body className="info-card-body">
                      <div className="info-text-container">
                        <p className="info-text">
                          Then, you will be directed to a page with information and intervention methods that you can practice according to the given instructions.
                        </p>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </section>

        </Container>
      </section>
      <section id="intervention-list" className="before-content" style={{ color: "#0c426c" }}>
        <div className="container text-center">
          <h6 className="section-title mb-2 tfonts-2" style={{ marginBottom: "10px" }}>Intervention List</h6>
          <h6 className="subtitle" style={{ fontSize: "16px", marginBottom: "20px" }}>
            You will receive interventions that correspond to your mental condition to gain assistance and support. <br />Here are the interventions we provide to help improve and enhance your condition.
          </h6>
        </div>
      </section>

      <Container className="my-5" style={{ paddingBottom: "40px", maxWidth: "1100px" }}>
        <Row className="justify-content-center">
          <Col xs={12} sm={6} md={4} className="mb-4">
            <Card className="card-hover-circle">
              <Card.Body className="d-flex flex-column">
                <div className="title-container-circle">
                  <Card.Title className="card-title-circle">Anxiety</Card.Title>
                </div>
                <Card.Text className="card-text-circle"> This intervention will help you manage anxiety and find peace in your life.</Card.Text>
                <img src={anxietyImage} alt="Anxiety" className="card-image-circle" />
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={4} className="mb-4">
            <Card className="card-hover-circle">
              <Card.Body className="d-flex flex-column">
                <div className="title-container-circle">
                  <Card.Title className="card-title-circle">Stress</Card.Title>
                </div>
                <Card.Text className="card-text-circle">This intervention helps you cope with stress and improve your mental well-being.</Card.Text>
                <img src={stressImage} alt="Stress" className="card-image-circle" />
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={4} className="mb-4">
            <Card className="card-hover-circle">
              <Card.Body className="d-flex flex-column">
                <div className="title-container-circle">
                  <Card.Title className="card-title-circle">Depression</Card.Title>
                </div>
                <Card.Text className="card-text-circle">This intervention will help you manage depression and provide the support you need.</Card.Text>
                <img src={depressionImage} alt="Depression" className="card-image-circle" />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <section id="intervention-list" style={{ color: "#0c426c", backgroundColor: "white", paddingTop: "40px" }}>
        <div className="container text-center">
          <h6 className="section-title mb-2 tfonts-2" style={{ marginBottom: "10px" }}>Check out the explanation of each intervention!</h6>
        </div>

        <Container className="my-5" style={{ paddingBottom: "20px", maxWidth: "1000px" }}>
          <Row className="justify-content-center">
            <Col xs={12} md={4} className="mb-4">
              <img src={anxietyImage} alt="Anxiety" className="img-fluid" style={{ height: "100%", objectFit: "cover" }} />
            </Col>
            <Col xs={12} md={8}>
              <div className="mb-4" style={{ color: "#4A4A4A" }}>
                <Card.Title className="card-title-circle">Anxiety</Card.Title>
                <p> There are two categories: mild anxiety and moderate anxiety. You will receive one of the interventions after taking the test in MentalWell!</p>
              </div>
              <Row>
                <Col xs={12} sm={6} className="mb-4">
                  <Card className="card-hover-circle">
                    <Card.Body className="d-flex flex-column">
                      <div className="title-container-circle">
                        <Card.Title className="card-title-circle">Mild Anxiety</Card.Title>
                      </div>
                      <Card.Text className="card-text-circle">
                        Practice the Grounding Technique 5-4-3-2-1 to manage mild anxiety and find peace in your life.
                      </Card.Text>
                      <img src={mildAnxiety} alt="Mild Anxiety" className="card-image-circle" />
                    </Card.Body>
                  </Card>
                </Col>
                <Col xs={12} sm={6} className="mb-4">
                  <Card className="card-hover-circle">
                    <Card.Body className="d-flex flex-column">
                      <div className="title-container-circle">
                        <Card.Title className="card-title-circle">Moderate Anxiety</Card.Title>
                      </div>
                      <Card.Text className="card-text-circle">
                        Mindfulness-Based Stress Reduction intervention for managing moderate anxiety and finding peace in your life.
                      </Card.Text>
                      <img src={moderateAnxiety} alt="Moderate Anxiety" className="card-image-circle" />
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        </section>

        <section id="intervention-list" style={{ color: "#0c426c", backgroundColor: "#D2E0FF", paddingTop: "40px" }}>
        <Container className="my-5" style={{ paddingBottom: "20px", maxWidth: "1000px" }}>
          <Row className="justify-content-center">
            <Col xs={12} md={8}>
              <div className="mb-4" style={{ color: "#4A4A4A" }}>
                <Card.Title className="card-title-circle">Stress</Card.Title>
                <p> We offer interventions for both mild and moderate stress to help you manage and alleviate stress.</p>
              </div>
              <Row>
                <Col xs={12} sm={6} className="mb-4">
                  <Card className="card-hover-circle">
                    <Card.Body className="d-flex flex-column">
                      <div className="title-container-circle">
                        <Card.Title className="card-title-circle">Mild Stress</Card.Title>
                      </div>
                      <Card.Text className="card-text-circle">
                        Engage in physical activities and coping techniques to manage mild stress and improve your mental well-being.
                      </Card.Text>
                      <img src={mildStress} alt="Mild Stress" className="card-image-circle" />
                    </Card.Body>
                  </Card>
                </Col>
                <Col xs={12} sm={6} className="mb-4">
                  <Card className="card-hover-circle">
                    <Card.Body className="d-flex flex-column">
                      <div className="title-container-circle">
                        <Card.Title className="card-title-circle">Moderate Stress</Card.Title>
                      </div>
                      <Card.Text className="card-text-circle">
                        Practice a 30-day writing routine to manage moderate stress effectively and regain positive energy.
                      </Card.Text>
                      <img src={moderateStress} alt="Moderate Stress" className="card-image-circle" />
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col md={4}>
              <img src={stressImage} alt="Stress" className="img-fluid" style={{ height: "100%", objectFit: "cover" }} />
            </Col>
          </Row>
        </Container>
      </section>

      <section id="intervention-list" style={{ color: "#0c426c", backgroundColor: "white", paddingTop: "40px" }}>
        <Container className="my-5" style={{ paddingBottom: "20px", maxWidth: "1000px" }}>
          <Row className="justify-content-center">
          <Col xs={12} md={4} className="mb-4">
              <img src={depressionImage} alt="Anxiety" className="img-fluid" style={{ height: "100%", objectFit: "cover" }} />
            </Col>
            <Col xs={12} md={8}>
              <div className="mb-4" style={{ color: "#4A4A4A" }}>
                <Card.Title className="card-title-circle">Depression</Card.Title>
                <p> You will receive interventions for both mild and moderate depression to help manage and improve your mental health.</p>
              </div>
              <Row>
                <Col xs={12} sm={6} className="mb-4">
                  <Card className="card-hover-circle">
                    <Card.Body className="d-flex flex-column">
                      <div className="title-container-circle">
                        <Card.Title className="card-title-circle">Mild Depression</Card.Title>
                      </div>
                      <Card.Text className="card-text-circle">
                        Engage in physical activities to manage mild depression and regain positive energy.
                      </Card.Text>
                      <img src={mildDepression} alt="Mild Depression" className="card-image-circle" />
                    </Card.Body>
                  </Card>
                </Col>
                <Col xs={12} sm={6} className="mb-4">
                  <Card className="card-hover-circle">
                    <Card.Body className="d-flex flex-column">
                      <div className="title-container-circle">
                        <Card.Title className="card-title-circle">Moderate Depression</Card.Title>
                      </div>
                      <Card.Text className="card-text-circle">
                        Engage in Cognitive Behavioral Therapy (CBT) to help manage moderate depression and improve your mental health.
                      </Card.Text>
                      <img src={moderateDepression} alt="Moderate Depression" className="card-image-circle" />
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      <Footer />
    </div>
  );
};

export default IntervensiUser;
