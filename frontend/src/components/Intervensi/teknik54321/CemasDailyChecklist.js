import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import MotivationalModal from '../MotivationModal';
import { Toast, ToastContainer } from 'react-bootstrap';

const quotes = [
"That's great! The small steps you took today helped calm your mind and bring you closer to true peace. Keep going, you're making a big difference.",
"Amazing! Every time you practice this technique, you gain more control over your anxiety. Remember, every day is an opportunity to feel better and you're on the right track.",
"That's great! Every practice brings you closer to peace. Believe in yourself, you have the power to overcome this.",
"You're doing great! Dealing with anxiety takes courage, and you're doing great. Keep up the fight, you deserve peace.",
"Keep going! Every day you get better with the small steps you take. Never underestimate the progress you've made.",
"Keep going! Your anxiety doesn't define you. You're stronger than you think and every day is proof of your strength.",
"Awesome! Every check mark is a step towards inner peace. Keep up the good work, you're creating a calmer future.",
"You're strong! This anxiety is temporary and you have the power to overcome it. Every day is a new opportunity to feel better.",
"Fantastic! You are making real progress today. Every small step towards sobriety is a victory worth celebrating.",
"Cheer up! Your sobriety is getting closer with every effort you make. Never underestimate the power of small steps you take.",
"Have faith! You are mastering today so well. Every day is an opportunity to be better and you are on the right track.",
"Super! Your anxiety is decreasing with every step you take. Keep it up, you are making positive changes in your life.",
"Keep it up! Every day is a new opportunity to feel better. Believe in yourself, you have the ability to overcome this.",
"Great! You are stronger than your anxiety. Each check mark is a testament to your strength and courage to face and overcome anxiety.",
];

const getRandomQuote = () => {
    return quotes[Math.floor(Math.random() * quotes.length)];
};

const Checklist = () => {
    const [checklist, setChecklist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [partisipanId, setPartisipanId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [quote, setQuote] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [isDay14, setIsDay14] = useState(false);

    useEffect(() => {
        const id = localStorage.getItem('partisipan_id');
        if (id) {
            setPartisipanId(id);
            fetchChecklist(id);
        } else {
            setError('Participant ID not found');
            setLoading(false);
        }
    }, []);

    const fetchChecklist = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/cemas/checklist`, {
                params: { id_partisipan: id }
            });
            setChecklist(response.data);
        } catch (error) {
            setError('Error fetching checklist');
        } finally {
            setLoading(false);
        }
    };

    const handleCheck = async (day) => {
        try {
            await axios.post(`http://localhost:8080/cemas/checklist/check-day`, {
                id_partisipan: partisipanId,
                hari: day,
                status: 'true'
            });
            fetchChecklist(partisipanId);
            setQuote(getRandomQuote());
            setIsDay14(day === 14);
            setShowModal(true);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setToastMessage("Sorry, today you have done the daily checklist for recording the daily progress of the intervention. Come back tomorrow.");
                setShowToast(true);
            } else {
                setError('Error updating checklist');
            }
        }
    };

    const handleClose = () => setShowModal(false);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Checklist for Participant {partisipanId}</h1>
            <ul>
                {Array.from({ length: 14 }, (_, i) => i + 1).map((day) => (
                    <li key={day}>
                        <span>Day {day}</span>
                        <input
                            type="checkbox"
                            checked={checklist.some(item => item.hari === day && item.status)}
                            onChange={() => handleCheck(day)}
                            disabled={checklist.some(item => item.hari >= day)}
                        />
                    </li>
                ))}
            </ul>
            <MotivationalModal show={showModal} handleClose={handleClose} quote={quote} isDay14={isDay14} />
            <ToastContainer position="top-end" className="p-3">
                <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
                    <Toast.Body>{toastMessage}</Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    );
};

export default Checklist;
