import React from 'react';
import papa from 'papaparse';
import axios from 'axios';
import {CSVLink} from 'react-csv';
import Filter from './Filter';
import 'react-notifications/lib/notifications.css'
import {NotificationManager,NotificationContainer} from 'react-notifications';

class ShiftDetails extends React.Component {
   constructor(props) {
      super(props);
      this.onFileUpload = this.onFileUpload.bind(this);
      this.onFileChange = this.onFileChange.bind(this);
      this.updateData = this.updateData.bind(this);
      this.reloadPage = this.reloadPage.bind(this);
  }
  state = { 
   // Initially, no file is selected 
   selectedFile: null,
   reloaded:false
 }; 

  onFileChange = event => { 
    var fileInput = document.getElementById('fileupload');
    var filePath = fileInput.value;
    var allowedExtensions = /(\.csv)$/i;
    
    if(!allowedExtensions.exec(filePath)){
      alert("Please upload csv file in specified format");
      this.reloadPage();
    }else{
      this.setState({ selectedFile: event.target.files[0] }); 
    }
 };

  onFileUpload() {
    var fileInput = document.getElementById('fileupload');
    if(fileInput.files.length==0)
    {
      alert("Please upload a file before submitting");
    }
    else
    {
      this.setState.isReload=true;
      const csvfile = this.state.selectedFile;
       papa.parse(csvfile, {
         complete: this.updateData,
         skipEmptyLines: true,
         header: true
       });
    }
     
}
reloadPage(){
  window.location.reload();
}
updateData(result) {
   var data = result.data;
   let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
      }
    };
  axios.get(`http://192.168.44.47:8081/getAll`).then(
    res=>{
      var json = res.data;
      var json1 = data;
      for(var i = 0; i < json.length; i++) {
        var obj = json[i];
        for(var j=0;j<json1.length;j++)
        {
          var obj1 = json1[j];
          if(obj1.day === obj.day && obj1.support_group === obj.support_group)
        {
          axios.delete(`http://192.168.44.47:8081/delete/`+obj.id,axiosConfig)
        .then(res => {
          console.log(res);
          console.log(res.data);
        })
        }
        }
        
    }
      axios.post(`http://192.168.44.47:8081/create`,json1,axiosConfig)
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
    }
  )
  NotificationManager.success('','Uploaded Successfully!');
  window.setTimeout(this.reloadPage,5000);

 }
   render()
   {
      const templateCsvData =[
         ['on_call_support_group', 'day', 'support_engineer','support_engineer_phone'] ,
         ['Operations_VTR', '2020-05-21' , 'Test Engineer','+911234567890']
       ];
      const templateFilename = "VTR-Shift_Roster.csv";
    return (
       <div>
      <div class="row">
      <div class="col-md-12">
      <div class="form">
         <div class="">
         <div>
            <h3 class="aligncenter">Upload VTR Shift roster</h3>
            <input type="file"  id="fileupload" onChange={this.onFileChange}/>
            <input type="submit" class="" class="submitt submitbtn" value="Upload" onClick={()=>{this.onFileUpload()}}/>
            <CSVLink data={templateCsvData} filename={templateFilename}>Download csv template</CSVLink>
         </div>
      </div> 
      </div>
      </div>
      </div>
      <br/>
      <Filter/>
      <NotificationContainer/>
      </div>
    );
   }
}
 
export default ShiftDetails;