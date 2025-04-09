import React, { createContext, useContext, useReducer } from 'react';

// Buat context baru untuk autentikasi partisipan
const PartisipanAuthContext = createContext();

// Initial state untuk autentikasi partisipan
const initialState = {
  partisipan: null,
  isAuthenticated: false,
};

// Reducer untuk mengelola state autentikasi partisipan
const partisipanAuthReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS_PARTISIPAN':
      return {
        ...state,
        isAuthenticated: true,
        partisipan: action.payload.partisipan,
      };
    case 'LOGOUT_PARTISIPAN':
      return {
        ...state,
        partisipan: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

// Komponen Provider untuk PartisipanAuthContext
const PartisipanAuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(partisipanAuthReducer, initialState);

  return (
    <PartisipanAuthContext.Provider value={{ state, dispatch }}>
      {children}
    </PartisipanAuthContext.Provider>
  );
};

// Hook untuk menggunakan PartisipanAuthContext dalam komponen
const usePartisipanAuth = () => useContext(PartisipanAuthContext);

export { PartisipanAuthProvider, usePartisipanAuth };
