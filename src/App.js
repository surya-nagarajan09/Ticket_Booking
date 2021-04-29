import React from "react";
/** importing Components */
import Home from "./Components/Home";
import Movies from "./Components/Movies";
import Book from "./Components/Book";
import Final from "./Components/Final";
import Nav from "./Components/Nav";
import View from "./Components/View";
import Login from "./Components/Login";
import SignUp from "./Components/Signup";

/** Route */
import {BrowserRouter as Router,Route,Redirect} from "react-router-dom"

function App() {
  

  var  logged=false;
  logged=sessionStorage.getItem("logged");



 

  

  return (
    <div >
      <div>
      <Nav/>
      </div>
      <Router>
        <Route  path="/" exact  component={Home} />
        <Route  path="/Movies"   component={Movies} />
        <Route  path="/booking"  strict exact render={()=>((logged)? (<Book/>): (<Redirect to="/Login"/>))} />
        <Route  path="/Review"   component={Final} />
        <Route  path="/view"  strict exact render={()=>((logged)? (<View/>): (<Redirect to="/Login"/>))}/>
        <Route  path="/ticket"   component={Final} />
        <Route  path="/Login"   component={Login} />
        <Route  path="/signup"   component={SignUp} />
      </Router>
    </div>
  );
}

export default App;
