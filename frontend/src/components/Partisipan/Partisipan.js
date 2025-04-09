import React, { useState, useEffect } from "react";
import axios from "axios";
import { Breadcrumb, Button, Card, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import AdminLayout from "../layouts/AdminLayout";

const Partisipan = () => {
  const [partisipan, setPartisipan] = useState([]);

  useEffect(() => {
    getPartisipan();
  }, []);

  const getPartisipan = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/partisipan");
      setPartisipan(response.data);
    } catch (error) {
      console.error("Error fetching partisipan data:", error);
    }
  };

  const deletePartisipan = async (id) => {
    try {
      const confirmed = window.confirm("Apakah Anda yakin ingin menghapus?");
  
      if (confirmed) {
        await axios.get(`http://localhost:8080/api/partisipan/delete/${id}`);
        // Perbarui state partisipan setelah penghapusan berhasil
        setPartisipan(partisipan.filter((p) => p.id_partisipan !== id));
      }
    } catch (error) {
      console.error("Error deleting partisipan:", error);
    }
  };

  return (
    <AdminLayout>
      <div>
        <Breadcrumb className="mt-3">
          <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>List Partisipan</Breadcrumb.Item>
        </Breadcrumb>

        <Card>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="font-weight-bold" style={{ fontSize: "20px" }}>
                Data Partisipan
              </h5>
              <Link to="/partisipan/add">
                <Button variant="success" style={{ backgroundColor: "#FEA503", borderColor: "#FEA503" }}>+ Tambah</Button>
              </Link>
            </div>
            <div className="table-responsive" style={{ overflowY: "auto", maxHeight: "450px" }}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>Email</th>
                    <th>Usia</th>
                    <th>No. Telp</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {partisipan.map((partisipan, index) => (
                    <tr key={partisipan.id_partisipan}>
                      <td>{index + 1}</td>
                      <td>{partisipan.nama_partisipan}</td>
                      <td>{partisipan.email_partisipan}</td>
                      <td>{partisipan.usia}</td>
                      <td>{partisipan.no_telp}</td>
                      <td>
                        <Link
                          to={`/partisipan/edit/${partisipan.id_partisipan}`}
                          className="btn btn-primary btn-sm mr-2"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </Link>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => deletePartisipan(partisipan.id_partisipan)}
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

export default Partisipan;
