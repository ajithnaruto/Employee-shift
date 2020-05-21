import React from 'react';
import '../css/landingpage.css';
import Home from './Home';
import ShiftDetails from './ShiftDetails';
class Landing extends React.Component{
    constructor(){
        super();
        this.state={uploadFlag:false}
        this.handleMulti = this.handleMulti.bind(this);
        this.handleSingle = this.handleSingle.bind(this);
    }
    
       handleMulti=()=>{
           this.setState({uploadFlag:false});
       }
       handleSingle=()=>{
           this.setState({uploadFlag:true});
       }
    render()
    {
        let myBtn = null;
        let content = null;
        if(this.state.uploadFlag)
        {
               myBtn = <button class="btn button" onClick={this.handleMulti}><label>Multiple upload?</label></button>
        }
        else
        {
               myBtn =  <button class="btn button" onClick={this.handleSingle}>Single Entry?</button>
        }
        content = this.state.uploadFlag ? <Home/>:<ShiftDetails/>
        return(
        <div>
            {myBtn}
            {content}
        </div>
        );
    }

}
export default Landing;