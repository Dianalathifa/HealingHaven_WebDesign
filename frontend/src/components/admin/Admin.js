import React, { useState, useEffect } from "react";
import axios from "axios";
import { Breadcrumb, Button, Card, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import AdminLayout from "../layouts/AdminLayout";

const Admin = () => {
  const [admin, setAdmin] = useState([]);

  useEffect(() => {
    getAdmin();
  }, []);

  const getAdmin = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/admin");
      setAdmin(response.data);
    } catch (error) {
      console.error("Error fetching admin data:", error);
    }
  };

  const deleteAdmin = async (id) => {
    try {
      const confirmed = window.confirm("Apakah Anda yakin ingin menghapus?");
  
      if (confirmed) {
        await axios.get(`http://localhost:8080/api/admin/delete/${id}`);
        // Perbarui state admin setelah penghapusan berhasil
        setAdmin(admin.filter((a) => a.id_admin !== id));
      }
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  };

  return (
    <AdminLayout>
      <div>
        <Breadcrumb className="mt-3">
          <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>List Admin</Breadcrumb.Item>
        </Breadcrumb>

        <Card>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="font-weight-bold" style={{ fontSize: "20px" }}>
                Data Admin
              </h5>
            </div>
            <div className="table-responsive" style={{ overflowY: "auto" }}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>Password</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {admin.map((admin, index) => (
                    <tr key={admin.id_admin}>
                      <td>{index + 1}</td>
                      <td>{admin.nama_admin}</td>
                      <td>{admin.password_admin}</td>
                      <td>{admin.email_admin}</td>
                      <td>
                        <Link
                          to={`/admin/edit/${admin.id_admin}`}
                          className="btn btn-primary btn-sm mr-2"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </Link>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => deleteAdmin(admin.id_admin)}
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

export default Admin;
