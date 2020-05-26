import React from 'react';
import axios from 'axios';
import { TablePagination } from 'react-pagination-table';
import EditIcon from '@material-ui/icons/Edit';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ReactModal from 'react-modal';
import { MDBCloseIcon } from 'mdbreact';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

class DynamicTable extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showModal: false,
            data: [],
            loading:true,
            updateForm:[]
          };
          this.handleOpenModal = this.handleOpenModal.bind(this);
          this.handleCloseModal = this.handleCloseModal.bind(this);
          this.getVal = this.getVal.bind(this);
          this.updateUser = this.updateUser.bind(this);
    }
    getVal(e){
        var table = document.getElementsByTagName("table")[0];
        e = e || window.event;
        var target = e.srcElement || e.target;
        while (target && target.nodeName !== "TR") {
        target = target.parentNode;
        }
        if (target) {
        var cells = target.getElementsByTagName("td");
        for (var i = 0; i < cells.length; i++) {
            this.state.updateForm.push(cells[i].innerHTML)
        }
        this.setState({ showModal: true });
    }

}
updateUser(){
    const UpdateUser = {
            support_group: this.support_group.value,
            day:this.day.value,
            support_engineer:this.support_engineer.value,
            support_engineer_phone:this.support_engineer_phone.value,
            support_engineer_email:this.support_engineer_email.value
    };
    console.log(UpdateUser);
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        }
      };
    axios.put(`http://localhost:8081/update_details/`+this.id.value,UpdateUser,axiosConfig)
      .then(res => {
        NotificationManager.success('', 'Updated Successfully!');
      })
    }
    handleOpenModal () {
        
        this.setState({ showModal: true });
      }
      
      handleCloseModal () {
        this.setState({ showModal: false });
        this.setState({updateForm:[]});
      }
    componentDidMount(){
        if(this.props.isReload)
        {
            window.location.reload(true);
            this.props.isReload = false;
        }
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
          };
    axios.get('http://localhost:8081/2020-05-21',axiosConfig)
    .then((response) => {
    let datafinal = response.data;
    this.setState({data:datafinal});
    this.setState({loading:false})
    });
    }
render(){
    const customStyles = {
        content : {
          left:'260px',
        }
      };
    const Header = ["id","support_group", "day", "support_engineer", "support_engineer_phone", "support_engineer_email","options"];
    const datafinal = this.state.data;
    datafinal.forEach((element,index) => {
            element["options"]=[<EditIcon onClick={()=>this.getVal(window.event)}/>,<AddCircleOutlineIcon onClick={this.props.handleOpenModal}/>]
    });
        if(this.state.loading) {
            return 'Loading...'
        }
    return(
        <div class="">
            <ReactModal
             isOpen={this.state.showModal}
             style={customStyles}>
            <MDBCloseIcon onClick={this.handleCloseModal}/>
            <div class="row">
            <div class="singleform">
            <h3> Shift Update Form </h3>
              <label for="name">Id</label>
              <input type="text"  name="id" value={this.state.updateForm[0]} ref={el => this.id=el}/>
              <label for="name">Support Group</label>
              <input type="text"  name="support_group" defaultValue={this.state.updateForm[1]} ref={el => this.support_group=el}/>
              <label for="email">Day</label>
              <input type="text" name="day" defaultValue={this.state.updateForm[2]} ref={el => this.day=el}/>
              <label for="name">Support Engineer</label>
              <input type="text"  name="support_engineer" defaultValue={this.state.updateForm[3]} ref={el => this.support_engineer=el}/>
              <label for="name">Phone</label>
              <input type="text"  name="support_engineer_phone" defaultValue={this.state.updateForm[4]} ref={el => this.support_engineer_phone=el}/>
              <label for="email">Email</label>
              <input type="text" name="support_engineer_email" defaultValue={this.state.updateForm[5]} ref={el => this.support_engineer_email=el}/>
            <button type="submit" class="submitt submitbtnbtn"onClick={this.updateUser}>Update</button>
            </div>
            </div>
          </ReactModal>
        <TablePagination
            headers={ Header }
            data={ datafinal }
            columns="id.support_group.day.support_engineer.support_engineer_phone.support_engineer_email.options"
            perPageItemCount={ 10 }
            totalCount={ datafinal.length }
            arrayOption={ [["size", 'all', ' ']] }
        />
        <NotificationContainer/>
        </div>
    );
}
}
export default DynamicTable;