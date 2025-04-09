import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Row, Col, Form, Breadcrumb, Button, Card } from "react-bootstrap";
import AdminLayout from "../layouts/AdminLayout";

const AddDailyInsight = () => {
  const [judul_content, setJudulContent] = useState("");
  const [image, setImage] = useState(null);
  const [deskripsi, setDeskripsi] = useState("");
  const [tanggalUpload, setTanggalUpload] = useState("");
  const history = useHistory();

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const saveDailyInsight = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("judul_content", judul_content);
      formData.append("image", image);
      formData.append("deskripsi", deskripsi);
      formData.append("tanggal_upload", tanggalUpload);

      await axios.post("http://localhost:8080/api/daily_insight", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      history.push("/dailyinsight");
    } catch (error) {
      console.error("Error saving daily insight:", error);
    }
  };

  return (
    <AdminLayout>
      <div>
        <Breadcrumb className="mt-3">
          <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/dailyinsight">Daily Insight</Breadcrumb.Item>
          <Breadcrumb.Item active>Add Daily Insight</Breadcrumb.Item>
        </Breadcrumb>

        <Card>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-5">
              <h5 className="font-weight-bold" style={{ fontSize: "20px" }}>
                Form Tambah Content
              </h5>
            </div>
            <Form onSubmit={saveDailyInsight}>
              <Row className="mb-3">
                <Col md="2" className="d-flex justify-content-end">
                  <Form.Label>Judul Content</Form.Label>
                </Col>
                <Col md="8">
                  <Form.Control
                    type="text"
                    name="judul_content"
                    value={judul_content}
                    placeholder="Judul Content"
                    onChange={(e) => setJudulContent(e.target.value)}
                    required
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md="2" className="d-flex justify-content-end">
                  <Form.Label>Description</Form.Label>
                </Col>
                <Col md="8">
                  <Form.Control
                    as="textarea"
                    name="deskripsi"
                    placeholder="Description"
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
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
                    name="image"
                    onChange={handleFileChange}
                    accept="image/*"
                    required
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md="2" className="d-flex justify-content-end">
                  <Form.Label>Tanggal Upload</Form.Label>
                </Col>
                <Col md="8">
                  <Form.Control
                    type="date"
                    name="tanggal_upload"
                    value={tanggalUpload}
                    onChange={(e) => setTanggalUpload(e.target.value)}
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

export default AddDailyInsight;
