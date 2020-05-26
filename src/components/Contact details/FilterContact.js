import React from 'react';
import AddNewRecordFormContact from '../Contact details/AddNewRecordFormContact';
import DisplayTableContact from '../Contact details/DisplayTableContact';
class FilterContact extends React.Component{
    constructor(props){
        super(props)
        this.ApplyFilter = this.ApplyFilter.bind(this);
    }
    state={
        from_dt: "",
        to_dt:""
    }
    componentDidMount(){
        

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
        <div class="form">
            <h3>VTR Contact Details</h3>
            <label>Search Record</label>: <input type="text" placeholder="Enter a name" id="search" ref={el => this.search=el}/>
            <input type="submit" class ="submitt submitbtn" onClick={this.ApplyFilter} value="Search"/>
            <AddNewRecordFormContact/>
        </div>
        <br/>
        </div>
        <DisplayTableContact fromDT={this.state.from_dt} toDT={this.state.to_dt}/>
        </div>
    );
}
}
export default FilterContact;