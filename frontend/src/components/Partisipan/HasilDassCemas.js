import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Navbar from "../landing/Navbar";
import Footer from "../landing/Footer";
import groundingTechniqueImg from "../images/intervensi/cemasringan1.png";
import mbsrImg from "../images/intervensi/cemassedang1.png";
import suicide from "../images/intervensi/suicide.png";
import suicideTestImg from "../images/Suicide.jpg";
import dailyInsightImg from "../images/suicide.png";
import normalImage from "../images/cemas/c-normal.jpg";
import ringanImage from "../images/cemas/c-ringan.jpg";
import sedangImage from "../images/cemas/c-sedang.jpg";
import beratImage from "../images/cemas/c-parah.jpg";
import sangatParahImage from "../images/cemas/c-sangat_parah.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

const HasilDassCemas = () => {
  const [hasilKlasifikasi, setHasilKlasifikasi] = useState(null);
  const [error, setError] = useState(null);
  const [intervensi, setIntervensi] = useState(null);
  const [dailyInsights, setDailyInsights] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const partisipanId = localStorage.getItem("partisipan_id");

    const fetchHasilKlasifikasi = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/dass-cemas/${partisipanId}`
        );
        setHasilKlasifikasi(response.data);
        determineIntervensi(response.data.klasifikasi);
      } catch (error) {
        setError("Failed to fetch classification results");      }
    };

    const fetchDailyInsights = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/daily_insight");
        setDailyInsights(response.data);
      } catch (error) {
        console.error("Error fetching daily insights:", error);
      }
    };

    
    
    const determineIntervensi = (klasifikasi) => {
      switch (klasifikasi) {
        case "Normal Anxiety":
          setIntervensi({
            image: dailyInsightImg,
            title: "Insight Harian",
            description:
            "Try to read daily articles to maintain your mental health.",
            link: "/dailyinsight-user",
          });
          break;
        case "Mild Anxiety":
          setIntervensi({
            image: groundingTechniqueImg,
            title: "Grounding Techniques",
            description:
            "Use grounding techniques to deal with any mild anxiety you are experiencing.",
            link: "/intervensi-grounding",
          });
          break;
        case "Moderate Anxiety":
          setIntervensi({
            image: mbsrImg,
            title: "Intervention MBSR",
            description:
            "Follow the MBSR program to reduce the moderate level of anxiety you are experiencing.",            link: "/intervensimindfulness-user",
          });
          break;
        case "Severe Anxiety":
          setIntervensi({
            image: suicide,
            title: "Tes  Bunuh Diri",
            description:
            "For severe cases of anxiety, do a suicide test and consult a psychologist or therapist immediately.",            link: "/suicidetest-user",
          });
          break;
          case "Very Severe Anxiety":
          setIntervensi({
            image: suicide,
            title: "Tes  Bunuh Diri",
            description:
            "For severe cases of anxiety, do a suicide test and consult a psychologist or therapist immediately.",            link: "/suicidetest-user",
          });
          break;
        default:
          setIntervensi(null);
          break;
      }
    };

    fetchHasilKlasifikasi();
    fetchDailyInsights();
  }, []);
  

  const handleNavigation = (path) => {
    history.push(path);
  };

  const getClassNameAndColor = () => {
    if (hasilKlasifikasi) {
      switch (hasilKlasifikasi.klasifikasi) {
        case "Normal Anxiety":
          return { className: "Normal Anxiety", color: "#E88D67", image: normalImage }; // light orange
          case "Mild Anxiety":
          return { className: "Mild Anxiety", color: "#FD9B63", image: ringanImage }; // light green
          case "Moderate Anxiety":
          return { className: "Moderate Anxiety", color: "#A7E6FF", image: sedangImage }; // light pink
          case "Severe Anxiety":
          return { className: "Severe Anxiety", color: "#EE4E4E", image: beratImage }; // pink
          case "Very Severe Anxiety":
          return { className: "Very Severe Anxiety", color: "#FF9F66", image: sangatParahImage }; // merah muda
        default:
          return { className: "", color: "#ffffff", image: null };
      }
    }
    return { className: "", color: "#ffffff", image: null };
  };

  const points = hasilKlasifikasi ? hasilKlasifikasi.points : "";
  const klasifikasi = hasilKlasifikasi ? hasilKlasifikasi.klasifikasi : "";
  const { className, color, image } = getClassNameAndColor();

  const renderIntervensi = () => {
    if (!intervensi) return null;

    return (

      <Row className="mt-3 text-center d-flex justify-content-center">
        <Col md={7}>
          <Card className="h-100" style={{ margin: "10px", backgroundColor: "color" }}>
            <Card.Body className="d-flex align-items-center justify-content-center flex-column">
              <img
                src={intervensi.image}
                alt={intervensi.title}
                style={{ objectFit: "cover", width: "90%", height: "200px" }}
              />
              <div className="mt-3">
                <Card.Title style={{ fontSize: "18px" }}>{intervensi.title}</Card.Title>
                <Card.Text style={{ fontSize: "12px" }}>{intervensi.description}</Card.Text>
                <Button
                  variant="light"
                  className="custom-button"
                  style={{ backgroundColor: "#7F91D8" }}
                  onClick={() => handleNavigation(intervensi.link)}
                >
                  See More
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  };

  const renderDailyInsights = () => (
    <Row className="justify-content-center mt-3">
      {dailyInsights.map((dailyInsight) => (
        <Col key={dailyInsight.id} md={4} className="my-3">
          <Card className="daily-insight-card">
            <Card.Img
              variant="top"
              src={`http://localhost:8080/images/daily_insight/${dailyInsight.image}`}
              style={{ objectFit: "cover", height: "200px" }}
            />
            <Card.Body className="daily-insight-card-body">
              <Card.Title className="daily-insight-card-title">
                {dailyInsight.judul_content}
              </Card.Title>
              <Card.Text className="daily-insight-card-content">
                {dailyInsight.deskripsi.length > 100
                  ? dailyInsight.deskripsi.substring(0, 100) + "..."
                  : dailyInsight.deskripsi}
              </Card.Text>
              <div style={{ marginTop: "auto" }}>
                <Button
                  variant="link"
                  onClick={() =>
                    handleNavigation(`/dailyinsight-detail-user/${dailyInsight.id}`)
                  }
                >
                  Read More
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );

  return (
    <>
      <Navbar />
      <Container className="mt-5" style={{ marginBottom: "50px" }}>
        <Container className="text-center mt-4">
          <h6 className="section-title mb-2 tfonts-2">
            <br />
            DASS Anxiety Test Classification Results
            <br />
          </h6>          <Row className="justify-content-center mt-4">
            <Col md={8}>
              <Card style={{ backgroundColor: color }}>
                <Card.Body>
                  <Row>
                    <Col md={6} className="text-left">
                      {image && (
                        <img
                          src={image}
                          alt={className}
                          style={{ maxWidth: "100%", maxHeight: "100%" }}
                        />
                      )}
                    </Col>
                    <Col md={6}>
                      <Card style={{ backgroundColor: "white" }}>
                        <Card.Body>
                          <h4 style={{ fontWeight: "bold" }}>Your total points</h4>
                          <Container
                            style={{
                              backgroundColor: "white",
                              color: "black",
                              textAlign: "center",
                              padding: "10px",
                              fontWeight: "bold",
                              fontSize: "25px",
                            }}
                          >
                            <strong>{points}</strong>
                          </Container>
                          <Container
                            style={{
                              backgroundColor: color,
                              color: "black",
                              textAlign: "center",
                              padding: "10px",
                              fontWeight: "bold",
                              fontSize: "25px",
                              marginTop: "10px",
                            }}
                          >
                            <strong>{klasifikasi}</strong>
                          </Container>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        {error ? (
          <Alert variant="danger" className="mt-4 text-center">
            {error}
          </Alert>
        ) : (
          <Container className="mt-4 text-center">
            <Col md={12} className="d-flex flex-column align-items-center justify-content-center">
              <h4 className="section-title  tfonts-2">
                Rekomendasi Intervensi
              </h4>
              Stay calm and don't panic. Whatever the outcome, MentalWell is here to help you.
              Let's follow the next steps to get to know yourself better.

              {/* <h1 style={{marginTop:"10px"}}>
                Tetap tenang dan jangan panik. Apapun hasilnya, MentalWell hadir untuk membantumu.
                <br/>Yuk ikuti intervensi berikut untuk mengurangi rasa cemas yang kamu alami.
              </h1> */}
              {renderIntervensi()}
              {klasifikasi === "Normal Anxiety" && (
                <>
                  <Alert variant="info" className="mt-4 text-center">
                    <p>
                    Keeping your mental health stable is very important.
                    Read more about tips to maintain your mental health and find more daily articles to strengthen your mental health.
                    </p>
                  </Alert>
                  {renderDailyInsights()}
                </>
              )}
             
            </Col>
          </Container>
        )}

      </Container>
      <Container style={{ marginBottom: "30px" }}>
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
      <Footer />
    </>
  );
};

export default HasilDassCemas;
