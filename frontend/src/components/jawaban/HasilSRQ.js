import React, { useState, useEffect } from "react";
import axios from "axios";
import { Breadcrumb, Card, Table } from "react-bootstrap";
import AdminLayout from "../layouts/AdminLayout";

const HasilSRQ = () => {
  const [hasilJawaban, setHasilJawaban] = useState([]);
  const [partisipanMap, setPartisipanMap] = useState({});

  useEffect(() => {
    getHasilJawaban();
    getPartisipanMap();
  }, []);

  const getHasilJawaban = async () => {
    try {
      const response = await axios.get(`https://algoritma.mentalwell.id/dapatkan_hasil_prediksi_terbaru`);
      setHasilJawaban(response.data);
    } catch (error) {
      console.error("Error fetching hasil jawaban data:", error);
    }
  };

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

  return (
    <AdminLayout>
      <div>
        <Breadcrumb className="mt-3">
          <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Hasil Jawaban SRQ</Breadcrumb.Item>
        </Breadcrumb>

        <Card>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="font-weight-bold" style={{ fontSize: "20px" }}>
                Hasil Jawaban Kuesioner SRQ
              </h5>
            </div>
            <div className="table-responsive" style={{ overflowY: "auto", maxHeight: "450px" }}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Partisipan Name </th>
                    <th>Points</th>
                    <th>Mental Disorders</th>
                    <th>Classification</th>
                  </tr>
                </thead>
                <tbody>
                  {hasilJawaban.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{partisipanMap[item.id_partisipan]}</td>
                      <td>{item.points}</td>
                      <td>{item.mental_disorders}</td>
                      <td>{item.klasifikasi}</td>
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

export default HasilSRQ;
