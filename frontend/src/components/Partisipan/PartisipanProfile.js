import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Image, Tab, Card, Tabs, Button } from 'react-bootstrap';
import { useHistory, Link } from 'react-router-dom';
import Navbar from '../landing/Navbar';
import Footer from '../landing/Footer';
import profileImage from '../images/partisipan.jpg';
import test from '../images/profil/test.jpg';
import posttest from '../images/profil/post-test.jpg';
import cemas from '../images/profil/cemas.png';
import depresi from '../images/profil/depresi.png';
import stress from '../images/profil/stress.png';
import suicide from '../images/profil/suicide.png';
import method54 from '../images/profil/54321-.png';
import mindfulnessgb from '../images/profil/mindfulness.png';
import copingbg from '../images/profil/stresscoping.png';
import writingbg from '../images/profil/30days.png';
import activity from '../images/profil/medical-care.png';
import cbtbg from '../images/profil/cbt-.jpg';
import '../style/Profile.css';

const Profile = () => {
  const [partisipan, setPartisipan] = useState({
    nama_partisipan: localStorage.getItem('partisipan_nama') || '',
    email_partisipan: localStorage.getItem('partisipan_email') || '',
    usia: localStorage.getItem('usia') || '',
    no_telp: localStorage.getItem('no_telp') || '',
    foto_profile: localStorage.getItem('partisipan_foto_profile') || profileImage,
  });

  const [klasifikasiHistory, setKlasifikasiHistory] = useState([]);
  const [cemasHistory, setCemasHistory] = useState([]);
  const [depresiHistory, setDepresiHistory] = useState([]);
  const [stressHistory, setStressHistory] = useState([]);
  const [suicideHistory, setSuicideHistory] = useState([]);
  const [postTestResult, setPostTestResult] = useState(null);
  const [initialSRQResult, setInitialSRQResult] = useState(null);
  const [method54321, setMethod54321] = useState([]);
  const [mindfulness, setMindfulness] = useState([]);
  const [coping, setCoping] = useState([]);
  const [writing, setWriting] = useState([]);
  const [jadwal, setJadwal] = useState([]);
  const [cbt, setCBT] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchKlasifikasiHistory = async () => {
      try {
        const partisipanId = localStorage.getItem('partisipan_id');
        const response = await axios.get(`http://localhost:5000/hasil-prediksi-terbaru/${partisipanId}`);
        setKlasifikasiHistory(response.data || []);
      } catch (error) {
        console.error('Gagal mengambil riwayat tes:', error);
      }
    };

    fetchKlasifikasiHistory();
  }, []);

  useEffect(() => {
    const fetchCemasHistory = async () => {
      try {
        const partisipanId = localStorage.getItem('partisipan_id');
        const response = await axios.get(`http://localhost:8080/api/dass-cemas/${partisipanId}`);
        setCemasHistory(response.data || []);
      } catch (error) {
        console.error('Gagal mengambil riwayat tes:', error);
      }
    };

    fetchCemasHistory();
  }, []);

  useEffect(() => {
    const fetchDepresiHistory = async () => {
      try {
        const partisipanId = localStorage.getItem('partisipan_id');
        const response = await axios.get(`http://localhost:8080/api/dass-depresi/${partisipanId}`);
        setDepresiHistory(response.data || []);
      } catch (error) {
        console.error('Gagal mengambil riwayat tes:', error);
      }
    };

    fetchDepresiHistory();
  }, []);

  useEffect(() => {
    const fetchStressHistory = async () => {
      try {
        const partisipanId = localStorage.getItem('partisipan_id');
        const response = await axios.get(`http://localhost:8080/api/dass-stress/${partisipanId}`);
        setStressHistory(response.data || []);
      } catch (error) {
        console.error('Gagal mengambil riwayat tes:', error);
      }
    };

    fetchStressHistory();
  }, []);

  useEffect(() => {
    const fetchSuicideHistory = async () => {
      try {
        const partisipanId = localStorage.getItem('partisipan_id');
        const response = await axios.get(`http://localhost:8080/api/suicide/${partisipanId}`);
        setSuicideHistory(response.data || []);
      } catch (error) {
        console.error('Gagal mengambil riwayat tes:', error);
      }
    };

    fetchSuicideHistory();
  }, []);

  useEffect(() => {
    const fetchPostTestResult = async () => {
      try {
        const partisipanId = localStorage.getItem('partisipan_id');
        const response = await axios.get(`http://localhost:8080/hasil-prediksi/partisipan/${partisipanId}`);
        setPostTestResult(response.data || null);
      } catch (error) {
        console.error('Gagal mengambil hasil prediksi post-test SRQ:', error);
      }
    };
    fetchPostTestResult();
  }, []);

  useEffect(() => {
    const fetchMethod54321 = async () => {
      try {
        const partisipanId = localStorage.getItem('partisipan_id');
        const response = await axios.get(`http://localhost:8080/cemas/checklist/participant/${partisipanId}`);
        setMethod54321(response.data || []);
      } catch (error) {
        console.error('Gagal mengambil hasil intervensi 54321 Method:', error);
      }
    };
    fetchMethod54321();
  }, []);

  useEffect(() => {
    const fetchMindfulness = async () => {
      try {
        const partisipanId = localStorage.getItem('partisipan_id');
        const response = await axios.get(`http://localhost:8080/api/mindfulness/daily-statuses/${partisipanId}`);
        setMindfulness(response.data || []);
      } catch (error) {
        console.error('Gagal mengambil hasil intervensi Mindfulness Method:', error);
      }
    };
    fetchMindfulness();
  }, []);

  useEffect(() => {
    const fetchCoping = async () => {
      try {
        const partisipanId = localStorage.getItem('partisipan_id');
        const response = await axios.get(`http://localhost:8080/stress/checklist/participant/${partisipanId}`);
        setCoping(response.data || []);
      } catch (error) {
        console.error('Gagal mengambil hasil intervensi Coping Stress:', error);
      }
    };
    fetchCoping();
  }, []);

  useEffect(() => {
    const fetchWriting = async () => {
      try {
        const partisipanId = localStorage.getItem('partisipan_id');
        const response = await axios.get(`http://localhost:8080/api/jawaban-intervensi/${partisipanId}`);
        setWriting(response.data || []);
      } catch (error) {
        console.error('Gagal mengambil hasil intervensi Writing and Jurnal:', error);
      }
    };
    fetchWriting();
  }, []);

  useEffect(() => {
    const fetchJadwal = async () => {
      try {
        const partisipanId = localStorage.getItem('partisipan_id');
        const response = await axios.get(`http://localhost:8080/depresi/checklist/participant/${partisipanId}`);
        setJadwal(response.data || []);
      } catch (error) {
        console.error('Gagal mengambil hasil intervensi Jadwal Kegiatan Positif:', error);
      }
    };
    fetchJadwal();
  }, []);

  useEffect(() => {
    const fetchCBT = async () => {
      try {
        const partisipanId = localStorage.getItem('partisipan_id');
        const response = await axios.get(`http://localhost:8080/cbt-responses/${partisipanId}`);
        setCBT(response.data || []);
      } catch (error) {
        console.error('Gagal mengambil hasil intervensi CBT:', error);
      }
    };
    fetchCBT();
  }, []);

  useEffect(() => {
    const fetchInitialSRQResult = async () => {
      try {
        const partisipanId = localStorage.getItem('partisipan_id');
        const response = await axios.get(`http://localhost:5000/hasil-prediksi-terbaru/${partisipanId}`);
        setInitialSRQResult(response.data || null);
      } catch (error) {
        console.error('Gagal mengambil hasil tes SRQ awal:', error);
      }
    };
    fetchInitialSRQResult();
  }, []);

 // Function to compare initial SRQ result with post-test SRQ result
const compareSRQResults = (initialResult, postTestResult) => {
  if (initialResult && postTestResult) {
    // Compare the points
    if (postTestResult.points < initialResult.points) {
      return 'Selamat! Kondisi kesehatan mentalmu menunjukkan kondisi yang semakin membaik. Teruskan usaha baik ini dan jaga mentalmu dengan baik.';
    } else if (postTestResult.points > initialResult.points) {
      return 'Perhatian! Kondisi kesehatan mentalmu menunjukkan adanya peningkatan points pada tesmu. Jangan ragu untuk mengikuti tes lanjutan dan intervensi agar bisa segera mengatasinya.';
    } else {
      return 'Kondisi kesehatan mentalmu belum mengalami perubahan. Teruslah menjaga diri dan berusaha untuk menemukan strategi baru yang bisa membantumu merasa lebih baik.';
    }
  } else {
    return 'Belum ada hasil tes untuk dibandingkan. Silakan lakukan tes terlebih dahulu untuk memantau kondisi kesehatan mentalmu.';
  }
};


  const renderHistory = (history) => {
    if (!Array.isArray(history)) return null;
    return history.map((item, index) => (
      <Card key={index} className="mb-2">
        <Card.Body>
          <Card.Title>{item.title}</Card.Title>
          <Card.Text>Points: {item.points}</Card.Text>
          <Card.Text>Tanggal Tes: {item.tanggal}</Card.Text>
        </Card.Body>
      </Card>
    ));
  };

  const handleEditProfile = () => {
    // Ganti '/edit-profile' dengan path yang sesuai untuk halaman edit profil
    history.push(`/partisipan/profile/:id`);
    // Atau buka modal edit profil di sini
  };
  const renderSection = (title, history) => (
    <>
      <h5>{title}</h5>
      {renderHistory(history)}
    </>
  );

  return (
    <>
      <Navbar />
      <Container className="profile-container" style={{marginBottom:"70px"}}>
        <Row>
          <Col md={4} className="text-center">
          <Card className="mb-3">
      <Card.Body>
        <Image
          src={partisipan.foto_profile || profileImage}
          roundedCircle
          className="profile-image mb-3"
        />
        <Card.Title>{partisipan.nama_partisipan}</Card.Title>
        <Card.Text>Email: {partisipan.email_partisipan}</Card.Text>
        <Card.Text>Usia: {partisipan.usia} tahun</Card.Text>
        <Card.Text>No Telp: {partisipan.no_telp}</Card.Text>
        {/* <Button
          variant="primary"
          onClick={handleEditProfile}
          className="mt-3"
        >
          Edit Profile
        </Button> */}
      </Card.Body>
    </Card>
            <Card>
              <Card.Body>
                <h3><strong>Evaluasi Diri</strong></h3>
                <br></br>
                {postTestResult && initialSRQResult ? (
                  <h4>{compareSRQResults(initialSRQResult, postTestResult)}</h4>
                ) : (
                  <h4>Maaf, belum ada evaluasi untukmu. Segera selesaikan intervensinya!</h4>
                )}
              </Card.Body>
            </Card>
          </Col>
          <Col md={8}>
            <Tabs defaultActiveKey="srq20" id="profile-tabs">
              <Tab eventKey="srq20" title="Hasil Tes Screening">
                {renderSection('', klasifikasiHistory)}

                {klasifikasiHistory && (
                  <Card className="mb-2">
                    <Card.Body>
                      <Row>
                        <Col md={8}>
                          <Card.Title><h4><strong>Hasil Screening SRQ-20</strong></h4></Card.Title>
                          <br></br>
                          <Card.Text>
                            Kamu sudah melakukan Tes Screening Kesehatan Mental <br></br>pada tanggal {new Date(klasifikasiHistory.tanggal_tes).toLocaleDateString('id-ID')}
                          </Card.Text>
                          <br></br>
                          <Card.Text>
                            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                              <tbody>
                                <tr>
                                  <td style={{ borderBottom: '1px solid grey', paddingRight: '20px' }}><strong>Total Points</strong></td>
                                  <td style={{ borderBottom: '1px solid grey' }}>{klasifikasiHistory.points}</td>
                                </tr>
                                <tr>
                                  <td style={{ borderBottom: '1px solid grey', paddingRight: '20px' }}><strong>Status</strong></td>
                                  <td style={{ borderBottom: '1px solid grey', color: 'red', fontWeight: 'bold' }}>
                                    {klasifikasiHistory.mental_disorders === 1 ? "Mengidap gangguan kesehatan mental" : "Kamu tidak memiliki gangguan kesehatan mental"}
                                  </td>
                                </tr>
                                <tr>
                                  <td style={{ borderBottom: '1px solid grey', paddingRight: '20px' }}><strong>Klasifikasi</strong></td>
                                  <td style={{ borderBottom: '1px solid grey', color: 'red', fontWeight: 'bold' }}>{klasifikasiHistory.klasifikasi}</td>
                                </tr>
                              </tbody>
                            </table>
                          </Card.Text>
                        </Col>
                        <Col md={4}>
                          <img src={test} alt="Screening" className="img-fluid" />
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                )}

                {postTestResult && (
                  <Card className="mb-2">
                    <Card.Body>
                      <Row>
                        <Col md={8}>
                          <Card.Title><h4><strong>Hasil Post-Test Screening SRQ-20</strong></h4></Card.Title>
                          <br></br>
                          <Card.Text>
                            Kamu sudah melakukan Post-Test Screening Kesehatan Mental <br></br>pada tanggal {new Date(postTestResult.tanggal_tes).toLocaleDateString('id-ID')}
                          </Card.Text>
                          <br></br>
                          <Card.Text>
                            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                              <tbody>
                                <tr>
                                  <td style={{ borderBottom: '1px solid grey', paddingRight: '20px' }}><strong>Total Points</strong></td>
                                  <td style={{ borderBottom: '1px solid grey' }}>{postTestResult.points}</td>
                                </tr>
                                <tr>
                                  <td style={{ borderBottom: '1px solid grey', paddingRight: '20px' }}><strong>Status</strong></td>
                                  <td style={{ borderBottom: '1px solid grey', color: 'blue', fontWeight: 'bold' }}>
                                    {postTestResult.mental_disorders === 1 ? "Mengidap gangguan kesehatan mental" : "Kamu tidak memiliki gangguan kesehatan mental"}
                                  </td>
                                </tr>
                                <tr>
                                  <td style={{ borderBottom: '1px solid grey', paddingRight: '20px' }}><strong>Klasifikasi</strong></td>
                                  <td style={{ borderBottom: '1px solid grey', color: 'blue', fontWeight: 'bold' }}>{postTestResult.klasifikasi}</td>
                                </tr>
                              </tbody>
                            </table>
                          </Card.Text>
                        </Col>
                        <Col md={4}>
                          <img src={posttest} alt="Screening" className="img-fluid" />
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                )}
              </Tab>


              <Tab eventKey="teslanjutan" title="Hasil Tes Lanjutan Gangguan Kesehatan Mental">
                {cemasHistory && Object.keys(cemasHistory).length > 0 && (
                  <Card className="mb-2">
                    <Card.Body>
                      <Row>
                        <Col md={8}>
                          <Card.Title><h4><strong>Hasil Tes DASS Cemas</strong></h4></Card.Title>
                          <br></br>
                          <Card.Text>
                            Kamu sudah melakukan tes ini pada tanggal {new Date(cemasHistory.tanggal_tes).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                          </Card.Text>
                          <br></br>
                          <Card.Text>
                            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                              <tbody>
                                <tr>
                                  <td style={{ borderBottom: '1px solid grey', paddingRight: '20px' }}><strong>Total Points</strong></td>
                                  <td style={{ borderBottom: '1px solid grey' }}>{cemasHistory.points}</td>
                                </tr>
                                <tr>
                                  <td style={{ borderBottom: '1px solid grey', paddingRight: '20px' }}><strong>Klasifikasi</strong></td>
                                  <td style={{ borderBottom: '1px solid grey', color: 'Red', fontWeight: 'bold' }}>{cemasHistory.klasifikasi}</td>
                                </tr>
                              </tbody>
                            </table>
                          </Card.Text>
                        </Col>
                        <Col md={4}>
                          <img src={cemas} alt="Screening" className="img-fluid" />
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                )}
                {stressHistory && Object.keys(stressHistory).length > 0 && (
                  <Card className="mb-2">
                    <Card.Body>
                      <Row>
                        <Col md={8}>
                          <Card.Title><h4><strong>Hasil Tes DASS Stress</strong></h4></Card.Title>
                          <br></br>
                          <Card.Text>
                            Kamu sudah melakukan tes ini pada tanggal {new Date(stressHistory.tanggal_tes).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                          </Card.Text>
                          <br></br>
                          <Card.Text>
                            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                              <tbody>
                                <tr>
                                  <td style={{ borderBottom: '1px solid grey', paddingRight: '20px' }}><strong>Total Points</strong></td>
                                  <td style={{ borderBottom: '1px solid grey' }}>{stressHistory.points}</td>
                                </tr>
                                <tr>
                                  <td style={{ borderBottom: '1px solid grey', paddingRight: '20px' }}><strong>Klasifikasi</strong></td>
                                  <td style={{ borderBottom: '1px solid grey', color: 'Red', fontWeight: 'bold' }}>{stressHistory.klasifikasi}</td>
                                </tr>
                              </tbody>
                            </table>
                          </Card.Text>
                        </Col>
                        <Col md={4}>
                          <img src={stress} alt="Screening" className="img-fluid" />
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                )}
                {depresiHistory && Object.keys(depresiHistory).length > 0 && (
                  <Card className="mb-2">
                    <Card.Body>
                      <Row>
                        <Col md={8}>
                          <Card.Title><h4><strong>Hasil Tes DASS Depresi</strong></h4></Card.Title>
                          <br></br>
                          <Card.Text>
                            Kamu sudah melakukan tes ini pada tanggal {new Date(depresiHistory.tanggal_tes).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                          </Card.Text>
                          <br></br>
                          <Card.Text>
                            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                              <tbody>
                                <tr>
                                  <td style={{ borderBottom: '1px solid grey', paddingRight: '20px' }}><strong>Total Points</strong></td>
                                  <td style={{ borderBottom: '1px solid grey' }}>{depresiHistory.points}</td>
                                </tr>
                                <tr>
                                  <td style={{ borderBottom: '1px solid grey', paddingRight: '20px' }}><strong>Klasifikasi</strong></td>
                                  <td style={{ borderBottom: '1px solid grey', color: 'Red', fontWeight: 'bold' }}>{depresiHistory.klasifikasi}</td>
                                </tr>
                              </tbody>
                            </table>
                          </Card.Text>
                        </Col>
                        <Col md={4}>
                          <img src={depresi} alt="Screening" className="img-fluid" />
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                )}
                {suicideHistory && Object.keys(suicideHistory).length > 0 && (
                  <Card className="mb-2">
                    <Card.Body>
                      <Row>
                        <Col md={8}>
                          <Card.Title><h4><strong>Hasil Tes Suicide</strong></h4></Card.Title>
                          <br></br>
                          <Card.Text>
                            Kamu sudah melakukan tes ini pada tanggal {new Date(suicideHistory.tanggal_tes).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                          </Card.Text>
                          <br></br>
                          <Card.Text>
                            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                              <tbody>
                                <tr>
                                  <td style={{ borderBottom: '1px solid grey', paddingRight: '20px' }}><strong>Total Points</strong></td>
                                  <td style={{ borderBottom: '1px solid grey' }}>{suicideHistory.points}</td>
                                </tr>
                                <tr>
                                  <td style={{ borderBottom: '1px solid grey', paddingRight: '20px' }}><strong>Klasifikasi</strong></td>
                                  <td style={{ borderBottom: '1px solid grey', color: 'Red', fontWeight: 'bold' }}>{suicideHistory.klasifikasi}</td>
                                </tr>
                              </tbody>
                            </table>
                          </Card.Text>
                        </Col>
                        <Col md={4}>
                          <img src={suicide} alt="Screening" className="img-fluid" />
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                )}
              </Tab>


              <Tab eventKey="riwayatintervensi" title="Riwayat Intervensi">
                {/* 54321 Method */}
                {method54321 && method54321.length > 0 && (
                  <Card className="outer-card">
                    <Card.Body className="text-center">
                      <Card.Title>
                        <h4><strong>54321 Method</strong></h4>
                      </Card.Title>
                      <img
                        src={method54}
                        alt="Intervensi Gambar"
                        className="centered-image"
                        style={{ width: '100%', maxWidth: '200px', margin: '20px auto' }}
                      />
                    </Card.Body>
                    <Card.Body>
                      <Row className="intervention-row">
                        {method54321.map((item, index) => (
                          <Col key={index} className="intervention-card">
                            <Card>
                              <Card.Body>
                                <Card.Title>Hari ke-{item.hari}</Card.Title>
                                <Card.Text>
                                  Kamu {item.status === 1 ? "sudah melakukan" : "sudah melakukan"} intervensi pada tanggal <br></br>{new Date(item.tanggal).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                                </Card.Text>
                                {index === method54321.length - 1 && (
                                  <div className="intervention-button">
                                    <Link to="/intervensigrounding-user">
                                    <button className="btn btn-light">
                                      Yuk lanjutkan intervensimu sampai selesai
                                    </button>
                                    </Link>
                                  </div>
                                )}
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </Card.Body>
                  </Card>
                )}

                {/* Mindfulness */}
                {mindfulness && mindfulness.length > 0 && (
                 <Card className="outer-card">
                 <Card.Body className="text-center">
                   <Card.Title>
                     <h4><strong>Mindfulness Based Stress Reduction</strong></h4>
                   </Card.Title>
                   <img
                     src={mindfulnessgb}
                     alt="Intervensi Gambar"
                     className="centered-image"
                     style={{ width: '100%', maxWidth: '200px', margin: '20px auto' }}
                   />
                 </Card.Body>
                 <Card.Body>
                   <Row className="intervention-row">
                     {mindfulness.map((item, index) => (
                       <Col key={index} className="intervention-card">
                         <Card>
                           <Card.Body>
                             <Card.Title>Minggu Ke-{item.intervention_week}</Card.Title>
                             <Card.Text>
                               Kamu {item.is_completed === 1 ? "sudah melakukan" : "belum melakukan"} intervensi hari ke - {item.intervention_day}<br></br> pada tanggal {new Date(item.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                             </Card.Text>
                             {index === mindfulness.length - 1 && (
                               <div className="intervention-button">
                               <Link to="/intervensimindfulness-user">
                               <button className="btn btn-light">
                                 Yuk lanjutkan intervensimu sampai selesai
                               </button>
                               </Link>
                             </div>
                             )}
                           </Card.Body>
                         </Card>
                       </Col>
                     ))}
                   </Row>
                 </Card.Body>
               </Card>
             )}

                {coping && coping.length > 0 && (
                <Card className="outer-card">
                 <Card.Body className="text-center">
                   <Card.Title>
                     <h4><strong>Stress Coping Strategies</strong></h4>
                   </Card.Title>
                   <img
                     src={copingbg}
                     alt="Intervensi Gambar"
                     className="centered-image"
                     style={{ width: '100%', maxWidth: '200px', margin: '20px auto' }}
                   />
                 </Card.Body>
                 <Card.Body>
                   <Row className="intervention-row">
                     {coping.map((item, index) => (
                       <Col key={index} className="intervention-card">
                         <Card>
                           <Card.Body>
                             <Card.Title>Hari Ke-{item.hari}</Card.Title>
                             <Card.Text>
                               Kamu {item.status === 1 ? "sudah melakukan" : "sudah melakukan"} pada tanggal {new Date(item.tanggal).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                             </Card.Text>
                             {index === coping.length - 1 && (
                               <div className="intervention-button">
                               <Link to="/stress-detail">
                               <button className="btn btn-light">
                                 Yuk lanjutkan intervensimu sampai selesai
                               </button>
                               </Link>
                             </div>
                             )}
                           </Card.Body>
                         </Card>
                       </Col>
                     ))}
                   </Row>
                 </Card.Body>
               </Card>
             )}

                {/* 30 Days Writing */}
                {writing && writing.length > 0 && (
                   <Card className="outer-card">
                   <Card.Body className="text-center">
                     <Card.Title>
                       <h4><strong>30 Days Writing Challenge</strong></h4>
                     </Card.Title>
                     <img
                       src={writingbg}
                       alt="Intervensi Gambar"
                       className="centered-image"
                       style={{ width: '100%', maxWidth: '200px', margin: '20px auto' }}
                     />
                   </Card.Body>
                   <Card.Body>
                     <Row className="intervention-row">
                       {writing.map((item, index) => (
                         <Col key={index} className="intervention-card">
                           <Card>
                             <Card.Body>
                               <Card.Title>Hari Ke-{item.id_intervensi}</Card.Title>
                               <Card.Text>
                                 Kamu sudah melakukan intervesi pada tanggal {new Date(item.tanggal_submit).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                               </Card.Text>
                               <Card.Text>
                                 Dengan memberikan tanggapan <strong>"{item.respon}"</strong> 
                               </Card.Text>
                               {index === writing.length - 1 && (
                                <div className="intervention-button">
                                <Link to="/intervensi30days-user">
                                <button className="btn btn-light">
                                  Yuk lanjutkan intervensimu sampai selesai
                                </button>
                                </Link>
                              </div>
                               )}
                             </Card.Body>
                           </Card>
                         </Col>
                       ))}
                     </Row>
                   </Card.Body>
                 </Card>
               )}

                {/* Activity Therapy */}
                {jadwal && jadwal.length > 0 && (
                   <Card className="outer-card">
                   <Card.Body className="text-center">
                     <Card.Title>
                       <h4><strong>Activity Therapy</strong></h4>
                     </Card.Title>
                     <img
                       src={activity}
                       alt="Intervensi Gambar"
                       className="centered-image"
                       style={{ width: '100%', maxWidth: '200px', margin: '20px auto' }}
                     />
                   </Card.Body>
                   <Card.Body>
                     <Row className="intervention-row">
                       {jadwal.map((item, index) => (
                         <Col key={index} className="intervention-card">
                           <Card>
                             <Card.Body>
                               <Card.Title>Hari Ke-{item.hari}</Card.Title>
                               <Card.Text>
                                 Kamu {item.status === 1 ? "sudah melakukan" : "sudah melakukan"} intervensi ini pada tanggal {new Date(item.tanggal).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                               </Card.Text>
                               {index === jadwal.length - 1 && (
                                 <div className="intervention-button">
                                 <Link to="/detail-terapi">
                                 <button className="btn btn-light">
                                   Yuk lanjutkan intervensimu sampai selesai
                                 </button>
                                 </Link>
                               </div>
                               )}
                             </Card.Body>
                           </Card>
                         </Col>
                       ))}
                     </Row>
                   </Card.Body>
                 </Card>
               )}

                {/* CBT */}
                {cbt && cbt.length > 0 && (
                   <Card className="outer-card">
                   <Card.Body className="text-center">
                     <Card.Title>
                       <h4><strong>Cognitive Behaviour Therapy</strong></h4>
                     </Card.Title>
                     <img
                       src={cbtbg}
                       alt="Intervensi Gambar"
                       className="centered-image"
                       style={{ width: '100%', maxWidth: '200px', margin: '20px auto' }}
                     />
                   </Card.Body>
                   <Card.Body>
                     <Row className="intervention-row">
                       {cbt.map((item, index) => (
                         <Col key={index} className="intervention-card">
                           <Card>
                             <Card.Body>
                             <Card.Title>{item.judul_session}</Card.Title>
                             <Card.Text>
                                 Kamu sudah melakukan intervesi hari ke - {item.no_hari} pada tanggal {new Date(item.submission_date).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                               </Card.Text>
                               <Card.Text>
                                 Dengan memberikan tanggapan <strong>"{item.jawaban}"</strong> 
                               </Card.Text>
                               {index === cbt.length - 1 && (
                                 <div className="intervention-button">
                                 <Link to="/cbt">
                                 <button className="btn btn-light">
                                   Yuk lanjutkan intervensimu sampai selesai
                                 </button>
                                 </Link>
                               </div>
                               )}
                             </Card.Body>
                           </Card>
                         </Col>
                       ))}
                     </Row>
                   </Card.Body>
                 </Card>
               )}

              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
