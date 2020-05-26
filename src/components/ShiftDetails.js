import React from 'react';
import papa from 'papaparse';
import axios from 'axios';
import {CSVLink} from 'react-csv';
import Filter from './Filter';

class ShiftDetails extends React.Component {
   constructor(props) {
      super(props);
      this.onFileUpload = this.onFileUpload.bind(this);
      this.onFileChange = this.onFileChange.bind(this);
      this.updateData = this.updateData.bind(this);
  }
  state = { 
   // Initially, no file is selected 
   selectedFile: null,
   reloaded:false
 }; 

  onFileChange = event => { 
   // Update the state 
   this.setState({ selectedFile: event.target.files[0] }); 
 };

  onFileUpload() {
     this.setState.isReload=true;
   const csvfile = this.state.selectedFile;
    papa.parse(csvfile, {
      complete: this.updateData,
      skipEmptyLines: true,
      header: true
    });
}
updateData(result) {
   var data = result.data;
   console.log(data);
   let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
      }
    };
    
  axios.post(`http://localhost:8081/create`,data,axiosConfig)
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
 }
   render()
   {
      const templateCsvData =[
         ['support_group', 'day', 'support_engineer','support_engineer_phone','support_engineer_email'] ,
         ['Operations_VTR', '22-05-2020' , 'Test Engineer','+911234567890','mailme@mail.com']
       ];
      const templateFilename = "VTR-Shift_Roster.csv";
    return (
       <div>
      <div class="row">
      <div class="col-md-12">
      <div class="form aligncenter">
         <div class="">
         <div>
            <h3>Upload VTR Shift roster</h3>
            <input type="file"  onChange={this.onFileChange}/>
            <input type="submit" class="" class="submitt submitbtn" value="Upload" onClick={this.onFileUpload}/>
            <CSVLink data={templateCsvData} filename={templateFilename}>Download csv template</CSVLink>
         </div>
      </div> 
      </div>
      </div>
      </div>
      <br/>
      <Filter/>
      </div>
    );
   }
}
 
export default ShiftDetails;