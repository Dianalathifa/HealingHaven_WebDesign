import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../landing/Footer.js";
import Navbar from "../landing/Navbar.js";
import suicide from "../images/suicide.png"; // Import the image
import suicide1 from "../images/suicide1.png"; // Import the image
import "../style/Intervensi.css";

const SadPersonScaleDetail = () => {
  return (
    <div>
      <Navbar />
      <section id="suicide-sad-person-scale" className="section before-content mt-5" style={{ backgroundColor:"#C4EAF4", color: "#141313", fontFamily: "Abril Fatface", marginTop: "-140px", paddingTop: "200px" }}>
        <Col md={11} className="d-flex align-items-center justify-content-center">
          <div className="container text-left">
            <h6 className="section-title mb-2 tfonts" style={{ marginLeft:"40px" }}>Kuisioner Modified <br/>Sad Person Scale</h6>
            <h6 className="subtitle-suicide" style={{ fontSize: "28px", marginLeft:"40px" }}>
              Modified Sad Person Scale adalah salah satu alat yang dapat digunakan untuk menentukan adanya risiko bunuh diri pada seseorang. 
              Alat ukur ini merupakan modifikasi dari Sad Person Scale yang dikembangkan oleh Patterson et al.
            </h6>
          </div>
          <img src={suicide} alt="Sad Person Scale" style={{ borderRadius:"40px",width: "400px", height: "400px", marginRight:"-50px" }} />
        </Col>
      </section>
      <hr />
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={4} className="d-flex align-items-center justify-content-center">
             <img src={suicide1} alt="Konsultasi Dokter" style={{ maxWidth: "100%", maxHeight: "100%" }} /> 
          </Col>
          <Col md={6}>
    
            <p style={{ fontSize: "25px", marginTop: "40px" }}>
              Beberapa contoh penerapan penggunaan Modified Sad Person Scale 
              <br></br>adalah untuk menilai risiko bunuh diri pada pasien yang berkonsultasi 
              dengan dokter atau psikiater, penilaian risiko bunuh diri pada pasien rawat inap di rumah sakit jiwa, penilaian risiko bunuh diri 
              pada pasien rawat jalan di puskesmas atau klinik kesehatan jiwa, penilaian risiko bunuh diri pada pasien yang mendapatkan layanan konseling, 
              dan lain sebagainya.
            </p>
          </Col>
        </Row>
      </Container>
      <Container className="my-5">
        <Col md={10} className="d-flex align-items-center justify-content-center" style={{marginLeft:"100px", marginTop:"50px", marginBottom:"50px"}}>
          <p style={{ fontSize: "25px", textAlign: "justify" }}>
            Modified Sad Person Scale terdiri dari beberapa pertanyaan yang dinilai oleh tenaga kesehatan profesional untuk menilai risiko bunuh diri. 
            Pertanyaan-pertanyaan tersebut mencakup faktor-faktor yang dianggap memiliki hubungan dengan risiko bunuh diri.
          </p>
        </Col>
      </Container>
      <Container className="my-6">
        <Row className="justify-content-center">
          <Col md={10}>
            <Card className="about-us-card" style={{ backgroundColor: "#FFD2DD" }}>
              <Card.Body>
                <h5 style={{ fontSize: "30px", color:"#25B7D3", fontWeight: "bold" }}>Petunjuk Pengisian :</h5><br></br>
                <p style={{ fontSize: "25px" }}>
                  1. Dapat dijawab oleh petugas/keluarga/teman atau user yang mengerti dengan pertanyaan &nbsp;&nbsp;&nbsp;&nbsp;yang tertera pada kuisioner dibawah ini.
                  <br />
                  2. Jawablah semua pertanyaan sesuai dengan kondisi saat ini yang anda alami atau rasakan.
                  <br />
                  3. Setiap jawaban yang dijawab akan mendapatkan skor.
                  <br />
                  4. Hasil dari penilaian akan digunakan sebagai dasar untuk menentukan langkah-langkah &nbsp;&nbsp;&nbsp;&nbsp;intervensi atau tindakan lebih lanjut.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container>
        <Col md={14} className="text-center">
          <Link to="/suicidetest-user">
            <Button 
            variant="light"
            className="custom-button" // Tambahkan kelas custom-button di sini
            style={{
              borderRadius: "50px",
              fontWeight: "bold",
              padding: '20px 35px', // Atur padding untuk mengatur ukuran tombol
              fontSize: '25px' // Atur ukuran font teks tombol
            }}
            >Mulai Tes Suicide</Button>
          </Link>
        </Col>
      </Container>
      <hr />
      <Footer />
    </div>
  );
};

export default SadPersonScaleDetail;
