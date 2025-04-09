import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../landing/Navbar";
import Footer from "../landing/Footer";
import "../style/Intervensi.css";
import rendahImage from '../images/suicide/d-ada.jpg';
import sedangImage from '../images/suicide/d-ada.jpg';
import tinggiImage from '../images/suicide/d-ada.jpg';
import tidakImage from '../images/suicide/d-tidak ada.jpg';

const HasilSuicide = () => {
  const [hasilSuicide, setHasilSuicide] = useState(null);
  const [error, setError] = useState(null);
  const [psikologs, setPsikologs] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const partisipanId = localStorage.getItem("partisipan_id");

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/suicide/answer/${partisipanId}`);
        setHasilSuicide(response.data);
        fetchPsikologs();
      } catch (error) {
        setError("Failed to retrieve suicide test results");
      }
    };

    const fetchPsikologs = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/psikolog");
        setPsikologs(response.data);
      } catch (error) {
        console.error("Error fetching psikologs:", error);
      }
    };

    fetchData();
  }, []);


  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const getClassNameAndColor = () => {
    if (hasilSuicide) {
      switch (hasilSuicide.klasifikasi) {
        case 'Low Suicide Risk':
          return { className: 'Low Suicide Risk', color: '#B5C0D0', image: rendahImage }; // light orange
          case 'Medium Suicide Risk':
          return { className: 'Medium Suicide Risk', color: '#B5C0D0' , image: sedangImage }; // light green
          case 'High Suicide Risk':
          return { className: 'High Suicide Risk', color: '#B5C0D0', image: tinggiImage }; // light pink
          case 'No Suicide Risk':
          return { className: 'No Suicide Risk', color: '#BFA2DB', image: tidakImage }; // pink
          default:
          return { className: '', color: '#ffffff' , image : null};
      }
    }
    return { className: '', color: '#ffffff', image : null };
  };


  const klasifikasi = hasilSuicide ? hasilSuicide.klasifikasi : '';
  const { className, color, image } = getClassNameAndColor();


  return (
    <>
      <Navbar />
      <Container  style={{ marginBottom: "50px" }}>
      <Container className="text-center mt-4">
      <h6 className="section-title mb-2 tfonts-2">
        <br />
        Suicide Test Result
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
                      <Container style={{ backgroundColor: color , color: 'black', textAlign: 'center', padding: '10px' }}>
                        <p style={{ fontWeight: 'bold', fontSize: '20px' }}> 
                            {klasifikasi &&
                              (hasilSuicide.klasifikasi === "Low Risk of Suicide" ||
                                hasilSuicide.klasifikasi === "No Risk of Suicide"
                                ? "You are not at risk of suicide. But your level is severe."
                                  : "You are at risk of suicide.")}
                        </p>
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

      </Container>

      <Container className="mt-3 text-center d-flex justify-content-center" style={{ marginBottom: "50px" }}>
        <Col md={10}>
          <div className="text-center mt-3">
            <h6 className="tfonts-2" style={{marginBottom:"20px"}}>Psychologist Recommendations:</h6>
            <Row>
              {psikologs.slice(0, 3).map((psikolog) => (
                <Col key={psikolog.id_psikolog} md={4}>
                  <a href={psikolog.url_psikolog} target="_blank" rel="noopener noreferrer" className="psikolog-link">
                    <Card className="mb-3">
                      <Card.Body>
                        <Row>
                          <Col md={4}>
                            <Card.Img
                              src={`http://localhost:8080/images/psikolog/${psikolog.image_psikolog}`} 
                              alt={psikolog.nama_psikolog}
                              style={{ borderRadius: "15%", width: "100px", height: "100px" }}
                            />
                          </Col>
                          <Col md={8}>
                            <Card.Title>{psikolog.nama_psikolog}</Card.Title>
                            <Card.Text>
                              Location: {psikolog.lokasi_psikolog}<br />
                              Phone: {psikolog.telephone_psikolog}
                            </Card.Text>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </a>
                </Col>
              ))}
            </Row>
            <Button variant="light"
                    className="custom-button"
                    style={{
                      borderRadius: "50px",
                      fontWeight: "bold",
                      padding: '15px 25px',
                      fontSize: '17px'}}
                       onClick={() => history.push("/psikolog-list")}>
              View More Psychologist Listings
            </Button>
          </div>
        </Col>
      </Container>

      <Container>
          <Row className="justify-content-center" style={{marginBottom:"50px"}}>
            <Col md={10}>
              <Card
                className="about-us-card"
                style={{ backgroundColor: "#FFD2DD" }}
              >
                <Card.Body>
                  <h5
                    style={{
                      fontSize: "18px",
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    <FontAwesomeIcon icon={faExclamationTriangle} /> Disclaimer
                  </h5>
                  <p style={{ fontSize: "16px" }}>
                    <br /> This psychological test is not owned or created by the author himself, but is based on references commonly used in clinical practice and has been validated. 
                    The results of this test are very objective, for diagnosis it is necessary to consult a psychiatrist directly.
                  </p>
                  <br />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      <Footer />
    </>
  );
};

export default HasilSuicide;
