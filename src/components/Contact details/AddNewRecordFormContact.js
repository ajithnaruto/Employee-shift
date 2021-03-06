import React from 'react';
import ReactModal from 'react-modal';
import axios from 'axios';
import '../../css/style.css';
import { MDBCloseIcon } from 'mdbreact';
import  DisplayTableContact from '../Contact details/DisplayTableContact';

class AddNewRecordFormContact extends React.Component {
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
    reloadPage(){
      window.location.reload();
    }
    showValue(){
        const user = [{
          team_name: this.team_name.value,
          email_id:this.email_id.value,
          on_call_support_group:this.on_call_support_group.value,
          primary_number:this.primary_number.value,
          primary_support_engineer:this.primary_support_engineer,
          secondary_number:this.secondary_number.value,
          secondary_support_engineer:this.secondary_support_engineer,
          only_support:this.only_support.value
        }];
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
          };
          
        axios.post(`http://192.168.44.47:8081/createContact`,user,axiosConfig)
          .then(res => {

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
        <div class="rightAlign"><input type="submit" value="Insert New record" class="submitt submitbtn" onClick={this.handleOpenModal}/></div>
          <ReactModal 
             isOpen={this.state.showModal}
             style={customStyles}>
            <MDBCloseIcon onClick={this.handleCloseModal}/>
            <div class="row">
            <div class="singleform">
            <h3> Add New Contact </h3>
              <label for="name">Team Name</label>
              <input type="text"  className="formclass" name="team_name" placeholder="Enter Team Name" ref={el => this.team_name=el}/>
              <label for="email">Email Id</label>
              <input type="text"  className="formclass" name="email_id" placeholder="Enter Email Id" ref={el => this.email_id=el}/>
              <label for="name">On Call Support Group</label>
              <input type="text"  className="formclass" name="on_call_support_group" placeholder="Enter Support group" ref={el => this.on_call_support_group=el}/>
              <label for="name">Primary Number</label>
              <input type="text"  className="formclass" name="primary_number" placeholder="Enter Primary contact" ref={el => this.primary_number=el}/>
              <label for="name">Primary Support Engineer</label>
              <input type="text" className="formclass" name="primary_support_engineer" placeholder="Enter Primary support engineer name" ref={el => this.primary_support_engineer=el}/>
              <label for="email">Secondary Number</label>
              <input type="text" className="formclass" name="secondary_number" placeholder="Enter Secondary contact" ref={el => this.secondary_number=el}/>
              <label for="name">Secondary Support Engineer</label>
              <input type="text" className="formclass" name="secondary_support_engineer" placeholder="Enter Secondary support engineer name" ref={el => this.secondary_support_engineer=el}/>
              <label for="email">Only Support</label>
              <input type="text" className="formclass" name="only_support" placeholder="only support? True/False" ref={el => this.only_support=el}/>
            <button type="submit" class="submitt submitbtnbtn" onClick={()=>{this.showValue();this.reloadPage();}}>Submit</button>
            </div>
            </div>
          </ReactModal>
        </div>
        <DisplayTableContact handleOpenModal={this.handleOpenModal}/>
     </div>
      );
    }
  }
export default AddNewRecordFormContact;

