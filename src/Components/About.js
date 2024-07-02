import UserClass from "./UserClass";
import { Component } from "react";




class About extends Component {
    constructor(props){
        super(props);
    }
   
    render() {
        
     return (
    
    <div className="user-card">
    <h1>About Us</h1>
    <h2>This is about us section </h2>
    <UserClass name={"Uday"}location={"Indore"}/>
  
    </div>
    );
  }
}


export default About;