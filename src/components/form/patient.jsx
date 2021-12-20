import React, { useEffect, useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Form, Button, InputGroup } from '@themesberg/react-bootstrap';
import {useTranslation} from "react-i18next";
import { Loading } from "../Loader";


export const PatientForm = (props) => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [idno, setIdno] = useState("");
    const [middlename, setMiddlename] = useState("");
    const [dob, setDob] = useState("");
    const [sex, setSex] = useState("");
    const [phone, setPhone] = useState("");
    // const [lastname, setLastname] = useState("");
  
    useEffect(() => {
      setDefault();
    }, [props.patient]);

    const setDefault=()=>{
        if(props.patient){
            setFirstname(props.patient.firstname);
            setMiddlename(props.patient.middlename);
            setLastname(props.patient.lastname);
            setIdno(props.patient.uuid);
            setDob(props.patient.dob);
            setSex(props.patient.sex);
            setPhone(props.patient.phone);
        }
    }
    return (
      <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
          <h5 className="mb-4">Patient Form</h5>
          <Form id="empRe">
            <Row>
              <Col md={12} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>First Name*</Form.Label>
                  <Form.Control defaultValue={firstname} onChange={(e) => { setFirstname(e.target.value)}} required type="text" placeholder="Enter patient first name" />
                </Form.Group>
              </Col>
              <Col md={12} className="mb-3">
                <Form.Group id="lastName">
                  <Form.Label>Last Name*</Form.Label>
                  <Form.Control defaultValue={lastname} onChange={(e) => { setLastname(e.target.value)}} required type="text" placeholder="Enter patient last name" />
                </Form.Group>
              </Col>
              <Col md={12} className="mb-3">
                <Form.Group id="middleName">
                  <Form.Label>Middle Name</Form.Label>
                  <Form.Control defaultValue={middlename} onChange={(e) => { setMiddlename(e.target.value)}} required type="text" placeholder="Enter patient middle name" />
                </Form.Group>
              </Col>
              <Col md={12} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Patient ID</Form.Label>
                  <Form.Control defaultValue={idno} onChange={(e) => { setIdno(e.target.value)}} type="text" placeholder="Enter patient identity number" />
                </Form.Group>
              </Col>
              <Col md={12} className="mb-3">
                <Form.Group id="dob">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control defaultValue={dob} onChange={(e) => { setDob(e.target.value)}} required type="date" placeholder="Enter patient date of birth" />
                </Form.Group>
              </Col>
              <Col md={12} className="mb-3">
                <Form.Group id="gender">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select required onChange={(e) => { setSex(e.target.value)}} defaultValue="">
                  <option value={sex} >{sex?sex:"Select gender"}</option>
                  <option value="Male">Male</option>
                  <option value="Female" selected>Female</option>
                </Form.Select>
                </Form.Group>
              </Col>
              <Col md={12} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control defaultValue={phone} onChange={(e) => { setPhone(e.target.value)}} type="text" placeholder="Enter 11 digit mobile number" />
                </Form.Group>
              </Col>
  
              </Row>
              <div className="mt-3">
              {props.loading&&
            <Loading  text="....Please wait"/>}
             {!props.loading&&
              <Button onClick={()=>{
                let datas={
                  firstname:firstname,
                  lastname:lastname,
                  middlename:middlename,
                  dob:dob,
                  sex:sex,
                  phone:phone,
                  uuid:idno
                  // image:Blob(photo)
                }
                if(props.encID){
                    props.updatePatient(datas);
                }
                else{
                    props.addPatient(datas);
                }
               
              }} variant="primary" type="submit" >Submit</Button>}
              </div>
            </Form>
          </Card.Body>
        </Card>
    );
  
  }
