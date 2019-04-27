import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import {  DropdownItem, DropdownMenu, DropdownToggle, Nav} from 'reactstrap';
import PropTypes from 'prop-types';
import axios from 'axios';
import { /*AppAsideToggler,*/ AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.png'

import {connect} from 'react-redux';

import * as actionTypes from '../../store/actions';



const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  constructor(props){
    super(props);
    this.state={
      profileImg:'',
    }
  }
  componentDidMount(){
    let img = this.props.user.photo;
    let url ='https://timetrackertoolbackend.herokuapp.com/profiles-photos/'+img;
    axios.get(url,{ responseType: 'arraybuffer' })
      .then(response=>{
        let imageCode = btoa(
          new Uint8Array(response.data)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
        let image = 'data:image/jpeg;base64,'+imageCode;
        this.setState({profileImg:image});
      })
      .catch(error=>{
        console.log(error);
      })

  }
  render() {


    //const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: 'AngelIT Logo' }}
          minimized={{ src: logo, width: 30, height: 30, alt: 'AngelIT Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="ml-auto" navbar>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <img src={this.state.profileImg} className="img-avatar" alt="profile-img" />
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem header tag="div" className="text-center"><strong>{this.props.user.name+' '+this.props.user.surname}</strong></DropdownItem>
              <DropdownItem><i className="fa fa-user"></i> Профиль</DropdownItem>
              <DropdownItem onClick={()=>this.props.onLogout()} ><i className="fa fa-lock"></i> Выйти</DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
        {/*<AppAsideToggler className="d-md-down-none" />*/}
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

let mapStateToProps = state => {
  return {
    user:state.user
  };
};

let mapDispatchToProps = dispatch => {
  return {
    onLogout:() => {
      dispatch({type:actionTypes.LOGOUT_USER})
    }
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(DefaultHeader);
