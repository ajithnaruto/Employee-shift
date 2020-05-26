import React from "react"
import "../../css/sideNav.css"

class SideNav extends React.Component {

  render() {
    let sideNavStyle = { width:"250px"}

    return (
      <React.Fragment>
        <div name="side-nav" class="side-nav" style={sideNavStyle}>
          <a href="">VTR Shift Roster</a>
          <a href="">VTR Contact details</a>
          <a href="#"></a>
          <a href="#"></a>
        </div>
      </React.Fragment>
    )
  }
}

export default SideNav
