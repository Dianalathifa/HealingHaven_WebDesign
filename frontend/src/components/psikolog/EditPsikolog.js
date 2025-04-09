import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { Row, Col, Form, Breadcrumb, Button, Card } from "react-bootstrap";
import AdminLayout from "../layouts/AdminLayout";

const EditPsikolog = () => {
  const { id } = useParams();
  const history = useHistory();

  const [namaPsikolog, setNamaPsikolog] = useState("");
  const [deskripsiPsikolog, setDeskripsiPsikolog] = useState("");
  const [lokasiPsikolog, setLokasiPsikolog] = useState("");
  const [telephonePsikolog, setTelephonePsikolog] = useState("");
  const [image, setImage] = useState(null);
  const [oldImage, setOldImage] = useState(""); // Initialize with the existing image URL
  const [urlPsikolog, setUrlPsikolog] = useState("");

  useEffect(() => {
    getPsikolog();
  }, []);

  const getPsikolog = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/psikolog/${id}`);
      const { nama_psikolog, deskripsi_psikolog, lokasi_psikolog, telephone_psikolog, image, url_psikolog } = response.data;
      setNamaPsikolog(nama_psikolog);
      setDeskripsiPsikolog(deskripsi_psikolog);
      setLokasiPsikolog(lokasi_psikolog);
      setTelephonePsikolog(telephone_psikolog);
      setOldImage(image);
      setUrlPsikolog(url_psikolog);
    } catch (error) {
      console.error("Error fetching psikolog:", error);
    }
  };

  const updatePsikolog = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("nama_psikolog", namaPsikolog);
      formData.append("deskripsi_psikolog", deskripsiPsikolog);
      formData.append("lokasi_psikolog", lokasiPsikolog);
      formData.append("telephone_psikolog", telephonePsikolog);
      formData.append("image_psikolog", image);
      formData.append("url_psikolog", urlPsikolog);

      await axios.post(`http://localhost:8080/api/psikolog/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      history.push("/psikolog");
    } catch (error) {
      console.error("Error updating psikolog:", error);
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
          <Breadcrumb.Item href="/psikolog">Psikolog</Breadcrumb.Item>
          <Breadcrumb.Item active>Edit Psikolog</Breadcrumb.Item>
        </Breadcrumb>

        <Card>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-5">
              <h5 className="font-weight-bold" style={{ fontSize: "20px" }}>
                Form Edit Psikolog
              </h5>
            </div>
            <Form onSubmit={updatePsikolog}>
              <Row className="mb-3">
                <Col md="2" className="d-flex justify-content-end">
                  <Form.Label>Nama Psikolog</Form.Label>
                </Col>
                <Col md="8">
                  <Form.Control
                    type="text"
                    name="nama_psikolog"
                    value={namaPsikolog}
                    onChange={(e) => setNamaPsikolog(e.target.value)}
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
                    name="deskripsi_psikolog"
                    value={deskripsiPsikolog}
                    onChange={(e) => setDeskripsiPsikolog(e.target.value)}
                    rows={4}
                    required
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md="2" className="d-flex justify-content-end">
                  <Form.Label>Lokasi</Form.Label>
                </Col>
                <Col md="8">
                  <Form.Control
                    type="text"
                    name="lokasi_psikolog"
                    value={lokasiPsikolog}
                    onChange={(e) => setLokasiPsikolog(e.target.value)}
                    required
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md="2" className="d-flex justify-content-end">
                  <Form.Label>Telephone</Form.Label>
                </Col>
                <Col md="8">
                  <Form.Control
                    type="text"
                    name="telephone_psikolog"
                    value={telephonePsikolog}
                    onChange={(e) => setTelephonePsikolog(e.target.value)}
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
                      src={`http://localhost:8080/images/psikolog/${oldImage}`}
                      alt="Current Psikolog Image"
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
                    name="image_psikolog"
                    onChange={(e) => handleFileChange(e)}
                    accept="image/*"
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

export default EditPsikolog;

