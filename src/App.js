import './App.css';
import  { useState, useEffect } from 'react';
import firebase from "firebase"
function App() { 
  const [podaci, setPodaci] = useState();
  const [noviPodaci, setNoviPodaci] = useState()
  const firebaseConfig = {
    apiKey: "AIzaSyAZWG86rlyAT0t6VmpFw9cZkft53DL6JjQ",
    authDomain: "lemaa12.firebaseapp.com",
    projectId: "lemaa12",
    storageBucket: "lemaa12.appspot.com",
    messagingSenderId: "132259430682",
    appId: "1:132259430682:web:3911c6a5e6c26f0869aca3"
  };
  if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
  }else {
    firebase.app(); // if already initialized, use that one
 }
  const data = firebase.database().ref("/");

  useEffect(()=> {
    data.on('value', (snap) => {
      let data1  = snap.val();
      let newState = [];
        for(let i in data1) {
          newState.push(data1[i]);
        }
        setPodaci(newState)
    })
    // console.log("podd", podaci)
  }, [])
  useEffect(() => {
    const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
      data.on('value', (snap) => {
        let data1  = snap.val();
        let newState = [];
          for(let i in data1) {
            newState.push(data1[i]);
          }
          setNoviPodaci(newState)
          if(podaci.length !== noviPodaci.length){
            setPodaci(noviPodaci)
        }
      })
    }, 5000)
  
    return () => clearInterval(intervalId); //This is important
   
  }, [])
  return (
    <div className="App">
      <header className="App-header">
      <p>{podaci}</p>

      </header>
    </div>
  );
}

export default App;
