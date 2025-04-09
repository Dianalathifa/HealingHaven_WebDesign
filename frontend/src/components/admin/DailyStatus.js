import React, { useState, useEffect } from "react";
import axios from "axios";
import { Breadcrumb, Card, Table } from "react-bootstrap";
import AdminLayout from "../layouts/AdminLayout";

const HasilJawaban = () => {
  const [partisipanMap, setPartisipanMap] = useState({});
  const [dailyStatuses, setDailyStatuses] = useState([]);

  useEffect(() => {
    getPartisipanMap();
    getDailyStatuses();
  }, []);

  const getPartisipanMap = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/partisipan");
      const partisipanData = response.data.reduce((acc, cur) => {
        acc[cur.id_partisipan] = cur.nama_partisipan;
        return acc;
      }, {});
      setPartisipanMap(partisipanData);
    } catch (error) {
      console.error("Error fetching partisipan data:", error);
    }
  };

  const getDailyStatuses = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/mindfulness/daily-statuses");
      setDailyStatuses(response.data);
    } catch (error) {
      console.error("Error fetching mindfulness daily statuses:", error);
    }
  };

  return (
    <AdminLayout>
      <div>
        <Breadcrumb className="mt-3">
          <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Checklist Mindfulness</Breadcrumb.Item>
        </Breadcrumb>

        {/* Displaying Mindfulness Daily Status Data */}
        <Card className="mt-4">
          <Card.Body>
            <h5 className="font-weight-bold" style={{ fontSize: "20px" }}>
              Checklist Mindfulness
            </h5>
            <div className="table-responsive" style={{ overflowY: "auto", maxHeight: "450px" }}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Participant Name</th>
                    <th>Day</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {dailyStatuses.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{partisipanMap[item.id_partisipan]}</td>
                      <td>{item.intervention_day}</td>
                      <td>{item.created_at}</td>
                      <td>{item.is_completed ? "Complete" : "Incomplete"}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default HasilJawaban;
