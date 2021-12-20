import React, { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faPen, faTrash, faTrashAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Nav, Card, Image, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup, Badge } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import moment from "moment";
import { Loading } from "../Loader";


export const AppointmenttListTable = (props)=>{
    const {linker}=props;
    const doAction=(url,num,data)=>{
        props.doEdit(url,num,data);
      }
  
   
    const TableRow = (props) => {
      const {appointdate,serialno,name,problem,patient_id,status,firstname,lastname,uuid,email,middlename,phone,address,bloodgroup,sex,dob,r } = props;
      let id=patient_id;
      return (
        <tr>
        
          <td className="border-0">
            {/* <ValueChange value={overallRankChange} /> */}
            {firstname?firstname+' '+lastname+' ('+uuid+')':"-"}
          </td>
          <td className="border-0">
            {/* <ValueChange value={overallRankChange} /> */}
            {name?name:"-"}
          </td>
          <td className="border-0">
            {/* <ValueChange value={overallRankChange} /> */}
            {appointdate?appointdate:"-"}
          </td>
          <td className="border-0">
            {/* <ValueChange value={overallRankChange} /> */}
            {status==1?"Used":"Pending"}
          </td>
          <td className="fw-bold border-0">
          <Button variant="primary" onClick={()=>doAction("admin/appointment/"+patient_id,0,{firstname,lastname,uuid,email,middlename,phone,address,bloodgroup,sex,dob,status,id})} size="sm" className="m-1">Edit</Button>
          <Button variant="danger" onClick={()=>doAction("admin/appointment/"+id,3,{firstname,lastname,uuid,email,middlename,phone,address,bloodgroup,sex,dob,status,id})} size="sm" className="m-1">Delete</Button>
          </td>
        </tr>
      );
    };
    var rows = [];
    for (var i = 0; i < linker.last_page; i++) {
      if(linker.current_page-1==i){
        rows.push(<Pagination.Item key={i} active>{i}</Pagination.Item>);
      }
      else{
        rows.push(<Pagination.Item key={i} onClick={()=>props.clickNext('/admin/employees?page='+i)}>{i}</Pagination.Item>);
      }
    }
    return (
      <Card border="light" className="shadow-sm">
        <Card.Body className="pb-0">
          <Table responsive className="table-centered table-nowrap rounded mb-0">
            <thead className="thead-light">
              <tr>
                <th className="border-0">Patient</th>
                <th className="border-0">Doctor</th>
                <th className="border-0">Date & Time</th>
                <th className="border-0">Status</th>
                <th className="border-0">Option</th>
              </tr>
            </thead>
            {props.loading&&
                <Loading  text={'...wait a moment'}/>
            }
            {!props.loading&&
            <tbody>
              {props.data?props.data.map(r => <TableRow key={`ranking-${r.id}`} {...r} />):[]}
            </tbody>
            }
          </Table>
          <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
            <Nav>
              <Pagination className="mb-2 mb-lg-0">
                <Pagination.Prev>
                  Previous
                </Pagination.Prev>
                {[...Array(linker.last_page)].map((x, i) =>
            <Pagination.Item key={i} active={linker.current_page-1==i?true:false} onClick={()=>props.clickNext('/admin/fields/department?page='+(i+1))}>{i}</Pagination.Item>)
                  }
               
                <Pagination.Next>
                  Next
                </Pagination.Next>
              </Pagination>
            </Nav>
            <small className="fw-bold">
              Showing <b>{linker.per_page}</b> out of <b>{linker.to}</b> entries
            </small>
          </Card.Footer>
        </Card.Body>
      </Card>
    );
  }