import React from 'react';

const EditProfileForm = ({ editedAdmin, onInputChange, onSaveClick, onCancelClick }) => {
    
  return (
    <div className="edit-profile-modal">
      <div className="modal-content">
        <span className="close" onClick={onCancelClick}>&times;</span>
        <label htmlFor="Nama">Nama:</label>
        <input
          type="text"
          id="username"
          name="name"
          value={editedAdmin.admin_nama}
          onChange={onInputChange}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={editedAdmin.admin_email}
          onChange={onInputChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={editedAdmin.admin_password}
          onChange={onInputChange}
        />
        <label htmlFor="foto_profile">Foto Profile:</label>
        <input
          type="file"
          id="foto_profile"
          name="foto_profile"
          onChange={onInputChange}
        />
        <button className="save-profile-button" onClick={onSaveClick}>
          Save Profile
        </button>
      </div>
    </div>
  );
};

export default EditProfileForm;
