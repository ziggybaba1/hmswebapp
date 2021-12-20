import React, { useEffect, useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Form, Button, InputGroup } from '@themesberg/react-bootstrap';
import {useTranslation} from "react-i18next";
import { Loading } from "../Loader";


export const DepartmentForm = (props) => {
    const [department, setDepartment] = useState("");
    const [description, setDescription] = useState("");
  
    useEffect(() => {
      // setDefault();
    }, [props.detail]);
    return (
      <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
          <h5 className="mb-4">Department Form</h5>
          <Form id="empRe">
            <Row>
              <Col md={12} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Department Name*</Form.Label>
                  <Form.Control  onChange={(e) => { setDepartment(e.target.value)}} required type="text" placeholder="Enter Department" />
                </Form.Group>
              </Col>
              <Col md={12} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Description</Form.Label>
                  <Form.Control  onChange={(e) => { setDescription(e.target.value)}} type="text" as="textarea" rows="3" placeholder="Enter Department" />
                </Form.Group>
              </Col>
  
              </Row>
              <div className="mt-3">
              {props.loading&&
            <Loading  text="....Please wait"/>}
             {!props.loading&&
              <Button onClick={()=>{
                let datas={
                  department:department,
                  description:description
                  // image:Blob(photo)
                }
                props.addDepartment(datas);
               
              }} variant="primary" type="submit" >Submit</Button>}
              </div>
            </Form>
          </Card.Body>
        </Card>
    );
  
  }
