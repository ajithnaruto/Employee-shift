import React from 'react';
import ReactModal from 'react-modal';
import axios from 'axios';
import '../../css/style.css';
import { MDBCloseIcon } from 'mdbreact';

class AddNewRecordFormCall extends React.Component {
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
                hosts: this.hosts.value.split(","),
                updated_date:new Date().getTime(),
                services:this.services.value.split(","),
                start_datetime:this.start_datetime.value+"T"+this.start_time.value+":00.000+00:00",
                end_datetime:this.end_datetime.value+"T"+this.end_time.value+":00.000+00:00"
        }];
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
          };
          
        axios.post(`http://192.168.44.47:8081/createHost`,user,axiosConfig)
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
            <h3> Hosts Form </h3>
              <label for="name">Hosts Name</label>
              <textarea type="text" className="formclass" name="hosts" placeholder="Enter host" ref={el => this.hosts=el}/>
              <label for="name">Services</label>
              <textarea type="text"  className="formclass" name="services" placeholder="Enter Support Engineer name" ref={el => this.services=el}/>
              <label for="name">Start datetime</label>
              <input type="date"  name="start_datetime" class="formclass" placeholder="Enter Support Engineer phone" ref={el => this.start_datetime=el}/>
              <input type="time" name="start_time" ref={el => this.start_time=el}/>
              <label for="email">End datetime</label>
              <input type="date" name="end_datetime" class="formclass" placeholder="Enter Support Engineer email" ref={el => this.end_datetime=el}/>
              <input type="time" name="end_time"  ref={el => this.end_time=el}/>
              <button type="submit" class="submitt submitbtnbtn" onClick={()=>{this.showValue();this.handleCloseModal();this.reloadPage();}}>Submit</button>
            </div>
            </div>
          </ReactModal>
        </div>
     </div>
      );
    }
  }
export default AddNewRecordFormCall;