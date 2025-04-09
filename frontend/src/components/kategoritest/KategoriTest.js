import React, { useState, useEffect } from "react";
import axios from "axios";
import { Breadcrumb, Button, Card, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import AdminLayout from "../layouts/AdminLayout";

const KategoriTest = () => {
  const [kategoriTests, setKategoriTests] = useState([]);

  useEffect(() => {
    getKategoriTests();
  }, []);

  const getKategoriTests = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/kategori_test");
      setKategoriTests(response.data);
    } catch (error) {
      console.error("Error fetching kategori test:", error);
    }
  };

  const deleteKategoriTest = async (id) => {
    try {
      const confirmed = window.confirm("Apakah Anda yakin ingin menghapus?");

      if (confirmed) {
        await axios.delete(`http://localhost:8080/api/kategori_test/delete/${id}`);
        getKategoriTests();
      }
    } catch (error) {
      console.error("Error deleting kategori test:", error);
    }
  };

  return (
    <AdminLayout>
      <div>
        <Breadcrumb className="mt-3">
          <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Kategori Test</Breadcrumb.Item>
        </Breadcrumb>

        <Card>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="font-weight-bold" style={{ fontSize: "20px" }}>
                Data Kategori Test
              </h5>
              <Link to="/kategoritest/add">
                <Button variant="success" style={{ backgroundColor: "#FEA503", borderColor: "#FEA503" }}>+ Tambah</Button>
              </Link>
            </div>
            <div className="table-responsive" style={{ overflowY: "auto", maxHeight: "450px" }}>
              <Table striped bordered hover width={"100%"}>
                <thead>
                  <tr>
                    <th width={"5%"}>No</th>
                    <th width={"10%"}>Nama Test</th>
                    <th width={"30%"}>Deskripsi</th>
                    <th width={"30%"}>Sub Test</th>
                    <th width={"15%"}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {kategoriTests.map((kategoriTest, index) => (
                    <tr key={kategoriTest.id_test}>
                      <td>{index + 1}</td>
                      <td>{kategoriTest.nama_test}</td>
                      <td>{kategoriTest.deskripsi_test}</td>
                      <td>{kategoriTest.sub_test}</td>
                      <td>
                        <Link
                          to={`/kategoritest/edit/${kategoriTest.id_test}`} className="btn btn-primary btn-sm mr-2">
                          <FontAwesomeIcon icon={faEdit} />
                        </Link>
                        <Button variant="danger" size="sm" onClick={() => deleteKategoriTest(kategoriTest.id_test)}>
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

export default KategoriTest;
