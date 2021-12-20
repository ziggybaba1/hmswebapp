import React, { useEffect, useState } from 'react';
import {Card,Row,Col} from "@themesberg/react-bootstrap";
import Sidebar from '../../components/sidebar/Sidebar';
import Header from '../../components/header/Header';
import { PatientWidget, DiagnosisWidget, AppointmentWidget } from '../../components/widget/List';
import { CounterWidget } from '../../components/widget/Count';
import { faCalendarWeek, faMedkit, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { useHistory } from 'react-router-dom';
import { _retrieveToken } from '../../Service/function';

function Home() {
const [dashboard, setDashboard] = useState(null);
const history = useHistory();
    useEffect(() => {
        const getDashboard = async ()=>{
            try {
                let token =await  _retrieveToken();
            const res=await axios.get("/admin/dashboard",{
                   headers: {
                      Authorization: "Bearer "+token
                   }
               });
               if(res.data.status){
                setDashboard(res.data.data);
               }
               else{
                history.push("/login");
               }
            } catch (err) {
                console.log(err.message)
            }
        }
        getDashboard();
    },[])
    return (
        <div>
            <Header />
           <Sidebar />
           <main className="content">
           <Row className="justify-content-md-center">
           <Col xs={12} sm={6} xl={4} className="mb-4">
               <CounterWidget category="Patients" icon={faUserAlt}  title={dashboard?dashboard.count_patient:0} />
           </Col>
           <Col xs={12} sm={6} xl={4} className="mb-4">
               <CounterWidget category="Diagnosis" icon={faMedkit}  title={dashboard?dashboard.count_diagnosis:0} />
           </Col>
           <Col xs={12} sm={6} xl={4} className="mb-4">
               <CounterWidget category="Appointments" icon={faCalendarWeek}  title={dashboard?dashboard.count_appointment:0} />
           </Col>
        <Col xs={12} sm={6} xl={4} className="mb-4">
           <PatientWidget title="Patients" list={dashboard?dashboard.patient:[]}/>
           </Col>
           <Col xs={12} sm={6} xl={4} className="mb-4">
           <DiagnosisWidget title="Diagnosis" list={dashboard?dashboard.diagnosis:[]}/>
           </Col>
           <Col xs={12} sm={6} xl={4} className="mb-4">
           <AppointmentWidget title="Appointments" list={dashboard?dashboard.appointment:[]}/>
           </Col>
           </Row>
           </main>
        </div>
    )
}

export default Home
