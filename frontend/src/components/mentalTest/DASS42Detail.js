import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min.js";
import Footer from "../landing/Footer.js";
import Navbar from "../landing/Navbar.js";
import detail1 from "../images/dass42-detail1.png"; // Import gambar
import detail2 from "../images/dass42-detail2.png"; // Import gambar
import DASS42 from "../images/dass42-tes.png"; // Import gambar
import cemas from "../images/dass42-cemas.jpg"; // Import gambar
import depresi from "../images/dass42-depresi.jpg"; // Import gambar
import stress from "../images/dass42-stress.jpg"; // Import gambar

const DASS42Detail = () => {
    const [kategoriTests, setKategoriTests] = useState([]);

    useEffect(() => {
        const fetchKategoriTests = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/kategori_test/dass42");
                const dass42Tests = response.data.filter(test => test.id_test >= 2 && test.id_test <= 4);
                setKategoriTests(dass42Tests);
            } catch (error) {
                console.error("Error fetching kategori tests:", error);
            }
        };

        fetchKategoriTests();
    }, []);

    return (
        <div>
            <Navbar />
            <br/><br/>
            <section id="psikolog-list" className="section before-content mt-5" style={{ backgroundColor: "#C4EAF4", color: "#141313", fontFamily: "Abril Fatface", marginTop: "-140px", paddingTop: "200px" }}>
                <Col md={14} className="d-flex align-items-center justify-content-center">
                <div className="container text-left ">
                <h6 className="section-title mb-2 tfonts" style={{ marginLeft: "80px" }}>DASS42-Test</h6>
                <h6 className="subtitle-dass" style={{ fontSize: "28px", marginLeft: "80px" }}>
                    The Depression, Anxiety, Stress Scale (DASS) 42 
                    is a psychological questionnaire that measures three psychological factors: 
                    depression, anxiety, and stress. This questionnaire consists of 42 questions, 
                    which on this website will be broken down into 14 questions with categories 
                    that have been adjusted and tested for validity and reliability.
                </h6>
                <br></br><br></br><br></br>
                </div>

                    <img src={DASS42} alt="Logo" style={{ borderRadius:"40px",marginRight:"80px", width: "430px", height: "400px", maxWidth: "100%", maxHeight: "100%" }} /> 
                </Col>
            </section>
            <br/>
            <br/>
            <Container className="my-5">
                <Row className="justify-content-center">
                    <Col md={4} className="d-flex align-items-center justify-content-center">
                        <img src={detail1} alt="" style={{ borderRadius:"40px",width: "400px", height: "100%" }} /> 
                    </Col>
                    <Col md={6}>
                        <p style={{ fontSize: "25px" }}>
                        <br/>The use of DASS42 can be applied in various contexts, 
                        such as in scientific research, mental health assessment in the workplace, 
                        mental health evaluation before certain medical services, and so on.<br></br><br></br></p>
                        </Col>        
                </Row>
            </Container>
            <br/>
            <br/>
            <Container className="my-5">
                <Row className="justify-content-center">
                    <Col md={4} className="d-flex align-items-center justify-content-center">
                        <img src={detail2} alt="" style={{ borderRadius:"40px",width: "400px", height: "100%" }} />
                    </Col>
                    <Col md={6}>
                        <p style={{ fontSize: "25px" }}>
                        <br/>DASS42 cannot replace a diagnosis from a psychiatrist or clinical psychologist, 
                        but it can be used as a tool to assess a person's level of depression, anxiety, and stress 
                        to guide further action or appropriate referral.</p>

                    </Col>
                </Row>
            </Container>
            <Container className="my-5">
                <Col md={12}>
                    <p style={{ fontSize: "25px", textAlign: "justify", marginLeft:"60px"}}>
                    <br></br>The DASS42 response scale ranges from 0 to 3 for each question, with the following explanations: 
                    <br></br>0:&nbsp;&nbsp;No symptoms
                    <br></br>1:&nbsp;&nbsp;Sometimes
                    <br></br>2:&nbsp;&nbsp;Often
                    <br></br>3:&nbsp;&nbsp;Always
                    <br></br>The final result of completing the DASS42 questionnaire will provide an overview of the respondent's level of depression, anxiety, and stress.
 </p>
                </Col>
            </Container>
            <Container className="my-6" >
                <Row className="justify-content-center">
                    <Col md={10}>
                        <Card className="about-us-card" style={{ backgroundColor: "#FFD2DD", borderRadius:"30px"}}>
                            <Card.Body>
                                <h5 style={{ fontSize: "30px", color:"#25B7D3", fontWeight:"bold" }}>Test Instructions :<br></br></h5>
                                <p style={{ fontSize: "25px" }}><br></br>1. Metode: diisi sendiri (rahasia).<br></br>
                                2. Jawablah semua pertanyaan sesuai dengan kondisi saat ini yang anda alami atau rasakan selama 7 hari terakhir.
                                <br></br>3. Setiap pertanyaan memiliki skala jawaban dari 0 hingga 3.
                                <br></br>4. Pilihlah jawaban yang paling sesuai dengan kondisi Anda dalam 7 hari terakhir.
                                <br></br>5. Setelah selesai menjawab semua pertanyaan, klik Lihat Hasil Tes untuk melihat hasilnya.
                                <br></br>Selamat Mengerjakan!
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <section id="about" className="section before-content">
            <div className="container text-center">
            <div>
                <h2 className="section-title mb-2 tfonts">Kategori Test<br></br>DASS-42</h2>
            </div><br/><br/><br/>
            </div>
            </section>
            <Container>
                <Row>
                    <Col md={4}>
                        <Card>
                            <Card.Img variant="top" src={cemas} />
                            <Card.Body>
                                <Card.Title>Kecemasan</Card.Title>
                                <Card.Text>Test yang akan mendeteksi gangguan kecemasan</Card.Text>
                                <Link to="/dass42cemas-user">Mulai Tes</Link>
                            </Card.Body>
                        </Card><br/><br/><br/>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <Card.Img variant="top" src={depresi} />
                            <Card.Body>
                                <Card.Title>Depresi</Card.Title>
                                <Card.Text>Test yang akan mendeteksi gangguan depresi</Card.Text>
                                <Link to="/dass42depresi-user">Mulai Tes</Link>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <Card.Img variant="top" src={stress} />
                            <Card.Body>
                                <Card.Title>Stress</Card.Title>
                                <Card.Text>Test yang akan endeteksi gangguan stress</Card.Text>
                                <Link to="/dass42stress-user">Mulai Tes</Link>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>


            <br/><br/><br/>
            <Footer />
        </div>
    );
};

export default DASS42Detail;
