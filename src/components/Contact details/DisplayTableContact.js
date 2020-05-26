import React from 'react';
import axios from 'axios';
import { TablePagination } from 'react-pagination-table';
import EditIcon from '@material-ui/icons/Edit';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ReactModal from 'react-modal';
import { MDBCloseIcon } from 'mdbreact';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

class DynamicTableContact extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showModal: false,
            data: [],
            loading:true,
            updateForm:[],
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
            team_name: this.team_name.value,
            email_id:this.email_id.value,
            on_call_support_group:this.on_call_support_group.value,
            primary_number:this.primary_number.value,
            secondary_number:this.secondary_number.value,
            only_support:this.only_support.value
    };
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        }
      };
    axios.put(`http://localhost:8081/update_contact_details/`+this.id.value,UpdateUser,axiosConfig)
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
      reloadPage(){
        window.location.reload();
      }
    fetchData(){
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
          axios.get(`http://localhost:8081/getTeam`,axiosConfig)
          .then((response) => {
          let datafinal = response.data;
          this.setState({data:datafinal});
          this.setState({loading:false})
          });
  
    // axios.get('http://localhost:8081/2020-05-21',axiosConfig)
    // .then((response) => {
    // let datafinal = response.data;
    // this.setState({data:datafinal});
    // this.setState({loading:false})
    // });
    }
    dateConverter(date){
      var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
    }
    componentDidMount(){
        // let date = new Date();
        // date.setDate(date.getDate() + 7);
        // let finalDate2 = this.dateConverter(date);
        // let finalDate1 = this.dateConverter(new Date);
        this.fetchData();
    }
    // componentDidUpdate(prevProps,prevState){
    //   const prev = prevProps.fromDT;
    //   const updated = this.props.fromDT;
    //   const prev1 = prevProps.toDT;
    //   const updated1 = this.props.toDT;
    //   if(prev!== updated || prev1!== updated1)
    //   {
    //   this.fetchData(this.props.fromDT,this.props.toDT);
    //   }
    // }
render(){
    const customStyles = {
        content : {
          left:'260px',
        }
      };
    const Header = ["id","team_name", "email_id", "on_call_support_group", "primary_number", "secondary_number","only_support","options"];
    const datafinal = this.state.data;
    datafinal.forEach((element,index) => {
            element["options"]=[<EditIcon onClick={()=>this.getVal(window.event)}/>]
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
            <h3> Contact Update Form </h3>
              <label for="name">Id</label>
              <input type="text"  name="id" value={this.state.updateForm[0]} ref={el => this.id=el}/>
              <label for="name">Team Name</label>
              <input type="text"  name="team_name" defaultValue={this.state.updateForm[1]} ref={el => this.team_name=el}/>
              <label for="email">Email Id</label>
              <input type="text" name="email_id" defaultValue={this.state.updateForm[2]} ref={el => this.email_id=el}/>
              <label for="name">On Call Support Group</label>
              <input type="text"  name="on_call_support_group" defaultValue={this.state.updateForm[3]} ref={el => this.on_call_support_group=el}/>
              <label for="name">Primary Number</label>
              <input type="text"  name="primary_number" defaultValue={this.state.updateForm[4]} ref={el => this.primary_number=el}/>
              <label for="email">Secondary Number</label>
              <input type="text" name="secondary_number" defaultValue={this.state.updateForm[5]} ref={el => this.secondary_number=el}/>
              <label for="email">Only Support</label>
              <input type="text" name="only_support" defaultValue={this.state.updateForm[6]} ref={el => this.only_support=el}/>
            <button type="submit" class="submitt submitbtnbtn"onClick={()=>{this.updateUser();this.reloadPage();}}>Update</button>
            </div>
            </div>
          </ReactModal>
        <TablePagination
            headers={ Header }
            data={ datafinal }
            columns="id.team_name.email_id.on_call_support_group.primary_number.secondary_number.only_support.options"
            arrayOption={ [["size", 'all', ' ']] }
        />
        <NotificationContainer/>
        </div>
    );
}
}
export default DynamicTableContact;