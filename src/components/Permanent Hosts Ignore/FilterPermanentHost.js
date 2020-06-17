import React from 'react';
import AddNewRecordFormPermanentHost from './AddNewRecordFormPermanentHost';
import DisplayTablePermanentHost from './DisplayTablePermanentHost';
class FilterPermanentHost extends React.Component{
    constructor(props){
        super(props)
        this.ApplyFilter = this.ApplyFilter.bind(this);
    }
    state={
        from_dt: "",
        to_dt:""
    }
    componentDidMount(){
        // var date = new Date();
        // date.setDate(date.getDate() + 7);
        // document.getElementById('fromdt').valueAsDate = new Date();
        // document.getElementById('todt').valueAsDate = date;
    }
    
    ApplyFilter(){
        this.setState({
            from_dt:this.from_dt.value,
            to_dt:this.to_dt.value
        });
    }
render(){
    return(
        <div>
        <div className="flexbox-container">
        {/* <div class="form">
            <h3 class="aligncenter">VTR Shift details</h3>
            <label>Start Date</label>: <input type="date" id="fromdt" ref={el => this.from_dt=el}/>
            <label>End Date</label>:   <input type="date"  id="todt" ref={el => this.to_dt=el}/>
            <input type="submit" class ="submitt submitbtn" onClick={this.ApplyFilter} value="Apply Filter"/>
        </div> */}
        <div class=""><AddNewRecordFormPermanentHost/>
        <br/>
        <DisplayTablePermanentHost fromDT={this.state.from_dt} toDT={this.state.to_dt}/>
        </div>
        
        <br/>
        </div>
        </div>
    );
}
}
export default FilterPermanentHost;