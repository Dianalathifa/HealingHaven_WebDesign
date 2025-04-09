import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Row, Col, Form, Button, Image, Container, Alert } from "react-bootstrap";
import Swal from "sweetalert2";
import logo from "../images/logo.png";
import Header from "../landing/Navbar";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/partisipan/login', {
        email_partisipan: email,
        password_partisipan: password
      });
      const { data } = response;
      const { partisipan_id, partisipan_nama, partisipan_email, usia, no_telp } = data;
      if (partisipan_id) {
        localStorage.setItem('partisipan_id', partisipan_id);
        localStorage.setItem('partisipan_nama', partisipan_nama);
        localStorage.setItem('partisipan_email', partisipan_email);
        localStorage.setItem('usia', usia);
        localStorage.setItem('no_telp', no_telp);

        // Tampilkan SweetAlert2 saat login berhasil
        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: 'Redirecting to profile page...',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false
        }).then(() => {
          history.push('/');
        });
      } else {
        // Tampilkan SweetAlert2 untuk kesalahan login
        Swal.fire({
          icon: 'error',
          title: 'Login Failed!',
          text: 'Incorrect email or password.',
          confirmButtonColor: '#25B7D3',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      // Tampilkan SweetAlert2 untuk kesalahan login
      Swal.fire({
        icon: 'error',
        title: 'Login Failed!',
        text: 'Incorrect email or password.',
        confirmButtonColor: '#25B7D3',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <>
      <Header />
      <Container>
        <Row className="justify-content-center align-items-center mt-3" style={{ padding: "60px" }}>
          <Col md={6}>
            <div className="text-center mb-4">
              <Image src={logo} alt="Logo" fluid style={{ maxWidth: "30%" }} />
            </div>
            <h1 className="text-center mb-4" style={{ color: "#60BAEE", fontWeight: "bold" }}>LOGIN</h1>
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Masukkan Email"
                  style={{ backgroundColor: "#f5f5f5", borderColor: "#ddd" }}
                  autoFocus
                  required
                  size="lg"
                />
              </Form.Group>
              <Form.Group controlId="formPassword" className="mb-4">
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan Password"
                  style={{ backgroundColor: "#f5f5f5", borderColor: "#ddd" }}
                  required
                  size="lg"
                />
              </Form.Group>
              <Button
                style={{ backgroundColor: "#60BAEE", borderColor: "#60BAEE", borderRadius: "10px", color:"white", fontWeight:"bold"  }}
                variant="light"
                type="submit"
                className="w-100 py-2"
                size="lg"
              >
                Login
              </Button>

            </Form>
            <div className="mt-3 text-center">
              <p style={{ color: "#777" }}>
                Belum punya akun? <a href="/partisipan-register" style={{ color: "#4365E0", textDecoration: "none" }}>Register sekarang!</a>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
