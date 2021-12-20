import React, { useEffect, useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Form, Button, InputGroup } from '@themesberg/react-bootstrap';
import {useTranslation} from "react-i18next";
import { Loading } from "../Loader";


export const DoctorForm = (props) => {
    const [name, setName] = useState("");
    const [department, setDepartment] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    useEffect(() => {
      setDefault();
    }, [props.detail]);

    const setDefault=()=>{
        if(props.detail){
            setName(props.detail.name);
            setDepartment(props.detail.department_id);
            setEmail(props.detail.email);
        }
    }
    return (
      <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
          <h5 className="mb-4">Doctor Form</h5>
          <Form id="empRe">
            <Row>
              <Col md={12} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Fullname*</Form.Label>
                  <Form.Control defaultValue={name}  onChange={(e) => { setName(e.target.value)}} required type="text" placeholder="Enter doctor fullname" />
                </Form.Group>
              </Col>
              <Col md={12} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Email Address*</Form.Label>
                  <Form.Control defaultValue={email} onChange={(e) => { setEmail(e.target.value)}} required type="email" placeholder="Enter email address" />
                </Form.Group>
              </Col>
              <Col md={12} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Enter password<small> please note password</small>*</Form.Label>
                  <Form.Control  onChange={(e) => { setPassword(e.target.value)}} required type="password" placeholder="Enter email address" />
                </Form.Group>
              </Col>
              <Col md={12} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Choose Department</Form.Label>
                  <Form.Select required onChange={(e) => { setDepartment(e.target.value)}}>
                 <option value={props.detail?props.detail.department_id:''}>{props.detail?props.detail.department:'Select Department'}</option>
                 {props.department.map((item,i)=>(
                         <option value={item.id}>{item.department}</option>
                 ))}
                    
               </Form.Select>
                </Form.Group>
              </Col>
  
              </Row>
              <div className="mt-3">
              {props.loading&&
            <Loading  text="....Please wait"/>}
             {!props.loading&&
             <>
              <Button onClick={()=>{
                let datas={
                  name:name,
                  email:email,
                  password:password,
                  department_id:department,
                  id:props.encID
                  // image:Blob(photo)
                }
                if(props.encID){
                    props.updateDoctor(datas);
                }
                else{
                    props.addDoctor(datas);
                }
               
              }} variant="primary" type="submit" >{props.detail?'Update':'Submit'}</Button>
               {props.detail&&props.detail.name&&<Button style={{marginLeft:5}} onClick={()=>props.newAdd()} variant="secondary" >Add New</Button>}
               </>}
              </div>
            </Form>
          </Card.Body>
        </Card>
    );
  
  }
