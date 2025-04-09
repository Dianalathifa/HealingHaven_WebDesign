import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../landing/Footer.js";
import Navbar from "../landing/Navbar.js";
import "../style/DailyInsightUser.css"; // Import file CSS untuk styling tambahan

const DailyInsightUser = () => {
  const [dailyInsights, setDailyInsights] = useState([]);

  useEffect(() => {
    const fetchDailyInsights = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/daily_insight");
        setDailyInsights(response.data);
      } catch (error) {
        console.error("Error fetching daily insights:", error);
      }
    };

    fetchDailyInsights();
  }, []);

  return (
    <div>
      <Navbar />
      <section
        >
        <Col md={16} className="d-flex align-items-center justify-content-center">
          <div className="container text-center">
            <h6 className="section-title mb-2 tfonts" style={{ paddingTop:"40px",paddingBottom:"30px" ,marginRight: "-15px",color: "#dc869a" }}>
              Daily Insight
            </h6>
          </div>
        </Col>
      </section>
      <Container>
        <Row className="justify-content-center" style={{marginBottom:"50px"}}>
          {dailyInsights.map((daily_insight) => (
            <Col key={daily_insight.id} md={3} className="my-3" >
              <Link to={`/dailyinsight-detail-user/${daily_insight.id}`} className="daily-insight-card-link">
                <Card className="daily-insight-card" >
                  <Card.Img
                    variant="top"
                    src={`http://localhost:8080/images/daily_insight/${daily_insight.image}`}
                    style={{ objectFit: "cover", height: "200px" }}
                  />
                  <Card.Body className="daily-insight-card-body">
                    <Card.Title className="daily-insight-card-title">
                      {daily_insight.judul_content}
                    </Card.Title>
                    <Card.Text className="daily-insight-card-content">
                      {daily_insight.deskripsi.length > 100
                        ? daily_insight.deskripsi.substring(0, 100) + "..."
                        : daily_insight.deskripsi}
                    </Card.Text>
                    <div style={{ marginTop: "auto" }}>
                      <Link to={`/dailyinsight-detail-user/${daily_insight.id}`} className="link-text">
                        Read More
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default DailyInsightUser;
