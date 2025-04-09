import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Row, Col, Form, Breadcrumb, Button, Card } from "react-bootstrap";
import AdminLayout from "../layouts/AdminLayout";

const AddKategoriTest = () => {
  const [nama_test, setNamaTest] = useState("");
  const [deskripsi_test, setDeskripsiTest] = useState("");
  const [sub_test, setSubTest] = useState("");
  const history = useHistory();


  const saveKategoriTest = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("nama_test", nama_test);
      formData.append("deskripsi_test", deskripsi_test);
      formData.append("sub_test", sub_test);

      await axios.post("http://localhost:8080/api/kategori_test", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      history.push("/kategoritest");
    } catch (error) {
      console.error("Error saving kategori test:", error);
    }
  };

  return (
    <AdminLayout>
      <div>
        <Breadcrumb className="mt-3">
          <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/kategoritest">Kategori Test</Breadcrumb.Item>
          <Breadcrumb.Item active>Add Kategori Test</Breadcrumb.Item>
        </Breadcrumb>

        <Card>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-5">
              <h5 className="font-weight-bold" style={{ fontSize: "20px" }}>
                Form Tambah Kategori Test
              </h5>
            </div>
            <Form onSubmit={saveKategoriTest}>
              <Row className="mb-3">
                <Col md="2" className="d-flex justify-content-end">
                  <Form.Label>Nama Test</Form.Label>
                </Col>
                <Col md="8">
                  <Form.Control
                    type="text"
                    name="nama_kategori"
                    value={nama_test}
                    placeholder="Nama Kategori"
                    onChange={(e) => setNamaTest(e.target.value)}
                    required
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md="2" className="d-flex justify-content-end">
                  <Form.Label>Deskripsi Kategori</Form.Label>
                </Col>
                <Col md="8">
                  <Form.Control
                    as="textarea"
                    name="deskripsi_kategori"
                    placeholder="Deskripsi Kategori"
                    value={deskripsi_test}
                    onChange={(e) => setDeskripsiTest(e.target.value)}
                    rows={4}
                    required
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md="2" className="d-flex justify-content-end">
                  <Form.Label>Sub Test</Form.Label>
                </Col>
                <Col md="8">
                  <Form.Control
                    type="text"
                    name="sub_test"
                    value={sub_test}
                    placeholder="Sub Test"
                    onChange={(e) => setSubTest(e.target.value)}
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

export default AddKategoriTest;