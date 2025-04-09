import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navbar from '../../landing/Navbar.js';
import CBT1 from '../../images/CBT/CBT3.png';
import CBT2 from '../../images/CBT/CBT3.png';
import CBT3 from '../../images/CBT/CBT3.png';
import CBT4 from '../../images/CBT/CBT3.png';
import CBT5 from '../../images/CBT/CBT3.png';
import CBT6 from '../../images/CBT/CBT3.png';
import CBT7 from '../../images/CBT/CBT3.png';

const CBT = () => {
    const [tasks, setTasks] = useState([]);
  
    useEffect(() => {
      fetchTasks();
    }, []);
  
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/daily-tasks-sessions/4");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching task data:", error);
      }
    };

  return (
    <>
      <Navbar />
      <div className="container text-center" style={{paddingTop:"10px"}}>
        <h6 className="section-title mb-2 tfonts-2"><br />Build Self-Confidence, Overcome Depression: This CBT Intervention Is For You!<br /><br /></h6>
      </div>

            <div className="container text-left" style={{maxWidth:"1100px"}}>
            <p style={{color:"#4A4A4A", fontWeight:"bold", fontSize:"20px"}}>7 Day Mindfulness Challenge to Overcome Depression</p><br></br>
            <p style={{color:"#4A4A4A", fontSize:"20px"}}>
            Welcome to the 7 Day Mindfulness Challenge! This week, we will focus on recognizing and changing negative thought patterns that can contribute to depression. </p>

            <br/>
            <p style={{color:"#4A4A4A", fontSize:"20px"}}>
            Every day, you will receive a small task that will help you:<br/>
            - &nbsp;Identify unhealthy behavior patterns<br/>
            - &nbsp;Build more positive and productive habits<br/>
            - &nbsp;Improve motivation and self-discipline<br/>
            </p>
                <br/>
               
                <div className="container text-center">
            <h3 className="section-title mb-2 tfonts-2" style={{ borderColor:"#FFD2DD",color:"#25B7D3", fontWeight:"bold"}}><br />Come on, start the challenge !<br /></h3>
            </div>
                                     
        </div>
      
        <div className="container justify-content-center" style={{marginLeft:"100px", marginBottom:"100px", marginTop:"30px"}}>
        <div className="row">
        {tasks.map((task) => (
            <TaskCard key={task.id_task} task={task} />
          ))}
        </div>
      </div>
    </>
  );
};


const TaskCard = ({ task }) => {
  const { no_hari, judul_task, id_task } = task;
  const imageMap = {
    1: CBT1,
    2: CBT2,
    3: CBT3,
    4: CBT4,
    5: CBT5,
    6: CBT6,
    7: CBT7
  };
  const imageSrc = imageMap[no_hari] || CBT3;

  return (
    <div className="col-md-auto mb-4" style={{ margin:"5px" }}>
      <Card style={{ width: '9rem', height: '18rem' }}>
        <Card.Img variant="top" src={imageSrc} style={{ height: '60%', objectFit: 'cover' }} />
        <Card.Body>
          <Link to={`/daily-task-detail/${id_task}`} className="stretched-link"></Link>
          <Card.Text className="text-center" style={{ height: '50px', fontSize: '12px' }}> {judul_task}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CBT;
