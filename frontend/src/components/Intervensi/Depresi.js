import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Navbar from "../landing/Navbar.js";
import depresiringan from "../images/intervensi/depresiringan1.png";
import depresisedang from "../images/intervensi/depresisedang1.png";
import '../style/Intervensi.css'; // Import file CSS yang berisi style hover

const Depresi = () => {
    return (
        <div>
            <Navbar />
            <br />
            <section id="intervensi-list" className="section before-content" style={{  color: "#7F91D8", paddingTop: "10px" }}>
                <div className="container text-center">
                    <h6 className="section-title mb-2 tfonts" >Selamat Datang <br/>di Halaman Intervensi Depresi!</h6>
                    <h6 className="subtitle" style={{ fontSize: "18px", color: "#7F91D8" }}>
                    Di sini, intervensi depresi dibagi menjadi dua kategori: ringan dan sedang. <br/> Klik untuk memulai dan semoga langkah ini membantu Anda menemukan cahaya dan kebahagiaan yang Anda butuhkan.                        </h6>
                </div>
            </section>

            <section style={{backgroundColor: "#C5C0FC80"}}>
            <Container className="my-3" style={{ paddingTop:"60px", paddingBottom:"60px"}}>
                <Row className="justify-content-center">
                    <Col xs={6} md={3} lg={3}>
                        <Card className="h-100 card-hover" style={{ marginRight: '10px', height: '250px' }}>
                            <Card.Body className="d-flex align-items-center justify-content-center flex-column">
                                <img src={depresiringan} alt="depresiRingan" style={{ objectFit: "cover", width: "100%", height: "200px" }} />
                                <div className="mt-3">
                                    <Card.Title style={{ fontSize: "18px" }}>Depresi Ringan</Card.Title>
                                    <Card.Text style={{ fontSize: "12px" }}>Buatmu yang sedang merasa depresi dengan gejala ringan dan membutuhkan dukungan untuk membuat harimu lebih berwarna.</Card.Text>
                                    <Button variant="light" className="custom-button" style={{ backgroundColor: "#7F91D8"}}  href="/detail-terapi">Lihat Intervensi</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={6} md={3} lg={3}>
                        <Card className="h-100 card-hover" style={{ marginLeft: '10px', height: '250px' }}>
                            <Card.Body className="d-flex align-items-center justify-content-center flex-column">
                                <img src={depresisedang} alt="sepresiSedang" style={{ objectFit: "cover", width: "100%", height: "200px" }} />
                                <div className="mt-3">
                                    <Card.Title style={{ fontSize: "18px" }}>Depresi Sedang</Card.Title>
                                    <Card.Text style={{ fontSize: "12px" }}>Buatmu yang sedang merasa depresi dan harimu cukup menguras energi dan sedang membutuhkan bantuan untuk pulih kembali.</Card.Text>
                                    <Button variant="light" className="custom-button" style={{ backgroundColor: "#7F91D8"}} href="/cbt">Lihat Intervensi</Button>
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

export default Depresi;
