import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Alert, Button, Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import "../style/Intervensi.css";
import Navbar from "../landing/Navbar";
import cemasImage from "../images/dass42-cemas.jpg"; // Import image for anxiety
import happy from "../images/hasilKlasifikasi/happy.jpg"; // Import gambar untuk mental_disorders === 0
import sad from "../images/hasilKlasifikasi/sad.jpg"; // Import gambar untuk mental_disorders !== 0

const HasilKlasifikasi = () => {
  const [hasilKlasifikasi, setHasilKlasifikasi] = useState(null);
  const [dailyInsights, setDailyInsights] = useState([]);
  const history = useHistory();

  const partisipanNama = localStorage.getItem('partisipan_nama') || 'Nama Partisipan';

  useEffect(() => {
    const partisipanId = localStorage.getItem('partisipan_id');

    const ambilHasilKlasifikasi = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/hasil-prediksi-terbaru/${partisipanId}`);
        setHasilKlasifikasi(response.data);
      } catch (error) {
        console.error('Gagal mengambil hasil klasifikasi:', error);
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

    ambilHasilKlasifikasi();
    fetchDailyInsights();
  }, []);

  const handleNavigation = (url) => {
    history.push(url);
  };



  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const renderDailyInsights = () => (
    <Row className="justify-content-center" style={{ marginBottom: "50px", padding: "50px" }}>
      {dailyInsights.map((daily_insight) => (
        <Col key={daily_insight.id} xs={12} sm={6} md={4} lg={3} className="my-3">
          <Card className="daily-insight-card" style={{ width: "100%", height: "100%", borderRadius: "10px" }}>
            <Card.Img
              variant="top"
              src={`http://localhost:8080/images/daily_insight/${daily_insight.image}`}
              style={{ objectFit: "cover", height: "150px", width: "100%", borderRadius: "10px 10px 0 0" }}
            />
            <Card.Body className="daily-insight-card-body" style={{ padding: "15px", display: "flex", flexDirection: "column", height: "150px" }}>
              <Card.Title className="daily-insight-card-title" style={{ fontSize: "0.9rem", marginBottom: "5px" }}>
                {daily_insight.judul_content.length > 50
                  ? daily_insight.judul_content.substring(0, 50) + "..."
                  : daily_insight.judul_content}
              </Card.Title>
              <Card.Text className="daily-insight-card-content" style={{ fontSize: "0.75rem", flexGrow: 1 }}>
                {daily_insight.deskripsi.length > 50
                  ? daily_insight.deskripsi.substring(0, 50) + "..."
                  : daily_insight.deskripsi}
              </Card.Text>
              <div style={{ marginTop: "auto" }}>
                <Button variant="link" style={{ fontSize: "0.75rem" }} onClick={() => handleNavigation(`/dailyinsight-detail-user/${daily_insight.id}`)}>
                  Baca Selengkapnya
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
      <Container style={{ marginBottom: "20px", paddingTop: "10px" }}>
      </Container>

      {hasilKlasifikasi && (
        <Container className="mt-3 text-center d-flex justify-content-center" style={{ marginBottom: "50px" }}>
          <Col md={10}>
            {hasilKlasifikasi.mental_disorders === 0 && (
              <>
                <Alert variant="white" style={{ fontSize: "25px", textAlign: "left" }}>
                  <Row className="align-items-center">
                    <Col xs={12} md={6}>
                      <img src={happy} alt="Healthy" style={{ width: "400px" }} />
                    </Col>
                    <Col xs={12} md={6} className="d-flex flex-column justify-content-center align-items-center">
                      <div style={{ textAlign: "center" }}>
                        <h4 style={{ fontWeight: "bold", color: "red", marginBottom: "15px", fontSize: "25px" }}>WAH! Hasil Tes Kesehatanmu Sangat Baik</h4>
                        <p style={{ marginBottom: "10px" }}> Selamat, kamu memiliki mental yang sehat. Tetap jaga kesehatan mentalmu!</p>
                        <p style={{ marginBottom: "10px", fontWeight: "bold" }}> Kamu bisa melakukan eksplorasi tentang kesehatan mental melalui Artikel Harian</p>
                      </div>
                    </Col>    {renderDailyInsights()}


                  </Row><div className="mt-3 d-flex justify-content-center">
                    <Button
                      variant="light"
                      className="custom-button"
                      style={{
                        borderRadius: "50px",
                        fontWeight: "bold",
                        padding: '15px 25px',
                        fontSize: '17px',
                        minWidth: '250px'  // Set minimum width to ensure button is not too narrow
                      }}
                      onClick={() => handleNavigation('/dailyinsight-user')}
                    >
                      Temukan Lebih Banyak Artikel Harian
                    </Button>
                  </div>


                </Alert>
              </>
            )}
            {hasilKlasifikasi.klasifikasi === "Cemas" && (
              <Alert variant="white" style={{ fontSize: "25px" }}>
                <Row className="align-items-center">
                  <Col xs={15} md={6}>
                    <img src={sad} alt="Mental Disorder" style={{ width: "400px" }} />
                  </Col>

                  <Col xs={12} md={6}>
                    <div style={{ textAlign: "left" }}>
                      <h4 style={{ fontWeight: "bold", color: "red", marginBottom: "15px", fontSize: "25px" }}>Oh Tidak! <br></br>Kamu menderita gangguan kesehatan mental dengan klasifikasi Cemas</h4>
                      <p style={{ marginBottom: "10px" }}>Namun jangan bersedih, bersama MentalWell kamu pasti bisa sembuh.</p>
                      <p style={{ marginBottom: "10px", fontWeight: "bold" }}>Mari ikuti tes DASS-42 untuk memastikan kondisi tingkatan Kecemasanmu.</p>
                    </div><div className="mt-3 d-flex justify-content-center">
                    <Button
                      variant="light"
                      className="custom-button"
                      style={{
                        borderRadius: "50px",
                        fontWeight: "bold",
                        padding: '15px 20px',
                        fontSize: '17px',
                        minWidth: '80px'  
                      }}
                      onClick={() => handleNavigation('/dass42cemas-user')}>
                    Lanjutkan ke Tes DASS-42 (Cemas)
                    </Button>
                  </div>
                  </Col>
                 
                  
                </Row>
              </Alert>

            )}
            {hasilKlasifikasi.klasifikasi === "Depresi" && (
              <Alert variant="white" style={{ fontSize: "25px" }}>
                <Row className="align-items-center">
                  <Col xs={15} md={6}>
                    <img src={sad} alt="Mental Disorder" style={{ width: "400px" }} />
                  </Col>

                  <Col xs={12} md={6}>
                    <div style={{ textAlign: "left" }}>
                      <h4 style={{ fontWeight: "bold", color: "red", marginBottom: "15px", fontSize: "25px" }}>Oh Tidak! <br></br>Kamu menderita gangguan kesehatan mental dengan klasifikasi Depresi</h4>
                      <p style={{ marginBottom: "10px" }}>Namun jangan bersedih, bersama MentalWell kamu pasti bisa sembuh.</p>
                      <p style={{ marginBottom: "10px", fontWeight: "bold" }}>Mari ikuti tes DASS-42 untuk memastikan kondisi tingkatan Depresimu.</p>
                    </div>
                    <div className="mt-3 d-flex justify-content-center">
                    <Button
                      variant="light"
                      className="custom-button"
                      style={{
                        borderRadius: "50px",
                        fontWeight: "bold",
                        padding: '15px 25px',
                        fontSize: '17px',
                        minWidth: '250px'  // Set minimum width to ensure button is not too narrow
                      }}
                      onClick={() => handleNavigation('/dass42depresi-user')}>
                      Lanjutkan ke Tes DASS-42 (Depresi)
                    </Button>
                  </div>
                  </Col>
                  
                </Row>
              </Alert>
            )}
            {hasilKlasifikasi.klasifikasi === "Stress" && (
              <Alert variant="white" style={{ fontSize: "25px" }}>
                <Row className="align-items-center">
                  <Col xs={15} md={6}>
                    <img src={sad} alt="Mental Disorder" style={{ width: "400px" }} />
                  </Col>

                  <Col xs={12} md={6}>
                    <div style={{ textAlign: "left" }}>
                      <h4 style={{ fontWeight: "bold", color: "red", marginBottom: "15px", fontSize: "25px" }}>Oh Tidak! <br></br>Kamu menderita gangguan kesehatan mental dengan klasifikasi Stress</h4>
                      <p style={{ marginBottom: "10px" }}>Namun jangan bersedih, bersama MentalWell kamu pasti bisa sembuh.</p>
                      <p style={{ marginBottom: "10px", fontWeight: "bold" }}>Mari ikuti tes DASS-42 untuk memastikan kondisi tingkat stressmu.</p>
                    </div><div className="mt-3 d-flex justify-content-center">
                    <Button
                      variant="light"
                      className="custom-button"
                      style={{
                        borderRadius: "50px",
                        fontWeight: "bold",
                        padding: '15px 20px',
                        fontSize: '17px',
                        minWidth: '80px'  
                      }}
                      onClick={() => handleNavigation('/dass42stress-user')}>
                    Lanjutkan ke Tes DASS-42 (Stress)
                    </Button>
                  </div>
                  </Col>
                 
                  
                </Row>
              </Alert>

            )}

          </Col>
        </Container>
      )}
      <Container>
        <Row className="justify-content-center">
          <Col md={10}>
            <Card className="about-us-card" style={{ backgroundColor: "#FFD2DD", marginBottom: "50px" }}>
              <Card.Body>
                <h5 style={{ fontSize: "18px", color: "red", fontWeight: "bold" }}>
                  <FontAwesomeIcon icon={faExclamationTriangle} /> Disclaimer
                </h5>
                <p style={{ fontSize: "16px" }}>
                  <br></br>Psikotes ini bukan milik atau buatan penulis sendiri, namun berdasarkan referensi yang biasa digunakan di praktek klinis dan sudah divalidasi.
                  Hasil tes ini sangat bersifat objektif, untuk diagnosis diperlukan langsung dengan psikiater.
                </p><br />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HasilKlasifikasi;
