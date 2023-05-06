import { useEffect, useState } from "react";
import Login from "./component/Login";
import Navbar from "./component/Navbar";
import Time from "./component/Time";
import AddTime from "./component/AddTime";
import { DOMAIN_NAME } from "./constant";


function App() {
  const [isLoggingIn, setisLoggingIn] = useState(false);
  const [isAddingTime, setIsAddingTime] = useState(false);
  const [times, setTimes] = useState(null);


  useEffect(() => {

    async function getLoggedInUser(){
      const token = localStorage.getItem("token");
        
      const res = await fetch(`${DOMAIN_NAME}/api/v1/user/loggedinuser`, {
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                }
              });

      const resData = await res.json();

      if(resData.success){
        localStorage.setItem("user", JSON.stringify(resData.user));
      }
      else {
        localStorage.setItem("user", null);
      }
    }

    getLoggedInUser();

    fetch(`${DOMAIN_NAME}/api/v1/time`)
    .then(res => res.json())
    .then(res => {
        console.log(res);
        setTimes(res.times.sort((a,b)=>  b.startTime - a.startTime))
    });
  }, []);


  return (
    <div className="">
      <Navbar setisLoggingIn={setisLoggingIn} setIsAddingTime={setIsAddingTime}/>
      {
        isAddingTime? <>
        <AddTime setTimes={setTimes} setIsAddingTime={setIsAddingTime}/>
        </>:<>
          {
            isLoggingIn? <Login setisLoggingIn={setisLoggingIn}/>:<>{times && <Time setTimes={setTimes} times={times}/>}</>
          }
        </>
      }
    </div>
  );
}

export default App;
