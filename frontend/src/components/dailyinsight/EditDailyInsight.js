import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { Row, Col, Form, Breadcrumb, Button, Card } from "react-bootstrap";
import AdminLayout from "../layouts/AdminLayout";

const EditDailyInsight = () => {
  const { id } = useParams();
  const history = useHistory();

  const [judul_content, setJudulContent] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [tanggal_upload, setTanggalUpload] = useState("");
  const [image, setImage] = useState(null);
  const [oldImage, setOldImage] = useState("");

  useEffect(() => {
    getDailyInsight();
  }, []);

  const getDailyInsight = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/daily_insight/${id}`);
      const { judul_content, deskripsi, tanggal_upload, image } = response.data;
      setJudulContent(judul_content);
      setDeskripsi(deskripsi);
      setTanggalUpload(tanggal_upload);
      setOldImage(image);
    } catch (error) {
      console.error("Error fetching daily insight:", error);
    }
  };

  const updateDailyInsight = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("judul_content", judul_content);
      formData.append("deskripsi", deskripsi);
      formData.append("tanggal_upload", tanggal_upload);
      formData.append("image", image);

      await axios.post(`http://localhost:8080/api/daily_insight/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      history.push("/dailyinsight");
    } catch (error) {
      console.error("Error updating daily insight:", error);
    }
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <AdminLayout>
      <div>
        <Breadcrumb className="mt-3">
          <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/dailyinsight">Daily Insight</Breadcrumb.Item>
          <Breadcrumb.Item active>Edit Daily Insight</Breadcrumb.Item>
        </Breadcrumb>

        <Card>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-5">
              <h5 className="font-weight-bold" style={{ fontSize: "20px" }}>
                Form Edit Daily Insight
              </h5>
            </div>
            <Form onSubmit={updateDailyInsight}>
              <Row className="mb-3">
                <Col md="2" className="d-flex justify-content-end">
                  <Form.Label>Judul Content</Form.Label>
                </Col>
                <Col md="8">
                  <Form.Control
                    type="text"
                    name="judul_content"
                    value={judul_content}
                    onChange={(e) => setJudulContent(e.target.value)}
                    required
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md="2" className="d-flex justify-content-end">
                  <Form.Label>Deskripsi</Form.Label>
                </Col>
                <Col md="8">
                  <Form.Control
                    as="textarea"
                    name="deskripsi"
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                    rows={4}
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
                    value={tanggal_upload}
                    onChange={(e) => setTanggalUpload(e.target.value)}
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
                      src={`http://localhost:8080/images/daily_insight/${oldImage}`}
                      alt="Current Daily Insight Image"
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
                    name="image"
                    onChange={(e) => handleFileChange(e)}
                    accept="image/*"
                  />
                </Col>
              </Row>

              <Col md="10" className="d-flex justify-content-end">
                <Button variant="light" style={{backgroundColor:"orange", color:"white"}} type="submit">
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

export default EditDailyInsight;
