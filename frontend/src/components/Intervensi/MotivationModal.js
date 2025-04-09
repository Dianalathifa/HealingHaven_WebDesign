import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const MotivationalModal = ({ show, handleClose, quote, isDay14 }) => {
    return (
        <Modal show={show} onHide={handleClose} backdrop={true} backdropClassName="backdrop-modal" style={{ zIndex: 1050 }}>
            <Modal.Header closeButton>
                <Modal.Title>Motivational Quote</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{quote}</p>
                {isDay14 && (
                    <p>Selamat kamu sudah menyelesaikan intervensi kecemasan ringan selama 14 hari. Yuk ikuti tes screening sebagai post test kamu.</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                {isDay14 && (
                    <Button variant="primary" onClick={() => window.location.href = '/post-test'}>
                        Go to Post Test
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
};

export default MotivationalModal;
