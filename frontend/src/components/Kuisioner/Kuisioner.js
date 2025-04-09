import React, { useState, useEffect } from "react";
import axios from "axios";
import { Breadcrumb, Button, Card, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import AdminLayout from "../layouts/AdminLayout";

const KuisionerList = () => {
  const [kuisionerList, setKuisionerList] = useState([]);
  const [kategoriTests, setKategoriTests] = useState({}); // State to hold kategori_test data

  useEffect(() => {
    getKuisionerList();
  }, []);

  useEffect(() => {
    fetchKategoriTests(); // Fetch kategori_test data when component mounts
  }, []);

  const getKuisionerList = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/kuisioner");
      setKuisionerList(response.data);
    } catch (error) {
      console.error("Error fetching kuisioner list:", error);
    }
  };

  const fetchKategoriTests = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/kategori_test");
      // Convert the response data into an object where the keys are kategori_test IDs
      // This will make it easier to look up kategori_test names later
      const kategoriTestObject = response.data.reduce((acc, curr) => {
        acc[curr.id_test] = curr.nama_test;
        return acc;
      }, {});
      setKategoriTests(kategoriTestObject);
    } catch (error) {
      console.error("Error fetching kategori tests:", error);
    }
  };

  const deleteKuisioner = async (id) => {
    try {
      const confirmed = window.confirm("Apakah Anda yakin ingin menghapus kuisioner ini?");
  
      if (confirmed) {
        await axios.delete(`http://localhost:8080/api/kuisioner/${id}`);
        getKuisionerList(); // Call data again after successful deletion
      }
    } catch (error) {
      console.error("Error deleting kuisioner:", error);
    }
  };
  

  return (
    <AdminLayout>
      <div>
        <Breadcrumb className="mt-3">
          <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Kuisioner</Breadcrumb.Item>
        </Breadcrumb>

        <Card>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="font-weight-bold" style={{ fontSize: "20px" }}>
                Daftar Kuisioner
              </h5>
              <Link to="/kuisioner/add">
                <Button variant="success" style={{ backgroundColor: "#FEA503", borderColor: "#FEA503" }}>+ Tambah Kuisioner</Button>
              </Link>
            </div>
            <div className="table-responsive" style={{ overflowY: "auto", maxHeight: "450px" }}>
            <Table striped bordered hover>
            <thead>
                <tr>
                <th>No</th>
                <th>ID Kuisioner</th>
                <th>Kategori Test</th> {/* Change header to display kategori_test name */}
                <th>Pertanyaan</th>
                <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                {kuisionerList.map((kuisioner, index) => (
                <tr key={kuisioner.id_kuisioner}>
                    <td>{index + 1}</td>
                    <td>{kuisioner.id_kuisioner}</td>
                    <td>{kategoriTests[kuisioner.id_kategori]}</td> {/* Display kategori_test name */}
                    <td>{kuisioner.pertanyaan}</td>
                    <td>
                    <Link to={`/kuisioner/edit/${kuisioner.id_kuisioner}`} className="btn btn-primary btn-sm mr-2">
                        <FontAwesomeIcon icon={faEdit} /> Edit
                    </Link>
                    <Button variant="danger" size="sm" onClick={() => deleteKuisioner(kuisioner.id_kuisioner)}>
                        <FontAwesomeIcon icon={faTrash} /> Hapus
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

export default KuisionerList;
