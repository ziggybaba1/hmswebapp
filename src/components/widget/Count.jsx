
import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faChartArea, faChartBar, faChartLine, faFlagUsa, faFolderOpen, faGlobeEurope, faLink, faPaperclip, faPen, faPlus, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faAngular, faBootstrap, faReact, faVuejs } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Card, Image, Button, ListGroup, ProgressBar, Form, ButtonGroup } from '@themesberg/react-bootstrap';

import moment from "moment";

export const CounterWidget = (props) => {
    const { icon, iconColor, category, title, period, percentage } = props;
    const percentageIcon = percentage < 0 ? faAngleDown : faAngleUp;
    const percentageColor = percentage < 0 ? "text-danger" : "text-success";
  
    return (
      <Card border="light" className="shadow-sm">
        <Card.Body>
          <Row className="d-block d-xl-flex align-items-center">
            <Col xl={5} className="text-xl-center d-flex align-items-center justify-content-xl-center mb-3 mb-xl-0">
              <div className={`icon icon-shape icon-md icon-${iconColor} rounded me-4 me-sm-0`}>
                <FontAwesomeIcon icon={icon} />
              </div>
              <div className="d-sm-none">
                <h5>{category}</h5>
                <h3 className="mb-1">{title}</h3>
              </div>
            </Col>
            <Col xs={12} xl={7} className="px-xl-0">
              <div className="d-none d-sm-block">
                <h5>{category}</h5>
                <h3 className="mb-1">{title}</h3>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  };