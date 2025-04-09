import React from "react";
import "../style/Footer.css";
import Logo from "../images/logo.png";
import fb from "../images/facebook.png";
import twitter from "../images/twitter.png";
import insta from "../images/ig.png";
import tiktok from "../images/tiktok.png";

const Footer = () => {
  return (
    <>
    <div class="custom-shape-divider-top-1728617387">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" fill="#D2E0FF" preserveAspectRatio="none">
        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill"></path>
    </svg>
</div>
    <footer className="footer" style={{ backgroundColor: "#D2E0FF", paddingTop: "30px", paddingBottom: "30px", maxWidth: "1800px" }}>
      
      <div className="container">
        <div className="row" style={{ marginLeft: "70px" }}>
          <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
            <img src={Logo} alt="logo" className="img-fluid mb-3" style={{ maxWidth: "90px", marginLeft: "70px" }} />
            <p className="text-muted" style={{ fontSize: "12px" }}>It is a mental health platform designed as an innovative solution to improve the mental well-being of students.</p>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
            <h4 className="footer-mb-4" style={{color:"black", marginLeft: "65px"}}>About Us</h4>
            <p className="text-muted" style={{ fontSize: "12px", marginLeft: "70px" }}>Healing Haven It offers a variety of services to help improve mental health through tests and deeper understanding.</p>
            <a href="/about-us" className="text-decoration-none text-muted" style={{ fontSize: "12px", marginLeft: "70px" }}>Read more <i className="bi bi-arrow-right"></i></a>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
            <h4 className=" footer-mb-4" style={{color:"black", marginLeft: "65px"}}>Contact Us</h4>
            <ul className="list-unstyled" style={{ marginLeft: "70px" }}>
              <li><a href="/about" className="text-decoration-none text-muted" style={{ fontSize: "12px" }}>Healing Haven</a></li>
              <li><a href="/career" className="text-decoration-none text-muted" style={{ fontSize: "12px" }}>healinghaven@gmail.com</a></li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
            <h4 className=" footer-mb-4" style={{color:"white", marginLeft: "5px"}}>Find On Social Media</h4>
            <div className="social-icons">
              <a href="#!"><img src={fb} alt="Facebook" className="img-fluid mr-3" style={{ maxWidth: "30px" }} /></a>
              <a href="#!"><img src={twitter} alt="Twitter" className="img-fluid mr-3" style={{ maxWidth: "30px" }} /></a>
              <a href="#!"><img src={insta} alt="Instagram" className="img-fluid mr-3" style={{ maxWidth: "30px" }} /></a>
              <a href="#!"><img src={tiktok} alt="TikTok" className="img-fluid" style={{ maxWidth: "30px" }} /></a>
            </div>
          </div>
        </div>
      </div>

      <hr className="my-4" style={{ borderTop: "2px solid #ccc", width: "95%", margin: "0 auto" }} />

      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <p className="text-muted mb-0" style={{ fontSize: "12px" }}>&copy; {new Date().getFullYear()} HealingHaven. All rights reserved</p>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer;
