
import React,{ useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCog, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from '@themesberg/react-bootstrap';
import moment from "moment";
import { errorMessage, successMessage, warningMessage, _retrieveToken } from "../../Service/function";
import { toast } from "react-toastify";

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import axios from "axios";
import { useHistory } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/header/Header";
import { DepartmentForm } from "../../components/form/department";
import { DepartmentListTable } from "../../components/table/department";
import { BASE_URL } from '../../.env.js';

export default function DashboardSepartment({navigation, route}) {
    const [isLoading, setLoaded] = useState(false);
    const [getDepartment, setDepartment] = useState([]);
    const history = useHistory();

    useEffect(() => {
      getDashData();
    }, []);

    const getDashData=async()=>{
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
      } catch (err) {
          errorMessage(toast,err);
      }
     
    }

    const addDepatment= async (e)=>{
      setLoaded(true);
      let token =await  _retrieveToken();
      const resp=await axios.post(BASE_URL+'admin/department',e,{
        headers: {
           Authorization: "Bearer "+token
        }
    })
     if(resp.status==false){
            setLoaded(false);
          warningMessage(toast,resp.message)
          return false;
          }
        successMessage(toast ,resp.message);
        document.getElementById("empRe").reset();
        getDashData();
        setLoaded(false)
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
            <Breadcrumb.Item>Department</Breadcrumb.Item>
            <Breadcrumb.Item active>list</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Department list</h4>
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
<DepartmentForm
addDepartment={addDepatment}
loading={isLoading}
/>
              </Col>
              <Col xs={12} md={8} lg={8} xl={8}>
      <DepartmentListTable
      data={getDepartment.data?getDepartment.data:[]}
    //   clickNext={clickNext}
    //   doArchive={doArchive}
    //   doUArchive={doUArchive}
      linker={getDepartment}
      loading={isLoading}
      />
      </Col>
      </Row>
      </main>
    </>
  );
};
