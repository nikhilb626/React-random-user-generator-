import React,{useState} from "react";
import './App.css';
import Button from "./components/button";
import axios from "axios";

function App() {


  const [userData,setUserData]=useState([]);
  const [loading,setLoading]=useState(false);
  const [activeUser,setActiveUser]=useState(false);
  const [activeLink,setActiveLink]=useState(0);


  const onClickHandler=()=>{
    setLoading(true);
    axios.get("https://randomuser.me/api/").then((response)=>{
      console.log(response.data.results);
      setUserData(response.data.results);
    }).catch((error)=>{
      console.log(error);
      setLoading(true);

    }).finally(()=>{
      setLoading(false);
      setActiveUser(true);
      setActiveLink(0);
    })
  }

  const icons=[
    'fas fa-user fa-2x',
    'fas fa-envelope fa-2x',
    'fa fa-calendar fa-2x',
    'fas fa-map-marker fa-2x',
    'fas fa-phone fa-2x',
    'fas fa-lock fa-2x',
  ]


  const PhraseGenerator=({user})=>{
    const phrases=[
      `Hi my name is ${user.name.first} ${user.name.last}`,
      `Hi my email address is ${user.email}`,
      `I was born on ${user.dob.date.slice(0,10)},`,
      `My country is ${user.location.country}`,
      `My phone number is ${user.phone}`,
      `My username is ${user.login.username}`,

    ]

    return <h2>{phrases[activeLink]}</h2>
  }



  const activeLinkHandler=(index)=>{
    setActiveLink(index);
  }

  return (
    <div className="App">
     <h1>Random User Generator</h1>
    <Button isActive={activeUser} clicked={onClickHandler} />
    {
      loading?<h1>loading...</h1>:
      <div className="app_user">
      {userData.map((user,index)=>{
        return (
          <div key={user.cell} className="data_container">
            <img src={user.picture.large} alt="picture" />

          <PhraseGenerator  user={user} />

            <div className="app_icons">
              {
                icons.map((icon,index)=>{
                  return (
                    <i className={icon} key={index} onMouseEnter={()=>activeLinkHandler(index)}></i>
                  )
                })
              }
            </div>
          </div>
        )
      })}
      </div>
    }
    </div>
  );
}

export default App;
