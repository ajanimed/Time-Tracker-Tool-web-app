import React, {Component} from 'react';
import {
  Col,
  Row,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  FormFeedback,
  Label,
  Input,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Button,
  Alert
} from 'reactstrap';
import instance from '../../../axios-config';
import store from "../../../store";

class RegisterEmployeeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formIsValid:false,
      loading: false,
      successAlert: {
        visible: false,
        message: ''
      },
      nameInput: {
        class: '',
        isValid:false,
      },
      surnameInput: {
        class: '',
        isValid:false,
      },
      middlenameInput: {
        class: '',
        isValid:false,
      },
      emailInput: {
        class: '',
        message: '',
        isValid:false,
        loading: false
      },
      passwordInput: {
        class: '',
        isValid:false,
      },
      passwordInputIconClass:'fa fa-eye',
      telInput: {
        class: '',
        isValid:false
      },
      roleInput: {
        class: '',
        isValid:false
      },

      user: {
        name: '',
        middlename: '',
        surname: '',
        tel: '',
        email: '',
        password: '',
        employee: {
          function: '',
        }
      }
    }
  }
  validateNameInput(){
    if(document.getElementById('name').value===''){
      let input = {
        class:'is-invalid',
        isValid:false
      };
      this.setState({nameInput:input});

    }
    else{
      let input = {
        class:'is-valid',
        isValid:true
      };
      this.setState({nameInput:input});

    }
  }
  validateMiddlenameInput(){
    if(document.getElementById('middlename').value===''){
      let input = {
        class:'is-invalid',
        isValid:false
      };
      this.setState({middlenameInput:input});

    }
    else{
      let input = {
        class:'is-valid',
        isValid:true
      };
      this.setState({middlenameInput:input});
    }
  }
  validateSurnameInput(){
    if(document.getElementById('surname').value===''){
      let input = {
        class:'is-invalid',
        isValid:false
      };
      this.setState({surnameInput:input});
    }
    else{
      let input = {
        class:'is-valid',
        isValid:true
      };
      this.setState({surnameInput:input});
    }
  }
  validatepasswordInput(){
    if(document.getElementById('password').value===''){
      let input = {
        class:'is-invalid',
        isValid:false
      };
      this.setState({passwordInput:input});
    }
    else{
      let input = {
        class:'is-valid',
        isValid:true
      };
      this.setState({passwordInput:input});
    }
  }
  validateRoleInput(){
    if(document.getElementById('role').value===''){
      let input = {
        class:'col-sm-4 is-invalid',
        isValid:false
      };
      this.setState({roleInput:input});
    }
    else{
      let input = {
        class:'col-sm-4 is-valid',
        isValid:true
      };
      this.setState({roleInput:input});
    }
  }
  validateTelInput(){
    if((document.getElementById('tel').value.length!==11) ){
      let input = {
        class:'col-sm-4 is-invalid',
        isValid:false
      };
      this.setState({telInput:input});
    }
    else{
      if(isNaN(document.getElementById('tel').value)){
        let input = {
          class:'col-sm-4 is-invalid',
          isValid:false
        };
        this.setState({telInput:input});
      }
      else{
        let input = {
          class:'col-sm-4 is-valid',
          isValid:true
        };
        this.setState({telInput:input});
      }
    }
  }

  verifEmail() {
    if (document.getElementById('email').value === '') {
      let emailInput = {
        class: '',
        message: '',
        isValid:false,
        loading: false
      };
      this.setState({emailInput: emailInput});
    }
    if (document.getElementById('email').value !== '') {
      let emailInput = {
        class: '',
        message: '',
        isValid:false,
        loading: true
      };
      this.setState({emailInput: emailInput});
      let options = {
        headers: {
          'Authorization': 'Bearer ' + store.getState().accessToken
        }
      };
      instance.get('/user/verif/' + this.state.user.email, options)
        .then(response => {
          if (response.data.code === 200) {
            let emailInput = {
              class: 'is-valid',
              message: 'valid email',
              isValid:true,
              loading: false
            };
            this.setState({emailInput: emailInput});
          }
        })
        .catch(error => {
          let emailInput = {
            class: 'is-invalid',
            isValid:false,
            message: error.response.data.message,
            loading: false
          };
          this.setState({emailInput: emailInput});
          console.log(error);
        })

    }
  }

  updateNameInput() {
    let newUser = this.state.user;
    newUser.name = document.getElementById('name').value;
    this.setState({user: newUser});
  }

  updateSurnameInput() {
    let newUser = this.state.user;
    newUser.surname = document.getElementById('surname').value;
    this.setState({user: newUser});
  }

  updateMiddlenameInput() {
    let newUser = this.state.user;
    newUser.middlename = document.getElementById('middlename').value;
    this.setState({user: newUser});
  }

  updateEmailInput() {
    let newUser = this.state.user;
    newUser.email = document.getElementById('email').value;
    this.setState({user: newUser});
  }

  updatePasswordInput() {
    let newUser = this.state.user;
    newUser.password = document.getElementById('password').value;
    this.setState({user: newUser});
  }

  updateRoleInput() {
    let newUser = this.state.user;
    newUser.employee.function = document.getElementById('role').value;
    this.setState({user: newUser});
  }

  updateTelInput() {
    let newUser = this.state.user;
    newUser.tel = document.getElementById('tel').value;
    this.setState({user: newUser});
  }

  resetForm() {
    document.getElementById('name').value = '';
    document.getElementById('surname').value = '';
    document.getElementById('middlename').value = '';
    document.getElementById('tel').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('role').value = '';
    let input1 = {
      class:'',
      isValid:false
    };
    let input2 = {
      class:'col-sm-4',
      isValid:false
    };
    this.setState({passwordInput:input1,emailInput:input1,nameInput:input1,middlenameInput:input1,surnameInput:input1,telInput:input2,roleInput:input2});
  }

  inputMailFocus() {
    let emailInput = {
      class: '',
      message: '',
      isValid:false,
      loading: false
    };
    this.setState({emailInput: emailInput});
  }



  registerEmployee() {
    window.scrollTo(0, 0);
    this.setState({loading: true});
    let params = {
      name: this.state.user.name,
      middlename: this.state.user.middlename,
      surname: this.state.user.surname,
      tel: this.state.user.tel,
      email: this.state.user.email,
      password: this.state.user.password,
      employee: {
        function: this.state.user.employee.function
      }
    };
    let options = {
      headers: {
        'Authorization': 'Bearer ' + store.getState().accessToken
      }
    };
    instance.post('/register', params, options)
      .then(response => {
        let success = {
          visible: true,
          message: 'сотрудник был добавлен'
        };
        this.setState({successAlert: success, loading: false});
      })
      .catch(error => {
        console.log(error);
      })

  }

  onDismissSuccessAlert() {
    let success = {
      visible: false,
      message: ''
    };
    this.setState({successAlert: success});
  }
  showPassword(){
    let passwordInput = document.getElementById('password');
    this.setState({passwordInputIconClass:'fa fa-eye-slash'});
    passwordInput.type="text";
  }
  hidePassword(){
    let passwordInput = document.getElementById('password');
    this.setState({passwordInputIconClass:'fa fa-eye'});
    passwordInput.type="password";
  }

  render() {

    return (

      <div className="animated fadeIn" >
        {this.state.successAlert.visible ? (
          <Alert className="animated fadeIn" color="success" isOpen={this.state.successAlert.visible}
                 toggle={() => this.onDismissSuccessAlert()}>
            {this.state.successAlert.message}
          </Alert>) : false}
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <strong>Зарегистрировать сотрудника</strong>
              </CardHeader>
              <CardBody>
                <span className="form-label">Иинформация аутентификации</span>
                <Row style={{marginTop: '15px', paddingLeft: '25px', paddingRight: '25px'}}>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="email">Email</Label>
                      <InputGroup>
                        <Input className={this.state.emailInput.class} onFocus={() => this.inputMailFocus()}
                               onBlur={() => this.verifEmail()} onChange={() => this.updateEmailInput()} type="email"
                               name="email" id="email" placeholder="example@example.com" required></Input>
                        <FormFeedback className={this.state.emailInput.class}>{this.state.emailInput.message}</FormFeedback>
                        <InputGroupAddon addonType="append">
                          {this.state.emailInput.class === '' ?
                            (<InputGroupText>
                              {this.state.emailInput.loading ? (<i className="fa fa-circle-o-notch fa-spin"></i>) :
                                (<i className="fa fa-envelope-o"></i>)}
                            </InputGroupText>) : false}
                        </InputGroupAddon>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="password">Пароль</Label>
                      <InputGroup>
                        <Input className={this.state.passwordInput.class} onBlur={()=>this.validatepasswordInput()} onChange={() => this.updatePasswordInput()} type="password" name="password" id="password"
                               placeholder="пароль" required>
                        </Input>
                        <InputGroupAddon addonType="append">
                            <InputGroupText>
                              <i onMouseDown={()=>this.showPassword()} onMouseUp={()=>this.hidePassword()} className={this.state.passwordInputIconClass}></i>
                            </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>
                <span className="form-label">ФИО</span>
                <Row style={{marginTop: '15px', paddingLeft: '25px', paddingRight: '25px'}}>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="name">Имя</Label>
                      <Input className={this.state.nameInput.class} onBlur={()=>this.validateNameInput()} onChange={() => this.updateNameInput()} type="text" name="name" id="name" placeholder="Имя"
                             required></Input>
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="middlename">Отчество</Label>
                      <Input className={this.state.middlenameInput.class} onBlur={()=>this.validateMiddlenameInput()} onChange={() => this.updateMiddlenameInput()} type="text" name="middlename" id="middlename"
                             placeholder="Отчество" required></Input>
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="surname">Фамилия</Label>
                      <Input className={this.state.surnameInput.class} onBlur={()=>this.validateSurnameInput()} onChange={() => this.updateSurnameInput()} type="text" name="surname" id="surname"
                             placeholder="Фамилия" required></Input>
                    </FormGroup>
                  </Col>
                </Row>
                <span className="form-label">Информация профиля</span>
                <Row style={{marginTop: '15px', paddingLeft: '25px', paddingRight: '10px'}}>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="text-input">Тел</Label>
                      <Input onBlur={()=>this.validateTelInput()} onChange={() => this.updateTelInput()} className={"col-sm-4 "+this.state.telInput.class} type="tel" id="tel" name="tel"
                             placeholder="89805306219"></Input>
                    </FormGroup>
                  </Col>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="text-input">Роль</Label>
                      <Input onBlur={()=>this.validateRoleInput()} onChange={() => this.updateRoleInput()} className={"col-sm-4 "+this.state.roleInput.class}  type="text" id="role"
                             name="role" placeholder="дизайнер"></Input>
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <Button type="submit"  onClick={() => this.registerEmployee()} size="sm" color="success"><i
                  className="fa fa-dot-circle-o"></i> Вписывать</Button>
                <Button onClick={() => this.resetForm()} type="reset" size="sm" color="danger"><i
                  className="fa fa-ban"></i> Сброс</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default RegisterEmployeeForm;
