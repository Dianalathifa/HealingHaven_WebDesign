import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { Row, Col, Form, Breadcrumb, Button, Card } from "react-bootstrap";
import AdminLayout from "../layouts/AdminLayout";

const EditKuisioner = () => {
  const { id } = useParams();
  const history = useHistory();

  const [kategoriOptions, setKategoriOptions] = useState([]);
  const [selectedKategori, setSelectedKategori] = useState("");
  const [pertanyaan, setPertanyaan] = useState("");

  useEffect(() => {
    fetchKategoriOptions();
    fetchKuisioner();
  }, []);

  const fetchKategoriOptions = async () => {
    try {
      const response = await axios.get("http://localhost:8080/kategori_test");
      setKategoriOptions(response.data);
    } catch (error) {
      console.error("Error fetching kategori options:", error);
    }
  };

  const fetchKuisioner = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/kuisioner/${id}`);
      const { id_kategori, pertanyaan } = response.data;
      setSelectedKategori(id_kategori);
      setPertanyaan(pertanyaan);
    } catch (error) {
      console.error("Error fetching kuisioner:", error);
    }
  };
  

  const updateKuisioner = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("id_kategori", selectedKategori);
      formData.append("pertanyaan", pertanyaan);
      await axios.post(`http://localhost:8080/api/kuisioner/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      history.push("/kuisioner");
    } catch (error) {
      console.error("Error updating kuisioner:", error);
    }
  };

  return (
    <AdminLayout>
      <div>
        <Breadcrumb className="mt-3">
          <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/kuisioner">Kuisioner</Breadcrumb.Item>
          <Breadcrumb.Item active>Edit Kuisioner</Breadcrumb.Item>
        </Breadcrumb>

        <Card>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-5">
              <h5 className="font-weight-bold" style={{ fontSize: "20px" }}>
                Form Edit Kuisioner
              </h5>
            </div>
            <Form onSubmit={updateKuisioner}>
              <Row className="mb-3">
                <Col md="2" className="d-flex justify-content-end">
                  <Form.Label>Kategori Soal</Form.Label>
                </Col>
                <Col md="8">
                  <Form.Control
                    as="select"
                    value={selectedKategori}
                    onChange={(e) => setSelectedKategori(e.target.value)}
                    required
                  >
                    <option value="">Pilih Kategori</option>
                    {kategoriOptions.map((kategori) => (
                      <option key={kategori.id_test} value={kategori.id_test}>
                        {kategori.nama_test}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md="2" className="d-flex justify-content-end">
                  <Form.Label>Pertanyaan</Form.Label>
                </Col>
                <Col md="8">
                  <Form.Control
                    as="textarea"
                    name="pertanyaan"
                    value={pertanyaan}
                    onChange={(e) => setPertanyaan(e.target.value)}
                    rows={4}
                    required
                  />
                </Col>
              </Row>

              <Col md="10" className="d-flex justify-content-end">
                <Button variant="success" type="submit">
                  Submit
                </Button>
              </Col>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default EditKuisioner;