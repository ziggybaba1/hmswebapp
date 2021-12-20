
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
import { DoctorForm } from "../../components/form/doctor";
import { DoctorListTable } from "../../components/table/doctor";

export default function DashboardDoctor({navigation, route}) {
    const [isLoading, setLoaded] = useState(false);
    const [getDoctor, setDoctor] = useState([]);
    const [singlepatient, setSinglepatient] = useState({});
    const [encID,setEncID]=useState(null);
    const [singledoc, setSingleDoc] = useState({});
    const [showDialog,setDialog]=useState(false);
    const [modaltitle,setModalTitle]=useState("");
    const [modaltype,setModalType]=useState(null);
    const [symptoms,setSymptom]=useState([]);
    const [diagnosis,setDiagnosis]=useState([]);
    const [department,setDepartment]=useState([]);
    const [datadiagnosis,setDataDiagnosis]=useState([])
    const history = useHistory();

    useEffect(() => {
      getDashData();
      retrieveSymptoms();
      getDashDept();
    }, []);

    const getDashData=async()=>{
      setLoaded(true);
      try {
        let token =await  _retrieveToken();
        const resp=await axios.get(BASE_URL+'admin/doctor',{
            headers: {
               Authorization: "Bearer "+token
            }
        })
       if(!resp.data.status){
            history.push("/login");
        }
        setDoctor(resp.data.data);
        setLoaded(false);
    } catch (error) {
        errorMessage(toast,error.message);
        setLoaded(false);
    }
     
    }

    const getDashDept=async()=>{
        setLoaded(true);
        try {
          let token =await  _retrieveToken();
          const resp=await axios.get(BASE_URL+'admin/department',{
              headers: {
                 Authorization: "Bearer "+token
              }
          })
         if(!resp.data.status){
              history.push("/login");
          }
          setDepartment(resp.data.data);
          setLoaded(false);
      } catch (error) {
          errorMessage(toast,error.message);
          setLoaded(false);
      }
       
      }

    const addDoctor= async (e)=>{
      setLoaded(true);
      let token =await  _retrieveToken();
      try{
      const resp=await axios.post(BASE_URL+'admin/doctor',e,{
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

    const updateDoctor= async (e)=>{
        setLoaded(true);
        let token =await  _retrieveToken();
        try {
            const resp=await axios.post(BASE_URL+'admin/doctor/update/'+encID,e,{
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
        const resp=await axios.get(BASE_URL+'admin/doctor/search?idno='+e,{
            headers: {
               Authorization: "Bearer "+token
            }
        })
        setDoctor(resp.data.data);
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
    setSingleDoc({});
    if(num!=3){
        setSingleDoc(data);
    }
    if(num==0){
        
        const resp=await axios.get(BASE_URL+'admin/doctor/'+data.id,{
            headers: {
               Authorization: "Bearer "+token
            }
        })
        setEncID(resp.data.data.e_id);

        // setDoctor(resp.data.data.doctor);
        // setDepartment(resp.data.data.department);
        // setDataDiagnosis(resp.data.data.diagnosis);
        // setModalTitle("Add Appointment");setModalType(num);
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

   const newAdd=()=>{
    setSingleDoc({});
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
            <Breadcrumb.Item>Doctors</Breadcrumb.Item>
            <Breadcrumb.Item active>list</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Doctors list</h4>
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
              <Form.Control onChange={(e)=>retrieveSearch(e.target.value)} type="text" placeholder="Search using department and name" />
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
<DoctorForm
addDoctor={addDoctor}
updateDoctor={updateDoctor}
newAdd={newAdd}
department={department.data?department.data:[]}
detail={singledoc}
loading={isLoading}
encID={encID}
/>
              </Col>
              <Col xs={12} md={8} lg={8} xl={8}>
      <DoctorListTable
      data={getDoctor.data?getDoctor.data:[]}
      doEdit={doEdit}
    //   clickNext={clickNext}
    //   doArchive={doArchive}
    //   doUArchive={doUArchive}
      linker={getDoctor}
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
        // doctor={doctor}
        department={department}
        encID={encID}
           patient={singlepatient} loading={isLoading} />}
        </Modal.Body>
        </Modal>
        
      </main>
    </>
  );
};
