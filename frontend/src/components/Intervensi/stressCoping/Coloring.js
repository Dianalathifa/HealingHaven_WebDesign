import React from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import Navbar from '../../landing/Navbar.js';
import coloring from '../../images/stressCoping/creativity.png';
import colobynumber from '../../images/stressCoping/colobynumber.png';
import quickdraw from '../../images/stressCoping/quickdraw.png';
import onlinecoloring from '../../images/stressCoping/onlinecoloring.png';
import onlinesketchpad from '../../images/stressCoping/onlinesketchpad.png';
import "../../style/Intervensi.css";


const JenisColoring = [
  { name: "Color By Number", link: "https://coloritbynumbers.com/online" },
  { name: "Quick Draw", link: "https://quickdraw.withgoogle.com/" },
  { name: "Online Coloring", link: "https://www.thecolor.com/" },
  { name: "Online Sketchpad", link: "https://sketchpad.app/en/" },
  // Add other activities with their corresponding links here
];

const GambarColoring = [colobynumber, quickdraw, onlinecoloring, onlinesketchpad];

const Coloring = () => {
  return (
    <>
      <Navbar />
      <section className="section before-content" style={{ backgroundColor: "#F5A5AD", color: "#141313", marginTop: "10px", paddingTop: "10px", padding: "70px", position: "relative", overflow: "hidden"  }}>
        <div style={{ position: "absolute", top: "50%", left: 0, width: "100%", height: "100%", backgroundColor: "white", zIndex: 1 }}></div>
        <div style={{ position: "relative", zIndex: 2 }}>
          <Col md={16} className="d-flex align-items-center justify-content">
            <div className="container text-center">
              <h6 className="tfonts-2" style={{ fontSize: "40px", fontWeight: "bold", color: "white" }}>Coloring & Creativity</h6>
            </div>
          </Col>
          <br /><br /><br />
          <div className="container text-center">
            <img src={coloring} style={{ width: "300px", height: "200px", maxWidth: "100%", maxHeight: "100%"  }} alt="kegiatan" />
          </div>
        </div>
      </section>

      <Container className="mt-3" style={{ maxWidth: '800px', marginBottom:"50px" }}>
        <Col md={16} className="d-flex align-items-center justify-content">
          <div className="container text-center">
            <p style={{ fontSize: "16px", fontWeight: "bold", color: "#F5A5AD" }}>
            "Give yourself a break to relieve stress by doing Coloring & Creativity!
              Take a moment to explore your creativity by coloring.
              Take advantage of this time and let yourself focus fully on this activity.
              You will feel the calm and happiness that brings new freshness.
              Feel how this activity refreshes your mind and gives you new enthusiasm to continue your day." 
        </p>
          </div>
        </Col>
      </Container>

      <Container className="mt-3" style={{marginBottom:"50px"}}>
        <Row xs={1} md={6} className="g-4 justify-content-center">
          {JenisColoring.map((jenis, index) => (
            <Card key={index} style={{ borderRadius: "20px", fontWeight: "bold", fontSize: "16px", height: "250px", width: "250px", backgroundColor: "#F5A5AD", color: "#25B7D3", margin: "20px" }}>
              <a href={jenis.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "#4A4A4A" }}>
                <Card.Img variant="top" src={GambarColoring[index]} style={{ height: "180px", objectFit: "cover", borderRadius: "20px", marginTop:"10px" }} />
                <Card.Body>
                  <Card.Text style={{ textAlign: "center" }}>{jenis.name}</Card.Text>
                </Card.Body>
              </a>
            </Card>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Coloring;
