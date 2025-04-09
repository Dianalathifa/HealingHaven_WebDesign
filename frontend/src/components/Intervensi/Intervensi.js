import React, { useState, useEffect } from "react";
import axios from "axios";
import { Breadcrumb, Button, Card, Table, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import AdminLayout from "../layouts/AdminLayout";

const Intervensi = () => {
  const [intervensiList, setIntervensiList] = useState([]);
  const [kategoriList, setKategoriList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getIntervensiList();
    getKategoriList();
  }, []);

  const getIntervensiList = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/intervensi");
      setIntervensiList(response.data);
    } catch (error) {
      setError("Error fetching intervention data. Please try again later.");
      console.error("Error fetching intervention data:", error);
    }
  };

  const getKategoriList = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/kategori_test");
      setKategoriList(response.data);
    } catch (error) {
      setError("Error fetching category data. Please try again later.");
      console.error("Error fetching category data:", error);
    }
  };

  const deleteIntervensi = async (id) => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete this intervention?");

      if (confirmed) {
        await axios.delete(`http://localhost:8080/api/intervensi/${id}`);
        getIntervensiList();
      }
    } catch (error) {
      setError("Error deleting intervention. Please try again later.");
      console.error("Error deleting intervention:", error);
    }
  };

  // Function to get category name based on its ID
  const getCategoryName = (id) => {
    const category = kategoriList.find((kategori) => kategori.id_test === id);
    return category ? category.nama_test : "Unknown";
  };

  return (
    <AdminLayout>
      <div>
        <Breadcrumb className="mt-3">
          <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Intervensi</Breadcrumb.Item>
        </Breadcrumb>

        <Card>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="font-weight-bold" style={{ fontSize: "20px" }}>
                Intervention Data
              </h5>
              <Link to="/intervensi/add">
                <Button variant="success" style={{ backgroundColor: "#FEA503", borderColor: "#FEA503" }}>+ Add</Button>
              </Link>
            </div>
            {error && <Alert variant="danger">{error}</Alert>}
            <div className="table-responsive" style={{ overflowY: "auto", maxHeight: "450px" }}>
              <Table striped bordered hover width={"100%"}>
                <thead>
                  <tr>
                    <th width={"5%"}>No</th>
                    <th width={"20%"}>Test Category</th>
                    <th width={"20%"}>Description</th>
                    <th width={"20%"}>Image</th>
                    <th width={"15%"}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {intervensiList.map((intervensi, index) => (
                    <tr key={intervensi.id_intervensi}>
                      <td>{index + 1}</td>
                      <td>{getCategoryName(intervensi.id_kategori_intervensi)}</td>
                      <td>{intervensi.deskripsi_challenge}</td>
                      <td>
                        <img
                          src={`http://localhost:8080/images/intervensi/${intervensi.image_challenge}`}
                          alt="Intervensi"
                          style={{ maxWidth: "100px", maxHeight: "100px" }}
                        />
                      </td>  
                      <td>
                        <Link
                          to={`/intervensi/edit/${intervensi.id_intervensi}`}
                          className="btn btn-primary btn-sm mr-2"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </Link>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => deleteIntervensi(intervensi.id_intervensi)}
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

export default Intervensi;
