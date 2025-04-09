import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { Row, Col, Form, Breadcrumb, Button, Card } from "react-bootstrap";
import AdminLayout from "../layouts/AdminLayout";

const EditIntervensi = () => {
  const { id } = useParams();
  const history = useHistory();

  const [deskripsiIntervensi, setDeskripsiIntervensi] = useState("");
  const [kategori, setKategori] = useState("");
  const [image, setImage] = useState(null);
  const [oldImage, setOldImage] = useState(""); // Initialize with the existing image URL
  const [kategoriOptions, setKategoriOptions] = useState([]);

  useEffect(() => {
    fetchIntervensi();
  }, []);

  const fetchIntervensi = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/intervensi/${id}`);
      const { deskripsi_challenge, id_kategori_intervensi, image_challenge } = response.data;
      setDeskripsiIntervensi(deskripsi_challenge);
      setKategori(id_kategori_intervensi);
      setOldImage(image_challenge);
    } catch (error) {
      console.error("Error fetching intervention:", error);
    }
  };

  const fetchKategoriOptions = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/kategori_test");
      setKategoriOptions(response.data);
    } catch (error) {
      console.error("Error fetching category options:", error);
    }
  };

  useEffect(() => {
    fetchKategoriOptions();
  }, []);

  const updateIntervensi = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("deskripsi_challenge", deskripsiIntervensi);
      formData.append("id_kategori_intervensi", kategori);
      if (image) {
        formData.append("image_challenge", image); // Send image if there's a change
      }

      await axios.post(`http://localhost:8080/api/intervensi/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      history.push("/intervensi");
    } catch (error) {
      console.error("Error updating intervention:", error);
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
          <Breadcrumb.Item active>Edit Intervensi</Breadcrumb.Item>
        </Breadcrumb>

        <Card>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-5">
              <h5 className="font-weight-bold" style={{ fontSize: "20px" }}>
                Form Edit Intervensi
              </h5>
            </div>
            <Form onSubmit={updateIntervensi}>
              <Row className="mb-3">
                <Col md="2" className="d-flex justify-content-end">
                  <Form.Label>Kategori</Form.Label>
                </Col>
                <Col md="8">
                  <Form.Control
                    as="select"
                    value={kategori}
                    onChange={(e) => setKategori(e.target.value)}
                    required
                  >
                    <option value="">Pilih Kategori</option>
                    {kategoriOptions.map((kategori_test) => (
                      <option key={kategori_test.id_test} value={kategori_test.id_test}>
                        {kategori_test.nama_test}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md="2" className="d-flex justify-content-end">
                  <Form.Label>Deskripsi Intervensi</Form.Label>
                </Col>
                <Col md="8">
                  <Form.Control
                    as="textarea"
                    value={deskripsiIntervensi}
                    onChange={(e) => setDeskripsiIntervensi(e.target.value)}
                    rows={4}
                    required
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md="2" className="d-flex justify-content-end">
                  <Form.Label>Current Image</Form.Label>
                </Col>
                <Col md="8">
                  {oldImage && (
                    <img
                      src={`http://localhost:8080/images/intervensi/${oldImage}`}
                      alt="Current Intervensi Image"
                      style={{ maxWidth: "100px", maxHeight: "100px" }}
                    />
                  )}
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md="2" className="d-flex justify-content-end">
                  <Form.Label>New Image</Form.Label>
                </Col>
                <Col md="8">
                  <Form.Control
                    type="file"
                    name="image_challenge"
                    onChange={handleImageChange}
                    accept="image/*"
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

export default EditIntervensi;
