import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Router } from 'react-router-dom';
import SideNav from './components/Shift Roster/SideNav';
import ShiftDetails from './components/Shift Roster/ShiftDetails';
import ShiftDetailsContact from './components/Contact details/ShiftDetailsContact';
import FilterContact from './components/Contact details/FilterContact';
import DisplayTableContact from './components/Contact details/DisplayTableContact';
import AddNewRecordFormContact from './components/Contact details/AddNewRecordFormContact';
import AddNewRecordFormHost from './components/Hosts Ignore/AddNewRecordFormHost';
import ShiftDetailsHost from './components/Hosts Ignore/ShiftDetailsHost';
import ShiftDetailsPermanentHost from './components/Permanent Hosts Ignore/ShiftDetailsPermanentHost';
import ShiftDetailsCall from './components/Call History/ShiftDetailsCall';

 
class App extends Component {
  render() {
    return (      
      <BrowserRouter>
        <div>
          <SideNav/>
          <Switch>
              <Route exact path='/' component={ShiftDetails} />
              <Route  path='/contact' component={AddNewRecordFormContact} />
              <Route  path='/host' component={ShiftDetailsHost} />
              <Route  path='/Permanenthost' component={ShiftDetailsPermanentHost} />
              <Route  path='/callHistory' component={ShiftDetailsCall} />
          </Switch> 
        </div> 
      </BrowserRouter>
    );
  }
}
export default App;