import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { Row, Col, Form, Breadcrumb, Button, Card } from "react-bootstrap";
import AdminLayout from "../layouts/AdminLayout";

const EditAdmin = () => {
  const history = useHistory();
  const { id } = useParams();
  const [nama_admin, setNama] = useState("");
  const [password_admin, setPassword] = useState("");
  const [email_admin, setEmail] = useState("");

  const updateAdmin = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:8080/api/admin/update/${id}`, {
      nama_admin: nama_admin,
      password_admin: password_admin,
      email_admin: email_admin,
    });
    history.push("/admin");
  };

  useEffect(() => {
    getAdminById();
  }, []);

  const getAdminById = async () => {
    const response = await axios.get(`http://localhost:8080/api/admin/${id}`);
    setNama(response.data.nama_admin);
    setPassword(response.data.password_admin);
    setEmail(response.data.email_admin);
  };

  return (
    <AdminLayout>
      <div>
        <Breadcrumb className="mt-3">
          <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/admin">Admin</Breadcrumb.Item>
          <Breadcrumb.Item active>Add Admin</Breadcrumb.Item>
        </Breadcrumb>

        <Card>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-5">
              <h5 className="font-weight-bold" style={{ fontSize: "20px" }}>
                Form Edit Admin
              </h5>
            </div>
            <Form onSubmit={updateAdmin}>
              <Row className="mb-3">
                <Col md="2" className="d-flex justify-content-end">
                  <Form.Label>Nama</Form.Label>
                </Col>
                <Col md="8">
                  <Form.Control
                    type="text"
                    name="nama_admin"
                    value={nama_admin}
                    placeholder="Nama"
                    onChange={(e) => setNama(e.target.value)}
                    required
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md="2" className="d-flex justify-content-end">
                  <Form.Label>Password</Form.Label>
                </Col>
                <Col md="8">
                  <Form.Control
                    type="password"
                    name="password_admin"
                    placeholder="********"
                    onChange={(e) => setPassword(e.target.value)}
                    pattern="(?=.*\d)(?=.*[A-Z])(?=.*\W).{8,}"
                    title="Password minimal 8 karakter, terdiri dari huruf kapital, angka, dan karakter khusus."
                  />
                  <small>Isi password hanya jika ingin mengubah password lama.</small>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md="2" className="d-flex justify-content-end">
                  <Form.Label>Email</Form.Label>
                </Col>
                <Col md="8">
                  <Form.Control
                    type="email"
                    name="email_admin"
                    placeholder="example@gmail.com"
                    value={email_admin}
                    onChange={(e) => setEmail(e.target.value)}
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

export default EditAdmin;
