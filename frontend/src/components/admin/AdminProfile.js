import React, { useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import profileImage from '../images/admin.jpg';
import EditProfileForm from './EditForm';
import './Admin.css';

const Profile = () => {
  const admin = {
    nama_admin: localStorage.getItem('admin_nama'),
    email_admin: localStorage.getItem('admin_email'),
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editedAdmin, setEditedAdmin] = useState({
    nama_admin: localStorage.getItem('admin_nama') || '',
    email_admin: localStorage.getItem('admin_email') || '',
    admin_password: '',
    foto_profile: localStorage.getItem('admin_foto_profile') || profileImage,
  });

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setEditedAdmin((prevAdmin) => ({ ...prevAdmin, [name]: reader.result }));
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
      setEditedAdmin((prevAdmin) => ({ ...prevAdmin, [name]: value }));
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    localStorage.setItem('admin_nama', editedAdmin.nama_admin);
    localStorage.setItem('admin_foto_profile', editedAdmin.foto_profile);

    setIsEditing(false);

    fetch(`https://localhost:8080/update/admin/${localStorage.getItem('admin_id')}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedAdmin),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <Container className="mt-5 profile-container">
      <Row className="justify-content-center">
        <Col md={8}>
          <div className="text-center">
            <h2 className="mb-4">Profile</h2>
            <div className="avatar-container mb-4">
              <img src={editedAdmin.foto_profile} alt="Avatar" className="rounded-circle" style={{ width: '350px', height: '200px' }} />
            </div>
            <p className="mb-4">Selamat datang, {editedAdmin.nama_admin}!</p>
          </div>
          <div className="profile-info">
            {isEditing ? (
              <EditProfileForm
                editedAdmin={editedAdmin}
                onInputChange={handleInputChange}
                onSaveClick={handleSaveClick}
                onCancelClick={() => setIsEditing(false)}
              />
            ) : (
              <>
                <p><strong>Username:</strong> <span id="nama_admin">{admin.nama_admin}</span></p>
                <p><strong>Email:</strong> <span id="email_admin">{admin.email_admin}</span></p>
                <Button variant="primary" onClick={handleEditClick} className="mt-3" style={{ backgroundColor: '#20c997', borderColor: '#20c997' }}>
                  Edit Profile
                </Button>
              </>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
