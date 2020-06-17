import React from 'react';
import DisplayTableCall from './DisplayTableCall';
class FilterCall extends React.Component{
    constructor(props){
        super(props)
        this.ApplyFilter = this.ApplyFilter.bind(this);
        
    }
    state={
        from_dt: "",
        to_dt:"",
        colname:"",
        searchTerm:"",
    }
    ApplyFilter(){
        var searchval = document.getElementById("searchTerm").value;
        var e = document.getElementById("searchUrl");
        var searchParam = e.options[e.selectedIndex].value;
        this.setState({
            from_dt:this.from_dt.value,
            to_dt:this.to_dt.value,
            searchTerm:searchval,
            colname:searchParam
            
        });
    }
    componentDidMount(){
        let DT = new Date();
        document.getElementById('fromdt').valueAsDate = new Date();
        document.getElementById('todt').valueAsDate =  new Date(DT.setDate(DT.getDate()+1));

    }
render(){
    return(
        <div>
            <div className="dateFilter">
        <label>Start Date: </label><input type="Date" id="fromdt" ref={el => this.from_dt=el}/><br/>
        <label>End_ Date:   </label><input type="Date" id="todt" ref={el => this.to_dt=el}/> 
    </div>
        <div className="flexbox-container">
    <div class="wrap">
   <div class="search">
   <select id="searchUrl" name="searchUrl">
  <option value="app">App</option>
  <option value="engineer">Engineer</option>
  <option value="team">Team</option>
  <option value="priority">Priority</option>
</select>
      <input type="text" class="searchTerm" id="searchTerm"/>
      <input type="submit" value="Search" id="applyfilter" class="submitt submitbtn" onClick={this.ApplyFilter}/>
   </div>
</div>
<br/>
<DisplayTableCall fromDT={this.state.from_dt} toDT={this.state.to_dt} searchVal={this.state.colname} searchterm = {this.state.searchTerm}/>
        </div>
        </div>
    );
}
}
export default FilterCall;