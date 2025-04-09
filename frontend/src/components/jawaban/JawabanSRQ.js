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
      const response = await axios.get("http://localhost:8080/api/jawaban-srq");
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
                    <th>Partisipan Name</th>
                    <th>Headaches</th>
                    <th>Appetite Poor</th>
                    <th>Sleep Badly</th>
                    <td>Easily Frightened</td>
                    <td>Hands Shake</td>
                    <td>Nervous</td>
                    <td>Digestion Poor</td>
                    <td>Thinking Clearly</td>
                    <td>Unhappy</td>
                    <td>Cry</td>
                    <td>Difficult Enjoy Activities</td>
                    <td>Difficult Make Decisions</td>
                    <td>Work Suffering</td>
                    <td>Unable Useful</td>
                    <td>Lost Interest</td>
                    <td>Worthless Person</td>
                    <td>Ending Life</td>
                    <td>Tired</td>
                    <td>Easily Tired</td>
                    <td>Uncomfortable Stomach</td>  
                    {/* Tambahkan kolom-kolom lain sesuai dengan struktur database */}
                  </tr>
                </thead>
                <tbody>
                  {hasilJawaban.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{partisipanMap[item.id_partisipan]}</td>
                      <td>{item.headaches}</td>
                      <td>{item.appetite_poor}</td>
                      <td>{item.sleep_badly}</td>
                      <td>{item.easily_frightened}</td>
                      <td>{item.hands_shake}</td>
                      <td>{item.nervous}</td>
                      <td>{item.digestion_poor}</td>
                      <td>{item.thinking_clearly}</td>
                      <td>{item.unhappy}</td>
                      <td>{item.cry}</td>
                      <td>{item.difficult_enjoy_activities}</td>
                      <td>{item.difficult_make_decisions}</td>
                      <td>{item.work_suffering}</td>
                      <td>{item.unable_useful}</td>
                      <td>{item.lost_interest}</td>
                      <td>{item.worthless_person}</td>
                      <td>{item.ending_life}</td>
                      <td>{item.tired}</td>
                      <td>{item.easily_tired}</td>
                      <td>{item.uncomfortable_stomach}</td>



                      {/* Tambahkan sel untuk kolom-kolom lain */}
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
