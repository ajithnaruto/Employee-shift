import React from 'react';
import papa from 'papaparse';
import axios from 'axios';
class ShiftDetails extends React.Component {
   constructor() {
      super();
      this.onFileUpload = this.onFileUpload.bind(this);
      this.onFileChange = this.onFileChange.bind(this);
      this.updateData = this.updateData.bind(this);
      
  }
  state = { 
  
   // Initially, no file is selected 
   selectedFile: null
 }; 

  onFileChange = event => { 
     
   // Update the state 
   this.setState({ selectedFile: event.target.files[0] }); 
  
 };

  onFileUpload() {
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
    return (
      <div class="row leftspace">
      <div class="col-md-8">
      <div class="form">
         <div class=""> 
         <h1> 
            Upload CSV 
         </h1> 
         <div> 
            <input type="file"  onChange={this.onFileChange}/> 
            <button type="submit" onClick={this.onFileUpload} > 
               Upload! 
            </button> 
         </div> 
      </div> 
      </div>
      </div>
      </div>
    );
   }
}
 
export default ShiftDetails;