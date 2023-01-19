import React from "react";
import { useState} from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import md5 from "md5";
import { createGlobalState } from "react-hooks-global-state";

// const API_BASE = "https://bullet-point-journal-users.onrender.com";
const API_BASE = "http://localhost:3002";

const { setGlobalState , useGlobalState} = createGlobalState({

  email:"",
  password:""
 
});



function Login() {
  let [email] = useGlobalState("email");
  const [password] = useGlobalState("password");


  

  const [incorrectpassword, setPassword] = useState(false);

  const [accountExists, setAccount] = useState(true);



  const handleChange1 = (event) => {

  setGlobalState(
    "email", event.target.value

  )};

  const handleChange2 = (event) => {

    setGlobalState(
      "password", event.target.value
  
    );


};

  let navigate = useNavigate();

  const checkPresenceInDB = (email, password) => {
    Axios.get(API_BASE + "/users").then((response) => {

       //Find email of specific object using findIndex method. 
       const dataFetched = response.data;


        if (dataFetched.filter(obj => obj.email === email).length>0) {
          
          const relIndex = dataFetched.findIndex((obj => obj.email === email));
        

          if (response.data[relIndex]["password"] === md5(password)) {
            
            navigate('/home'); 
          } else {
            setPassword(true);
            alert("Incorrectly entered password")
          }
        } else  {
          alert("No account registered");
          navigate('/signup');
        }
    });

  };






const handleFormSubmit = (event) => {
    event.preventDefault();
    checkPresenceInDB(email, password);
    
 
  };


    return (
        <div>
        <h1 className="login_greeting">Hello!</h1>
        <form>
        <input type = "email" name = "email" value = {email} onChange = {handleChange1}  className = "login_input" placeholder="email"  />
        <input type = "password" name = "password" value = {password} onChange = {handleChange2} className = "login_input" placeholder="password" />
        <button className="login_button" onClick={handleFormSubmit}>Login</button>
        </form>
        
        <p><Link className = "registrationLink"  to="/signup">Don't have an account? Sign up here!</Link></p>
        </div>
    );
   
     
      
  };

export default Login;
export {useGlobalState, setGlobalState};



