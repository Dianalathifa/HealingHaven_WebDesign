// import React from 'react';
// import { Col, Button, Container, Row } from 'react-bootstrap';
// import { Link } from "react-router-dom/cjs/react-router-dom.min.js";
// import Navbar from '../../landing/Navbar.js';
// import Footer from '../../landing/Footer.js';
// import depresiDetail from "../../images/activityTerapi/depresi-detail.png"; // Import gambar
// import activity from "../../images/activityTerapi/activity-detail.png"; // Import gambar
// import depresi from "../../images/CBT/depresi.png"; // Import gambar
// import cbt from "../../images/CBT/cbt.png"; // Import gambar
// import cbtlatihan from "../../images/CBT/cbt-latihan.jpg"; // Import gambar
// import "../../style/Intervensi.css";

// const Teknik54321 = () => {
// return (
//     <>
//     <Navbar />
//     <div style={{marginTop:"150px"}}>
//         <Container className="mt-5" style={{ padding:"60px",backgroundColor:"#F5A5AD80", borderRadius:"50px"}}>
//       <Row className="justify-content-center">
//         <Col md={6}>
//               <h6 style={{ fontSize: "25px", marginTop:"30px", fontWeight:"bold" }}>
//                 Intervensi Depresi Sedang
//                 </h6>
//               <h6 style={{ fontSize: "35px",  fontWeight:"bold" }}>
//               CBT (Cognitive Behavior Therapy) 
//                     </h6>
//                  <Link to="/cbt">
//           <Button
//             variant="light"
//             className="custom-button" // Tambahkan kelas custom-button di sini
//             style={{
//               marginTop:"20px",
//               borderRadius: "50px",
//               fontWeight: "bold",
//               padding: '17px 20px', // Atur padding untuk mengatur ukuran tombol
//               fontSize: '16px' // Atur ukuran font teks tombol
//             }}
//           >
//           Yuk Ikuti Langkah-langkahnya!
//          </Button>
//         </Link>
//         </Col>
//         <Col md={4} className="d-flex align-items-center justify-content-center">
//           <img src={depresiDetail} alt="Image" style={{ maxWidth: "100%", maxHeight: "100%" }} />
//         </Col>
//       </Row>
//     </Container>
//     </div>
    

//     <Container className="my-5" >
//         <Row className="justify-content-center" style={{marginTop:"100px"}}>
//         <Col md={4} className="d-flex align-items-center justify-content-center">
//             <img src={cbt} alt="Image" style={{ borderRadius:"30px", maxWidth: "100%", maxHeight: "100%", height:"300px" }} /> 
//           </Col>
//           <Col md={6}>
//                 <h3 style={{fontWeight:"bold", fontSize:"30px"}}>Apa itu CBT?</h3>
//                 <p style={{ fontSize: "20px", marginTop:"30px"}}>
//                 CBT (Cognitive Behavior Therapy) adalah terapi yang sering digunakan untuk menangani kasus depresi. 
//                 Terapi ini mengkombinasikan cara berpikir dan berperilaku dengan berfokus pada tiga aspek yang saling berkaitan: pikiran, perasaan, dan perilaku. 
//                 Tujuan utama CBT adalah mengubah cara seseorang memandang suatu masalah (kognitif) untuk menghasilkan perubahan emosi dan perilaku yang positif.
//                 </p>
              
//           </Col>        
//         </Row>
//       </Container> 
//       <Container className="my-5" >
//       <Row className="justify-content-center" style={{marginTop:"50px"}}>
//         <Col md={6}>
            
//               <p style={{ fontSize: "25px", marginTop:"30px", marginLeft:"50px"}}>
//               CBT didasarkan pada pemahaman bahwa pikiran, emosi, dan tingkah laku saling mempengaruhi satu sama lain. 
//               Misalnya, keyakinan atau persepsi seseorang tentang suatu situasi dapat mempengaruhi perasaannya dan perilakunya dalam menghadapi situasi tersebut. 
//               Untuk itu, CBT menggabungkan pendekatan perilaku dan kognitif dalam penerapannya, menggunakan berbagai teknik intervensi untuk membantu individu mengubah pola pikir dan perilaku yang tidak membantu menjadi lebih adaptif dan sehat.
//               </p>
              
//         </Col>
//         <Col md={4} className="d-flex align-items-center justify-content-center">
//         <img src={depresi} alt="Image" style={{ borderRadius:"30px", marginRight:"-100px", height:"300px" }} /> 
//         </Col>
//       </Row>
//     </Container>
//     <Container className="my-5" >
//         <Row className="justify-content-center" style={{marginTop:"50px", marginBottom:"100px"}}>
//         <Col md={4} className="d-flex align-items-center justify-content-center">
//             <img src={cbtlatihan} alt="Image" style={{ borderRadius:"30px", maxWidth: "100%", maxHeight: "100%", height:"250px" }} /> {/* Panggil gambar dengan variabel */}
//           </Col>
//           <Col md={6}>
            
//                 <p style={{ fontSize: "25px", marginTop:"30px"}}>
//                 Dalam pendekatan perilaku, tindakan atau perilaku seseorang dianggap memiliki pengaruh langsung terhadap perasaan dan pikirannya. 
//                 Dengan demikian, intervensi CBT sering kali melibatkan latihan untuk mengubah perilaku tertentu yang pada gilirannya akan mempengaruhi pikiran dan perasaan menjadi lebih positif.
//                 </p>
              
//           </Col>        
//         </Row>
//       </Container>
//           <Footer/>
        
//       </>
//     );
// };
// export default Teknik54321;
