import React from 'react';
import axios from 'axios';
import { TablePagination } from 'react-pagination-table';
import EditIcon from '@material-ui/icons/Edit';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ReactModal from 'react-modal';
import DeleteIcon from '@material-ui/icons/Delete';
import { MDBCloseIcon } from 'mdbreact';
import './node_modules/react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

class DynamicTableHost extends React.Component{
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
          if(i===4 || i===5)
          {
            var temp = cells[i].innerHTML.split(" ");
            this.state.updateForm.push(temp[0]);
            this.state.updateForm.push(temp[1].split(":")[0]+":"+temp[1].split(":")[1]);
          }
          else
          {
            this.state.updateForm.push(cells[i].innerHTML)
          }
            
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
        axios.delete("http://localhost:8081/delete_host/"+idval).then(
          this.reloadPage()
        );
    }
}
updateUser(){
  var dts =  this.start_datetime.value+"T"+this.start_time.value+":00.000+00:00";
  var dte = this.end_datetime.value+"T"+this.end_time.value+":00.000+00:00";
  console.log(dts);
    const UpdateUser = {
      hosts: this.hosts.value.replace(/\n/g,"").split(","),
      updated_date:new Date().getTime(),
      services:this.services.value.replace(/\n/g,"").split(","),
      start_datetime:Date.parse(dts),
      end_datetime: Date.parse(dte)
    };
    console.log(UpdateUser);
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        }
      };
    axios.put(`http://localhost:8081/update_host_details/`+this.id.value,UpdateUser,axiosConfig)
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
      var finalfromdt = converted.getFullYear()+"-"+("0" + (converted.getMonth() + 1)).slice(-2)+"-"+converted.getDate();
      var totemp = new Date(todt);
      var totemp1 = totemp.setDate(totemp.getDate()+1);
      var convertedTo = new Date(totemp1);
      var finaltodt = convertedTo.getFullYear()+"-"+("0" + (convertedTo.getMonth() + 1)).slice(-2)+"-"+convertedTo.getDate();
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
          axios.get(`http://localhost:8081/getHosts`,axiosConfig)
          .then((response) => {
          let datafinal = response.data;
          datafinal.forEach((element,index) => {
            element["hosts"]= element["hosts"]+"\n";
            element["services"] = element["services"]+"\n";
            element["start_datetime"] = element["start_datetime"].split("T")[0] +" "+element["start_datetime"].split("T")[1].split(":")[0]+":"+element["start_datetime"].split("T")[1].split(":")[1];
            element["end_datetime"] = element["end_datetime"].split("T")[0] +" "+element["end_datetime"].split("T")[1].split(":")[0]+":"+element["end_datetime"].split("T")[1].split(":")[1];
            element["updated_date"] = element["updated_date"].split("T")[0] +" "+element["updated_date"].split("T")[1].split(":")[0]+":"+element["updated_date"].split("T")[1].split(":")[1];
    });
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
    const Header = ["id","hosts", "last_updated_date", "services", "start_datetime", "end_datetime","options"];
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
            <h3> Host Update Form </h3>
              <label for="name">Id</label>
              <input type="text"  name="id" value={this.state.updateForm[0]} ref={el => this.id=el}/>
              <label for="name">Hosts Name</label>
              <textarea name="hosts" defaultValue={this.state.updateForm[1]} ref={el => this.hosts=el}/>
              <label for="email">Last Updated Date</label>
              <input type="text" class="formclass" name="updated_date" value={this.state.updateForm[2]}/>
              <label for="name">Services</label>
              <textarea type="text"  name="services" defaultValue={this.state.updateForm[3]} ref={el => this.services=el}/>
              <label for="name">Start Date</label>
              <input type="date"  name="start_datetime" class="formclass" defaultValue={this.state.updateForm[4]} ref={el => this.start_datetime=el}/>
              <input type="time" name="start_time" defaultValue={this.state.updateForm[5]} ref={el => this.start_time=el}/>
              <label for="email">End Date</label>
              <input type="date" class="formclass" name="end_datetime" defaultValue={this.state.updateForm[6]} ref={el => this.end_datetime=el}/>
              <input type="time" name="end_time" defaultValue={this.state.updateForm[7]} ref={el => this.end_time=el}/>
            <button type="submit" class="submitt submitbtnbtn"onClick={()=>{this.updateUser();this.reloadPage();}}>Update</button>
            </div>
            </div>
          </ReactModal>
        <div class="aligncenter">
        <TablePagination
            headers={ Header }
            data={ datafinal }
            title = "Hosts list"
            columns="id.hosts.updated_date.services.start_datetime.end_datetime.options"
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
export default DynamicTableHost;