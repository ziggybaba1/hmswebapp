import React, { useEffect, useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faMedkit, faPhone, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Form, Button, InputGroup } from '@themesberg/react-bootstrap';
import {useTranslation} from "react-i18next";
import { Loading } from "../Loader";
import { format } from "crypto-js";


export const AppointmentForm = (props) => {

    const [description, setDescription] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [idno, setIdno] = useState("");
    const [id, setId] = useState(null);
    const [middlename, setMiddlename] = useState("");
    const [dob, setDob] = useState("");
    const [sex, setSex] = useState("");
    const [phone, setPhone] = useState("");
    const [appointdate,setAppointDate]=useState(null);
    const [appointTime,setAppointTime]=useState(null);
    const [doctor,setDoctor]=useState(null)
    const [stat,setStatus]=useState(null);
    const [department, setDepartment] = useState(null);
    const [diagnosis, setDiagnosis] = useState(null);
  
    useEffect(() => {
        setDefault();
      }, [props.patient]);
  
      const setDefault=()=>{
          if(props.patient){
              setFirstname(props.patient.firstname);
              setMiddlename(props.patient.middlename);
              setLastname(props.patient.lastname);
              setIdno(props.patient.uuid);
              setId(props.patient.id);
              setDob(props.patient.dob);
              setSex(props.patient.sex);
              setPhone(props.patient.phone);
          }
      }

      const retrieveDoctors=(e)=>{
        setDiagnosis(e);
        props.retrieveDoctors(e)
      }

   
    return (
      <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
          <h5 className="mb-4">Appointment Form</h5>
          <Form id="empRe">
            <Row>
              <Col md={12} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Patient Name*</Form.Label>
                  <Form.Control value={`${firstname} ${lastname}`}  readonly type="text" placeholder="Patient" />
                </Form.Group>
              </Col>
              <Col md={12} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Patient Gender</Form.Label>
                  <Form.Control value={sex} readonly type="text" placeholder="Patient Gender" />
                </Form.Group>
              </Col>
              <Col md={12} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Patient Year of Birth</Form.Label>
                  <Form.Control value={moment(dob).format("Y")} readonly type="text" placeholder="Patient Year of Birth" />
                </Form.Group>
              </Col>

              <Col md={12} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Choose Appointment Date</Form.Label>
                  <Form.Control defaultValue={moment(dob).format("Y")} onChange={(e)=>setAppointDate(e.target.value)} type="date" placeholder="Choose Appointment Date" />
                </Form.Group>
               </Col>
               <Col md={12} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Choose Appointment Time</Form.Label>
                  <Form.Control defaultValue={moment(dob).format("Y")} onChange={(e)=>setAppointTime(e.target.value)}  type="time" placeholder="Choose Appointment Date" />
                </Form.Group>
               </Col>
               <Col md={12} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Select Diagnostic Report</Form.Label>
                  <Form.Select required onChange={(e) => { retrieveDoctors(e.target.value)}}>
                  <option value="1">Select Report</option>
                  {props.diagnosis.map((item,i)=>(
                      <option value={item.id}>{item.diagnosis}</option>
                  ))}
                </Form.Select>
                </Form.Group>
              </Col>
              {props.doctor&&props.doctor.length>0&&
              <>
               <Col md={12} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Choose Doctor</Form.Label>
                  <Form.Select required onChange={(e) => { setDoctor(e.target.value)}}>
                  <option value="1">Choose Doctor</option>
                  {props.doctor&&props.doctor[0]?props.doctor[0].map((item,i)=>(
                      <option value={item.id}>{item.name}</option>
                  )):[]}
                </Form.Select>
                </Form.Group>
              </Col>
               <Col md={12} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Select Department</Form.Label>
                  <Form.Select required onChange={(e) => { setDepartment(e.target.value)}}>
                  <option value="1">Select Department</option>
                  {props.department.map((item,i)=>(
                      <option value={item.id}>{item.department}</option>
                  ))}
                </Form.Select>
                </Form.Group>
              </Col>
             
               <Col md={12} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Comment</Form.Label>
                  <Form.Control  onChange={(e) => { setDescription(e.target.value)}} type="text" as="textarea" rows="3" placeholder="Enter comment" />
                </Form.Group>
              </Col>
              </>
                  }
              </Row>
              <div className="mt-3">
              {props.loading&&
            <Loading  text="....Please wait"/>}
             {!props.loading&&
              <Button onClick={()=>{
                let datas={
                    appointdate:appointdate+' '+appointTime,
                    problem:description,
                    department:department,
                    doctor:doctor,
                    diagnosis:diagnosis,
                    patient:id,
                    status:stat
                  // image:Blob(photo)
                }
                props.submitAppointment(datas);
               
              }} variant="primary" type="submit" >Submit</Button>}
              </div>
            </Form>
          </Card.Body>
        </Card>
    );
  
  }
