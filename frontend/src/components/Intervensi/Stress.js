import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Navbar from "../landing/Navbar.js";
import stressSedang from "../images/intervensi/streesringan1.png";
import stressRingan from "../images/intervensi/streessedang1.png";
import '../style/Intervensi.css'; // Import file CSS that contains hover styles

const Stress = () => {
    return (
        <div>
            <Navbar />
            <br />
            <section id="intervensi-list" className="section before-content" style={{ color: "white", marginTop: "-140px", paddingTop: "350px" }}>
                <div className="container text-center">
                    <h6 className="section-title mb-2 tfonts-2" style={{color:"#F5A5AD"}}>Selamat Datang <br/>di Halaman Intervensi Stress!</h6>
                    <h6 className="subtitle" style={{ fontSize: "18px", color: "#F5A5AD" }}>
                    Di sini, intervensi stres dibagi menjadi dua kategori: ringan dan sedang. 
                    <br/>Klik untuk memulai dan semoga langkah ini membantu Anda menemukan kedamaian dan keseimbangan yang Anda butuhkan.
                    </h6>
                </div>
            </section>
            <br /><br /><br />

            <section style={{backgroundColor: "#F5A5AD"}}>
            <Container className="my-3" style={{  paddingTop:"50px", paddingBottom:"60px"}}>
                <Row className="justify-content-center">
                    <Col xs={6} md={3} lg={3}>
                        <Card className="h-100 card-hover" style={{ marginRight: '10px', height: '350px' }}>
                            <Card.Body className="d-flex align-items-center justify-content-center flex-column">
                                <img src={stressRingan} alt="stressRingan" style={{ objectFit: "cover", width: "100%", height: "200px", borderRadius:"5px"  }} />
                                <div className="mt-3">
                                    <Card.Title style={{ fontSize: "18px" }}>Stress Ringan</Card.Title>
                                    <Card.Text style={{ fontSize: "12px" }}>Melakukan Stress Coping Strategies untuk mengatasi stress ringan yang kamu alami dan meningkatkan kesejahteraan mental anda.</Card.Text>
                                    <Button variant="light" className="custom-button" style={{ backgroundColor: "#F5A5AD"}} href="/stress-detail">Lihat Intervensi</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={6} md={3} lg={3}>
                        <Card className="h-100 card-hover" style={{ marginLeft: '10px', height: '350px' }}>
                            <Card.Body className="d-flex align-items-center justify-content-center flex-column">
                                <img src={stressSedang} alt="stressSedang" style={{ objectFit: "cover", width: "100%", height: "200px", borderRadius:"5px"  }} />
                                <div className="mt-3">
                                    <Card.Title style={{ fontSize: "18px" }}>Stress Sedang</Card.Title>
                                    <Card.Text style={{ fontSize: "12px" }}>Melakukan Challenge 30 Days Writing untuk mengatasi stress dalam skala sedang dan meningkatkan kesejahteraan mental anda.</Card.Text>
                                    <Button variant="light" className="custom-button" style={{ backgroundColor: "#F5A5AD"}}  href="/intervensi30days-user">Lihat Intervensi</Button>
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

export default Stress;
