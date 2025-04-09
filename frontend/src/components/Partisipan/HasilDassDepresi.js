import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Navbar from "../landing/Navbar";
import Footer from "../landing/Footer";
import "../style/Intervensi.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import depresiRingan from "../images/intervensi/depresiringan1.png";
import depresiSedang from "../images/intervensi/depresisedang1.png";
import suicide from "../images/intervensi/suicide.png";
import normalImage from '../images/depresi/d-normal.jpeg';
import ringanImage from '../images/depresi/d-ringan.jpg';
import sedangImage from '../images/depresi/d-sedang.jpg';
import beratImage from '../images/depresi/d-parah.jpg';
import sangatParahImage from '../images/depresi/d-sangat_parah.jpg';

const HasilDassDepresi = () => {
  const [hasilKlasifikasi, setHasilKlasifikasi] = useState(null);
  const [error, setError] = useState(null);
  const [psikologs, setPsikologs] = useState([]);
  const [dailyInsights, setDailyInsights] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const partisipanId = localStorage.getItem("partisipan_id");

    const fetchHasilKlasifikasi = async () => {
      try {
        const partisipanId = localStorage.getItem("partisipan_id");

        const response = await axios.get(
          `http://localhost:8080/api/dass-depresi/${partisipanId}`
        );
        setHasilKlasifikasi(response.data);
        if (response.data.klasifikasi === "Depresi Parah") {
          fetchPsikologParah();
        } else if (response.data.klasifikasi === "Depresi Sangat Parah") {
          fetchPsikologSangatParah();
        }
      } catch (error) {
        setError("Failed to retrieve classification results");
      }
    };


    const fetchPsikologParah = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/psikolog"
        );
        setPsikologs(response.data);
      } catch (error) {
        console.error("Error fetching psikologs for Depresi Parah:", error);
      }
    };

    const fetchPsikologSangatParah = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/psikolog"
        );
        setPsikologs(response.data);
      } catch (error) {
        console.error(
          "Error fetching psikologs for Depresi Sangat Parah:",
          error
        );
      }
    };

    const fetchDailyInsights = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/daily_insight");
        setDailyInsights(response.data);
      } catch (error) {
        console.error("Error fetching daily insights:", error);
      }
    };

    fetchHasilKlasifikasi();
    fetchDailyInsights();
  }, []);

  const goToTesSuicide = () => {
    history.push("/suicidetest-user");
  };

  const handleNavigation = (path) => {
    history.push(path);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const renderDailyInsights = () => (
    <Row className="justify-content-center" style={{ marginBottom: "50px" }}>
      {dailyInsights.map((daily_insight) => (
        <Col key={daily_insight.id} md={4} className="my-3">
          <Card className="daily-insight-card">
            <Card.Img
              variant="top"
              src={`http://localhost:8080/images/daily_insight/${daily_insight.image}`}
              style={{ objectFit: "cover", height: "200px" }}
            />
            <Card.Body className="daily-insight-card-body">
              <Card.Title className="daily-insight-card-title">
                {daily_insight.judul_content}
              </Card.Title>
              <Card.Text className="daily-insight-card-content">
                {daily_insight.deskripsi.length > 100
                  ? daily_insight.deskripsi.substring(0, 100) + "..."
                  : daily_insight.deskripsi}
              </Card.Text>
              <div style={{ marginTop: "auto" }}>
                <Button variant="link" onClick={() => handleNavigation(`/dailyinsight-detail-user/${daily_insight.id}`)}>
                  Read More
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );

  // Fungsi untuk mengambil nama klasifikasi dan warna yang sesuai
  const getClassNameAndColor = () => {
    if (hasilKlasifikasi) {
      switch (hasilKlasifikasi.klasifikasi) {
        case 'Normal Depression':
          return { className: 'Normal Depression', color: '#FFBF78', image: normalImage }; // light orange
        case 'Mild Depression':
          return { className: 'Mild Depression', color: '#FFE8C8', image: ringanImage }; // light green
        case 'Moderate Depression':
          return { className: 'Moderate Depression', color: '#FB6D48', image: sedangImage }; // light pink
        case 'Severe Depression':
          return { className: 'Severe Depression', color: '#A7E6FF', image: beratImage }; // pink
        case 'Very Severe Depression':
          return { className: 'Very Severe Depression', color: '#D04848', image: sangatParahImage }; // pink
        default:
          return { className: '', color: '#ffffff', image: null };
      }
    }
    return { className: '', color: '#ffffff', image: null };
  };

  const points = hasilKlasifikasi ? hasilKlasifikasi.points : '';
  const klasifikasi = hasilKlasifikasi ? hasilKlasifikasi.klasifikasi : '';
  const { className, color, image } = getClassNameAndColor();


  return (
    <>
      <Navbar />
      <Container style={{ marginBottom: "50px", paddingTop: "10px" }}>
        <Container className="text-center mt-4">
          <h6 className="section-title mb-2 tfonts-2">
            <br />
            DASS Depression Test Classification Results
            <br />
          </h6>
          <Row className="justify-content-center mt-4">
            <Col md={8}>
              <Card style={{ backgroundColor: color }}>
                <Card.Body>
                  <Row>
                    <Col md={6} className="text-left">
                      {/* Gambar sesuai klasifikasi */}
                      {image && (
                        <img
                          src={image} // Path gambar diambil dari import
                          alt={klasifikasi}
                          style={{ maxWidth: '100%', maxHeight: '100%' }}
                        />
                      )}
                    </Col>
                    <Col md={6}>
                      <br></br><br></br><br></br><br></br>
                      <Card style={{ backgroundColor: 'white' }}>
                        <Card.Body>
                          <p style={{ fontWeight: 'bold', fontSize: '20px' }}>Your Total Points </p>
                          <Container style={{ backgroundColor: 'white', color: 'white', textAlign: 'center', padding: '10px', fontWeight: 'bold', fontSize: '25px' }}>
                            <strong>{points}</strong>
                          </Container>
                          <Container style={{ backgroundColor: color, color: 'black', textAlign: 'center', padding: '10px' }}>
                            <p style={{ fontWeight: 'bold', fontSize: '20px' }}> Classification: {klasifikasi}</p>
                          </Container>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                  {error && (
                    <Row className="mt-4">
                      <Col md={12}>
                        <p>{error}</p>
                      </Col>
                    </Row>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        {hasilKlasifikasi && (
          <Container className="mt-3 text-center d-flex justify-content-center">
            <Col md={10}>
              <div className="text-center mt-3">
                <h6 className="tfonts-2" style={{ marginBottom: "20px" }}>Recommendation:</h6>
                {hasilKlasifikasi && hasilKlasifikasi.klasifikasi === "Normal Depression" && (
                  <Container className="mt-3 text-center d-flex justify-content-center" style={{ marginBottom: "10px" }}>
                    <Col md={10} >
                      <Alert variant="white" style={{ fontSize: "18px" }}>
                        <h4 style={{ fontWeight: "bold" }}>WOW! Your Dass Depression Test results are normal.</h4>
                        <p style={{ marginBottom: "20px" }}>Try to get rid of the negative things that haunt your mind. Keep your mental health and let's continue to the daily article to maintain better health your mind!</p>
                        <br /> {renderDailyInsights()}
                        <Button variant="light"
                          className="custom-button"
                          style={{ borderRadius: "50px", fontWeight: "bold", padding: '15px 25px', fontSize: '17px' }}
                          onClick={() => handleNavigation('/dailyinsight-user')}>
                          Find More Daily Articles
                        </Button>
                      </Alert>
                    </Col>
                  </Container>
                )}
                {hasilKlasifikasi.klasifikasi === "Mild Depression" && (
                  <>
                    Stay calm and don't panic. Whatever the result, MentalWell is here to help you.
                    Let's follow the next step, which is intervention. If necessary,{" "}
                    <Link to="/intervention-stresscoping-user">
                      consult a psychologist or therapist
                    </Link>{" "}
                    for additional help.
                    <Row className="mt-3 justify-content-center">
                      <Col xs={6} md={3} lg={3} style={{ marginBottom: "20px" }}>
                        <Card className="h-100 card-hover" style={{ height: '350px', margin: '10px' }}>
                          <Card.Body className="d-flex align-items-center justify-content-center flex-column">
                            <img src={depresiRingan} alt="derepsiRingan" style={{ objectFit: "cover", width: "100%", height: "200px", borderRadius: "5px" }} />
                            <div className="mt-3">
                              <Card.Title style={{ fontSize: "18px" }}>Mild Depression Interventions</Card.Title>
                              <Card.Text style={{ fontSize: "12px" }}>Breathing and relaxation techniques to overcome mild depression and find peace in life.</Card.Text>
                              <Button variant="light" className="custom-button" style={{ backgroundColor: "#7F91D8" }} href="/detail-terapi">See More</Button>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row> </>)}
                {hasilKlasifikasi.klasifikasi === "Moderate Depression" && (
                  <>
                    Stay calm and don't panic. Whatever the result, MentalWell is here to help you.
                    Let's follow the next step, which is intervention. If necessary,{" "}
                    <Link to="/intervensi-stresscoping-user">
                      consult a psychologist or therapist
                    </Link>{" "}
                    for additional help.
                    <Row className="mt-3 text-center d-flex justify-content-center">
                      <Col xs={6} md={3} lg={3} style={{ marginBottom: "20px" }}>
                        <Card className="h-100 card-hover" style={{ marginLeft: '10px', height: '250px' }}>
                          <Card.Body className="d-flex align-items-center justify-content-center flex-column">
                            <img src={depresiSedang} alt="moderate depression" style={{ objectFit: "cover", width: "100%", height: "200px" }} />
                            <div className="mt-3">
                              <Card.Title style={{ fontSize: "18px" }}>Moderate Depression</Card.Title>
                              <Card.Text style={{ fontSize: "12px" }}>For those of you who are feeling depressed and your day is quite draining and you need help to recover.</Card.Text>
                              <Button variant="light" className="custom-button" style={{ backgroundColor: "#7F91D8" }} href="/cbt">See Interventions</Button>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </>
                )}
                {hasilKlasifikasi &&
                  (hasilKlasifikasi.klasifikasi === "Severe Depression" ||
                    hasilKlasifikasi.klasifikasi === "Very Severe Depression") && (
                    <Container className="mt-3">
                      <Row className="justify-content-center">
                        <h1 className="subtitle">
                          Oh No! You have a stressful condition that requires further treatment. Let's do a suicide test and get to know yourself better!
                        </h1>
                        <Card className="intervention-card mt-3 mb-4" style={{ width: "20rem" }}>
                          <Card.Img
                            variant="top"
                            src={suicide}
                            alt="Suicide Test"
                            style={{ objectFit: "cover", height: "200px" }}
                          />
                          <Card.Body className="text-center">
                            <Card.Title className="subtitle" style={{ fontWeight: "bold", fontSize: "1rem" }}>
                              Suicide Test
                            </Card.Title>
                            <Card.Text className="subtitle" style={{ fontSize: "0.9rem" }}>
                              For very severe stress conditions, we strongly recommend taking the Suicide Test immediately to get the right treatment.
                            </Card.Text>
                            <Button variant="danger" style={{ fontSize: "0.8rem" }} onClick={goToTesSuicide}>
                              Take the Test
                            </Button></Card.Body>
                        </Card>
                      </Row>
                    </Container>
                  )}
              </div>
            </Col>
          </Container>
        )}
        <Container>
          <Row className="justify-content-center">
            <Col md={10}>
              <Card className="about-us-card" style={{ backgroundColor: "#FFD2DD" }}>
                <Card.Body>
                  <h5 style={{ fontSize: "18px", color: "red", fontWeight: "bold" }}>
                    <FontAwesomeIcon icon={faExclamationTriangle} /> Disclaimer
                  </h5>
                  <p style={{ fontSize: "16px" }}>
                    <br /> This psychological test is not owned or created by the author himself, but based on references commonly used in clinical practice and has been validated.
                    The results of this test are very objective, for diagnosis it is necessary to consult a psychiatrist directly.
                  </p><br />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Container>
      <Footer />
    </>
  );
};

export default HasilDassDepresi;
