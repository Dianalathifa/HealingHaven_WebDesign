import React, { useState, useEffect } from "react";
import axios from "axios";
import { Breadcrumb, Card, Table } from "react-bootstrap";
import AdminLayout from "../layouts/AdminLayout";

const HasilJawaban = () => {
  const [partisipanMap, setPartisipanMap] = useState({});
  const [polaMakan, setPolaMakan] = useState([]);
  
  useEffect(() => {
    getPartisipanMap();
    getPolaMakan();
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

  const getPolaMakan = async () => {
    try {
      const response = await axios.get("http://localhost:8080/pola-makan");
      setPolaMakan(response.data);
    } catch (error) {
      console.error("Error fetching pola makan data:", error);
    }
  };

  return (
    <AdminLayout>
      <div>
        <Breadcrumb className="mt-3">
          <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Pola Makan Partisipan</Breadcrumb.Item>
        </Breadcrumb>

        {/* Displaying Pola Makan Data */}
        <Card className="mt-4">
          <Card.Body>
            <h5 className="font-weight-bold" style={{ fontSize: "20px" }}>
              Pola Makan Partisipan
            </h5>
            <div className="table-responsive" style={{ overflowY: "auto", maxHeight: "450px" }}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Participant Name</th>
                    <th>Tanggal</th>
                    <th>Jenis Makanan</th>
                    <th>Deskripsi Makanan</th>
                    <th>Kalori</th>
                    <th>Karbohidrat</th>
                    <th>Protein</th>
                    <th>Lemak</th>
                    <th>Keterangan Tambahan</th>
                  </tr>
                </thead>
                <tbody>
                  {polaMakan.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{partisipanMap[item.id_partisipan]}</td>
                      <td>{item.tanggal}</td>
                      <td>{item.jenis_makanan}</td>
                      <td>{item.deskripsi_makanan}</td>
                      <td>{item.kalori}</td>
                      <td>{item.karbohidrat}</td>
                      <td>{item.protein}</td>
                      <td>{item.lemak}</td>
                      <td>{item.keterangan_tambahan}</td>
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
