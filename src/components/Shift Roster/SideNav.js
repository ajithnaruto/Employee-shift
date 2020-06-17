import React from "react"
import "../../css/sideNav.css"
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import ShiftDetails from "./ShiftDetails";
import DisplayTable from './DisplayTable';
import ShiftDetailsContact from "../Contact details/ShiftDetailsContact";
import Logo from "../../img/Prodapt Logo.PNG";
class SideNav extends React.Component {
  reloadAll(){
    window.location.reload();
  }
  
  render() {
    let sideNavStyle = { width:"150px"}
    const checkActive = (match, location) => {
      //some additional logic to verify you are in the home URI
      if(!location) return false;
      const {pathname} = location;
      console.log(pathname);
      return pathname === "/";
  }
    return (
      <div>
      <React.Fragment>
        <div name="side-nav" class="side-nav" style={sideNavStyle}>
          <img src={Logo} height="30px" width="150px"/>
          <NavLink to={'/'} activeStyle={{color: "red"}} isActive={checkActive}>VTR Shift Roster</NavLink>
          <NavLink to={'/contact'} activeStyle={{color: "red"}}>VTR Contact details</NavLink>
          <NavLink to={'/host'} activeStyle={{color: "red"}}>VTR Ignore Host</NavLink>
          <NavLink to={'/Permanenthost'} activeStyle={{color: "red"}}>VTR Ignore Host Permanent</NavLink>
          <NavLink to={'/callHistory'} activeStyle={{color: "red"}}>Call History</NavLink>
        </div>
      </React.Fragment>
      </div>
    )
  }
}

export default SideNav
