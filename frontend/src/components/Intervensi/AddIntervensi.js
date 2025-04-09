import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Row, Col, Form, Breadcrumb, Button, Card } from "react-bootstrap";
import AdminLayout from "../layouts/AdminLayout";

const AddIntervensi = () => {
  const [kategori_test, setKategoriTests] = useState([]);
  const [selectedKategori, setSelectedKategori] = useState("");
  const [intervensi, setIntervensi] = useState("");
  const [image, setImage] = useState(null);
  const history = useHistory();

  useEffect(() => {
    fetchKategoriTests();
  }, []);

  const fetchKategoriTests = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/kategori_test");
      setKategoriTests(response.data);
    } catch (error) {
      console.error("Error fetching kategori options:", error);
    }
  };

  const saveIntervensi = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("id_kategori_intervensi", selectedKategori);
      formData.append("deskripsi_challenge", intervensi);
      formData.append("image_challenge", image);

      await axios.post("http://localhost:8080/api/intervensi", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      history.push("/intervensi");
    } catch (error) {
      console.error("Error saving intervensi:", error);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <AdminLayout>
      <div>
        <Breadcrumb className="mt-3">
          <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/intervensi">Intervensi</Breadcrumb.Item>
          <Breadcrumb.Item active>Add Intervensi</Breadcrumb.Item>
        </Breadcrumb>

        <Card>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-5">
              <h5 className="font-weight-bold" style={{ fontSize: "20px" }}>
                Form Tambah Intervensi
              </h5>
            </div>
            <Form onSubmit={saveIntervensi}>
              <Row className="mb-3">
                <Col md="2" className="d-flex justify-content-end">
                  <Form.Label>Kategori</Form.Label>
                </Col>
                <Col md="8">
                  <Form.Control
                    as="select"
                    value={selectedKategori}
                    onChange={(e) => setSelectedKategori(e.target.value)}
                    required
                  >
                    <option value="">Pilih Kategori</option>
                    {kategori_test.map((kategori_test) => (
                      <option key={kategori_test.id_test} value={kategori_test.id_test}>
                        {kategori_test.nama_test}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md="2" className="d-flex justify-content-end">
                  <Form.Label>Intervensi</Form.Label>
                </Col>
                <Col md="8">
                  <Form.Control
                    as="textarea"
                    name="deskripsi_challenge"
                    placeholder="Intervensi"
                    value={intervensi}
                    onChange={(e) => setIntervensi(e.target.value)}
                    rows={4}
                    required
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md="2" className="d-flex justify-content-end">
                  <Form.Label>Gambar</Form.Label>
                </Col>
                <Col md="8">
                  <Form.Control
                    type="file"
                    name="image_challenge"
                    accept="image/*"
                    onChange={handleImageChange}
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

export default AddIntervensi;
