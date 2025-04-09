import React, { useState, useEffect } from "react";
import axios from "axios";
import { Breadcrumb, Card, Table } from "react-bootstrap";
import AdminLayout from "../layouts/AdminLayout";

const HasilJawaban = () => {
  const [partisipanMap, setPartisipanMap] = useState({});
  const [cemasChecklist, setCemasChecklist] = useState([]);

  useEffect(() => {
    getPartisipanMap();
    getCemasChecklist();
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

 

  const getCemasChecklist = async () => {
    try {
      const response = await axios.get("http://localhost:8080/cemas/checklist/semua");
      setCemasChecklist(response.data);
    } catch (error) {
      console.error("Error fetching cemas checklist data:", error);
    }
  };

  return (
    <AdminLayout>
      <div>
        <Breadcrumb className="mt-3">
          <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Checklist Cemas </Breadcrumb.Item>
        </Breadcrumb>

        {/* Displaying Checklist Cemas Data */}
        <Card className="mt-4">
          <Card.Body>
            <h5 className="font-weight-bold" style={{ fontSize: "20px" }}>
              Checklist Cemas 
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
                  {cemasChecklist.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{partisipanMap[item.id_partisipan]}</td>
                      <td>{item.hari}</td>
                      <td>{item.tanggal}</td>
                      <td>{item.status ? "Complete" : "Incomplete"}</td>
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
