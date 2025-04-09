import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { Row, Col, Form, Breadcrumb, Button, Card } from "react-bootstrap";
import AdminLayout from "../layouts/AdminLayout";

const EditPartisipan = () => {
  const history = useHistory();
  const { id } = useParams();
  const [nama_partisipan, setNama] = useState("");
  const [email_partisipan, setEmail] = useState("");
  const [password_partisipan, setPassword] = useState("");
  const [usia, setUsia] = useState("");
  const [no_telp, setNoTelp] = useState("");

  const updatePartisipan = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8080/api/partisipan/update/${id}`, {
        nama_partisipan: nama_partisipan,
        email_partisipan: email_partisipan,
        password_partisipan: password_partisipan, // Hindari mengirimkan password dalam plain text
        usia: usia,
        no_telp: no_telp,
      });
      if (response.status === 200) {
        // Jika pembaruan berhasil, Anda tidak perlu memperbarui state
        // karena data yang diperbarui sudah disediakan oleh backend.
        // Redirect pengguna ke halaman partisipan setelah pembaruan berhasil.
        history.push("/partisipan");
      } else {
        // Handle other status codes if needed
      }
    } catch (error) {
      // Handle errors
      console.error("Error updating participant:", error);
      // Show error message to the user
      // Anda dapat menggunakan state untuk mengelola pesan kesalahan dan menampilkannya di UI
    }
  };
  

  useEffect(() => {
    getPartisipanById();
  }, []);

  const getPartisipanById = async () => {
    const response = await axios.get(`http://localhost:8080/api/partisipan/${id}`);
    setNama(response.data.nama_partisipan);
    setPassword(response.data.password_partisipan);
    setEmail(response.data.email_partisipan);
    setUsia(response.data.usia);
    setNoTelp(response.data.no_telp);
  };

  return (
    <AdminLayout>
      <div>
        <Breadcrumb className="mt-3">
          <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/partisipan">Partisipan</Breadcrumb.Item>
          <Breadcrumb.Item active>Edit Partisipan</Breadcrumb.Item>
        </Breadcrumb>

        <Card>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-5">
              <h5 className="font-weight-bold" style={{ fontSize: "20px" }}>
                Form Edit Partisipan
              </h5>
            </div>
            <Form onSubmit={updatePartisipan}>
              <Row className="mb-3">
                <Col md="2" className="d-flex justify-content-end">
                  <Form.Label>Nama</Form.Label>
                </Col>
                <Col md="8">
                  <Form.Control
                    type="text"
                    name="nama_partisipan"
                    value={nama_partisipan}
                    placeholder="Nama"
                    onChange={(e) => setNama(e.target.value)}
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
                    name="email_partisipan"
                    placeholder="example@gmail.com"
                    value={email_partisipan}
                    onChange={(e) => setEmail(e.target.value)}
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
                    name="password_partisipan"
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
                  <Form.Label>Usia</Form.Label>
                </Col>
                <Col md="8">
                  <Form.Control
                    type="number"
                    name="usia"
                    value={usia}
                    placeholder="Usia"
                    onChange={(e) => setUsia(e.target.value)}
                    required
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md="2" className="d-flex justify-content-end">
                  <Form.Label>Nomor Telepon</Form.Label>
                </Col>
                <Col md="8">
                  <Form.Control
                    type="tel"
                    name="no_telp"
                    placeholder="Nomor Telepon"
                    value={no_telp}
                    onChange={(e) => setNoTelp(e.target.value)}
                    required
                  />
                </Col>
              </Row>

              <Col md="10" className="d-flex justify-content-end">
              <Button variant="primary" type="submit">
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

export default EditPartisipan;
