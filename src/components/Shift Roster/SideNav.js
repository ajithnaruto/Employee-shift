import React from "react"
import "../../css/sideNav.css"
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ShiftDetails from "./ShiftDetails";
import DisplayTable from './DisplayTable';
import ShiftDetailsContact from "../Contact details/ShiftDetailsContact";

class SideNav extends React.Component {
  reloadAll(){
    window.location.reload();
  }
  render() {
    let sideNavStyle = { width:"150px"}
    
    return (
      <div>
      <React.Fragment>
        <div name="side-nav" class="side-nav" style={sideNavStyle}>
          <Link to={'/'}>VTR Shift Roster</Link>
          <Link to={'/contact'}>VTR Contact details</Link>
        </div>
      </React.Fragment>
      </div>
    )
  }
}

export default SideNav
