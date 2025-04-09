import React, { useState, useEffect } from "react";
import axios from "axios";
import { Breadcrumb, Card, Table } from "react-bootstrap";
import AdminLayout from "../layouts/AdminLayout";

const HasilJawaban = () => {
  const [partisipanMap, setPartisipanMap] = useState({});
  const [jadwalKegiatan, setJadwalKegiatan] = useState([]);
  
  useEffect(() => {
    getPartisipanMap();
    getJadwalKegiatan();
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

  const getJadwalKegiatan = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/kegiatan");
      setJadwalKegiatan(response.data);
    } catch (error) {
      console.error("Error fetching jadwal kegiatan data:", error);
    }
  };

  return (
    <AdminLayout>
      <div>
        <Breadcrumb className="mt-3">
          <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Jadwal Kegiatan Partisipan</Breadcrumb.Item>
        </Breadcrumb>

        {/* Displaying Jadwal Kegiatan Data */}
        <Card className="mt-4">
          <Card.Body>
            <h5 className="font-weight-bold" style={{ fontSize: "20px" }}>
              Jadwal Kegiatan Partisipan
            </h5>
            <div className="table-responsive" style={{ overflowY: "auto", maxHeight: "450px" }}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Participant Name</th>
                    <th>Tanggal</th>
                    <th>Jenis Kegiatan</th>
                    <th>Catatan</th>
                  </tr>
                </thead>
                <tbody>
                  {jadwalKegiatan.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{partisipanMap[item.id_partisipan]}</td>
                      <td>{item.tanggal}</td>
                      <td>{item.jenis_kegiatan}</td>
                      <td>{item.catatan}</td>
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
