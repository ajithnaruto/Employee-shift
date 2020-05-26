import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Router } from 'react-router-dom';
import SideNav from './components/Shift Roster/SideNav';
import ShiftDetails from './components/Shift Roster/ShiftDetails';
import ShiftDetailsContact from './components/Contact details/ShiftDetailsContact';
import FilterContact from './components/Contact details/FilterContact';
import DisplayTableContact from './components/Contact details/DisplayTableContact';
import AddNewRecordFormContact from './components/Contact details/AddNewRecordFormContact';


 
class App extends Component {
  render() {
    return (      
      <BrowserRouter>
        <div>
          <SideNav/>
          <Switch>
              <Route exact path='/' component={ShiftDetails} />
              <Route  path='/contact' component={AddNewRecordFormContact} />
          </Switch> 
        </div> 
      </BrowserRouter>
    );
  }
}
 
export default App;