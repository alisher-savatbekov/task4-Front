// import { Container } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import React from 'react';
import { MdEmail } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import {Link,Navigate} from 'react-router-dom'
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


const styleForIcon="position-absolute top-50 end-0 translate-middle";

class Login extends React.Component {
  constructor(props)
  {
    super(props);
    this.state={
      validated: false,
      email:"",
      password:"",
       token: "",//localStorage.getItem('de_token') 
       originToken:""
       // ? JSON.parse(localStorage.getItem('de_token'))
      // : null,
    }
    this.handleSubmit=this.handleSubmit.bind(this);
  }

   render(){
   
    const { token } = this.state;

    // Перенаправляем в зависимости от роли
    if (token && token.role && token.status) {
      if (token.role === 'Admin') {
        return <Navigate to="/users"  replace={true} state={{token:this.state.originToken}}/>;
      }
      return <Navigate to="/success" state={{token:this.state.token}} replace={true}/>;
    }

    return (
     
      <div className="login"> 
        <Form onSubmit={this.handleSubmit} noValidate validated={this.state.validated} className='login-form'>
          
        <p>Start your journey</p>
        <h3>Sign in to the App</h3>
        
        <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3 position-relative"  >
        <MdEmail className={styleForIcon}/>
          <Form.Control type="email" placeholder="name@example.com"  onChange={(e)=>this.setState({email:e.target.value})} />
        </FloatingLabel>

        <FloatingLabel controlId="floatingPassword" label="Password" className='position-relative'  >
          <Form.Control type="password" placeholder="Password"  onChange={(e)=>this.setState({password:e.target.value})}/>
          <FaRegEye className={styleForIcon}/>
        </FloatingLabel>

        <Form.Check  className="check_remember" inline label="Remember me" name="group1"  type="checkbox"  id="remmeber_me"/>
        <Button type="submit" className='button_submit'>Submit form</Button>
        </Form>
        
          <Breadcrumb className='link-sign-up'>
            <Breadcrumb.Item active>Don`t have an account</Breadcrumb.Item>
            <Breadcrumb.Item> <Link to="/signUp">Sign Up</Link></Breadcrumb.Item>

          </Breadcrumb>
        
      </div>

      
  );
  }
  handleSubmit(event) {
    event.preventDefault(); 
    const userData={email:this.state.email,password:this.state.password}
    axios
    .post("https://localhost:44320/api/Auth/login", userData)
    .then((response) => {
      // console.log('HTTP status:', response.status);
      // console.log('token:', response.data.token);
      const token=jwtDecode(response.data.token);

      console.log(response.data.token);
      
      const data={
              role:token["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
              id:token["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
              email:token["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
              name:token["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
              status:response.status    
      };

      this.setState({originToken:response.data.token});
      // console.log(data);
      localStorage.setItem("token",response.data.token);
      localStorage.setItem("de_token",JSON.stringify(data));
      this.setState({token:data});
      // const k= JSON.parse(localStorage.getItem("de_token"));
      // console.log(k);
    })
    .catch((error) => {
      console.error('Error request:', error.message);
    });
  }
}

export default Login;