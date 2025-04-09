import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Footer from "../landing/Footer.js";
import Navbar from "../landing/Navbar.js";
import image6 from "../images/image6.png"; // Import gambar
import image7 from "../images/image7.png"; // Import gambar
import logo1 from "../images/logo1.png"; // Import gambar
import "./AboutUs.css";


const AboutUs = () => {

  return (
    < >
      <Navbar />
      <section className="about-us-section">
        <Row className="align-items-center">
          <Col md={8} className="text-center text-md-left mb-4 mb-md-0">
            <div className="text-align" style={{ marginLeft: "35px" }}>
              <h6 className="about-us-title">About Healing Haven</h6>
              <h6 className="about-us-subtitle">
              Welcome to Healing Haven, a digital space dedicated to mental health.
              Healing Haven is a platform designed to facilitate the healing of mental health. 
              We provide a supportive environment where individuals can access resources, tools, 
              and community support aimed at enhancing their mental well-being and promoting recovery.
              </h6>
            </div>
          </Col>
          <Col md={3} className="text-center">
            <img src={logo1} alt="Logo" className="about-us-logo" />
          </Col>
        </Row>   <div className="custom-shape-divider-top-1728612896" >
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" fill="white" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
        </svg>
      </div>
      </section>

      
      
      <section className="about-us-vision-mission">
        <Row className="justify-content-center">
          <Col md={3} className="d-flex align-items-center justify-content-center">
            <img src={image6} alt="Image" className="about-us-image" /> 
          </Col>
          <Col md={6}>
          <h5 className="about-us-heading">VISION</h5>
          <p className="about-us-text">
            Increasing awareness of mental health and the process of personal development to achieve a more optimal quality of life.
          </p>

          </Col>        
        </Row>
      </section>

      
      <section className=" about-us-vision-mission">
        <Row className="justify-content-center">
          <Col md={3} className="d-flex align-items-center justify-content-center">
            <img src={image7} alt="Image" className="about-us-image" /> 
          </Col>
          <Col md={6}>
            <h5 className="about-us-heading">MISSION</h5>
            <p className="about-us-text">
            1. Understanding the mental health issues experienced by adolescents, especially students.<br />
            2. Educating adolescents about mental health and personal development.<br />
            3. Providing assistance in the form of mental health support services.<br />
            4. Helping adolescents gain a better understanding of themselves.
            </p>
          </Col>
        </Row>
      </section>
      
      <Footer />
    </>
  );
};

export default AboutUs;
