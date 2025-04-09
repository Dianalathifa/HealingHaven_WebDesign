import React, { useState, useEffect } from "react";
import axios from "axios";
import { Breadcrumb, Button, Card, Table, Alert, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import AdminLayout from "../layouts/AdminLayout";

const CbtSession = () => {
    const [sessions, setSessions] = useState([]);
    const [error, setError] = useState(null);
    const [showUploadForm, setShowUploadForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [formData, setFormData] = useState({ id: "", no_session: "", judul_session: "", deskripsi_session: "", durasi_session: "" });

    useEffect(() => {
        fetchSessions();
    }, []);

    const fetchSessions = async () => {
        try {
            const response = await axios.get("http://localhost:8080/cbt-sessions");
            setSessions(response.data);
        } catch (error) {
            setError("Error fetching session data. Please try again later.");
            console.error("Error fetching session data:", error);
        }
    };

    const deleteSession = async (id) => {
        try {
            const confirmed = window.confirm("Are you sure you want to delete this session?");

            if (confirmed) {
                await axios.delete(`http://localhost:8080/cbt-sessions/${id}`);
                fetchSessions();
            }
        } catch (error) {
            setError("Error deleting session. Please try again later.");
            console.error("Error deleting session:", error);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUploadFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/cbt-sessions", formData);
            fetchSessions();
            setShowUploadForm(false);
            setFormData({ id: "", no_session: "", judul_session: "", deskripsi_session: "", durasi_session: "" });
        } catch (error) {
            setError("Error uploading session. Please try again later.");
            console.error("Error uploading session:", error);
        }
    };

    const handleEditFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/cbt-sessions/${formData.id}`, formData);
            fetchSessions();
            setShowEditForm(false);
            setFormData({ id: "", no_session: "", judul_session: "", deskripsi_session: "", durasi_session: "" });
        } catch (error) {
            setError("Error updating session. Please try again later.");
            console.error("Error updating session:", error);
        }
    };

    return (
        <AdminLayout>
            <div>
                <Breadcrumb className="mt-3">
                    <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>CBT Session</Breadcrumb.Item>
                </Breadcrumb>

                <Card>
                    <Card.Body>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5 className="font-weight-bold" style={{ fontSize: "20px" }}>
                                CBT Session Data
                            </h5>
                            <Button variant="primary" onClick={() => setShowUploadForm(true)}>
                                <FontAwesomeIcon icon={faUpload} className="mr-1" /> Upload Session
                            </Button>
                        </div>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {showUploadForm && (
                            <Form onSubmit={handleUploadFormSubmit}>
                                <Form.Group controlId="formNoSession">
                                    <Form.Label>Session Number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="no_session"
                                        value={formData.no_session}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formJudulSession">
                                    <Form.Label>Session Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="judul_session"
                                        value={formData.judul_session}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formDeskripsiSession">
                                    <Form.Label>Session Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="deskripsi_session"
                                        value={formData.deskripsi_session}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formDurasiSession">
                                    <Form.Label>Session Duration</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="durasi_session"
                                        value={formData.durasi_session}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        )}
                        <div className="table-responsive" style={{ overflowY: "auto", maxHeight: "450px" }}>
                            <Table striped bordered hover width={"100%"}>
                                <thead>
                                    <tr>
                                        <th width={"5%"}>No</th>
                                        <th width={"40%"}>Session Number</th>

                                        <th width={"20%"}>Session Title</th>
                                        <th width={"20%"}>Session Description</th>
                                        <th width={"10%"}>Session Duration</th>
                                        <th width={"15%"}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sessions.map((session, index) => (
                                        <tr key={session.id_session}>
                                            <td>{index + 1}</td>
                                            <td>{session.no_session}</td>
                                            <td>{session.judul_session}</td>
                                            <td>{session.deskripsi_session}</td>
                                            <td>{session.durasi_session}</td>
                                            <td>
                                                <Button
                                                    variant="primary"
                                                    size="sm"
                                                    className="mr-2"
                                                    onClick={() => {
                                                        setShowEditForm(true);
                                                        setFormData(session);
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => deleteSession(session.id_session)}
                                                >
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </AdminLayout>
    );
};

export default CbtSession;