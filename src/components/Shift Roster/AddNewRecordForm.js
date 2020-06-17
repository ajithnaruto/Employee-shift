import React from 'react';
import ReactModal from 'react-modal';
import axios from 'axios';
import '../../css/style.css';
import { MDBCloseIcon } from 'mdbreact';

class AddNewRecordForm extends React.Component {
    constructor () {
      super();
      this.state = {
        showModal: false
      };
      this.handleOpenModal = this.handleOpenModal.bind(this);
      this.handleCloseModal = this.handleCloseModal.bind(this);
      this.showValue = this.showValue.bind(this);
      this.reloadPage = this.reloadPage.bind(this);
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
                on_call_support_group: this.on_call_support_group.value,
                day:this.day.value,
                support_engineer:this.support_engineer.value,
                support_engineer_phone:this.support_engineer_phone.value,
        }];
        console.log(user);
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
          };
          
        axios.post(`http://192.168.44.47:8081/create`,user,axiosConfig)
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
        {/* <DisplayTable handleOpenModal={this.handleOpenModal}/> */}
        <div class="rightAlign"><input type="submit" value="Insert New record" class="submitt submitbtn" onClick={this.handleOpenModal}/></div>
          <ReactModal 
             isOpen={this.state.showModal}
             style={customStyles}>
            <MDBCloseIcon onClick={this.handleCloseModal}/>
            <div class="row">
            <div class="singleform">
            <h3> Shift Form </h3>
              <label for="name">Support Group</label>
              <input type="text"  className="formclass" name="on_call_support_group" placeholder="Enter Support Group" ref={el => this.on_call_support_group=el}/>
              <label for="email">Day</label>
              <input type="date" name="day" class="formclass" placeholder="Choose date" ref={el => this.day=el}/>
              <label for="name">Support Engineer</label>
              <input type="text" className="formclass" name="support_engineer" placeholder="Enter Support Engineer name" ref={el => this.support_engineer=el}/>
              <label for="name">Phone</label>
              <input type="text"  className="formclass" name="support_engineer_phone" placeholder="Enter Support Engineer phone" ref={el => this.support_engineer_phone=el}/>
              <button type="submit" class="submitt submitbtnbtn" onClick={()=>{this.showValue();this.handleCloseModal();this.reloadPage();}}>Submit</button>
            </div>
            </div>
          </ReactModal>
        </div>
     </div>
      );
    }
  }
export default AddNewRecordForm;