import React, { useState, useEffect } from "react";
import axios from "axios";
import { Breadcrumb, Card, Table } from "react-bootstrap";
import AdminLayout from "../layouts/AdminLayout";

const HasilJawaban = () => {
  const [hasilJawaban, setHasilJawaban] = useState([]);
  const [partisipanMap, setPartisipanMap] = useState({});
  const [kuisionerMap, setKuisionerMap] = useState({});

  useEffect(() => {
    getHasilJawaban();
    getPartisipanMap();
    getKuisionerMap();
  }, []);

  const getHasilJawaban = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/jawaban");
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

  const getKuisionerMap = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/kuisioner");
      const kuisionerData = response.data.reduce((acc, cur) => {
        acc[cur.id_kuisioner] = cur.pertanyaan;
        return acc;
      }, {});
      setKuisionerMap(kuisionerData);
    } catch (error) {
      console.error("Error fetching kuisioner data:", error);
    }
  };

  return (
    <AdminLayout>
      <div>
        <Breadcrumb className="mt-3">
          <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Hasil Jawaban</Breadcrumb.Item>
        </Breadcrumb>

        <Card>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="font-weight-bold" style={{ fontSize: "20px" }}>
                Hasil Jawaban Partisipan
              </h5>
            </div>
            <div className="table-responsive" style={{ overflowY: "auto", maxHeight: "450px" }}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama Partisipan</th>
                    <th>Pertanyaan</th>
                    <th>Jawaban</th>
                    <th>Tanggal Jawab</th>
                  </tr>
                </thead>
                <tbody>
                  {hasilJawaban.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{partisipanMap[item.id_partisipan]}</td>
                      <td>{kuisionerMap[item.id_kuisioner]}</td>
                      <td>{item.jawaban}</td>
                      <td>{item.created_at}</td>
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
