import React, { useState, useEffect } from "react";
import axios from "axios";
import { Breadcrumb, Button, Card, Table, Alert, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import AdminLayout from "../layouts/AdminLayout";

const AdminCbtResponses = () => {
  const [responses, setResponses] = useState([]);
  const [error, setError] = useState(null);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [formData, setFormData] = useState({
    id_task: "",
    id_partisipan: "",
    jawaban: "",
    submission_date: "",
  });

  useEffect(() => {
    fetchResponses();
  }, []);

  const fetchResponses = async () => {
    try {
      const response = await axios.get("http://localhost:8080/cbt-responses");
      setResponses(response.data);
    } catch (error) {
      setError("Error fetching response data. Please try again later.");
      console.error("Error fetching response data:", error);
    }
  };

  const deleteResponse = async (id) => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete this response?");
      if (confirmed) {
        await axios.delete(`http://localhost:8080/cbt-responses/${id}`);
        fetchResponses();
      }
    } catch (error) {
      setError("Error deleting response. Please try again later.");
      console.error("Error deleting response:", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUploadFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/cbt-responses", formData);
      fetchResponses();
      setShowUploadForm(false);
      setFormData({
        id_task: "",
        id_partisipan: "",
        jawaban: "",
        submission_date: "",
      });
    } catch (error) {
      setError("Error uploading response. Please try again later.");
      console.error("Error uploading response:", error);
    }
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/cbt-responses/${formData.id_response}`, formData);
      fetchResponses();
      setShowEditForm(false);
      setFormData({
        id_task: "",
        id_partisipan: "",
        jawaban: "",
        submission_date: "",
      });
    } catch (error) {
      setError("Error updating response. Please try again later.");
      console.error("Error updating response:", error);
    }
  };

  return (
    <AdminLayout>
      <div>
        <Breadcrumb className="mt-3">
          <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>CBT Responses</Breadcrumb.Item>
        </Breadcrumb>

        <Card>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="font-weight-bold" style={{ fontSize: "20px" }}>
                CBT Responses
              </h5>
              
            </div>
            {error && <Alert variant="danger">{error}</Alert>}
            {showUploadForm && (
              <Form onSubmit={handleUploadFormSubmit}>
                
                <Form.Group controlId="formIdPartisipan">
                  
                </Form.Group>
                <Form.Group controlId="formJawaban">
                  <Form.Label>Response</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="jawaban"
                    value={formData.jawaban}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formSubmissionDate">
                  <Form.Label>Submission Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="submission_date"
                    value={formData.submission_date}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            )}
            {showEditForm && (
              <Form onSubmit={handleEditFormSubmit}>
                <Form.Group controlId="formIdTask">
                  <Form.Label>Task ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="id_task"
                    value={formData.id_task}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formIdPartisipan">
                  <Form.Label>Participant ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="id_partisipan"
                    value={formData.id_partisipan}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formJawaban">
                  <Form.Label>Response</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="jawaban"
                    value={formData.jawaban}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formSubmissionDate">
                  <Form.Label>Submission Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="submission_date"
                    value={formData.submission_date}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Update
                </Button>
              </Form>
            )}
            <div className="table-responsive" style={{ overflowY: "auto", maxHeight: "450px" }}>
              <Table striped bordered hover width={"100%"}>
                <thead>
                  <tr>
                    <th>No</th>
                   
                    <th>Response</th>
                    <th>Submission Date</th>
                  </tr>
                </thead>
                <tbody>
                  {responses.map((response, index) => (
                    <tr key={response.id_response}>
                      <td>{index + 1}</td>
                      
                      <td>{response.jawaban}</td>
                      <td>{response.submission_date}</td>
                      <td>
                       
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

export default AdminCbtResponses;
