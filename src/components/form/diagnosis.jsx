import React, { useEffect, useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faMedkit, faPhone, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Form, Button, InputGroup } from '@themesberg/react-bootstrap';
import {useTranslation} from "react-i18next";
import { Loading } from "../Loader";
import { format } from "crypto-js";


export const DiagnosisForm = (props) => {
    const [department, setDepartment] = useState("");
    const [description, setDescription] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [idno, setIdno] = useState("");
    const [id, setId] = useState(null);
    const [middlename, setMiddlename] = useState("");
    const [dob, setDob] = useState("");
    const [sex, setSex] = useState("");
    const [phone, setPhone] = useState("");
    const [dataSypmtoms,setDatasymptoms]=useState([]);
    const [dataDiagnosis,setDiagnosis]=useState([]);
    const [dataDiagnosisSP,setDiagnosisSP]=useState([]);
    const [dataSypmtomsID,setDatasymptomsID]=useState([])
    const [stat,setStatus]=useState(null);
  
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

    const addSymptoms=(e)=>{
            var dd=[...dataSypmtoms]; var ddID=[...dataSypmtomsID];
            dd.push(JSON.parse(e).name); ddID.push(JSON.parse(e).id);
            setDatasymptoms(dd); setDatasymptomsID(ddID); 
    }

    const removeSymptoms=(e)=>{
        var dd=[...dataSypmtoms]; var ddID=[...dataSypmtomsID];
        dd.splice(e,1); ddID.splice(e,1);
        setDatasymptoms(dd); setDatasymptomsID(ddID); 
}

    const addDiagnosis=(e)=>{
        var dd=[...dataDiagnosis];var ddSP=[...dataDiagnosisSP];
        // alert(e.specialisation)
        dd.push(JSON.parse(e).name); ddSP.push(JSON.parse(e).specialisation);
        setDiagnosis(dd);setDiagnosisSP(ddSP);
    }

    const removeDiagnosis=(e)=>{
        var dd=[...dataDiagnosis]; var ddSP=[...dataDiagnosisSP];
        dd.splice(e,1); dd.splice((e,1));
        setDiagnosis(dd); setDiagnosisSP(ddSP);
}
    return (
      <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
          <h5 className="mb-4">Diagnosis Form</h5>
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
                  <Form.Label>Select Symptoms</Form.Label>
                 <div>
                     {dataSypmtoms.map((it,i)=>(
                           <span style={{color:'blue'}}>{i+1}) {it}<FontAwesomeIcon icon={faTrash} onClick={()=>removeSymptoms(i)} /> </span>
                     ))}
                     </div> 
                  <Form.Select required onChange={(e) => { addSymptoms(e.target.value)}} >
                      <option>Select Symptoms</option>
                  {props.symptoms.map((item, i) =>(
                    <option value={JSON.stringify({id:item.ID,name:item.Name})}>{item.Name}</option>
                  ))
                 }
                </Form.Select>
                </Form.Group>
                <div className="mt-3">
              {props.loading&&
            <Loading  text="....Please wait"/>}
             {!props.loading&&
              <Button onClick={()=>{
                let datas={
                    symptom:'['+dataSypmtomsID+']',
                    gender:sex,
                    year:moment(dob).format("Y")
                  // image:Blob(photo)
                }
                props.checkDiagosis(datas);
               
              }} variant="primary" type="submit" ><FontAwesomeIcon icon={faMedkit} /> Check Diagnosis</Button>}
              </div>
              </Col>
              {props.diagnosis.length>0&&
              <>
              <Col md={12} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Select Diagnosis</Form.Label>
                  <div>
                     {dataDiagnosis.map((it,i)=>(
                           <span style={{color:'blue'}}>{i+1}) {it}<FontAwesomeIcon icon={faTrash} onClick={()=>removeDiagnosis(i)} /> </span>
                     ))}
                     </div> 
                  <Form.Select required onChange={(e) => { addDiagnosis(e.target.value)}}>
                  <option value="1">Select Diagnosis</option>
                  {props.diagnosis.map((item,i)=>(
                      <option value={JSON.stringify({specialisation:item.Specialisation,name:item.Issue.Name})}>{item.Issue.Name}</option>
                  ))}
                </Form.Select>
                </Form.Group>
              </Col>
              <Col md={12} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Specialisation</Form.Label>
                  {/* {JSON.stringify(dataDiagnosisSP[0]!=undefined?dataDiagnosisSP[0]:[])} */}
                  <div>
                     {dataDiagnosisSP&&dataDiagnosisSP[0]!=undefined?dataDiagnosisSP[0].map((it,i)=>(
                           <span style={{color:'green'}}>&nbsp;({i+1})  {it.Name}</span>
                     )):[]}
                     </div> 
                </Form.Group>
              </Col>
               <Col md={12} className="mb-3">
               <Form.Group id="firstName">
                 <Form.Label>Diagnosis Status</Form.Label>
                 <Form.Select required onChange={(e) => { setStatus(e.target.value)}}>
                 <option value="">Select Diagnosis Status</option>
                     <option value="1">Valid</option>
                     <option value="0">Invalid</option>
               </Form.Select>
               </Form.Group>
             </Col>
             </>
                }
  
              </Row>
              {props.diagnosis.length>0&&
              <div className="mt-3">
              {props.loading&&
            <Loading  text="....Please wait"/>}
             {!props.loading&&
              <Button onClick={()=>{
                let datas={
                    diagnosis:JSON.stringify(dataDiagnosis),
                    problem:JSON.stringify(dataSypmtoms),
                    specialisation:dataDiagnosisSP&&dataDiagnosisSP[0]!=undefined?JSON.stringify(dataDiagnosisSP[0]):null,
                    patient:id,
                    status:stat
                  // image:Blob(photo)
                }
                props.submitDiagosis(datas);
               
              }} variant="primary" type="submit" >Submit</Button>}
              </div>
}
            </Form>
          </Card.Body>
        </Card>
    );
  
  }
