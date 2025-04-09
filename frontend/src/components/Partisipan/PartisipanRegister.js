import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Row, Col, Form, Button, Image, Container } from "react-bootstrap";
import Swal from "sweetalert2";
import logo from "../images/logo.png";
import Navbar from "../landing/Navbar";

const RegisterPage = () => {
  const [nama_partisipan, setNama] = useState("");
  const [email_partisipan, setEmail] = useState("");
  const [password_partisipan, setPassword] = useState("");
  const [usia, setUsia] = useState("");
  const [no_telp, setNoTelp] = useState("");
  const history = useHistory();

  const savePartisipan = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/partisipan/register", {
        nama_partisipan,
        email_partisipan,
        password_partisipan,
        usia,
        no_telp,
      });
      Swal.fire({
        icon: 'success',
        title: 'Registrasi Berhasil!',
        text: 'Anda akan dialihkan ke halaman login.',
        showConfirmButton: false,
        timer: 2000
      }).then(() => {
        history.push("/partisipan-login");
      });
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || 'Gagal melakukan registrasi. Silakan coba lagi.';
        Swal.fire({
          icon: 'error',
          title: 'Registrasi Gagal!',
          text: errorMessage,
          confirmButtonColor: '#60BAEE'
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Registrasi Gagal!',
          text: 'There is an error saat melakukan registrasi. Silakan coba lagi nanti.',
          confirmButtonColor: '#60BAEE'
        });
      }
    }
  };

  return (
    <>
      <Navbar />
      <Container>
        <Row className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
          <Col xs={10} sm={8} md={6} lg={5} xl={4}>
            <div className="text-center">
              <Image src={logo} alt="Logo" style={{ width: "40%", marginBottom: "20px" }} />
              <h1 style={{ color: "#60BAEE", fontWeight: "bold", marginBottom: "20px" }}>REGISTER</h1>
            </div>

            <Form onSubmit={savePartisipan}>
              <Form.Group controlId="formNama" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Nama"
                  name="nama"
                  value={nama_partisipan}
                  onChange={(e) => setNama(e.target.value)}
                  required
                  style={{ backgroundColor: "#f5f5f5", borderColor: "#ddd" }}
                />
              </Form.Group>

              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={email_partisipan}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ backgroundColor: "#f5f5f5", borderColor: "#ddd" }}
                />
              </Form.Group>

              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password_partisipan}
                  onChange={(e) => setPassword(e.target.value)}
                  pattern="(?=.*\d)(?=.*[A-Z])(?=.*\W).{8,}"
                  title="Password minimal 8 karakter, terdiri dari huruf kapital, angka, dan karakter khusus."
                  required
                  style={{ backgroundColor: "#f5f5f5", borderColor: "#ddd" }}
                />
              </Form.Group>

              <Form.Group controlId="formUsia" className="mb-3">
                <Form.Control
                  type="number"
                  placeholder="Usia"
                  name="usia"
                  value={usia}
                  onChange={(e) => setUsia(e.target.value)}
                  required
                  style={{ backgroundColor: "#f5f5f5", borderColor: "#ddd" }}
                />
              </Form.Group>

              <Form.Group controlId="formNoTelp" className="mb-3">
                <Form.Control
                  type="tel"
                  placeholder="Nomor Telepon"
                  name="no_telp"
                  value={no_telp}
                  onChange={(e) => {
                    const re = /^[0-9\b]+$/;
                    if (e.target.value === "" || re.test(e.target.value)) {
                      setNoTelp(e.target.value);
                    }
                  }}
                  required
                  style={{ backgroundColor: "#f5f5f5", borderColor: "#ddd" }}
                />
              </Form.Group>

              <Button
                style={{
                  backgroundColor: "#60BAEE",
                  borderRadius: "10px",
                  borderColor: "#60BAEE",
                  color: "white",
                  fontWeight: "bold"
                }}
                type="submit"
                variant="light"
                className="w-100 mt-3"
              >
                Register
              </Button>
            </Form>

            <div className="my-3 text-center">
              <p>
                Sudah punya akun? <a href="/partisipan-login">Login</a>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RegisterPage;
