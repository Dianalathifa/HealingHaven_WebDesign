import React, { useState, useEffect } from "react";
import axios from "axios";
import { Breadcrumb, Button, Card, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import AdminLayout from "../layouts/AdminLayout";

const Psikolog = () => {
  const [psikologs, setPsikologs] = useState([]);

  useEffect(() => {
    getPsikologs();
  }, []);

  const getPsikologs = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/psikolog");
      setPsikologs(response.data);
    } catch (error) {
      console.error("Error fetching psikolog:", error);
    }
  };

  const deletePsikolog = async (id) => {
    try {
      const confirmed = window.confirm("Apakah Anda yakin ingin menghapus?");

      if (confirmed) {
        await axios.get(`http://localhost:8080/api/psikolog/delete/${id}`);
        getPsikologs();
      }
    } catch (error) {
      console.error("Error deleting psikolog:", error);
    }
  };

  return (
    <AdminLayout>
      <div>
        <Breadcrumb className="mt-3">
          <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Psikolog</Breadcrumb.Item>
        </Breadcrumb>

        <Card>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="font-weight-bold" style={{ fontSize: "20px" }}>
                Data Psikolog
              </h5>
              <Link to="/psikolog/add">
                <Button variant="success" style={{ backgroundColor: "#FEA503", borderColor: "#FEA503" }}>+ Tambah</Button>
              </Link>
            </div>
            <div className="table-responsive" style={{ overflowY: "auto", maxHeight: "450px" }}>
              <Table striped bordered hover width={"100%"}>
                <thead>
                  <tr>
                    <th width={"5%"}>#</th>
                    <th width={"10%"}>Name</th>
                    <th width={"30%"}>Description</th>
                    <th width={"10%"}>Image</th>
                    <th width={"10%"}>URL</th>
                    <th width={"15%"}>Location</th>
                    <th width={"15%"}>Telephone</th>
                    <th width={"15%"}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {psikologs.map((psikolog, index) => (
                    <tr key={psikolog.id_psikolog}>
                      <td>{index + 1}</td>
                      <td>{psikolog.nama_psikolog}</td>
                      <td>{psikolog.deskripsi_psikolog}</td>
                      <td>
                        <img
                          src={`http://localhost:8080/images/psikolog/${psikolog.image_psikolog}`}
                          alt="Psikolog"
                          style={{ maxWidth: "100px", maxHeight: "100px" }}
                        />
                      </td>
                      <td>{psikolog.url_psikolog}</td>
                      <td>{psikolog.lokasi_psikolog}</td>
                      <td>{psikolog.telephone_psikolog}</td>
                      <td>
                        <Link
                          to={`/psikolog/edit/${psikolog.id_psikolog}`}
                          className="btn btn-primary btn-sm mr-2"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </Link>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => deletePsikolog(psikolog.id_psikolog)}
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

export default Psikolog;
