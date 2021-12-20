
import React,{ useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCog, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown, Modal } from '@themesberg/react-bootstrap';
import moment from "moment";
import { errorMessage, successMessage, warningMessage, _retrieveToken } from "../../Service/function";
import { toast } from "react-toastify";

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import axios from "axios";
import { useHistory } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/header/Header";
import { PatientForm } from "../../components/form/patient";
import { PatientListTable } from "../../components/table/patient";
import { DiagnosisForm } from "../../components/form/diagnosis";
import { AppointmentForm } from "../../components/form/appointment";
import { BASE_URL } from '../../.env.js';

export default function DashboardPatient({navigation, route}) {
    const [isLoading, setLoaded] = useState(false);
    const [getPatient, setPatient] = useState([]);
    const [singlepatient, setSinglepatient] = useState({});
    const [encID,setEncID]=useState(null);
    const [idno, setIdno] = useState("");
    const [showDialog,setDialog]=useState(false);
    const [modaltitle,setModalTitle]=useState("");
    const [modaltype,setModalType]=useState(null);
    const [symptoms,setSymptom]=useState([]);
    const [diagnosis,setDiagnosis]=useState([]);
    const[doctor,setDoctor]=useState([]);
    const [department,setDepartment]=useState([]);
    const [datadiagnosis,setDataDiagnosis]=useState([])
    const history = useHistory();

    useEffect(() => {
      getDashData();
      retrieveSymptoms();
    }, []);

    const getDashData=async()=>{
      setLoaded(true);
      try {
        let token =await  _retrieveToken();
        const resp=await axios.get(BASE_URL+'admin/patient',{
            headers: {
               Authorization: "Bearer "+token
            }
        })
       if(!resp.data.status){
            history.push("/login");
        }
        setPatient(resp.data.data);
        setLoaded(false);
    } catch (error) {
        errorMessage(toast,error.message);
        setLoaded(false);
    }
     
    }

    const addPatient= async (e)=>{
      setLoaded(true);
      let token =await  _retrieveToken();
      try{
      const resp=await axios.post(BASE_URL+'admin/patient',e,{
        headers: {
           Authorization: "Bearer "+token
        }
    })
    if(resp.data.status==false){
        setLoaded(false);
      warningMessage(toast,resp.data.message)
      return false;
      }
    successMessage(toast ,resp.data.message);
        document.getElementById("empRe").reset();
        getDashData();
        setLoaded(false)
    } catch (error) {
        errorMessage(toast,error.message);
        setLoaded(false);
    }
    }

    const updatePatient= async (e)=>{
        setLoaded(true);
        let token =await  _retrieveToken();
        try {
            const resp=await axios.post(BASE_URL+'admin/patient/update/'+encID,e,{
                headers: {
                   Authorization: "Bearer "+token
                }
            })
            if(resp.data.status==false){
                setLoaded(false);
              warningMessage(toast,resp.data.message)
              return false;
              }
            successMessage(toast ,resp.data.message);
                document.getElementById("empRe").reset();
                getDashData();
                setLoaded(false)
            } catch (error) {
                errorMessage(toast,error.message);
                setLoaded(false);
            }
        
      }

      const submitDiagosis=async(e)=>{
        setLoaded(true);
        let token =await  _retrieveToken();
        try{
        const resp=await axios.post(BASE_URL+'admin/diagnosis/',e,{
          headers: {
             Authorization: "Bearer "+token
          }
      })
       if(resp.data.status==false){
              setLoaded(false);
            warningMessage(toast,resp.data.message)
            return false;
            }
          successMessage(toast ,resp.data.message);
          document.getElementById("empRe").reset();
          setDialog(false);
          getDashData();
          setLoaded(false);
        } catch (error) {
            errorMessage(toast,error.message);
            setLoaded(false);
        }
      }

      const submitAppointment=async(e)=>{
        setLoaded(true);
        let token =await  _retrieveToken();
        try{
        const resp=await axios.post(BASE_URL+'admin/appointment',e,{
          headers: {
             Authorization: "Bearer "+token
          }
      })
     
       if(resp.data.status==false){
              setLoaded(false);
            warningMessage(toast,resp.data.message)
            return false;
            }
          successMessage(toast ,resp.data.message);
          document.getElementById("empRe").reset();
          setDialog(false);
          getDashData();
          setLoaded(false);
        } catch (error) {
            errorMessage(toast,error.message);
            setLoaded(false);
        } 
      }

      const retrieveSymptoms= async()=>{
        setLoaded(true); setDiagnosis([]);
        let token =await  _retrieveToken();
        try{
        const resp=await axios.get(BASE_URL+'medic/symptoms',{
          headers: {
             Authorization: "Bearer "+token
          }
      })
      if(!resp.data.status){
        history.push("/login");
    }
    setSymptom(resp.data.data);
        //   document.getElementById("empRe").reset();
        //   getDashData();
          setLoaded(false);
        } catch (error) {
            errorMessage(toast,error.message);
            setLoaded(false);
        }
      }

      const checkDiagosis=async(data)=>{
        setLoaded(true);
        let token =await  _retrieveToken();
        try{
        const resp=await axios.get(BASE_URL+`medic/diagnosis?symptom=${data.symptom}&gender=${data.gender}&dob=${data.year}`,{
          headers: {
             Authorization: "Bearer "+token
          }
      })
      if(!resp.data.status){
        history.push("/login");
    }
    setDiagnosis(resp.data.data);
        //   document.getElementById("empRe").reset();
        //   getDashData();
          setLoaded(false);
        } catch (error) {
            errorMessage(toast,error.message);
            setLoaded(false);
        }
      }

    const retrieveSearch= async(e)=>{
        setLoaded(true);
        let token =await  _retrieveToken();
        try{
        const resp=await axios.get(BASE_URL+'admin/patient/search?idno='+e,{
            headers: {
               Authorization: "Bearer "+token
            }
        })
        setPatient(resp.data.data);
          setLoaded(false);
        } catch (error) {
            errorMessage(toast,error.message);
            setLoaded(false);
        }
      }

   const doEdit=async(url,num,data)=>{
    setLoaded(true);
    let token =await  _retrieveToken();
    try{
    setSinglepatient({});
    
    setDialog(true);
    if(num!=3){
        setSinglepatient(data);
    }
    if(num==0){
        
        const resp=await axios.get(BASE_URL+'admin/appointment/'+data.id,{
            headers: {
               Authorization: "Bearer "+token
            }
        })
        setEncID(resp.data.data.e_id);
        setDoctor(resp.data.data.doctor);
        setDepartment(resp.data.data.department);
        setDataDiagnosis(resp.data.data.diagnosis);
        setModalTitle("Add Appointment");setModalType(num);
    }
    if(num==1){
        const resp=await axios.get(BASE_URL+'admin/patient/'+data.id,{
            headers: {
               Authorization: "Bearer "+token
            }
        })
        setEncID(resp.data.data.e_id);
        setModalTitle("Add Diagnosis");setModalType(num)
    }
      setLoaded(false);
    } catch (error) {
        errorMessage(toast,error.message);
        setLoaded(false);
    }
   }


  return (
    <>
       <Header />
           <Sidebar />
           <main className="content">
      <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-xl-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
            <Breadcrumb.Item>Patients</Breadcrumb.Item>
            <Breadcrumb.Item active>list</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Patients list</h4>
          <p className="mb-0">
          </p>
        </div>
        {/* <div className="btn-toolbar mb-2 mb-md-0">
          <ButtonGroup>
            <Button variant="outline-primary" size="sm">{t('dashboard.share')}</Button>
            <Button variant="outline-primary" size="sm">{t('dashboard.export')}</Button>
          </ButtonGroup>
        </div> */}
      </div>
      <div className="btn-toolbar mb-2 mb-md-0">
     
      </div>
      <div className="table-settings mb-4">
        <Row className="justify-content-between align-items-center">
          <Col xs={6} md={6} lg={3} xl={4}>
          <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
              <Form.Control onChange={(e)=>retrieveSearch(e.target.value)} type="text" placeholder="Search patients using ID and name" />
            </InputGroup>
          </Col>
          <Col xs={4} md={4} xl={3} className="ps-md-0">
          {/* <Button variant="primary" href={'#/admin/department/new'} className="m-1">{t('department.add_department')}</Button> */}
            <Dropdown as={ButtonGroup}>
            </Dropdown>
          </Col>
        </Row>
      </div>
      <Row className="justify-content-between">
          <Col xs={12} md={4} lg={4} xl={4}>
<PatientForm
addPatient={addPatient}
patient={singlepatient}
loading={isLoading}
encID={encID}
updatePatient={updatePatient}
/>
              </Col>
              <Col xs={12} md={8} lg={8} xl={8}>
      <PatientListTable
      data={getPatient.data?getPatient.data:[]}
      doEdit={doEdit}
    //   clickNext={clickNext}
    //   doArchive={doArchive}
    //   doUArchive={doUArchive}
      linker={getPatient}
      loading={isLoading}
      />
      </Col>
      </Row>
      <Modal as={Modal.Dialog} centered show={showDialog} onHide={()=>setDialog(false)}>
    <Modal.Header>
      <Modal.Title className="h6">{modaltitle}</Modal.Title>
      <Button variant="close" aria-label="Close" onClick={()=>setDialog(false)} />
    </Modal.Header>
    <Modal.Body>
        {modaltype==1&&<DiagnosisForm
        checkDiagosis={checkDiagosis}
        submitDiagosis={submitDiagosis}
        diagnosis={diagnosis}
        encID={encID}
         symptoms={symptoms}  patient={singlepatient} loading={isLoading}  />}
         {modaltype==0&&<AppointmentForm
        submitAppointment={submitAppointment}
        diagnosis={datadiagnosis}
        doctor={doctor}
        department={department}
        encID={encID}
           patient={singlepatient} loading={isLoading} />}
        </Modal.Body>
        </Modal>
        
      </main>
    </>
  );
};
