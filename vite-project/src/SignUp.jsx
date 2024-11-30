import React from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { MdEmail } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import axios from "axios";
import { Navigate } from 'react-router-dom';

const styleForIcon = "position-absolute top-50 end-0 translate-middle";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validated: false,
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      redirect:false,
      passwordsMatch: true, 
      
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      // Проверка совпадения паролей
      if (name === "password" || name === "confirmPassword") {
        this.setState({
          passwordsMatch: this.state.password === this.state.confirmPassword,
        });
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault(); 
    const userData = {
      userName: this.state.userName,
      email: this.state.email,
      password: this.state.password
    };  
    const form = event.currentTarget;
    const { email, password, userName, passwordsMatch } = this.state;
    
    console.log(userData)
    
    
    if (form.checkValidity() === false || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !password || !userName || !passwordsMatch) {
      this.setState({ 
        validated: false });
      return;
    }

    
    this.setState({ validated: true });
    
   

    axios.post('https://localhost:44320/api/Auth/register', userData)
    .then(response => {

      console.log('Response server:', response.status); 
      
      alert("Form submitted successfully!");

      this.setState({redirect:true})
    })
    .catch(error => {
      console.error('Error request:', error.response ? error.response.data : error.message);
    });
    
  }

  render() {
    if(this.state.redirect){
      return (
        <Navigate to="/"/>
      );
    }

    return (
      <div className="login">
        <Form
          className="login-form"
          noValidate
          validated={this.state.validated}
          onSubmit={this.handleSubmit}
        >
          <h3>Sign Up</h3>

          <FloatingLabel
            controlId="floatingInputName"
            label="UserName"
            className="mb-3 position-relative"
          >
            <FaUser className={styleForIcon} />
            <Form.Control
              type="text"
              placeholder="Enter your username"
              name="userName"
              required
              value={this.state.userName}
              autoComplete="username"
              onChange={this.handleChange}
            />
             <Form.Control.Feedback type="invalid">
             Please enter a UserName
             </Form.Control.Feedback>
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3 position-relative"
          >
           <MdEmail className={styleForIcon} />
           <Form.Control
             type="email"
             placeholder="name@example.com"
             name="email"
             aria-required
            //  autoComplete="email"
             value={this.state.email}
             onChange={this.handleChange}
             isInvalid={ 
              !this.state.email=="" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.state.email)}

           />
           <Form.Control.Feedback type="invalid">
             Please enter a valid email address.
           </Form.Control.Feedback>
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingPassword"
            label="Password"
            className="mb-3 position-relative"
          >
            <Form.Control
              type="password"
              placeholder="password"
              name="password"
              required
              autoComplete="new-password"
              value={this.state.password}
              onChange={this.handleChange}
              isValid={this.state.passwordsMatch && this.state.password!=''}
              isInvalid={!this.state.passwordsMatch}
            />
            <FaRegEye className={styleForIcon} />
            <Form.Control.Feedback type="invalid">
              Passwords do not match.
            </Form.Control.Feedback>
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingConfirmPassword"
            label="Confirm Password"
            className="position-relative"
          >
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              required
              autoComplete="new-password"
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              isValid={this.state.passwordsMatch && this.state.confirmPassword!=''}
              isInvalid={!this.state.passwordsMatch}
            />
            <FaRegEye className={styleForIcon} />
            <Form.Control.Feedback type="invalid">
              Passwords do not match.
            </Form.Control.Feedback>
          </FloatingLabel>

          <Button type="submit" className="button_submit">
            Submit form
          </Button>
        </Form>
      </div>
    );
  }
}

export default SignUp;
