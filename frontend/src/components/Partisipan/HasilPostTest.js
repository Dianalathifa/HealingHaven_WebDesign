import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../landing/Navbar";
import Footer from "../landing/Footer";

const HasilPrediksi = () => {
  const [hasilPrediksi, setHasilPrediksi] = useState(null);
  const [srqPoints, setSrqPoints] = useState(null);
  const history = useHistory();

  const partisipanNama = localStorage.getItem('partisipan_nama') || 'Nama Partisipan';

  useEffect(() => {
    const partisipanId = localStorage.getItem('partisipan_id');

    const ambilHasilPrediksi = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/hasil-prediksi/partisipan/${partisipanId}`);
        setHasilPrediksi(response.data);

        const srqResponse = await axios.get(`https://algoritma.mentalwell.id/dapatkan_hasil_prediksi_terbaru/${partisipanId}`);
        setSrqPoints(srqResponse.data.points);
      } catch (error) {
        console.error('Gagal mengambil hasil prediksi atau poin SRQ:', error);
      }
    };

    ambilHasilPrediksi();
  }, []);

  const handleNavigation = (url) => {
    history.push(url);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const compareResults = () => {
    if (hasilPrediksi && srqPoints !== null) {
      if (hasilPrediksi.points < srqPoints) {
        return 'Your condition has improved.';
} else if (hasilPrediksi.points > srqPoints) {
return 'Your condition is getting worse.';
} else {
return 'Your condition is still the same';
      }
    }
    return 'No data';
  };

  return (
    <>
      <Navbar />
      <Container style={{ marginBottom: "50px", marginTop: "150px" }}>
        <div className="container text-center">
          <h6 className="section-title mb-2 tfonts-2">
          Post Test Results
          </h6>
        </div>
        <Row className="justify-content-center">
          <Col md={10}>
            <Card>
              <Card.Body>
                {hasilPrediksi ? (
                  <>
                    <Table bordered striped responsive className="mb-4">
                      <tbody>
                        <tr>
                          <td><strong>Test Date:</strong></td>
                          <td>{formatDate(hasilPrediksi.tanggal_tes)}</td>
                        </tr>
                        <tr>
                          <td><strong>Partisipan Name:</strong></td>
                          <td>{partisipanNama}</td>
                        </tr>
                        <tr>
                          <td><strong>Points:</strong></td>
                          <td>{hasilPrediksi.points}</td>
                        </tr>
                        <tr>
                          <td><strong>Mental Disorders:</strong></td>
                          <td>{hasilPrediksi.mental_disorders ? 'Ya' : 'Tidak'}</td>
                        </tr>
                        <tr>
                          <td><strong>Klasifikasi:</strong></td>
                          <td>{hasilPrediksi.klasifikasi}</td>
                        </tr>
                        <tr>
                          <td><strong>Comparison with SRQ Test:</strong></td>
                          <td>{compareResults()}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </>
                ) : (
                  <p>Loading...</p>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row className="justify-content-center">
          <Col md={10}>
            <Card className="about-us-card" style={{ backgroundColor: "#FFD2DD", marginBottom: "50px" }}>
              <Card.Body>
                <h5 style={{ fontSize: "20px", color: "red", fontWeight: "bold" }}>
                  <FontAwesomeIcon icon={faExclamationTriangle} /> Disclaimer
                </h5>
                <p style={{ fontSize: "18px" }}>
                  <br></br>This psychological test is not owned or created by the author himself, but is based on references commonly used in clinical practice and has been validated. 
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

export default HasilPrediksi;
