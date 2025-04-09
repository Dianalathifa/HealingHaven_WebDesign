import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Breadcrumb, Card, Carousel } from 'react-bootstrap';
import AdminLayout from './layouts/AdminLayout';

const Dashboard = () => {
  const [totalAdmin, setTotalAdmin] = useState(0);
  const [totalPartisipan, setTotalPartisipan] = useState(0);
  const [interventions, setInterventions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminResponse = await axios.get('http://localhost:8080/api/admin');
        const partisipanResponse = await axios.get('http://localhost:8080/api/partisipan');
        const intervensiResponse = await axios.get('http://localhost:8080/api/intervensi');

        setTotalAdmin(adminResponse.data.length);
        setTotalPartisipan(partisipanResponse.data.length);
        setInterventions(intervensiResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <AdminLayout>
      <div>
        <Breadcrumb className="mt-3">
          <Breadcrumb.Item active>
            <h3 style={{ fontSize: '22px', fontWeight: 'bold' }}>Welcome to Dashboard MentalWell!</h3>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="mt-3">
          <Card>
            <Card.Body>
              <Card.Title>Total Admin</Card.Title>
              <Card.Text>
                Jumlah Admin: {totalAdmin}
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Total Partisipan</Card.Title>
              <Card.Text>
                Jumlah Partisipan: {totalPartisipan}
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Intervensi</Card.Title>
              <Carousel interval={null} indicators={false} style={{ width: '15%', marginTop: '20px' }}>
                {interventions.map((intervention, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100"
                      src={`http://localhost:8080/images/intervensi/${intervention.image_challenge}`}
                      alt={`Intervensi ${index + 1}`}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </Card.Body>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
