
import React, { useState,useEffect, useLayoutEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link,useHistory } from 'react-router-dom';
import BgImage from "../../assets/img/signin.svg";
import { _retrieveData, statusMessage,errorMessage,warningMessage, _storeData, _retrieveToken } from '../../Service/function';

import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { Loading } from "../../components/Loader";




export default function Signin({navigation, route}) {
  const [getEmail,setEmail] = useState(null);
  const [getPassword,setPassword] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [tokenized, setToken] = useState(null);
  const history = useHistory();
        //Login User
useEffect(() => {
setEmail('gunner.mckenzie@example.org');
setPassword('123456');
}, [])
 const LoginUser= async()=>{
  if(!getPassword||!getEmail){
    errorMessage(toast, "Please fill all fields");
    return false;
  }
  try {
    setLoading(true);
  let datat={
    email:getEmail,
    password:getPassword,
  }
  let res=await axios.post('auth/login',datat)
  if(res.data.status){ 
    setLoading(false)
    _storeData(res.data.data.token,"token");
    history.push("/dashboard");
   
  }
  } catch (error) {
    setLoading(false)
  }
  
    
}




  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          {/* <p className="text-center">
            <Card.Link as={Link} to={Routes.DashboardOverview.path} className="text-gray-700">
              <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to homepage
            </Card.Link>
          </p> */}
          <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Sign in to our platform</h3>
                </div>
                <Form onSubmit={e => e.preventDefault()} className="mt-4">
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Your Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control onChange={(e)=>setEmail(e.target.value)} value={'gunner.mckenzie@example.org'} autoFocus required type="email" placeholder="example@company.com" />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group>
                    <Form.Group id="password" className="mb-4">
                      <Form.Label>Your Password</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control onChange={(e)=>setPassword(e.target.value)} value={'123456'} required type="password" placeholder="Password" />
                      </InputGroup>
                    </Form.Group>
                  </Form.Group>
                  {isLoading&&
                    <Loading  text="....Please wait"/>
                  }
                  {!isLoading&&
                  <Button onClick={LoginUser} variant="primary" type="submit" className="w-100">
                    Sign in
                  </Button>}
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
{/* Same as */}
<ToastContainer />
    </main>
  );
};
