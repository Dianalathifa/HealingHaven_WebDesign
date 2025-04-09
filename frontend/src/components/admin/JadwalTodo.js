import React, { useState, useEffect } from "react";
import axios from "axios";
import { Breadcrumb, Card, Table } from "react-bootstrap";
import AdminLayout from "../layouts/AdminLayout";

const HasilJawaban = () => {
  const [partisipanMap, setPartisipanMap] = useState({});
  const [jadwalToDO, setJadwalToDO] = useState([]);
  
  useEffect(() => {
    getPartisipanMap();
    getJadwalToDO();
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

  const getJadwalToDO = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/tujuan");
      setJadwalToDO(response.data);
    } catch (error) {
      console.error("Error fetching jadwal To Do data:", error);
    }
  };

  return (
    <AdminLayout>
      <div>
        <Breadcrumb className="mt-3">
          <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Jadwal To Do Partisipan</Breadcrumb.Item>
        </Breadcrumb>

        {/* Displaying Jadwal To Do Data */}
        <Card className="mt-4">
          <Card.Body>
            <h5 className="font-weight-bold" style={{ fontSize: "20px" }}>
              Jadwal To Do Partisipan
            </h5>
            <div className="table-responsive" style={{ overflowY: "auto", maxHeight: "450px" }}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Participant Name</th>
                    <th>To Do</th>
                    <th>In Progress</th>
                    <th>Done</th>
                  </tr>
                </thead>
                <tbody>
                  {jadwalToDO.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{partisipanMap[item.id_partisipan]}</td>
                      <td>{item.to_do}</td>
                      <td>{item.in_progress}</td>
                      <td>{item.done}</td>
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
