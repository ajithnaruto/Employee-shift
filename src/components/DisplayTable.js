import React from 'react';
import axios from 'axios';
import tableify from 'tableify';
class DisplayTable extends React.Component{
    
    componentDidMount(){
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
          };
        axios.get('http://localhost:8081/2020-05-19',axiosConfig)
    .then((response) => {
    let data = response.data;
    var html = tableify(data);
    console.log(html);
    document.getElementById("table").innerHTML = html;
    });
    }
    
    render(){
        return(
            <div id="table"></div>
        );
    }
}
export default DisplayTable;