import React from 'react';
import '../css/style.css'
import axios from 'axios';
class home extends React.Component {
    constructor() {
        super();
        this.showValue = this.showValue.bind(this);
    }

    showValue(){
    const user = {
            support_group: this.support_group.value,
            day:this.day.value,
            support_engineer:this.support_engineer.value,
            support_engineer_phone:this.support_engineer_phone.value,
            support_engineer_email:this.support_engineer_email.value
    };
    console.log(user);
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        }
      };
      
    axios.post(`http://localhost:8081/create`,user,axiosConfig)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
    }

    render(){
    return (
        <div class="row leftspace">
        <div class="col-md-8">
            <div class="form">
            <h1> Shift Form </h1>
              <label for="name">Support Group</label>
              <input type="text"  name="support_group" ref={el => this.support_group=el}/>
              <label for="email">Day</label>
              <input type="text" name="day" ref={el => this.day=el}/>
                <label for="name">Support Engineer</label>
              <input type="text"  name="support_engineer" ref={el => this.support_engineer=el}/>
              <label for="name">Phone</label>
              <input type="text"  name="support_engineer_phone" ref={el => this.support_engineer_phone=el}/>
              <label for="email">Email</label>
              <input type="text" name="support_engineer_email" ref={el => this.support_engineer_email=el}/>
            <button type="submit" onClick={this.showValue}>Submit</button>
            </div>
            </div>
          </div>
          
    );
}
}
export default home;