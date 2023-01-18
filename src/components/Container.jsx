import React, { useState } from "react";
import Item from "./Item";
import Axios from "axios";
import { useGlobalState, setGlobalState  } from "./Login";




const API_BASE = "https://bullet-point-journal-users.onrender.com";



function Container({heading, onAdd, placeholder, data, allSteps, delSteps, allAffirmations,
  delAff, allGratitudes, delGrat, containerId}) {
  
  let [email] = useGlobalState("email");
  const [inputText, setInputText] = useState("");

  if (email.length > 0) {
    sessionStorage.setItem("email", email);
  } else {
    email = sessionStorage.getItem("email");
  }

  

  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);

  }



const updateGratitude = async (id, newText) => {
  const data = await Axios.put(API_BASE + "/gratitude/update/" + email + "/" + id,{
    item: newText
}).then(res => res.data)
   
}


const updateAffirmation = async (id, newText) => {
  const data = await Axios.put(API_BASE + "/affirmation/update/" + email + "/" + id,{
    item: newText
}).then(res => res.data)

}

const updateStep = async (id, newText) => {
  const data = await Axios.put(API_BASE + "/step/update/" + email + "/" + id,{
    item: newText
}).then(res => res.data)

}




  const deleteGratitude = async (id) => {
    const data = await Axios.delete(API_BASE + "/gratitude/delete/" + email + "/" + id).then(res => res.data);
  
      delGrat(data);
      

    
  };

  

  const deleteAffirmation = async (id) => {
    const data = await Axios.delete(API_BASE + "/affirmation/delete/" + email + "/" + id).then(res => res.data);
  
      delAff(data);
  
  };
  
  
  const deleteStep = async (id) => {
    const data = await Axios.delete(API_BASE + "/step/delete/" + email + "/" + id).then(res => res.data);
      
    delSteps(data);


  };
  


    return (
    <div className="container_home">
    <div className="heading">
      <h1>{heading}</h1>
    </div>
    <div className="form">
    <form onSubmit = {(e) => {
          e.preventDefault();
          onAdd(inputText);
          setInputText("");
        }}>
      <input className="container"  onChange={handleChange} type="text" value={inputText}  placeholder={placeholder} />
      <button 

        type="submit" 
        id = 'btn'
        >

      </button>
      </form>
    </div>
    <div>
   
      <ul >
      {data.map((d, index) => (

       <Item
          key={d.id}
          id={d.id}
          text={d.text}
          containerId = {containerId}
          deleteGratitude = {deleteGratitude}
          deleteAffirmation = {deleteAffirmation}
          deleteStep = {deleteStep}
          updateGratitude = {updateGratitude}
          updateAffirmation = {updateAffirmation}
          updateStep = {updateStep}
        /> 
        
  
 
      ))}
      
      

        
      </ul>
    </div>
  </div>
    );
}


export default Container;