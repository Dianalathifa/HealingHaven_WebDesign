import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Row, Col, Form, Breadcrumb, Button, Card } from "react-bootstrap";
import AdminLayout from "../layouts/AdminLayout";

const AddPsikolog = () => {
  const [namaPsikolog, setNamaPsikolog] = useState("");
  const [deskripsiPsikolog, setDeskripsiPsikolog] = useState("");
  const [imagePsikolog, setImagePsikolog] = useState(null);
  const [lokasiPsikolog, setLokasiPsikolog] = useState("");
  const [telephonePsikolog, setTelephonePsikolog] = useState("");
  const [urlPsikolog, setUrlPsikolog] = useState("");
  const history = useHistory();

  const handleFileChange = (e) => {
    setImagePsikolog(e.target.files[0]);
  };

  const savePsikolog = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("nama_psikolog", namaPsikolog);
      formData.append("deskripsi_psikolog", deskripsiPsikolog);
      formData.append("image_psikolog", imagePsikolog);
      formData.append("lokasi_psikolog", lokasiPsikolog);
      formData.append("telephone_psikolog", telephonePsikolog);
      formData.append("url_psikolog", urlPsikolog);

      await axios.post("http://localhost:8080/api/psikolog", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      history.push("/psikolog");
    } catch (error) {
      console.error("Error saving psikolog:", error);
    }
  };

  return (
    <AdminLayout>
      <div>
        <Breadcrumb className="mt-3">
          <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/psikolog">Psikolog</Breadcrumb.Item>
          <Breadcrumb.Item active>Add Psikolog</Breadcrumb.Item>
        </Breadcrumb>

        <Card>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-5">
              <h5 className="font-weight-bold" style={{ fontSize: "20px" }}>
                Form Tambah Psikolog
              </h5>
            </div>
            <Form onSubmit={savePsikolog}>
              <Row className="mb-3">
                <Col md="2" className="d-flex justify-content-end">
                  <Form.Label>Nama Psikolog</Form.Label>
                </Col>
                <Col md="8">
                  <Form.Control
                    type="text"
                    name="nama_psikolog"
                    value={namaPsikolog}
                    placeholder="Nama Psikolog"
                    onChange={(e) => setNamaPsikolog(e.target.value)}
                    required
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md="2" className="d-flex justify-content-end">
                  <Form.Label>Deskripsi Psikolog</Form.Label>
                </Col>
                <Col md="8">
                  <Form.Control
                    as="textarea"
                    name="deskripsi_psikolog"
                    placeholder="Deskripsi Psikolog"
                    value={deskripsiPsikolog}
                    onChange={(e) => setDeskripsiPsikolog(e.target.value)}
                    rows={4}
                    required
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md="2" className="d-flex justify-content-end">
                  <Form.Label>Image</Form.Label>
                </Col>
                <Col md="8">
                  <Form.Control
                    type="file"
                    name="image_psikolog"
                    onChange={handleFileChange}
                    accept="image/*"
                    required
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md="2" className="d-flex justify-content-end">
                  <Form.Label>Lokasi Psikolog</Form.Label>
                </Col>
                <Col md="8">
                  <Form.Control
                    type="text"
                    name="lokasi_psikolog"
                    value={lokasiPsikolog}
                    placeholder="Lokasi Psikolog"
                    onChange={(e) => setLokasiPsikolog(e.target.value)}
                    required
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md="2" className="d-flex justify-content-end">
                  <Form.Label>Telephone Psikolog</Form.Label>
                </Col>
                <Col md="8">
                  <Form.Control
                    type="text"
                    name="telephone_psikolog"
                    value={telephonePsikolog}
                    placeholder="Telephone Psikolog"
                    onChange={(e) => setTelephonePsikolog(e.target.value)}
                    required
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md="2" className="d-flex justify-content-end">
                  <Form.Label>URL Psikolog</Form.Label>
                </Col>
                <Col md="8">
                  <Form.Control
                    type="text"
                    name="url_psikolog"
                    value={urlPsikolog}
                    placeholder="URL Psikolog"
                    onChange={(e) => setUrlPsikolog(e.target.value)}
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

export default AddPsikolog;
