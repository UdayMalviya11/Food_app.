import React from "react";

class UserClass extends React.Component { 
    
    constructor(props) {
    
    super(props);
  
    this.state =  {
        userInfo: {
            name: "Dummy",
            location: "Default",
        },
    };
    }

    async componentDidMount() {

     const data = await fetch("https://api.github.com/users/UdayMalviya11");
     const json = await data.json();
     console.log(json);

     this.setState({
        userInfo: json,
    });
    }
    componentDidUpdate(){
        console.log("ComponentDId updated");
    }

   render(){ 
   const {id,login} = this.state.userInfo;

    return (
        <div className="user-card">
            
            <h2>User ID:{id}</h2>
            <h3>{login}</h3>
            <div>LoggedIn USer 
              
            </div>
        </div>
    );
   }
}
export default UserClass;

/**
 * Parent Constructor
 * Parent Render
 * 
 * First Constructor 
 * First Render
 * Second Constructor
 * Second Render
 * 
 * <DOM updated in single Batched>
 * First componentDidMount
 * Second componentDidMount
 * 
 * Parent componentDidMount
 */