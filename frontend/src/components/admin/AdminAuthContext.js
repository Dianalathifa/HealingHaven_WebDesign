// AdminAuthContext.js
import React, { createContext, useContext, useReducer } from 'react';

// Buat context baru untuk autentikasi admin
const AdminAuthContext = createContext();

// Initial state untuk autentikasi admin
const initialState = {
  admin: null,
  isAuthenticated: false,
};

// Reducer untuk mengelola state autentikasi admin
const adminAuthReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS_ADMIN':
      return {
        ...state,
        isAuthenticated: true,
        admin: action.payload.admin,
      };
    case 'LOGOUT_ADMIN':
      return {
        ...state,
        admin: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

// Komponen Provider untuk AdminAuthContext
const AdminAuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adminAuthReducer, initialState);

  return (
    <AdminAuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

// Hook untuk menggunakan AdminAuthContext dalam komponen
const useAdminAuth = () => useContext(AdminAuthContext);

export { AdminAuthProvider, useAdminAuth };
