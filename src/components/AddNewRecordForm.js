import React from 'react';
import ReactModal from 'react-modal';
import axios from 'axios';
import '../css/style.css';
import { MDBCloseIcon } from 'mdbreact';
import  DisplayTable from './DisplayTable';

class AddNewRecordForm extends React.Component {
    constructor () {
      super();
      this.state = {
        showModal: false
      };
      this.handleOpenModal = this.handleOpenModal.bind(this);
      this.handleCloseModal = this.handleCloseModal.bind(this);
      this.showValue = this.showValue.bind(this);
    }
    
    handleOpenModal () {
      this.setState({ showModal: true });
    }
    
    handleCloseModal () {
      this.setState({ showModal: false });
    }
    showValue(){
        const user = [{
                support_group: this.support_group.value,
                day:this.day.value,
                support_engineer:this.support_engineer.value,
                support_engineer_phone:this.support_engineer_phone.value,
                support_engineer_email:this.support_engineer_email.value
        }];
        console.log(user);
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
          };
          
        axios.post(`http://localhost:8081/create`,user,axiosConfig)
          .then(res => {
            console.log(res);
            console.log(res.data);
          })
        }
    render () {
        const customStyles = {
            content : {
              left:'260px',
            }
          };
      return (
          <div>
        <div>
        <DisplayTable handleOpenModal={this.handleOpenModal}/>
          <ReactModal 
             isOpen={this.state.showModal}
             style={customStyles}>
            <MDBCloseIcon onClick={this.handleCloseModal}/>
            <div class="row">
            <div class="singleform">
            <h3> Shift Form </h3>
              <label for="name">Support Group</label>
              <input type="text"  name="support_group" ref={el => this.support_group=el}/>
              <label for="email">Day</label>
              <input type="text" name="day" ref={el => this.day=el}/>
              <label for="name">Support Engineer</label>
              <input type="text"  name="support_engineer" ref={el => this.support_engineer=el}/>
              <label for="name">Phone</label>
              <input type="text"  name="support_engineer_phone" ref={el => this.support_engineer_phone=el}/>
              <label for="email">Email</label>
              <input type="text" name="support_engineer_email" ref={el => this.support_engineer_email=el}/>
            <button type="submit" class="submitt submitbtnbtn" onClick={this.showValue}>Submit</button>
            </div>
            </div>
          </ReactModal>
        </div>
     </div>
      );
    }
  }
export default AddNewRecordForm;

