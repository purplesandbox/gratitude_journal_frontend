import React, { useState, useEffect, useRef } from "react";
import Header from "./Header";
import Container from "./Container";
import Axios from "axios";
import { useGlobalState, setGlobalState  } from "./Login";


document.body.style.backgroundImage = ("./IMG-1078.jpg");


const API_BASE = "https://bullet-point-journal-users.onrender.com";





function Home() {
  

  let [email] = useGlobalState("email");
  const [gratitudes, setGratitudes] = useState([]);
  const [affirmations, setAffirmations] = useState([]);
  const [steps, setSteps] = useState([]);
  



  if (email.length > 0) {
     sessionStorage.setItem("email", email);
   } else {
     email = sessionStorage.getItem("email");
   }



  useEffect(() => {



    Axios.get(API_BASE + "/gratitudes/" + email).then((response) => {
      setGratitudes(response.data);
    });

    Axios.get(API_BASE + "/affirmations/" + email).then((response) => {
      setAffirmations(response.data);
    });

    Axios.get(API_BASE + "/steps/" + email).then((response) => {
      setSteps(response.data);
      }); 

 
  }, []);


 



//////// Create records ///////////

// Adding a gratitude record

const addGratitude =  async (inputText) => {
  const gratitude = await Axios.put(API_BASE + "/gratitude/new/" + email, {

        item: inputText      
    
      }).then(res => res.data)
   
      setGratitudes(gratitude);
};

// Adding an affirmation record 

const addAffirmation =  async (inputText) => {
  const affirmation = await Axios.put(API_BASE + "/affirmation/new/" + email, {

          item: inputText     
    
      }).then(res => res.data)
   
      setAffirmations(affirmation);
};

// Adding a step record 

const addStep =  async (inputText) => {
  const step = await Axios.put(API_BASE + "/step/new/" + email, {

          item: inputText     
    
      }).then(res => res.data)
   
       setSteps(step);
};


/////// From each record in an array create an object with two keys and values - one for the id  /////////

  const gr = gratitudes.map((i, index) => {
    
    return (
      {text:i.item, id:index}
      
      );
  });

  const aff = affirmations.map((i, index) => {
    return (
      {text:i.item, id:index}
      );
  });


  const st = steps.map((i, index) => {
    return (
      {text:i.item, id:index}
    );
  });





  
    return ( 
    <div>
   
        <Header >
        </Header>
        <div className = "containers">
        <Container
        containerId = "gratitudes"
        placeholder = "I'm greatful for ..✍🏻"
        heading = "What am I greatful for?" 
        onAdd={addGratitude}
        data = {gr}
        allGratitudes = {gratitudes}
        delGrat = {setGratitudes}
        updateGratitude = {setGratitudes}
        />
        
        
        <Container
        containerId = "affirmations"
        placeholder = " ..✍🏻"
        heading = "My affirmations"
        onAdd={addAffirmation}
        data = {aff}
        allAffirmations = {affirmations}
        delAff = {setAffirmations}
        updateAffirmation = {setAffirmations}
        
        />

        

        <Container
        containerId = "steps"  
        heading = "What steps will I make towards my goals?"
        placeholder = "Today I will ..✍🏻"
        onAdd={addStep}
        data = {st}
        allSteps = {steps}
        delSteps = {setSteps}
        updateStep = {setSteps}

        />
        </div>
      </div>
      );


}


export default Home;