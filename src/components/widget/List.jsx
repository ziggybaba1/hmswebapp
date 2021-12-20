
import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faChartArea, faChartBar, faChartLine, faFlagUsa, faFolderOpen, faGlobeEurope, faLink, faPaperclip, faPen, faPlus, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faAngular, faBootstrap, faReact, faVuejs } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Card, Image, Button, ListGroup, ProgressBar, Form, ButtonGroup } from '@themesberg/react-bootstrap';
import inst from "../../assets/img/bootstrap-5-logo.svg";
import moment from "moment";
import { Link } from "react-router-dom";

export const PatientWidget = (props) => {
    const TeamMember = (props) => {
      const { firstname,lastname, status, image, icon, btnText } = props;
      const statusKey = {
        online: { color: "success", label: "Online" },
        inMeeting: { color: "warning", label: "In a meeting" },
        offline: { color: "danger", label: "Offline" }
      };
  
      const statusColor = status==0 ? 'warning' : 'success'
        , statusLabel = status==0 ? "not active" : 'active';
  
      return (
        <ListGroup.Item className="px-0">
          <Row className="align-items-center">
            <Col className="col-auto">
              <a href="#top" className="user-avatar">
                <Image src={image?process.env.BASE_URL+image:inst} className="rounded-circle" />
              </a>
            </Col>
            <Col className="ms--2">
              <h4 className="h6 mb-0">
                <a href="#!">{firstname+" "+lastname}</a>
              </h4>
              <span className={`text-${statusColor}`}>● </span>
              <small>{statusLabel}</small>
            </Col>
            <Col className="col-auto">
              <Button variant="tertiary" size="sm">
                <FontAwesomeIcon icon={icon} className="me-1" /> {btnText}
              </Button>
            </Col>
          </Row>
        </ListGroup.Item>
      );
    };
  
    return (
      <Card border="light" className="shadow-sm">
        <Card.Header className="border-bottom border-light d-flex justify-content-between">
          <h5 className="mb-0">{props.title?props.title.toUpperCase():''}</h5>
          <Link to={'/patient'}><Button variant="secondary" onClick={()=>props.onClick()} size="sm">See all</Button></Link>
        </Card.Header>
        <Card.Body>
          <ListGroup className="list-group-flush list my--3">
            {props.list.map(tm => <TeamMember key={`team-member-${tm.id}`} {...tm} />)}
          </ListGroup>
        </Card.Body>
      </Card>
    );
  };

  export const DiagnosisWidget = (props) => {
    const TeamApp = (props) => {
      const { firstname,lastname, status, image, icon, btnText } = props;
      const statusKey = {
        online: { color: "success", label: "Online" },
        inMeeting: { color: "warning", label: "In a meeting" },
        offline: { color: "danger", label: "Offline" }
      };
  
      const statusColor = status==0 ? 'warning' : 'success'
      , statusLabel = status==0 ? "invalid" : 'valid';
  
      return (
        <ListGroup.Item className="px-0">
          <Row className="align-items-center">
            <Col className="col-auto">
              <a href="#top" className="user-avatar">
                <Image src={image?process.env.BASE_URL+image:inst} className="rounded-circle" />
              </a>
            </Col>
            <Col className="ms--2">
              <h4 className="h6 mb-0">
                <a href="#!">{firstname+" "+lastname}</a>
              </h4>
              <span className={`text-${statusColor}`}>● </span>
              <small>{statusLabel}</small>
            </Col>
            <Col className="col-auto">
              <Button variant="tertiary" size="sm">
                <FontAwesomeIcon icon={icon} className="me-1" /> {btnText}
              </Button>
            </Col>
          </Row>
        </ListGroup.Item>
      );
    };
  
    return (
      <Card border="light" className="shadow-sm">
        <Card.Header className="border-bottom border-light d-flex justify-content-between">
         
          <h5 className="mb-0">{props.title?props.title.toUpperCase():''}</h5>
         <Link to={'/diagnosis'}><Button variant="secondary"  size="sm">See all</Button></Link> 
        </Card.Header>
        <Card.Body>
          <ListGroup className="list-group-flush list my--3">
            {props.list.map(tm => <TeamApp  key={`team-member-${tm.id}`} {...tm} />)}
          </ListGroup>
        </Card.Body>
      </Card>
    );
  };

  export const AppointmentWidget = (props) => {
    const TeamMember = (props) => {
      const { firstname,lastname,appointdate, status, image, icon, btnText } = props;
      const statusKey = {
        online: { color: "success", label: "Online" },
        inMeeting: { color: "warning", label: "In a meeting" },
        offline: { color: "danger", label: "Offline" }
      };
  
      const statusColor = status==0 ? 'warning' : 'success'
      , statusLabel = status==0 ? "pending" : 'active';
  
      return (
        <ListGroup.Item className="px-0">
          <Row className="align-items-center">
            <Col className="col-auto">
              <a href="#top" className="user-avatar">
              <Image src={image?process.env.BASE_URL+image:inst} className="rounded-circle" />
              </a>
            </Col>
            <Col className="ms--2">
              <h4 className="h6 mb-0">
              <a href="#!">{firstname+" "+lastname}</a>
              </h4>
              <span className={`text-${statusColor}`}>● </span>
              <small>{statusLabel}</small><br/>
              <small>Date: {moment(appointdate).format("dddd, MMMM Do YYYY, h:mm:ss a")}</small>
            </Col>
            <Col className="col-auto">
              <Button variant="tertiary" size="sm">
                <FontAwesomeIcon icon={icon} className="me-1" /> {btnText}
              </Button>
            </Col>
          </Row>
        </ListGroup.Item>
      );
    };
  
    return (
      <Card border="light" className="shadow-sm">
        <Card.Header className="border-bottom border-light d-flex justify-content-between">
          <h5 className="mb-0">{props.title?props.title.toUpperCase():''}</h5>
          <Link to={'/appointment'}> <Button variant="secondary" onClick={()=>props.onClick()} size="sm">See all</Button></Link>
        </Card.Header>
        <Card.Body>
          <ListGroup className="list-group-flush list my--3">
            {props.list.map(tm => <TeamMember key={`team-member-${tm.id}`} {...tm} />)}
          </ListGroup>
        </Card.Body>
      </Card>
    );
  };