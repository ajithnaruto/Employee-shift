import React from 'react';
import Home from './AddNewRecordForm';
class Filter extends React.Component{
render(){
    return(
        <div class="flexbox-container">
        <div class="form">
            <h3>VTR Shift details</h3>
            <label>Start Date</label>: <input type="date"/>
            <label>End Date</label>:   <input type="date"/>
            <input type="submit" class ="submitt submitbtn" value="Apply Filter"/>
            <Home/>
        </div>
        </div>
    );
}
}
export default Filter;