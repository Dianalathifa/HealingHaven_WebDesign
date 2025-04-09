import React, { useState, useEffect } from "react";
import axios from "axios";
import { Breadcrumb, Button, Card, Table, Alert, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import AdminLayout from "../layouts/AdminLayout";

const AdminCbtDailyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [formData, setFormData] = useState({
    id_session: "",
    no_hari: "",
    judul_task: "",
    deskripsi_task: "",
    tips_task: "",
    is_completed: false,
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/daily-tasks");
      setTasks(response.data);
    } catch (error) {
      setError("Error fetching task data. Please try again later.");
      console.error("Error fetching task data:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete this task?");
      if (confirmed) {
        await axios.delete(`http://localhost:8080/daily-tasks/${id}`);
        fetchTasks();
      }
    } catch (error) {
      setError("Error deleting task. Please try again later.");
      console.error("Error deleting task:", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUploadFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/daily-tasks", formData);
      fetchTasks();
      setShowUploadForm(false);
      setFormData({
        id_session: "",
        no_hari: "",
        judul_task: "",
        deskripsi_task: "",
        tips_task: "",
        is_completed: false,
      });
    } catch (error) {
      setError("Error uploading task. Please try again later.");
      console.error("Error uploading task:", error);
    }
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/daily-tasks/${formData.id_task}`, formData);
      fetchTasks();
      setShowEditForm(false);
      setFormData({
        id_session: "",
        no_hari: "",
        judul_task: "",
        deskripsi_task: "",
        tips_task: "",
        is_completed: false,
      });
    } catch (error) {
      setError("Error updating task. Please try again later.");
      console.error("Error updating task:", error);
    }
  };

  return (
    <AdminLayout>
      <div>
        <Breadcrumb className="mt-3">
          <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>CBT Daily Tasks</Breadcrumb.Item>
        </Breadcrumb>

        <Card>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="font-weight-bold" style={{ fontSize: "20px" }}>
                CBT Daily Tasks
              </h5>
              <Button variant="primary" onClick={() => setShowUploadForm(true)}>
                <FontAwesomeIcon icon={faUpload} className="mr-1" /> Add Task
              </Button>
            </div>
            {error && <Alert variant="danger">{error}</Alert>}
            {showUploadForm && (
              <Form onSubmit={handleUploadFormSubmit}>
                <Form.Group controlId="formIdSession">
                  <Form.Label>Session ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="id_session"
                    value={formData.id_session}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formNoHari">
                  <Form.Label>Day Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="no_hari"
                    value={formData.no_hari}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formJudulTask">
                  <Form.Label>Task Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="judul_task"
                    value={formData.judul_task}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formDeskripsiTask">
                  <Form.Label>Task Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="deskripsi_task"
                    value={formData.deskripsi_task}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formTipsTask">
                  <Form.Label>Task Tips</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="tips_task"
                    value={formData.tips_task}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formIsCompleted">
                  <Form.Check
                    type="checkbox"
                    name="is_completed"
                    label="Is Completed"
                    checked={formData.is_completed}
                    onChange={(e) => setFormData({ ...formData, is_completed: e.target.checked })}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            )}
            {showEditForm && (
              <Form onSubmit={handleEditFormSubmit}>
                <Form.Group controlId="formIdSession">
                  <Form.Label>Session ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="id_session"
                    value={formData.id_session}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formNoHari">
                  <Form.Label>Day Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="no_hari"
                    value={formData.no_hari}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formJudulTask">
                  <Form.Label>Task Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="judul_task"
                    value={formData.judul_task}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formDeskripsiTask">
                  <Form.Label>Task Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="deskripsi_task"
                    value={formData.deskripsi_task}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formTipsTask">
                  <Form.Label>Task Tips</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="tips_task"
                    value={formData.tips_task}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formIsCompleted">
                  <Form.Check
                    type="checkbox"
                    name="is_completed"
                    label="Is Completed"
                    checked={formData.is_completed}
                    onChange={(e) => setFormData({ ...formData, is_completed: e.target.checked })}
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
                    <th>Session ID</th>
                    <th>Day Number</th>
                    <th>Task Title</th>
                    <th>Task Description</th>
                    <th>Task Tips</th>
                    <th>Is Completed</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task, index) => (
                    <tr key={task.id_task}>
                      <td>{index + 1}</td>
                      <td>{task.id_session}</td>
                      <td>{task.no_hari}</td>
                      <td>{task.judul_task}</td>
                      <td>{task.deskripsi_task}</td>
                      <td>{task.tips_task}</td>
                      <td>{task.is_completed ? "Yes" : "No"}</td>
                      <td>
                        <Button
                          variant="primary"
                          size="sm"
                          className="mr-2"
                          onClick={() => {
                            setShowEditForm(true);
                            setFormData(task);
                          }}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => deleteTask(task.id_task)}
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

export default AdminCbtDailyTasks;
