// SplashScreen.js

import React from 'react';
//import logo from './path/to/your/logo.png';
import logo from "../../src/components/images/logo.png"; 

function SplashScreen() {
  return (
    <div style={styles.container}>
      <img src={logo} alt="Logo" style={styles.logo} />
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#fff', // Sesuaikan warna background dengan kebutuhan
  },
  logo: {
    width: '200px', // Sesuaikan lebar logo dengan kebutuhan
    height: 'auto',
  },
};

export default SplashScreen;