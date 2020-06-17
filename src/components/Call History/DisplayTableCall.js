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

class DynamicTableCall extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showModal: false,
            data: [],
            loading:true,
            updateForm:[],
            finalData:[]
          };
          this.handleOpenModal = this.handleOpenModal.bind(this);
          this.handleCloseModal = this.handleCloseModal.bind(this);
          this.getVal = this.getVal.bind(this);
          this.updateUser = this.updateUser.bind(this);
          this.fetchData = this.fetchData.bind(this);
          this.wait = this.wait.bind(this);
          
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
        axios.delete("http://192.168.44.47:8081/delete_host/"+idval).then(
          this.reloadPage()
        );
    }
}
updateUser(){
  var dts =  this.start_datetime.value+"T"+this.start_time.value+":00.000+00:00";
  var dte = this.end_datetime.value+"T"+this.end_time.value+":00.000+00:00";
    const UpdateUser = {
      hosts: this.hosts.value.replace(/\n/g,"").split(","),
      updated_date:new Date().getTime(),
      services:this.services.value.replace(/\n/g,"").split(","),
      start_datetime:Date.parse(dts),
      end_datetime: Date.parse(dte)
    };
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        }
      };
    axios.put(`http://192.168.44.47:8081/update_host_details/`+this.id.value,UpdateUser,axiosConfig)
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
    wait(ms){
        var start = new Date().getTime();
        var end = start;
        while(end < start + ms) {
          end = new Date().getTime();
       }
     }
    fetchData(fromdt,todt,searchVal,searchterm){
      var finalfromdt = fromdt+"T"+"00:00:00.000+UTC";
      var finaltodt = todt+"T"+"00:00:00.000+UTC";
      // var app,engineer,team,priority;
      // if(searchVal==="app")
      // {
      // if(searchterm===undefined || searchterm === "" || searchterm===null)
      // {
      //   app = "-";
      // }
      // else
      // {
      //   app = searchterm;
      // }
      // }
      // if(searchVal==="engineer")
      // {
      //   if(searchterm===undefined || searchterm === "" || searchterm===null)
      // {
      //   engineer = "-";
      // }
      // else
      // {
      //   engineer = searchterm;
      // }
      // }
      // if(searchVal==="team")
      // {
      //   if(searchterm===undefined || searchterm === "" || searchterm===null)
      // {
      //   team = "-";
      // }
      // else
      // {
      //   team = searchterm;
      // }
      // }
      // if(searchVal==="priority")
      // {
      //   if(searchterm===undefined || searchterm === "" || searchterm===null)
      //   {
      //     priority = "-";
      //   }
      //   else
      //   {
      //   priority = searchterm;
      //   }
      // }
      var reqURL = `http://192.168.44.47:8081/searchByApp/-/-/-/-/${finalfromdt}/${finaltodt}`;
      var finalofinal = reqURL.replace(/%20/g, " ");
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
          var resultProductDatafinal;
            axios.get(decodeURI(finalofinal),axiosConfig)
            .then((response) => {
            let datafinal = response.data;
            this.setState({data:datafinal});
            this.setState({loading:false});
             resultProductDatafinal = this.state.data.filter(b=>{
              var status = b.call_status;
              return(status=="no-answer" || status=="failed" || status=="busy" || status=="completed");
            })
            resultProductDatafinal.forEach((element,index) => {
              element["host"]= element["host"]+"\n";
              element["services"] = element["services"]+"\n";
              if(element["updated_date"].includes("T"))
              {
                element["updated_date"] = element["updated_date"].split("T")[0] +" "+element["updated_date"].split("T")[1].split(":")[0]+":"+element["updated_date"].split("T")[1].split(":")[1];
              }
      });
      this.setState({finalData:resultProductDatafinal});
      if(searchterm && searchterm!=undefined && searchterm !=null && searchterm !="")
          {
          var searchstr = searchterm.toString().toLowerCase();
          var resultProductDataUpdated = resultProductDatafinal.filter(a => {
          var searchvalue;
          if(searchVal ==="priority")
          {
            searchvalue = a.priority;
          }
          else if(searchVal === "app")
          {
            searchvalue = a.app;
          }
          else if(searchVal ==="engineer")
          {
            searchvalue = a.engineer;
          }
          else if(searchVal==="team")
          {
            searchvalue = a.team;
          }
          
          return (searchvalue.toLowerCase().includes(searchstr));
          });
            this.setState({finalData:resultProductDataUpdated});
          }
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
        var call = true;
        let DT = new Date();
        this.fetchData(new Date().toISOString().split('T')[0],new Date(DT.setDate(DT.getDate()+1)).toISOString().split('T')[0],"","");
        if(call)
        {
          this.apiCall = setInterval(() => {   
            window.location.reload();
          }, [50000]);
        }
        

    }

    componentDidUpdate(prevProps,prevState){
      const prev = prevProps.fromDT;
      const updated = this.props.fromDT;
      const prev1 = prevProps.toDT;
      const updated1 = this.props.toDT;
      const prev2 = prevProps.searchVal;
      const updated2 = this.props.searchVal;
      const prev3 = prevProps.searchterm;
      const updated3 = this.props.searchterm;
      if(prev!== updated || prev1 !== updated1 || prev2 !== updated2 || prev3 !== updated3)
      {
      this.fetchData(updated,updated1,updated2,updated3);
      }
    }
render(){
  if(document.getElementById("time"))  
      {
        document.getElementById("time").textContent = "" + new Date();
      }
    const customStyles = {
        content : {
          left:'260px',
        }
      };
    const Header = ["id", "Team", "Priority", "Engineer", "Phone_number","Updated_date","Call_status","Call attempts","App","Host","Services"];
    const datafinal = this.state.finalData;
        if(this.state.loading) {
            return 'Loading...'
        }
    return(
        <div class="">
               <div class="rightAlign"> <label> Last Refreshed time:</label><div id="time"> - </div></div>
            <ReactModal
             isOpen={this.state.showModal}
             style={customStyles}>
            <MDBCloseIcon onClick={this.handleCloseModal}/>
            <div class="row">
            <div class="singleform">
            <h3> Host Update Form </h3>
              <label for="name">Id</label>
              <input type="text" class="formclass" name="id" value={this.state.updateForm[0]} ref={el => this.id=el}/>
              <label for="name">Hosts Name</label>
              <textarea name="hosts" class="formclass" defaultValue={this.state.updateForm[1]} ref={el => this.hosts=el}/>
              <label for="email">Last Updated Date</label>
              <input type="text" class="formclass" name="updated_date" value={this.state.updateForm[2]}/>
              <label for="name">Services</label>
              <textarea type="text"  name="services" defaultValue={this.state.updateForm[3]} ref={el => this.services=el}/>
              <label for="name">Start Date</label>
              <input type="date"  name="start_datetime" className="formclass" defaultValue={this.state.updateForm[4]} ref={el => this.start_datetime=el}/>
              <input type="time" name="start_time" defaultValue={this.state.updateForm[5]} ref={el => this.start_time=el}/>
              <label for="email">End Date</label>
              <input type="date" class="formclass" name="end_datetime" defaultValue={this.state.updateForm[6]} ref={el => this.end_datetime=el}/>
              <input type="time" name="end_time" defaultValue={this.state.updateForm[7]} ref={el => this.end_time=el}/>
            <button type="submit" class="submitt submitbtnbtn"onClick={()=>{this.updateUser();this.reloadPage();}}>Update</button>
            </div>
            </div>
          </ReactModal>
        <div class="aligncenter">
        <h3>Call History</h3>
        <TablePagination
            headers={ Header }
            data={ datafinal }
            columns="id.team.priority.engineer.phone_number.updated_date.call_status.call_attempts.app.host.services"
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
export default DynamicTableCall;