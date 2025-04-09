import React, { useState, useEffect } from "react";
import axios from "axios";
import { Breadcrumb, Button, Card, Table, Alert, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faUpload, faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import AdminLayout from "../layouts/AdminLayout";

const VoiceOvers = () => {
    const [voiceOvers, setVoiceOvers] = useState([]);
    const [error, setError] = useState(null);
    const [showUploadForm, setShowUploadForm] = useState(false);
    const [formData, setFormData] = useState({ id: null, judul: "", deskripsi: "", file_voice: null });
    const [audioPlayer, setAudioPlayer] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        fetchVoiceOvers();
    }, []);

    const fetchVoiceOvers = async () => {
        try {
            const response = await axios.get("http://localhost:8080/voiceovers");
            setVoiceOvers(response.data);
        } catch (error) {
            setError("Error fetching voice-over data. Please try again later.");
            console.error("Error fetching voice-over data:", error);
        }
    };

    const deleteVoiceOver = async (id) => {
        try {
            const confirmed = window.confirm("Are you sure you want to delete this voice-over?");
            if (confirmed) {
                await axios.delete(`http://localhost:8080/voiceovers/${id}`);
                fetchVoiceOvers();
            }
        } catch (error) {
            setError("Error deleting voice-over. Please try again later.");
            console.error("Error deleting voice-over:", error);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, file_voice: e.target.files[0] });
    };

    const handleUploadFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataUpload = new FormData();
            formDataUpload.append("judul", formData.judul);
            formDataUpload.append("deskripsi", formData.deskripsi);
            if (formData.file_voice) {
                formDataUpload.append("file_voice", formData.file_voice);
            }

            if (formData.id) {
                // Menggunakan POST untuk update dengan rute yang diperbarui
                await axios.put(`http://localhost:8080/voiceovers/update/${formData.id}`, formDataUpload);
            } else {
                // Untuk membuat voice-over baru
                await axios.post("http://localhost:8080/voiceovers", formDataUpload);
            }

            fetchVoiceOvers();
            setShowUploadForm(false);
            setFormData({ id: null, judul: "", deskripsi: "", file_voice: null });
        } catch (error) {
            setError("Error uploading voice-over. Please try again later.");
            console.error("Error uploading voice-over:", error);
        }
    };

    const playAudio = (url) => {
        if (audioPlayer) {
            audioPlayer.src = url;
            audioPlayer.play();
        }
        setIsPlaying(true);
    };

    const pauseAudio = () => {
        if (audioPlayer) {
            audioPlayer.pause();
        }
        setIsPlaying(false);
    };

    const handleEditClick = (voiceOver) => {
        setFormData({
            id: voiceOver.id,
            judul: voiceOver.judul,
            deskripsi: voiceOver.deskripsi,
            file_voice: null, // File input will be handled separately
        });
        setShowUploadForm(true);
    };

    return (
        <AdminLayout>
            <div>
                <Breadcrumb className="mt-3">
                    <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Voice Overs</Breadcrumb.Item>
                </Breadcrumb>

                <Card>
                    <Card.Body>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5 className="font-weight-bold" style={{ fontSize: "20px" }}>
                                Voice Over Data
                            </h5>
                            <Button variant="primary" onClick={() => setShowUploadForm(true)}>
                                <FontAwesomeIcon icon={faUpload} className="mr-1" /> Upload Voice Over
                            </Button>
                        </div>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {showUploadForm && (
                            <Form onSubmit={handleUploadFormSubmit}>
                                <Form.Group controlId="formJudul">
                                    <Form.Label>Judul</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="judul"
                                        value={formData.judul}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formDeskripsi">
                                    <Form.Label>Deskripsi</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="deskripsi"
                                        value={formData.deskripsi}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formFileVoice">
                                    <Form.Label>File Voice</Form.Label>
                                    <Form.Control
                                        type="file"
                                        accept=".mp3,.wav"
                                        name="file_voice"
                                        onChange={handleFileChange}
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    {formData.id ? "Update" : "Submit"}
                                </Button>
                            </Form>
                        )}
                        <div className="table-responsive" style={{ overflowY: "auto", maxHeight: "450px" }}>
                            <Table striped bordered hover width={"100%"}>
                                <thead>
                                    <tr>
                                        <th width={"5%"}>No</th>
                                        <th width={"25%"}>Judul</th>
                                        <th width={"35%"}>Deskripsi</th>
                                        <th width={"25%"}>File Voice</th>
                                        <th width={"10%"}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {voiceOvers.map((voiceOver, index) => (
                                        <tr key={voiceOver.id}>
                                            <td>{index + 1}</td>
                                            <td>{voiceOver.judul}</td>
                                            <td>{voiceOver.deskripsi}</td>
                                            <td>
                                                <Button
                                                    variant="primary"
                                                    size="sm"
                                                    className="mr-2"
                                                    onClick={() => playAudio(`http://localhost:8080/voiceovers/audio/${voiceOver.file_voice}`)}
                                                >
                                                    <FontAwesomeIcon icon={faPlay} />
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => pauseAudio()}
                                                >
                                                    <FontAwesomeIcon icon={faPause} />
                                                </Button>
                                            </td>
                                            <td>
                                                <Button
                                                    variant="info"
                                                    size="sm"
                                                    className="mr-2"
                                                    onClick={() => handleEditClick(voiceOver)}
                                                >
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => deleteVoiceOver(voiceOver.id)}
                                                >
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                        <audio
                            ref={(element) => setAudioPlayer(element)}
                            onEnded={() => setIsPlaying(false)}
                            onError={() => setIsPlaying(false)}
                        />
                    </Card.Body>
                </Card>
            </div>
        </AdminLayout>
    );
};

export default VoiceOvers;
