import React from 'react';
import papa from 'papaparse';
import axios from 'axios';
import FilterCall from './FilterCall';

class ShiftDetailsCall extends React.Component {
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
   data.forEach((element,index) => {
     element["hosts"] = element["hosts"].split(",");
     element["services"] = element["services"].split(",");
     element["updated_date"] =new Date().getTime();
   });
   let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
      }
    };
  // axios.get(`http://192.168.44.47:8081/getHosts`).then(
  //   res=>{
  //     var json = res.data;
  //     var json1 = data;
  //     for(var i = 0; i < json.length; i++) {
  //       var obj = json[i];
  //       for(var j=0;j<json1.length;j++)
  //       {
  //         var obj1 = json1[j];
  //         if(obj1.day === obj.day && obj1.support_group === obj.support_group)
  //       {
  //         axios.delete(`http://192.168.44.47:8081/delete_host/`+obj.id,axiosConfig)
  //       .then(res => {
  //         console.log(res);
  //         console.log(res.data);
  //       })
  //       }
  //       }
        
  //   }
  //   }
  // )
  axios.post(`http://192.168.44.47:8081/createHost`,data,axiosConfig)
    .then(res => {
      console.log(res);
      console.log(res.data);
    })

 }
   render()
   {
      const templateCsvData =[
         ['hosts', 'services', 'start_datetime','end_datetime'] ,
         ['puimprd02el-ib;paiaprd02el-ib', 'service1' , '09-04-2020  00:00:00','11-04-2020  00:00:00']
       ];
      const templateFilename = "Nagios_Ignore_Hosts.csv";
    return (
       <div>
      <div class="row">
      <div class="col-md-12">
      {/* <div class="form">
         <div class="">
         <div>
            <h3 class="aligncenter">Upload VTR Shift roster</h3>
            <input type="file"  id="fileupload" onChange={this.onFileChange}/>
            <input type="submit" class="" class="submitt submitbtn" value="Upload" onClick={()=>{this.onFileUpload()}}/>
            <CSVLink data={templateCsvData} filename={templateFilename}>Download csv template</CSVLink>
         </div>
      </div> 
      </div> */}
      </div>
      </div>
      <br/>
      <FilterCall/>
      </div>
    );
   }
}
 
export default ShiftDetailsCall;