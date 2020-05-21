import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SideNav from '../src/components/SideNav';
import Home from '../src/components/Home';
import ShiftDetails from '../src/components/ShiftDetails';
import Landing from './components/Landing';
import DisplayTable from './components/DisplayTable';

 
class App extends Component {
  render() {
    return (      
      <BrowserRouter>
        <div>
          {/* <SideNav/>
          <Landing/> */}
<DisplayTable/>
          {/* <SideNav/>
          <ShiftDetails/> */}
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