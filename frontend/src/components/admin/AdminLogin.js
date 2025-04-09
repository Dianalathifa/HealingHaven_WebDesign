import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAdminAuth } from './AdminAuthContext';
import axios from "axios";
import { Row, Col, Form, Button, Image } from "react-bootstrap";
import logo from "../images/logo-web.png";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { dispatch } = useAdminAuth();

  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/admin/login', {
        email_admin: email,
        password_admin: password
      });
      console.log(response.data); // Log response data
     // Simpan data admin ke localStorage
     const { admin_id, admin_nama, admin_email } = response.data;
     localStorage.setItem('admin_id', admin_id);
     localStorage.setItem('admin_nama', admin_nama);
     localStorage.setItem('admin_email', admin_email);

     // Dispatch action untuk menyimpan status login admin
     dispatch({
       type: 'LOGIN_SUCCESS_ADMIN',
       payload: {
         admin: { admin_id, admin_nama, admin_email }
       }
     });

      history.push('/admin');
    } catch (error) {
      if (error.response) {
        // Kesalahan dari server (status code bukan 2xx)
        if (error.response.status === 401) {
          alert('Login failed! Incorrect email or password.'); // Kesalahan email/sandi
        } else {
          alert('Login failed! Please try again later.'); // Kesalahan server lainnya
        }
      } else if (error.request) {
        // Kesalahan dalam melakukan permintaan
        alert('Failed to send request! Please check your network connection.');
      } else {
        // Kesalahan lainnya
        alert('An error occurred! Please try again later.');
      }
    }
  };
  

  return (
      <Row className="d-flex justify-content-center align-items-center" style={{ height: "100vh",  backgroundColor: "#C4EAF4" }}>
      <Col md={4} className="mx-5">
        <div className="d-flex align-items-center justify-content-center">
          <Image src={logo} alt="Logo" />
        </div>
        <h1 style={{ textAlign: "center", color: "#005F75", fontWeight: "bold" }}>Login Admin</h1>
        <hr style={{ borderTop: "2px solid gray" }} />
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Control
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail"
              style={{ backgroundColor: "#FFFFFF", borderColor: "gray" }}
              autoFocus
              required
            />
          </Form.Group>
          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              style={{ backgroundColor: "#FFFFFF", borderColor: "gray" }}
              required
            />
          </Form.Group>
          <Button
            style={{ backgroundColor: "#005F75", borderRadius: "10px", borderColor: "#393646" }}
            type="submit"
            className="w-100 mt-3"
          >
            Login
          </Button>
        </Form>
        <div className="my-3 text-center">
          <p>
            Create new account? <a href="/admin-register">Register</a>
          </p>
        </div>
      </Col>
    </Row>
  );
};

export default Login;