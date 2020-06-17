import React from 'react';
import axios from 'axios';
import { TablePagination } from 'react-pagination-table';
import EditIcon from '@material-ui/icons/Edit';
import ReactModal from 'react-modal';
import DeleteIcon from '@material-ui/icons/Delete';
import { MDBCloseIcon } from 'mdbreact';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import '../../css/style.css';

class DynamicTablePermanentHost extends React.Component{
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
          // if(i===4 || i===5)
          // {
          //   var temp = cells[i].innerHTML.split(" ");
          //   this.state.updateForm.push(temp[0]);
          //   this.state.updateForm.push(temp[1].split(":")[0]+":"+temp[1].split(":")[1]);
          // }
          // else
          // {
            this.state.updateForm.push(cells[i].innerHTML)
          //}
            
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
        axios.delete("http://192.168.44.47:8081/delete_permanent_host/"+idval).then(
          this.reloadPage()
        );
    }
}
updateUser(){
    const UpdateUser = {
      host: this.host.value,
      updated_date:new Date().getTime(),
      services:this.services.value.replace(/\n/g,"").split(","),
      time:this.time.value.replace(/\n/g,"").split(",")
    };
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        }
      };
    axios.put(`http://192.168.44.47:8081/update_permanent_host_details/`+this.id.value,UpdateUser,axiosConfig)
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
          axios.get(`http://192.168.44.47:8081/getPermanentHosts`,axiosConfig)
          .then((response) => {
          let datafinal = response.data;
          datafinal.forEach((element,index) => {
            element["services"] = element["services"]+"\n";
            element["time"] = element["time"]+"\n";
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
    const Header = ["id","Host", "Last updated date", "Services", "Time","Options"];
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
            <h3> Permanent Host Update Form </h3>
              <label for="name">Id</label>
              <input type="text"  className="formclass" name="id" value={this.state.updateForm[0]} ref={el => this.id=el}/>
              <label for="name">Hosts Name</label>
              <input type="text" className="formclass" name="host" defaultValue={this.state.updateForm[1]} ref={el => this.host=el}/>
              <label for="email">Last Updated Date</label>
              <input type="text" class="formclass" name="updated_date" value={this.state.updateForm[2]}/>
              <label for="name">Services (Ex: service1,service2)</label>
              <textarea type="text"  name="services" defaultValue={this.state.updateForm[3]} ref={el => this.services=el}/>
              <label for="name">Time (Ex: 00:00-23:00,00:00-22:00)</label>
              <textarea type="text"  name="time" class="formclass" defaultValue={this.state.updateForm[4]} ref={el => this.time=el}/>
            <button type="submit" class="submitt submitbtnbtn" onClick={()=>{this.updateUser();this.reloadPage();}}>Update</button>
            </div>
            </div>
          </ReactModal>
        <div class="aligncenter">
        <TablePagination
            headers={ Header }
            data={ datafinal }
            title = "Hosts list"
            columns="id.host.updated_date.services.time.options"
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
export default DynamicTablePermanentHost;