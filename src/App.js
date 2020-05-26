import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SideNav from '../src/components/SideNav';
import ShiftDetails from '../src/components/ShiftDetails';
import DisplayTable from './components/DisplayTable';
import AddNewRecordForm from './components/AddNewRecordForm';

 
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