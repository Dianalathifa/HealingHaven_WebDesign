import React, { useState, useEffect } from "react";
import { Navbar, Nav, NavDropdown, Image } from "react-bootstrap"; 
import { Link, useLocation, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../images/logo.png";
import profileImage from "../images/partisipan.jpg";
import reminderIcon from "../images/notification.png";
import Reminders from "../Partisipan/Reminder";
import "../style/Header.css";

const Header = () => {
  const [partisipanNama, setPartisipanNama] = useState("");
  const [partisipanFoto, setPartisipanFoto] = useState(profileImage);
  const [showReminders, setShowReminders] = useState(false);
  const [reminders, setReminders] = useState([]);
  const currentPath = useLocation().pathname;
  const history = useHistory();

  useEffect(() => {
    const partisipan_nama = localStorage.getItem('partisipan_nama');
    const partisipan_foto = localStorage.getItem('partisipan_foto_profile');
    if (partisipan_nama) {
      setPartisipanNama(partisipan_nama);
    }
    if (partisipan_foto) {
      setPartisipanFoto(partisipan_foto);
    }
  }, []);

  useEffect(() => {
    if (showReminders) {
      fetchReminders();
    }
  }, [showReminders]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        document.body.classList.add('scrolled');
      } else {
        document.body.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const fetchReminders = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/reminders`);
      const data = await response.json();
      setReminders(data);
    } catch (error) {
      console.error("Error fetching reminders:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('partisipan_id');
    localStorage.removeItem('partisipan_nama');
    localStorage.removeItem('partisipan_email');
    localStorage.removeItem('partisipan_foto_profile');
    history.push('/');
  };

  const handleReminderClick = () => {
    setShowReminders(true);
  };

  const showLoginAlert = () => {
    Swal.fire({
      title: 'You are not logged in yet!',
      text: 'Please login first to access this page',
      icon: 'info',
      confirmButtonText: 'OK',
      showCancelButton: true,
      cancelButtonText: 'Batal',
      confirmButtonColor: '#60BAEE',
      customClass: {
        popup: 'custom-swal-popup',
        title: 'custom-swal-title',
        content: 'custom-swal-content',
        confirmButton: 'custom-swal-confirm-button',
        cancelButton: 'custom-swal-cancel-button',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        history.push('/partisipan-login');
      }
    });
  };

  const handleNavigation = (to) => {
    // Check if the user is trying to access protected routes without logging in
    if (!partisipanNama && (to === "/test-user" || to === "/intervensidetail-user")) {
      showLoginAlert();
    } else {
      history.push(to);
    }
  };

  const renderDynamicLink = (to, text) => {
    return (
      <Nav.Link
        as={Link}
        to={to}
        className={`custom-nav-link ${currentPath === to ? "active" : ""}`}
        onClick={(e) => {
          e.preventDefault();
          handleNavigation(to);
        }}
      >
        {text}
      </Nav.Link>
    );
  };

  const renderDynamicDropdown = (title, items) => {
    return (
      <NavDropdown title={title} id="navbarDropdown" className="custom-nav-link">
        {items.map((item, index) => (
          <NavDropdown.Item
            key={index}
            as={Link}
            to={item.to}
            onClick={(e) => {
              e.preventDefault();
              handleNavigation(item.to);
            }}
          >
            {item.text}
          </NavDropdown.Item>
        ))}
      </NavDropdown>
    );
  };

  // Functions for alerts
  const handleScreeningTestClick = () => {
    Swal.fire({
      title: 'Screening Test',
      text: 'We understand that mental health is very important. This Screening Test is the first step to help you better understand your mental state. Please take this test calmly.',
      icon: 'info',
      confirmButtonText: 'OK',
      customClass: {
        popup: 'custom-swal-popup',
        title: 'custom-swal-title',
        content: 'custom-swal-content',
        confirmButton: 'custom-swal-confirm-button',
        icon: 'custom-swal-icon',
      }
    }).then((result) => {
      if (result.isConfirmed) {
          // Redirect to Screening Test page
          history.push('/test-user');
      }
    });
  };

  const handleInterventionClick = () => {
    Swal.fire({
      title: 'Intervensi',
      text: 'Intervention is an approach used to help individuals overcome mental health problems. Please continue to view the intervention options available.',
      icon: 'info',
      confirmButtonText: 'OK',
      customClass: {
        popup: 'custom-swal-popup',
        title: 'custom-swal-title',
        content: 'custom-swal-content',
        confirmButton: 'custom-swal-confirm-button',
        icon: 'custom-swal-icon',
      }
    }).then((result) => {
      if (result.isConfirmed) {
          // Redirect to Intervention page
          history.push('/intervensidetail-user');
      }
    });
  };

  const handleAboutClick = () => {
    Swal.fire({
      title: 'Tentang Kami',
      text: 'Ini adalah konten tentang kami. Anda dapat menulis informasi tentang organisasi atau layanan yang Anda tawarkan di sini.',
      icon: 'info',
      confirmButtonText: 'OK',
      customClass: {
        popup: 'custom-swal-popup',
        title: 'custom-swal-title',
        content: 'custom-swal-content',
        confirmButton: 'custom-swal-confirm-button',
        icon: 'custom-swal-icon',
      }
    });
  };

  return (
    <>
      <Navbar expand="lg" className="fixed-top custom-navbar">
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}
            alt="Logo"
            width="60"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
          <Nav className="mr-auto">
            {renderDynamicLink("/", "Home")}
            {renderDynamicLink("/dailyinsight-user", "Daily Insight")}
            {renderDynamicDropdown("Healing Space", [
              { to: "/test-user", text: "Screening Test" },
              { to: "/intervensidetail-user", text: "Intervention" }
            ])}
            {renderDynamicLink("/about-us", "About Us")}
            {renderDynamicLink("/psikolog-list", "Psychologists List")}
          </Nav>
          <Nav>
            <Nav.Link onClick={handleReminderClick} className="custom-nav-link reminder-icon" style={{ display: "flex", alignItems: "center", marginRight: "10px", cursor: "pointer" }}>
              <img src={reminderIcon} alt="Reminders" style={{ width: '25px', height: '25px', marginRight: '5px' }} />
              {reminders.length > 0 && (
                <span className="badge badge-danger" style={{ marginLeft: '5px' }}>{reminders.length}</span>
              )}
            </Nav.Link>
            {partisipanNama && (
              <Link to="/partisipan-profile" className="nav-link partisipan-profile">
                <Image src={partisipanFoto} alt="Profile" roundedCircle style={{ width: '30px', height: '30px', marginRight: '5px' }} />
                Hi, {partisipanNama}!
              </Link>
            )}
            <Nav.Link as={Link} to="/partisipan-login" className="custom-nav-link login-logout" onClick={partisipanNama ? handleLogout : null}>
              {partisipanNama ? "Logout" : "Login"}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Modal untuk Reminders */}
      <Reminders
        show={showReminders}
        handleClose={() => setShowReminders(false)}
        reminders={reminders}
      />
    </>
  );
};

export default Header;
