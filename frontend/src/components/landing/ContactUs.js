// import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
// import axios from "axios";
// import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";
// import Navbar from "../landing/Navbar.js";
// import Footer from "../landing/Footer.js";
// import foodImage from "../images/contact.png";
// import loc from "../images/location_icon.png";
// import phone from "../images/phone_icon.png";
// import mail from "../images/mail_icon.png";
// import watch from "../images/watch_icon.png";

// const ContactUs = () => {
//   const [nama, setNama] = useState("");
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [submitStatus, setSubmitStatus] = useState(null); // State untuk menyimpan status pesan
//   const history = useHistory();

//   const saveContactUs = async (e) => {
//     try {
//       e.preventDefault();
//       // Mengirim data ke server
//       await axios.post("http://localhost:8080/api/contact", {
//         nama: nama,
//         email: email,
//         message: message,
//       });

//       // Set status pesan
//       setSubmitStatus("success");

//       // Pindah ke halaman "/contact-us" setelah beberapa detik (opsional)
//       setTimeout(() => {
//         history.push("/contact-us");
//       }, 3000);
//     } catch (error) {
//       console.error("Error saving contact:", error);
//       // Set status pesan
//       setSubmitStatus("error");
//     }
//   };

//   return (
//     <div>
//       {/* Banner Section */}
//       <Navbar />
//       <div className="testimonial-banner">
//         <h1 className="testimonial-heading">Contact Us</h1>
//       </div>

//       {/* Contact Form and Information */}
//       <Container className="mt-5 py-5">
//         <Row>
//           {/* Contact Form */}
//           <Col md={6}>
//             <div>
//               <h3
//                 style={{
//                   fontFamily: "Bebas Neu",
//                   fontSize: "30px",
//                   color: "#CC3333",
//                 }}
//                 className="mb-3"
//               >
//                 Send Your Message Here!
//               </h3>
//               {submitStatus === "success" && (
//                 <div className="alert alert-success" role="alert">
//                   Pesan telah berhasil dikirimkan!
//                 </div>
//               )}
//               {submitStatus === "error" && (
//                 <div className="alert alert-danger" role="alert">
//                   There is an error saat mengirim pesan. Silakan coba lagi.
//                 </div>
//               )}
//               <Form onSubmit={saveContactUs}>
//                 <Form.Group controlId="formFullName" className="mb-3">
//                   <Form.Label>Full Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     placeholder="Enter your full name"
//                     name="nama"
//                     value={nama}
//                     onChange={(e) => setNama(e.target.value)}
//                     required
//                   />
//                 </Form.Group>

//                 <Form.Group controlId="formEmail" className="mb-3">
//                   <Form.Label>Email</Form.Label>
//                   <Form.Control
//                     type="email"
//                     name="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                     placeholder="Enter your email"
//                   />
//                 </Form.Group>

//                 <Form.Group controlId="formMessage" className="mb-3">
//                   <Form.Label>Message</Form.Label>
//                   <Form.Control
//                     as="textarea"
//                     rows={3}
//                     placeholder="Message"
//                     name="message"
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     required
//                   />
//                 </Form.Group>

//                 <Button variant="dark" type="submit" className="mb-3">
//                   Send
//                 </Button>
//               </Form>
//             </div>
//           </Col>
//           <Col md={2}></Col>
          
//           {/* Contact Information */}
//           <Col md={4}>
//             <Row className="mb-4">
//               <Col md={12} xs={6}>
//                 <Image src={foodImage} alt="Food" fluid className="mb-3" />
//               </Col>
//               <Col md={12} xs={6}>
//                 {/* <Image src={addressImage} alt="Address" fluid /> */}
//                 <h2
//                   style={{
//                     fontSize: "24px",
//                     color: "#CC3333",
//                     fontWeight: "bold",
//                   }}
//                   className="mb-1"
//                 >
//                   ADDRESS
//                 </h2>
//                 <div className="icon-contact mb-4">
//                   <p>
//                     <img src={loc} alt="" />
//                     <span className="mx-3">
//                       jl. Pegangsaan Timur, Jakarta, 10014
//                     </span>
//                   </p>
//                   <p>
//                     <img src={phone} alt="" />
//                     <span className="mx-3">+880 1630 225 015</span>
//                   </p>
//                   <p>
//                     <img src={mail} alt="" />
//                     <span className="mx-3">dinner@gmail.com</span>
//                   </p>
//                 </div>
//                 <h2
//                   style={{
//                     fontSize: "24px",
//                     color: "#CC3333",
//                     fontWeight: "bold",
//                   }}
//                   className="mb-1"
//                 >
//                   WORKING HOURS
//                 </h2>
//                 <p className="icon-contact mb-4">
//                   <img src={watch} alt="" />
//                   <span className="mx-3">7:30 am to 9:30pm on Weekdays</span>
//                 </p>
//               </Col>
//             </Row>
//           </Col>
//         </Row>
//       </Container>
//       <Footer />
//     </div>
//   );
// };

// export default ContactUs;
