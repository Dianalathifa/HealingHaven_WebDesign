import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { BrowserRouter as Router, Link, useHistory } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Footer from "./landing/Footer.js";
import Navbar from "./landing/Navbar.js";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import mentalwelltes from "./images/mw-tes.png";
import daily from "./images/d-insight.png";
import psikolist from "./images/psikolog-list.png";
import illustrasi from "./images/background.png";
import konsultasi from "./images/konsultasi.png";
import intervensi from "./images/intervention.png";
import { FaArrowRight } from 'react-icons/fa';
import TesSkriningImage from './images/tes-skrining.png';
import HasilSkriningImage from './images/hasil-skrining.png';
import DapatkanSolusiImage from './images/solusi.png';
import "./style/Home.css";

const Home = () => {
  const [psikologs, setPsikologs] = useState([]);
  const history = useHistory();
  const isLoggedIn = localStorage.getItem('partisipan_nama');

  const handleTestClick = () => {
    const isLoggedIn = localStorage.getItem('partisipan_nama');

    if (isLoggedIn) {
      history.push('/test-user');
    } else {
      Swal.fire({
        title: 'You are not logged in yet!',
        text: 'Please login first to access this page.',
        icon: 'warning',
        confirmButtonText: 'OK',
        showCancelButton: true,
        cancelButtonText: 'Batal',
      }).then((result) => {
        if (result.isConfirmed) {
          history.push('/partisipan-login');
        }
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getPsikolog();
     
    };

    fetchData();
  }, []);

  const getPsikolog = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/psikolog`);
      setPsikologs(response.data);
    } catch (error) {
      console.error('Gagal mengambil data psikolog:', error);
    }
  };

  const tesSkriningSteps = [
    {
      title: 'Take the Screening Test',
      description: 'Lets take the screening test to determine whether your mental condition is good or in need of attention!',
      buttonText: '1',
      link: '/tes-skrining',
      image: TesSkriningImage, // Ganti dengan path gambar
    },
    {
      title: 'View Screening Results',
      description: 'Check your screening results to determine the next steps after completing the screening test.',
      buttonText: '2',
      link: '/hasil-skrining',
      image: HasilSkriningImage, // Ganti dengan path gambar
    },
    {
      title: 'Get Solutions',
      description: 'Receive solutions based on your mental health screening results to obtain the appropriate assistance and advice.',
      buttonText: '3',
      link: '/solusi',
      image: DapatkanSolusiImage, // Ganti dengan path gambar
    },
  ];
  
  
  const getColor = (index) => {
    const colors = ['#eecfcc', '#e79cae', '#edce7a']; // Warna berbeda untuk setiap card
    return colors[index % colors.length];
  };
  
  const getTextColor = (backgroundColor) => {
    const hexToRgb = (hex) => {
      const bigint = parseInt(hex.slice(1), 16);
      return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
    };
  
    const rgb = hexToRgb(backgroundColor);
    const luminance = (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;
  
    return luminance > 0.5 ? '#000000' : '#FFFFFF'; // Hitam untuk latar terang, putih untuk latar gelap
  };

  return (
    <>
      <Navbar />
      <section id="psikolog-list">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-md-6 text-md-left text-center">
            <h2 className="mb-4">
            Discover Calm, Restore Balance at Healing Haven
            </h2>
            <h1>
            A Peaceful Space for the Weary Soul, Where Every Step Becomes Lighter and Filled with Hope.
            </h1>
            <Button
              variant="light"
              className="btn-custom"
              onClick={handleTestClick}
            >
              Take the Test Now
              <FaArrowRight style={{ marginLeft: '10px' }} />
            </Button>
          </div>
          <div className="col-md-6 text-center mt-4 mt-md-0">
            <img
              src={illustrasi}
              alt="Logo"
            />
          </div>
        </div>
      </div>
    </section>


<section class="help-section">
<div className="custom-shape-divider-top-1728447839">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
    <rect width="100%" height="100%" fill="#9ac1f0" /> 
    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="#9ac1f0" opacity=".25" class="shape-fill"></path>
    <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" fill="#9ac1f0" opacity=".5" class="shape-fill"></path>
    <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="white" class="shape-fill"></path>
</svg>

    </div>
    <div class="help-content">
        <div class="image-container">
            <img src={konsultasi} alt="Doctor and patient" class="help-image"/>
            <span class="badge">Doctor</span>
        </div>
        <div class="text-container">
            <h2>How Healing Haven  <span class="highlight">Supports Your Healing Journey?</span> </h2>
            <p>Accessible tests that help you evaluate your mental health, offering personalized insights and recommendations.</p>
            <p>Simple routines like meditation and breathing exercises that you can integrate into your daily life to reduce stress and maintain balance.</p>
            <a href="/test-user" class="get-help-button">Get Help</a>
        </div>
    </div>
</section>

<section className="tes-skrining-section">
      <div className="section-header">
        <h2>Steps to <span className="highlight">Healing</span></h2>
        <a href="/test-user" className="read-all">Read All Blog</a>
      </div>
      <div className="tes-skrining-cards">
        {tesSkriningSteps.map((step, index) => {
          const backgroundColor = getColor(index);
          const textColor = getTextColor(backgroundColor); // Mendapatkan warna teks yang kontras

          return (
            <div 
              className="card" 
              key={index} 
              style={{ backgroundColor }} // Set background color
            >
              <h3 className="card-title" style={{ color: textColor }}>{step.title}</h3>
              <p className="card-description" style={{ color: textColor }}>{step.description}</p>
              <img src={step.image} alt={step.title} className="card-image" />
              <div className="card-content">
                <p className="read-more">{step.buttonText}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>


      {/* Rekomendasi Psikolog Section */}
      <section className="my-5 rekomendasi-psikolog">
  <div class="custom-shape-divider-bottom-1728448950">
    <svg  xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"  class="shape-fill"></path>
    </svg>
</div> 

<div class="text-container text-center">
<h2>Psychologist <span class="highlight">Recommendations</span> </h2>
</div>
  <Row style={{ maxWidth: "1000px", margin: "auto", marginTop: "40px" }}>
    {psikologs.slice(0, 6).map((psikolog, index) => (
      <Col md={4} className="mb-4" key={index}>
        <a href={psikolog.url_psikolog} className="psikolog-card-link">
          <Card className="psikolog-card">
            <Card.Img src={`http://localhost:8080/images/psikolog/${psikolog.image_psikolog}`} alt="Psikolog Image" />
            <Card.Body>
              <Card.Title className="card-title">{psikolog.nama_psikolog}</Card.Title>
              <Card.Text className="card-text">
                {psikolog.deskripsi_psikolog.length > 50 ? psikolog.deskripsi_psikolog.substring(0, 100) + "..." : psikolog.deskripsi_psikolog}
              </Card.Text>
              <Button variant="light" className="btn-light">Contact Now</Button>
            </Card.Body>
          </Card>
        </a>
      </Col>
    ))}
  </Row>
  <Row className="justify-content-center">
    <Col md={4} className="text-center mb-4">
      <Link to="/psikolog-list" style={{ textDecoration: 'none' }}>
        <Button variant="light" className="link-button">
            More Recommendations
          <FaArrowRight style={{ marginLeft: '10px' }} />
        </Button>
      </Link>
    </Col>
  </Row>
</section>

      {/* Layanan Mental Well Section */}
      <section
        id="layanan-mentalwell"
        className="section before-content"
        style={{ backgroundColor: "white", color: "#141313", padding: "50px 0", textAlign: "center" }} // Tambahkan gaya text-align untuk memusatkan
      >
        <Col md={16} className="d-flex align-items-center justify-content-center">
          <div className="container text-center">
          <div className="section-header">
        <h2>Discover More <span className="highlight">Healing Haven Services </span></h2>
      </div>
            <h6 className="subtitle-home" style={{ fontSize: "16px", lineHeight: "1.6", maxWidth: "800px", margin: "auto" }}>
            Here are the best services that can support your mental health!
            </h6>
          </div>
        </Col>
      </section>
      {/* LAYANAN 1 */}

      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={3} className="d-flex align-items-center justify-content-center">
            <img src={mentalwelltes} alt="Image" style={{ maxWidth: "100%", maxHeight: "100%" }} /> {/* Panggil gambar dengan variabel */}
          </Col>
          <Col md={6}>
            <h5 style={{ marginTop: "30px", fontSize: "18px", fontWeight: "bold" }}>
              <br />Healing Haven Test<br />
            </h5>
            <p style={{ fontSize: "16px" }}>
              <br />The Mental Health Test is a psychological scale assessment.
              <br />
              A psychological scale is a measurement instrument used to identify specific psychological constructs within an individual. 
              The test results can serve as an initial screening of a person's psychological condition, but they are not intended for diagnosis.
              <br />
              <br />
            </p>
          </Col>
        </Row>
      </Container>

      {/* LAYANAN 2 */}

      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={3} className="d-flex align-items-center justify-content-center">
            <img src={daily} alt="Image" style={{ maxWidth: "100%", maxHeight: "100%" }} /> {/* Panggil gambar dengan variabel */}
          </Col>
          <Col md={6}>
            <h5 style={{ marginTop: "45px", fontSize: "18px", fontWeight: "bold" }}>
              <br />Daily Insight<br />
            </h5>
            <p style={{ fontSize: "16px" }}>
              <br />Daily Insight is a service designed to provide users with access to high-quality 
                    daily content that supports mental health improvement. 
                    This feature offers articles, materials, and guides that address various aspects of mental health, 
                    providing insights and support for personal growth.
            </p>
          </Col>
        </Row>
      </Container>

      {/* LAYANAN 3 */}

      <Container className="my-5" >
        <Row className="justify-content-center" style={{ marginTop: "70px" }}>
          <Col md={3} className="d-flex align-items-center justify-content-center">
            <img src={psikolist} alt="Image" style={{ maxWidth: "100%", maxHeight: "100%" }} /> {/* Panggil gambar dengan variabel */}
          </Col>
          <Col md={6}>
            <h5 style={{ marginTop: "30px", fontSize: "18px", fontWeight: "bold" }}>
              <br />Psychologist List<br />
            </h5>
            <p style={{ fontSize: "16" }}>
              <br />The Psychologist List provides information about qualified psychologists, including their names, locations, and profile photos. 
              This service serves as a referral recommendation for individuals who need expert assistance.
            </p>
          </Col>
        </Row>
      </Container>

      {/*Layanan 4 */}

      <Container className="my-5" >
        <Row className="justify-content-center" style={{ marginTop: "70px" }}>
          <Col md={3} className="d-flex align-items-center justify-content-center">
            <img src={intervensi} alt="Image" style={{ maxWidth: "100%", maxHeight: "100%" }} /> {/* Panggil gambar dengan variabel */}
          </Col>
          <Col md={6}>
            <h5 style={{ marginTop: "30px", fontSize: "18px", fontWeight: "bold" }}>
              <br />Intervention Recommendations<br />
            </h5>
            <p style={{ fontSize: "16px" }}>
              <br />The Intervention Recommendations feature will display suitable solutions based on the results of the tests you have completed. It is essential to follow the recommended intervention services to enhance your mental health.
            </p>
          </Col>
        </Row>
      </Container>
      <br />
      <br />

      <Footer />
    </>

  );
};

export default Home;
