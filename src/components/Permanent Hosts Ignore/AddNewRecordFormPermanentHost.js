import React from 'react';
import ReactModal from 'react-modal';
import axios from 'axios';
import '../../css/style.css';
import { MDBCloseIcon } from 'mdbreact';

class AddNewRecordFormPermanentHost extends React.Component {
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
                host: this.host.value,
                updated_date:new Date().getTime(),
                services:this.services.value.split(","),
                time:this.time.value.split(",")
        }];
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
          };
          
        axios.post(`http://localhost:8081/createPermanentHost`,user,axiosConfig)
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
        {/* <DisplayTablePermanentHost handleOpenModal={this.handleOpenModal}/> */}
        <div class="rightAlign"><input type="submit" value="Insert New record" class="submitt submitbtn" onClick={this.handleOpenModal}/></div>
          <ReactModal 
             isOpen={this.state.showModal}
             style={customStyles}>
            <MDBCloseIcon onClick={this.handleCloseModal}/>
            <div class="row">
            <div class="singleform">
            <h3>Parmanent Hosts Form </h3>
              <label for="name">Hosts Name</label>
              <input type="text" className="formclass" name="hosts" placeholder="Enter host" ref={el => this.host=el}/>
              <label for="name">Services (Ex: service1,service2)</label>
              <textarea type="text"  name="services" placeholder="Enter Services" ref={el => this.services=el}/>
              <label for="name">Time (Ex: 00:00-23:00,00:00-22:00)</label>
              <textarea type="text"  name="time" class="formclass" placeholder="Enter time comma separated" ref={el => this.time=el}/>
              <button type="submit" class="submitt submitbtnbtn" onClick={()=>{this.showValue();this.handleCloseModal();this.reloadPage();}}>Submit</button>
            </div>
            </div>
          </ReactModal>
        </div>
     </div>
      );
    }
  }
export default AddNewRecordFormPermanentHost;