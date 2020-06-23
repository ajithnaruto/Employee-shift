import React from 'react';
import axios from 'axios';
import { TablePagination } from 'react-pagination-table';
import EditIcon from '@material-ui/icons/Edit';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ReactModal from 'react-modal';
import DeleteIcon from '@material-ui/icons/Delete';
import { MDBCloseIcon } from 'mdbreact';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

class DynamicTable extends React.Component{
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
        axios.delete("http://localhost:8081/delete/"+idval).then(
          this.reloadPage()
        );
    }
}
updateUser(){
    const UpdateUser = {
            on_call_support_group: this.on_call_support_group.value,
            day:this.day.value,
            support_engineer:this.support_engineer.value,
            support_engineer_phone:this.support_engineer_phone.value,
    };
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
    fetchData(fromdt,todt){
      var fromtemp = new Date(fromdt);
      var fromtemp1 = fromtemp.setDate(fromtemp.getDate()-1);
      var converted = new Date(fromtemp1);
      var finalfromdt = converted.getFullYear()+"-"+("0" + (converted.getMonth() + 1)).slice(-2)+"-"+('0' + converted.getDate()).slice(-2);
      var totemp = new Date(todt);
      var totemp1 = totemp.setDate(totemp.getDate()+1);
      var convertedTo = new Date(totemp1);
      var finaltodt = convertedTo.getFullYear()+"-"+("0" + (convertedTo.getMonth() + 1)).slice(-2)+"-"+('0' + convertedTo.getDate()).slice(-2);
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
          axios.get(`http://localhost:8081/${finalfromdt}/${finaltodt}`,axiosConfig)
          .then((response) => {
          let datafinal = response.data;
          this.setState({data:datafinal});
          this.setState({loading:false})
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
    reloadPage(){
      window.location.reload();
    }
    componentDidMount(){
        let date = new Date();
        date.setDate(date.getDate() + 7);
        let finalDate2 = this.dateConverter(date);
        let finalDate1 = this.dateConverter(new Date);
        this.fetchData(finalDate1,finalDate2);
    }
    componentDidUpdate(prevProps,prevState){
      const prev = prevProps.fromDT;
      const updated = this.props.fromDT;
      const prev1 = prevProps.toDT;
      const updated1 = this.props.toDT;
      if(prev!== updated || prev1!== updated1)
      {
      this.fetchData(this.props.fromDT,this.props.toDT);
      }
    }
render(){
    const customStyles = {
        content : {
          left:'260px',
        }
      };
    const Header = ["id","on_call_support_group", "day", "support_engineer", "support_engineer_phone","options"];
    const datafinal = this.state.data;
    datafinal.forEach((element,index) => {
            element["options"]=[<Tooltip title="Edit">
            <IconButton aria-label="edit">
            <EditIcon onClick={()=>this.getVal(window.event)}/>
            </IconButton>
          </Tooltip>,<Tooltip title="Delete">
            <IconButton aria-label="delete">
            <DeleteIcon onClick={()=>this.getId(window.event)}/>
            </IconButton>
          </Tooltip>]
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
              <input type="text" className="formclass"  name="id" value={this.state.updateForm[0]} ref={el => this.id=el}/>
              <label for="name">Support Group</label>
              <select className="dropdown" defaultValue={this.state.updateForm[1]} ref={el => this.on_call_support_group=el}>
  <option value="Infra/Middleware/Wintel">Infra/Middleware/Wintel</option>
  <option value="DBA">DBA</option>
  <option value="Continuidad Operacional">Continuidad Operacional</option>
  <option value="GSA">GSA</option>
</select>
              <label for="email">Day</label>
              <input type="date" class="formclass" name="day" defaultValue={this.state.updateForm[2]} ref={el => this.day=el}/>
              <label for="name">Support Engineer</label>
              <input type="text" className="formclass" name="support_engineer" defaultValue={this.state.updateForm[3]} ref={el => this.support_engineer=el}/>
              <label for="name">Phone</label>
              <input type="text"  className="formclass" name="support_engineer_phone" defaultValue={this.state.updateForm[4]} ref={el => this.support_engineer_phone=el}/>
            <button type="submit" class="submitt submitbtnbtn"onClick={()=>{this.updateUser();this.reloadPage()}}>Update</button>
            </div>
            </div>
          </ReactModal>
        <div class="aligncenter">
        <TablePagination
            headers={ Header }
            data={ datafinal }
            columns="id.on_call_support_group.day.support_engineer.support_engineer_phone.options"
            perPageItemCount={ 8 }
            totalCount={ datafinal.length }
            arrayOption={ [["size", 'all', ' ']] }
        />
        </div>
        <NotificationContainer/>
        </div>
    );
}
}
export default DynamicTable;