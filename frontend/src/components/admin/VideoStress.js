import React, { useState, useEffect } from "react";
import axios from "axios";
import { Breadcrumb, Button, Card, Table, Alert, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import AdminLayout from "../layouts/AdminLayout";

const VideoStress = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [formData, setFormData] = useState({ id: "", judul: "", url: "" });

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/video-stress");
      setVideos(response.data);
    } catch (error) {
      setError("Error fetching video data. Please try again later.");
      console.error("Error fetching video data:", error);
    }
  };

  const deleteVideo = async (id) => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete this video?");

      if (confirmed) {
        await axios.delete(`http://localhost:8080/video-stress/${id}`);
        fetchVideos();
      }
    } catch (error) {
      setError("Error deleting video. Please try again later.");
      console.error("Error deleting video:", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUploadFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/video-stress", formData);
      fetchVideos();
      setShowUploadForm(false);
      setFormData({ id: "", judul: "", url: "" });
    } catch (error) {
      setError("Error uploading video. Please try again later.");
      console.error("Error uploading video:", error);
    }
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/video-stress/${formData.id}`, formData);
      fetchVideos();
      setShowEditForm(false);
      setFormData({ id: "", judul: "", url: "" });
    } catch (error) {
      setError("Error updating video. Please try again later.");
      console.error("Error updating video:", error);
    }
  };

  return (
    <AdminLayout>
      <div>
        <Breadcrumb className="mt-3">
          <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Video Stress</Breadcrumb.Item>
        </Breadcrumb>

        <Card>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="font-weight-bold" style={{ fontSize: "20px" }}>
                Video Stress Data
              </h5>
              <Button variant="primary" onClick={() => setShowUploadForm(true)}>
                <FontAwesomeIcon icon={faUpload} className="mr-1" /> Upload Video
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
                <Form.Group controlId="formUrl">
                  <Form.Label>URL</Form.Label>
                  <Form.Control
                    type="text"
                    name="url"
                    value={formData.url}
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
                    <th width={"40%"}>Judul</th>
                    <th width={"40%"}>URL</th>
                    <th width={"15%"}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {videos.map((video, index) => (
                    <tr key={video.id}>
                      <td>{index + 1}</td>
                      <td>{video.judul}</td>
                      <td>{video.url}</td>
                      <td>
                        <Button
                          variant="primary"
                          size="sm"
                          className="mr-2"
                          onClick={() => {
                            setShowEditForm(true);
                            setFormData(video);
                          }}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => deleteVideo(video.id)}
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

export default VideoStress;
