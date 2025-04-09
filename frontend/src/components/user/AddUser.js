import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Row, Col, Form, Breadcrumb, Button, Card } from "react-bootstrap";
import AdminLayout from "../layouts/AdminLayout";

const AddUser = () => {
  const [nama, setNama] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();

  const saveUser = async (e) => {
    try {
      e.preventDefault();
      await axios.post("http://localhost:8080/api/users", {
        // Menggunakan path relatif
        nama: nama,
        username: username,
        password: password,
        email: email,
      });
      history.push("/users");
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  return (
    <AdminLayout>
      <div>
        <Breadcrumb className="mt-3">
          <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/users">Users</Breadcrumb.Item>
          <Breadcrumb.Item active>Add User</Breadcrumb.Item>
        </Breadcrumb>

        <Card>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-5">
              <h5 className="font-weight-bold" style={{ fontSize: "20px" }}>
                Form Tambah User
              </h5>
            </div>
            <Form onSubmit={saveUser}>
              <Row className="mb-3">
                <Col md="2" className="d-flex justify-content-end">
                  <Form.Label>Nama</Form.Label>
                </Col>
                <Col md="8">
                  <Form.Control
                    type="text"
                    name="nama"
                    value={nama}
                    placeholder="Nama"
                    onChange={(e) => setNama(e.target.value)}
                    required
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md="2" className="d-flex justify-content-end">
                  <Form.Label>Username</Form.Label>
                </Col>
                <Col md="8">
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                    name="password"
                    value={password}
                    placeholder="********"
                    onChange={(e) => setPassword(e.target.value)}
                    pattern="(?=.*\d)(?=.*[A-Z])(?=.*\W).{8,}"
                    title="Password minimal 8 karakter, terdiri dari huruf kapital, angka, dan karakter khusus."
                    required
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md="2" className="d-flex justify-content-end">
                  <Form.Label>Email</Form.Label>
                </Col>
                <Col md="8">
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="example@gmail.com"
                    value={email}
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

export default AddUser;
