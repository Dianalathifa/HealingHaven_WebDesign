import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Navbar from "../landing/Navbar.js";
import cemasSedang from "../images/intervensi/cemassedang1.png";
import cemasRingan from "../images/intervensi/cemasringan1.png"; // Import gambar
import '../style/Intervensi.css'; // Import file CSS yang berisi style hover

const Cemas = () => {
    return (
        <div>
            <Navbar />
            <br />
            <section id="intervensi-list" className="section before-content" style={{ color: "#7F91D8", marginTop: "-140px", paddingTop: "350px", paddingBottom: "100px" }}>
                <div className="container text-center">
                    <h6 className="section-title mb-2 tfonts-2" style={{ fontSize: "20px", color: "#7F91D8" }} >Selamat Datang <br />di Halaman Intervensi Cemas!</h6>
                    <h6 className="subtitle-cemas" style={{ fontSize: "18px", color: "#7F91D8" }}>
                        Di sini, intervensi cemas dibagi menjadi dua kategori: ringan dan  sedang. <br /> Klik untuk memulai dan semoga langkah ini membantu Anda  menemukan ketenangan dan kenyamanan yang Anda cari.
                    </h6>
                </div>
            </section>
            <section style={{ backgroundColor: "#7F91D8" }}>
                <Container md={3} className="my-3" style={{ paddingTop:"60px",paddingBottom: "60px" }}>
                    <Row className="justify-content-center">
                        <Col xs={6} md={3} lg={3}>
                            <Card className="h-100 card-hover" style={{ height: '350px', margin: '10px' }}>
                                <Card.Body className="d-flex align-items-center justify-content-center flex-column">
                                    <img src={cemasRingan} alt="cemasRingan" style={{ objectFit: "cover", width: "100%", height: "200px", borderRadius: "5px" }} />
                                    <div className="mt-3">
                                        <Card.Title style={{ fontSize: "18px" }}>Intervensi Cemas Ringan</Card.Title>
                                        <Card.Text style={{ fontSize: "12px" }}>Melakukan Teknik Grounding 5-4-3-2-1 untuk mengatasi cemas dalam skala ringan dan temukan ketenangan dalam hidup.</Card.Text>
                                        <Button variant="light" className="custom-button" style={{ backgroundColor: "#7F91D8" }} href="/intervensigrounding-user">Lihat Selengkapnya</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={6} md={3} lg={3}>
                            <Card className="h-100 card-hover" style={{ height: '350px', margin: '10px' }}>
                                <Card.Body className="d-flex align-items-center justify-content-center flex-column">
                                    <img src={cemasSedang} alt="cemasSedang" style={{ objectFit: "cover", width: "100%", height: "200px", borderRadius: "5px" }} />
                                    <div className="mt-3">
                                        <Card.Title style={{ fontSize: "18px" }}>Intervensi Cemas Sedang</Card.Title>
                                        <Card.Text style={{ fontSize: "12px" }}>Mindfulness-Based Stress Reduction intervensi untuk mengatasi cemas skala sedang dan temukan ketenangan dalam hidup anda.</Card.Text>
                                        <Button variant="light" className="custom-button" style={{ backgroundColor: "#7F91D8" }} href="/intervensimindfulness-user">Lihat Selengkapnya</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                </section>
        </div>
    );
};

export default Cemas;
