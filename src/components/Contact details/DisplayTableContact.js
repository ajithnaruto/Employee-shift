import React from 'react';
import axios from 'axios';
import { TablePagination } from 'react-pagination-table';
import EditIcon from '@material-ui/icons/Edit';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ReactModal from 'react-modal';
import { MDBCloseIcon } from 'mdbreact';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';

class DynamicTableContact extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showModal: false,
            data: [],
            dataTemp:[],
            loading:true,
            updateForm:[],
            only_support: false,
            emails:[]
          };
          this.handleOpenModal = this.handleOpenModal.bind(this);
          this.handleCloseModal = this.handleCloseModal.bind(this);
          this.getVal = this.getVal.bind(this);
          this.updateUser = this.updateUser.bind(this);
          this.ApplyFilter = this.ApplyFilter.bind(this);
          this.fetchData = this.fetchData.bind(this);
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
getId(e){
  var table = document.getElementsByTagName("table")[0];
        e = e || window.event;
        var target = e.srcElement || e.target;
        while (target && target.nodeName !== "TR") {
        target = target.parentNode;
        }
        if (target) {
        var cells = target.getElementsByTagName("td");
        var idval = cells[0].innerHTML;
        axios.delete("http://localhost:8081/delete_contact/"+idval).then(
          this.reloadPage()
        );
    }
}

updateUser(){
    const UpdateUser = {
            team_name: this.team_name.value,
            email_id:this.email_id.value,
            on_call_support_group:this.on_call_support_group.value,
            primary_number:this.primary_number.value,
            primary_support_engineer:this.primary_support_engineer.value,
            secondary_number:this.secondary_number.value,
            secondary_support_engineer:this.secondary_support_engineer.value,
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
            var old = JSON.stringify(datafinal).replace(/true/g, '"true"').replace(/false/g,'"false"');
            var newArray = JSON.parse(old);
            this.setState({data:newArray});
            this.setState({loading:false});
            var dataJson = this.ApplyFilter();
            this.setState({dataTemp:dataJson});
          });
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

        this.fetchData();
    }
    ApplyFilter(){
      let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        }
      };
      var tdyDate = new Date().toISOString().slice(0,10);
      axios.get(`http://localhost:8081/${tdyDate}`,axiosConfig)
      .then((response) => {
       var res =  response.data;
       this.setState({emails:res});
      });
      var e = document.getElementById("only_support");
      var strUser = e.options[e.selectedIndex].value;
      if(strUser==="true")
      {
        this.setState({only_support:this.strUser});
        var datatemp = this.state.data;
        datatemp.forEach((element,index) => {
          delete element["options"];
        });
        var filtered = datatemp.filter(a=>a.only_support===strUser);
        var JsonObj = this.state.emails;
        for (var key in JsonObj) {
          let supportGroup = JsonObj[key].on_call_support_group;
          filtered.forEach((element,index) => {
            if(supportGroup === element["on_call_support_group"])
            {
              element["phone_number"]= JsonObj[key].support_engineer_phone;
              element["support_engineer"]= JsonObj[key].support_engineer;
              element["support_email"] = JsonObj[key].email_id;
            }
    });
      }
        return filtered;
      }
      else
      {
        this.setState({only_support:this.strUser});
        var datatemp = this.state.data;
        var filtered = datatemp.filter(a=>a.only_support===strUser);
        return filtered;
      }
  }
render(){
    const customStyles = {
        content : {
          left:'260px',
        }
      };
    const datafinal = this.state.dataTemp;
    datafinal.forEach((element,index) => {
            element["options"]=[<Tooltip title="Edit"><IconButton aria-label="edit">
            <EditIcon onClick={()=>this.getVal(window.event)}/>
            </IconButton>
          </Tooltip>,
          ]
    });
        if(this.state.loading) {
            return 'Loading...'
        }
        let tabledisplay;
        var e = document.getElementById("only_support");
        if(e==null)
        {
          var strUser = "false";
        }
        else
        {
          var strUser = e.options[e.selectedIndex].value;

        }
        if(strUser==="true")
        {
          const title ="**To edit support_engineer,phone_number and support_engineer_email_id please use VTR Shift Roster tab"
          const Header = ["id","Team name","Resolver team email id","On call support group","Support engineer","Phone number","Only vtr support"];
          tabledisplay= <TablePagination
          subTitle = {title}
          headers={ Header }
          data={ datafinal }
          columns="id.team_name.email_id.on_call_support_group.support_engineer.phone_number.only_support"
          arrayOption={ [["size", 'all', ' ']] }/>
        }
        else
        {
          const Header = ["id","Team name", "Email id", "On call support group","Primary Support Engineer", "Primary number", "Secondary Support Engineer","Secondary number","Only vtr support","Options"];
          tabledisplay =  <TablePagination
          headers={ Header }
          data={ datafinal }
          columns="id.team_name.email_id.on_call_support_group.primary_support_engineer.primary_number.secondary_support_engineer.secondary_number.only_support.options"
          arrayOption={ [["size", 'all', ' ']] }
      />
        }
    return(
      <div>
      <div>
        <h3 class="aligncenter">VTR Contact Details</h3>
        <div class="rightAlign">
            <label>Only VTR Support?</label>
            <select name="only_support" id="only_support" onChange={this.fetchData}>
                <option value="true">True</option>
                <option  value="false" selected>False</option>
            </select>
        </div>
        <br/>
        <div class="">
            <ReactModal
             isOpen={this.state.showModal}
             style={customStyles}>
            <MDBCloseIcon onClick={this.handleCloseModal}/>
            <div class="row">
            <div class="singleform">
            <h3> Contact Update Form </h3>
              <label for="name">Id</label>
              <input type="text" className="formclass" name="id" value={this.state.updateForm[0]} ref={el => this.id=el}/>
              <label for="name">Team Name</label>
              <input type="text" className="formclass" name="team_name" defaultValue={this.state.updateForm[1]} ref={el => this.team_name=el}/>
              <label for="email">Email Id</label>
              <input type="text"className="formclass" name="email_id" defaultValue={this.state.updateForm[2]} ref={el => this.email_id=el}/>
              <label for="name">On Call Support Group</label>
              <input type="text" className="formclass" name="on_call_support_group" defaultValue={this.state.updateForm[3]} ref={el => this.on_call_support_group=el}/>
              <label for="name">Primary Support Engineer</label>
              <input type="text" className="formclass" name="primary_support_engineer" placeholder="Enter Primary support engineer name" defaultValue={this.state.updateForm[4]} ref={el => this.primary_support_engineer=el}/>
              <label for="name">Primary Number</label>
              <input type="text" className="formclass" name="primary_number" defaultValue={this.state.updateForm[5]} ref={el => this.primary_number=el}/>
              <label for="name">Secondary Support Engineer</label>
              <input type="text" className="formclass" name="secondary_support_engineer" placeholder="Enter Secondary support engineer name" defaultValue={this.state.updateForm[6]} ref={el => this.secondary_support_engineer=el}/>
              <label for="email">Secondary Number</label>
              <input type="text" className="formclass" name="secondary_number" defaultValue={this.state.updateForm[7]} ref={el => this.secondary_number=el}/>
              <label for="email">Only Support</label>
              <input type="text" className="formclass" name="only_support" defaultValue={this.state.updateForm[8]} ref={el => this.only_support=el}/>
            <button type="submit" class="submitt submitbtnbtn"onClick={()=>{this.updateUser();this.reloadPage();}}>Update</button>
            </div>
            </div>
          </ReactModal>
          <div className="responsiveTable">
       {tabledisplay}
        </div>
        <NotificationContainer/>
        </div>
        </div>
        </div>
    );
}
}
export default DynamicTableContact;