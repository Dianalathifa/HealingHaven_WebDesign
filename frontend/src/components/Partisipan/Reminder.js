import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import sport from '../images/sport.jpg';
import food from '../images/food.jpg';
import sleep from '../images/sleep.jpg';
import activity from '../images/activity.jpg';

function Reminders({ show, handleClose }) {
    const [reminders, setReminders] = useState([]);

    useEffect(() => {
        if (show) {
            fetchReminders();
        }
    }, [show]);

    const fetchReminders = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/reminders');
            setReminders(response.data);
        } catch (error) {
            console.error('Error fetching reminders:', error);
        }
    };

    const renderReminder = (reminder) => {
        const { id, jenis_kegiatan, jenis_olahraga, waktu_tidur, jenis_makanan, deskripsi_makanan, durasi, waktu_bangun } = reminder;
    
        let bgColor;
        let title;
        let image;
        let description;
    
        if (jenis_kegiatan) {
            bgColor = '#FFBF78'; // Oren muda
            title = 'Pengingat Kegiatanmu';
            image = activity;
            description = `Kamu hari ini harus melakukan ${jenis_kegiatan}\nSemangat terus ya dan tetap produktif!`;
        } else if (jenis_olahraga) {
            bgColor = '#A0DEFF'; // Biru muda
            title = 'Pengingat Olahragamu';
            image = sport;
            description = `Yuk lakukan ${jenis_olahraga} selama ${durasi}\nAyo Bergerak, jangan malas!`;
        } else if (waktu_tidur) {
            bgColor = '#E1AFD1'; // Ungu muda
            title = 'Pengingat Tidurmu';
            image = sleep;
            description = `Kamu akan tidur mulai ${reminder.waktu_tidur} - ${reminder.waktu_bangun}\nSelamat tidur dan mimpi indah!`;
        } else if (jenis_makanan) {
            bgColor = '#CAE6B2'; // Hijau muda
            title = 'Pengingat Makananmu';
            image = food;
            description = `Jangan lupa  ${jenis_makanan} dengan menu ${deskripsi_makanan}! \nHari ini menu yang harus kamu siapkan sangat menarik\nTerus hidangkan makanan sehat setiap hari, ya!`;
        }
    
        return (
            <Card key={id} className="mb-3" style={{ backgroundColor: bgColor }}>
                <Card.Body className="d-flex align-items-center">
                    <div style={{ flex: '0 0 auto', marginRight: '20px' }}>
                        <img src={image} alt="reminder" style={{ width: '100px' }} />
                    </div>
                    <div style={{ flex: '1 1 auto' }}>
                        <Card.Title style={{ marginBottom: '10px' }}>{title}</Card.Title>
                        <Card.Text style={{ marginBottom: '10px', fontSize: '16px' }}>{description.split('\n').map((line, index) => <div key={index}>{line}</div>)}</Card.Text>
                    </div>
                </Card.Body>
            </Card>
        );
    };

    return (
        <Modal show={show} onHide={handleClose} centered backdrop="static" keyboard={false} style={{ zIndex: 1050 }}>
            <Modal.Header>
                <Modal.Title>Pengingat untuk Hari Ini</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {reminders.length === 0 ? (
                    <p>Tidak ada pengingat untuk hari ini.</p>
                ) : (
                    reminders.map(renderReminder)
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Reminders;
