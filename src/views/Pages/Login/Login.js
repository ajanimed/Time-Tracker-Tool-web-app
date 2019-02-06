import React, { Component } from 'react';
import Logo from '../../../assets/img/brand/logo.png';
import {Alert, Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from 'axios';
import {connect} from 'react-redux';
import * as actionTypes from '../../../store/actions';
import { Redirect } from 'react-router';


class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading:false,
      email:'',
      password:'',
      redirect:false,
      error:false,
    };
  }

  updateEmail(){
    this.setState({email:document.getElementById('email').value})
  }
  updatePassword(){
    this.setState({password:document.getElementById('password').value})
  }
  login(){
    this.setState({loading:true});
    let params = {
      email:this.state.email,
      password:this.state.password
    };
    axios.post('https://timetrackertoolbackend.herokuapp.com/login',params)
      .then(response=>{
        //Check admin
        if(response.data.role==='administrator'){
        //SAVE IN STORE
        this.props.onLogin(response.data.user,response.data.token);
        this.setState({redirect:true,loading:false});
        }
        else{
          this.setState({error:true,loading:false});
        }
      })
      .catch(error=>{
        this.setState({error:true,loading:false});
        console.log(error);
      })

  }

  render() {

    if(this.state.redirect){
      return(
        <Redirect to='/'/>
      )
    }
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              {this.state.error ? (<Alert color="danger"><span style={classes.text}>Неверный адрес электронной почты или пароль</span></Alert>) : false}
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Войти</h1>
                      <p className="text-muted">Войдите в свой аккаунт</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input id='email' onChange={()=>this.updateEmail()} type="text" placeholder="Электронный адрес" autoComplete="email" />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input id='password' onChange={()=>this.updatePassword()} type="password" placeholder="Пароль" autoComplete="current-password" />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button id="subbtn" onClick={()=>this.login()} color="primary" className="btnlogin px-4">{this.state.loading ? (<i className="fa fa-circle-o-notch fa-spin" style={{Color:'white',fontSize:'20px'}}></i>) : (<span>Войти</span>)}</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Забыли пароль?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <img src={Logo} style={classes.logo} alt='AnglesIt'/>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    user:state.user
  };
};
let mapDispatchToProps = dispatch => {
  return {
    onLogin:(user,token) => dispatch({type:actionTypes.SAVE_USER,user:user,token:token})
  };
};

let classes = {
  logo:{
    width:'220px',
    paddingTop:'30px'
  },
  text:{
    fontSize:'17px'
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login);
