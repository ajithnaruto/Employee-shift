import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SideNav from './components/Shift Roster/SideNav';
import ShiftDetails from './components/Shift Roster/ShiftDetails';
import DisplayTable from './components/Shift Roster/DisplayTable';
import AddNewRecordForm from './components/Shift Roster/AddNewRecordForm';

 
class App extends Component {
  render() {
    return (      
      <BrowserRouter>
        <div>
          {/* <DynamicTable/> */}
          {/* <Home/> */}
          {/* <SideNav/> */}
          {/* <Landing/> */}
{/* <DisplayTable/> */}
          <SideNav/>
          <ShiftDetails/>

          {/* { <Navigation />
            <Switch>
             <Route path="/" component={Home} exact/>
             <Route path="/about" component={About}/>
             <Route path="/contact" component={Contact}/>
            <Route component={Error}/>
           </Switch> } */}
        </div> 
      </BrowserRouter>
    );
  }
}
 
export default App;