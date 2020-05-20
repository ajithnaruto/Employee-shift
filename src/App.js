import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from '../src/components/Home';
import ShiftDetails from '../src/components/ShiftDetails';

 
class App extends Component {
  render() {
    return (      
      <BrowserRouter>
        <div>
          <Home/>
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