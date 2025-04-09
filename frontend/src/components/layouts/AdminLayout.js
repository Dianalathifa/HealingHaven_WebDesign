import React, { useState, useEffect } from "react";
import { Navbar, Nav, NavDropdown, Container, Col, Button, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useHistory } from "react-router-dom";
import Logo from "../images/logo.png";
import profileImage from '../images/admin.jpg'; // Impor gambar profil admin
import "../style/AdminLayout.css";

const AdminLayout = ({ children }) => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const location = useLocation();
  const history = useHistory();
  const [adminProfile, setAdminProfile] = useState({
    nama_admin: localStorage.getItem('admin_nama') || '',
    email_admin: localStorage.getItem('admin_email') || '',
    foto_profile: localStorage.getItem('admin_foto_profile') || profileImage,
  });

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  useEffect(() => {
    // Ambil informasi admin dari penyimpanan lokal (misalnya, localStorage)
    const adminData = {
      nama_admin: localStorage.getItem('admin_nama') || '',
      email_admin: localStorage.getItem('admin_email') || '',
      foto_profile: localStorage.getItem('admin_foto_profile') || profileImage,
    };
    setAdminProfile(adminData);
  }, []);

  const handleLogout = () => {
    // Hapus data admin dari penyimpanan lokal
    localStorage.removeItem("admin_nama");
    localStorage.removeItem("admin_email");
    localStorage.removeItem("admin_foto_profile");
    // Redirect ke halaman login admin
    history.push("/admin/login");
  };

  const handleProfileClick = () => {
    // Redirect ke halaman profil admin
    history.push("/admin/profile");
  };

  return (
    <>
      <Navbar
        style={{
          backgroundColor: "#239BB2",
          borderBottom: "1px solid #ddd",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
        }}
        expand="lg"
      >
        <Container fluid>
          <Navbar.Brand
            href="/dashboard"
            className="d-flex justify-content-begin align-items-center"
          >
            <img
              src={Logo}
              alt="Logo"
              style={{
                width: "10%",
                padding: "3px",
                boxSizing: "border-box",
              }}
            />
            <h3 style={{ color: "white", fontWeight: "bold" }}>Healing Haven</h3>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <Button
              variant="light"
              onClick={toggleSidebar}
              style={{ margin: "10px" }}
            >
              <FontAwesomeIcon icon={faBars} />
            </Button>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {/* {adminProfile.nama_admin && (
                <NavDropdown
                  title={`Hi, ${adminProfile.nama_admin}`}
                  id="basic-nav-dropdown"
                  onClick={handleProfileClick}
                >
                  <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
              )} */}
            </Nav>
            {/* {adminProfile.nama_admin && (
              <Image
                src={adminProfile.foto_profile}
                roundedCircle
                style={{ width: '40px', height: '40px', marginLeft: '10px' }}
              />
            )} */}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div
        style={{
          display: "flex",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <Col
          sm={2}
          className={`sidebar ${sidebarVisible ? "d-block" : "d-none"}`}
        >
          <Nav className="flex-column">
            <Nav.Link
              href="/dashboard"
              className={`sidebar-link ${
                location.pathname === "/dashboard" ? "active" : ""
              } mt-3`}
            >
              Dashboard
            </Nav.Link>

            <Nav.Link
              href="/partisipan"
              className={`sidebar-link ${
                location.pathname === "/partisipan" ? "active" : ""
              } mt-3`}
            >
              Partisipan
            </Nav.Link>
            
            

            <Nav.Link
              href="/kategoritest"
              className={`sidebar-link ${
                location.pathname.startsWith("/kategoritest") ? "active" : ""
              } mt-2`}
            >
              Kategori Test
            </Nav.Link>

            <Nav.Link
              href="/kuisioner"
              className={`sidebar-link ${
                location.pathname.startsWith("/kuisioner") ? "active" : ""
              } mt-2`}
            >
              Kuisioner
            </Nav.Link>

            <NavDropdown
              title="Jawaban Test"
              id="basic-nav-dropdown-jawaban"
              className={`sidebar-link ${
                location.pathname.startsWith("/jawaban") ? "active" : ""
              } mt-2`}
            >
              <NavDropdown.Item href="/jawaban/srq">Jawaban SRQ</NavDropdown.Item>
              <NavDropdown.Item href="/jawaban/cemas">Jawaban Cemas</NavDropdown.Item>
              <NavDropdown.Item href="/jawaban/stress">Jawaban Stress</NavDropdown.Item>
              <NavDropdown.Item href="/jawaban/depresi">Jawaban Depresi</NavDropdown.Item>
              <NavDropdown.Item href="/jawaban/suicide">Jawaban Suicide</NavDropdown.Item>
              <NavDropdown.Item href="/jawaban/post-test">Jawaban Post Test</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown
              title="Intervensi"
              id="basic-nav-dropdown-jawaban"
              className={`sidebar-link ${
                location.pathname.startsWith("/intervensi-admin") ? "active" : ""
              } mt-2`}
            >
              <NavDropdown.Item href="/grateful/stress">Grateful</NavDropdown.Item>
              <NavDropdown.Item href="/intervensi">Konten 30 Days</NavDropdown.Item>
              <NavDropdown.Item href="/jawaban/30days">Respon 30 Days</NavDropdown.Item>
              <NavDropdown.Item href="/video-stress-admin">Konten Video</NavDropdown.Item>
              <NavDropdown.Item href="/voice-over-admin">Voice Over</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown
              title="Activity Intervensi"
              id="basic-nav-dropdown-jawaban"
              className={`sidebar-link ${
                location.pathname.startsWith("/activity-intervensi-admin") ? "active" : ""
              } mt-2`}
            >
              <NavDropdown.Item href="/jadwal/tidur">Jadwal Tidur</NavDropdown.Item>
              <NavDropdown.Item href="/jadwal/olahraga">Jadwal Olahraga</NavDropdown.Item>
              <NavDropdown.Item href="/jadwal/todo">Jadwal to do</NavDropdown.Item>
              <NavDropdown.Item href="/jadwal/kegiatan">Jadwal Kegiatan</NavDropdown.Item>
              <NavDropdown.Item href="/jadwal/makan">Pola Makan</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown
              title="Checklist Intervensi"
              id="basic-nav-dropdown-jawaban"
              className={`sidebar-link ${
                location.pathname.startsWith("/checklist-admin") ? "active" : ""
              } mt-2`}
            >
              <NavDropdown.Item href="/checklist/cemas">Cemas Ringan</NavDropdown.Item>
              <NavDropdown.Item href="/checklist/stress">Stress Ringan</NavDropdown.Item>
              <NavDropdown.Item href="/checklist/depresi">Depresi Ringan</NavDropdown.Item>
              <NavDropdown.Item href="/checklist/status">Mindfulness</NavDropdown.Item>
             
            </NavDropdown>

            <NavDropdown
              title="Intervensi CBT"
              id="basic-nav-dropdown-jawaban"
              className={`sidebar-link ${
                location.pathname.startsWith("/cbt-admin") ? "active" : ""
              } mt-2`}
            >
              <NavDropdown.Item href="/cbt-session-admin">Sesi CBT</NavDropdown.Item>
              <NavDropdown.Item href="/cbt-daily-task-admin">CBT Daily Task</NavDropdown.Item>
              <NavDropdown.Item href="/cbt-responses-admin">Respon CBT</NavDropdown.Item>
             
            </NavDropdown>

            {/* <Nav.Link
              href="/cbt-session-admin"
              className={`sidebar-link ${
                location.pathname.startsWith("/cbt-session-admin") ? "active" : ""
              } mt-2`}
            >
              Sesi CBT
            </Nav.Link>

            <Nav.Link
              href="/cbt-daily-task-admin"
              className={`sidebar-link ${
                location.pathname.startsWith("/cbt-daily-task-admin") ? "active" : ""
              } mt-2`}
            >
              CBT Daily Task
            </Nav.Link>

            <Nav.Link
              href="/cbt-responses-admin"
              className={`sidebar-link ${
                location.pathname.startsWith("/cbt-responses-admin") ? "active" : ""
              } mt-2`}
            >
              Respon CBT
            </Nav.Link> */}

            <Nav.Link
              href="/dailyinsight"
              className={`sidebar-link ${
                location.pathname.startsWith("/dailyinsight") ? "active" : ""
              } mt-2`}
            >
              Artikel Harian
            </Nav.Link>
            <Nav.Link
              href="/psikolog"
              className={`sidebar-link ${
                location.pathname.startsWith("/psikolog") ? "active" : ""
              } mt-2`}
            >
              Daftar Psikolog
            </Nav.Link>

           
          </Nav>
        </Col>
        <Col
          sm={10}
          style={{
            marginLeft: sidebarVisible ? "0px" : "0px",
            transition: "margin 0.2s",
            height: "100%",
          }}
        >
          {children}
        </Col>
      </div>
    </>
  );
};

export default AdminLayout;
