import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import {Row, Col , Pagination , PaginationItem , PaginationLink ,  Button , Modal , ModalBody, ModalFooter, ModalHeader , Card , CardBody, CardHeader, Table } from 'reactstrap';
import instance from '../../../axios-config';
import store from '../../../store';
class SupervisorsTab extends Component {
  constructor(props){
    super(props);
    this.state={
      _id:'',
      supervisors:[],
      loadingTab:true,
      errorLodingTab:false,
      danger: false,
      profile:false,
      profileInfos:{
        function:'',
        user:{
          photo:'',
          name:'',
          middlename:'',
          surname:'',
          tel:'',
          email:'',
          created_at:''
        }
      },
      pagination:{
        totalDocs: 0,
        limit: 0,
        hasPrevPage: null,
        hasNextPage: null,
        page: 0,
        totalPages: 0,
        prevPage: null,
        nextPage: null,
      },
      paginationTab:[],
      paginateNextClass:'',
      paginatePrevClass:'',
      togglePaginationClass:'show-pagintaion',

    }
  }

  openModal(event,type){
    let idSupervisor = event.target.getAttribute('data-id');
    this.setState({_id:idSupervisor});
    if(type==='delete'){
      this.toggleDangerModal();
    }
    else{
      if(type==='profile'){
        console.log(event.target);
        let infos = {
          id:event.target.getAttribute('data-id'),
          function:event.target.getAttribute('data-function'),
          user:{
            photo:event.target.getAttribute('data-photo'),
            name:event.target.getAttribute('data-name'),
            middlename:event.target.getAttribute('data-middlename'),
            surname:event.target.getAttribute('data-surname'),
            tel:event.target.getAttribute('data-tel'),
            email:event.target.getAttribute('data-email'),
            password:event.target.getAttribute('data-password'),
            created_at:event.target.getAttribute('data-createdat'),
          }
        };
        this.setState({profileInfos:infos});
        this.toggleProfileModal();
      }
    }
  }
  createPaginationTable(){
    for(var i=1;i<=this.state.pagination.totalPages;i++){
      let tab = this.state.paginationTab;
      let active;
      if(i===this.state.pagination.page){
        active='active';
      }
      else{
        active='a';
      }
      let element = {
        active:active,
        index:i
      };
      tab.push(element);
      this.setState({paginationTab:tab});
    }
  }
  toggleDangerModal() {
    this.setState({danger: !this.state.danger});
  }
  toggleProfileModal(){
    this.setState({profile: !this.state.profile});
  }
  fetchSupervisors(page,limit){
    this.setState({loadingTab:true});
    this.setState({paginationTab:[]});
    let options = {
      headers: {
        'Authorization': 'Bearer ' + store.getState().accessToken
      }
    };
    let paginationOptions;
    instance.get('/supervisors/'+page+'/'+limit,options)
      .then(response=>{
        let page=parseInt(response.data.page,10);
        paginationOptions = {
          totalDocs: response.data.totalDocs,
          limit: response.data.limit,
          hasPrevPage: response.data.hasPrevPage,
          hasNextPage: response.data.hasNextPage,
          page: page,
          totalPages: response.data.totalPages,
          prevPage: response.data.prevPage,
          nextPage: response.data.nextPage
        };
        this.setState({supervisors:response.data.docs,pagination:paginationOptions,loadingTab:false});
        if(!this.state.pagination.hasNextPage){
          console.log(this.state.pagination);
          this.setState({paginateNextClass:'disablepag'});
        }
        else{
          this.setState({paginateNextClass:''});
        }
        if(!this.state.pagination.hasPrevPage){
          this.setState({paginatePrevClass:'disablepag'});
        }
        else{
          this.setState({paginatePrevClass:''});
        }
        if(this.state.pagination.totalDocs===this.state.pagination.limit){
          this.setState({togglePaginationClass:'hide-pagination'})
        }
        else{
          this.setState({togglePaginationClass:'show-pagination'})
        }
        this.createPaginationTable();
      })
      .catch(error=>{
        this.setState({errorLoadingTab:true});
        console.log(error);
      })
  }
  deleteEmployee(){
    this.toggleDangerModal();
    this.setState({profile:false});
    let options = {
      headers: {
        'Authorization': 'Bearer ' + store.getState().accessToken
      }
    };
    instance.delete('/supervisor/delete/'+this.state._id,options)
      .then(response=>{
        console.log(response);
        let page = parseInt(this.state.pagination.page,10);
        if(this.state.pagination.totalDocs===1){
          this.fetchSupervisors(page-1,this.props.limit);
        }
        else{
          this.fetchSupervisors(page,this.props.limit);
        }
      })
      .catch(error=>{
        console.log(error);
      })

  }
  toggle(i) {
    const newArray = this.state.tooltipOpen.map((element, index) => {
      return (index === i ? !element : false);
    });
    this.setState({
      tooltipOpen: newArray,
    });
  }
  componentDidMount(){
    this.fetchSupervisors(1,this.props.limit);
  }
  render() {
    let i =0;
    return (
      <Card>
        <CardHeader>
          <i className="fa fa-align-justify"></i> Руководители
        </CardHeader>
        <CardBody>
          {this.state.errorLoadingTab ? (
              <Col md="12">
                <div className="clearfix">
                  <i className="apicallerror cui-ban icons d-block mt-4"></i>
                  <div>
                    <h4 className="elements pt-3">Oops! Не удалось.</h4>
                    <div className="reloadbtn"><Button onClick={()=>this.fetchSupervisors()}  color="primary">Перезагружать</Button></div>
                  </div>
                </div>
              </Col>):
            this.state.loadingTab ? (<div className="spinner">Loading...</div>) : ( this.state.supervisors.length === 0 ? (<div>No supervisors</div>) :(
              <Table responsive hover className="animated fadeIn">
                <thead>
                <tr>
                  <th scope="col"><span style={classes.tableheader}>#</span></th>
                  <th scope="col"><span style={classes.tableheader}>ФИО</span></th>
                  <th scope="col"><span style={classes.tableheader}>ВРЕМЯ РЕГИСТРАЦИИ</span></th>
                  <th scope="col"><span style={classes.tableheader}>РОЛЬ</span></th>
                  <th scope="col"><span style={classes.tableheader}>Опции</span></th>
                </tr>
                </thead>
                <tbody>
                {this.state.supervisors.map(item  => (
                  <tr key={item._id}>
                    <td>{i=i+1}</td>
                    <td><span className="user-td" data-id={item._id} data-function={item.function} data-photo={item.user.photo} data-name={item.user.name} data-middlename={item.user.middlename} data-surname={item.user.surname} data-tel={item.user.tel} data-email={item.user.email} data-createdat={item.user.created_at} onClick={(event)=>this.openModal(event,'profile')}>{item.user.name} {item.user.middlename} {item.user.surname}</span></td>
                    <td>{item.user.created_at}</td>
                    <td>{item.function}</td>
                    <td>
                      <i data-id={item._id} onClick={(event)=>this.openModal(event,'delete')} className="icon-delete cui-circle-x icons font-xl"></i>
                    </td>
                  </tr>
                ))}
                </tbody>
              </Table>))}
          {this.state.loadingTab ? false: (
            <Pagination className={this.state.togglePaginationClass}>
              <PaginationItem>
                <PaginationLink className={this.state.paginatePrevClass} onClick={()=>this.fetchSupervisors(this.state.pagination.page-1,this.props.limit)}  previous tag="button" />
              </PaginationItem>
              {this.state.paginationTab.map(item  => (
                <PaginationItem key={item.index} className={item.active} >
                  <PaginationLink tag="button" onClick={()=> this.fetchSupervisors(item.index,this.props.limit)}>
                    {item.index}
                  </PaginationLink>
                </PaginationItem>))}
              <PaginationItem>
                <PaginationLink className={this.state.paginateNextClass}  onClick={()=>this.fetchSupervisors(this.state.pagination.page+1,this.props.limit)} next tag="button" />
              </PaginationItem>
            </Pagination>)}
        </CardBody>
        <Modal isOpen={this.state.danger} toggle={()=>this.toggleDangerModal()}
               className={'modal-danger ' + this.props.className}>
          <ModalHeader toggle={()=>this.toggleDangerModal()}>Удалить руководителя</ModalHeader>
          <ModalBody>
            Вы хотите удалить этого руководителя?
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={()=>this.deleteEmployee()}>Да</Button>
            <Button color="secondary" onClick={()=>this.toggleDangerModal()}>Отменить</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.profile} toggle={()=>this.toggleProfileModal()}
               className={'modal-primary ' + this.props.className}>
          <ModalBody className="modalbody">
            <Row>
              <Col md="12">
                <div className="cover-photo-wrapper">
                  <img className="cover-photo-img" src="https://www.timelinecoverbanner.com/facebook-covers/winter234.jpg" alt="cover"></img>
                </div>
              </Col>
              <Col className="contact-info-wrapper" md="12">
                <div className="profile-photo-wrapper">
                  <img className="profile-photo-img" src="https://apit.edu.au/pakistan/wp-content/uploads/2018/07/man.jpg" alt="profile"></img>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <div className="name-info-wrapper">
                  <div className="content-name">{this.state.profileInfos.user.surname} {this.state.profileInfos.user.name}</div>
                  <div className="content-role">#{this.state.profileInfos.function}</div>
                  <div>
                    <i className="fa fa-phone"></i>
                    <i className="fa fa-envelope"></i>
                    <i className="fa fa-star"></i>
                  </div>
                </div>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={()=>this.toggleProfileModal()}>Просмотреть профиль</Button>
            <Button color="danger" data-id={this.state.profileInfos.id} onClick={(event)=>this.openModal(event,'delete')}>Удалить</Button>
            <Button color="secondary" onClick={()=>this.toggleProfileModal()}>Отменить</Button>
          </ModalFooter>
        </Modal>
      </Card>
    )
  }
}


let classes = {
  tableheader:{
    color:'black',
  },
}
export default SupervisorsTab;
