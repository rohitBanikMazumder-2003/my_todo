import ListHeader from "./components/header";
import { useEffect, useState } from "react";
import ListItem from "./components/ListItem";
import Auth from "./components/Auth";
import { useCookies } from "react-cookie";
function App() {
  const [cookies,setCookies,removeCookies]=useCookies(null)
  const authToken=cookies.AuthToken
  const userEmail = cookies.Email
  const encodedEmail = encodeURIComponent(userEmail);
  const [task, setTask] = useState(null);


  const getData = async (event) => {
    try {
      const response = await fetch(`http://localhost:5000/todos/${encodedEmail}`);
      
      const json=await response.json();
      setTask(json);

     
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {if(authToken){
    getData()}
  }, []);
  
  //sort by date
  const sortedTask=task?.sort((a,b)=>new Date(a.date)-new Date(b.date));
  return (
    <div className="app"> 
      {!authToken && <Auth/>}
      {authToken && 
      <>
      <ListHeader listName="📌 Todays check list" getData={getData}/>
      <p className="user-email">Welcome Back {userEmail}</p>
      {sortedTask?.map((task)=><ListItem key={task.id} task={task} getData={getData}/>)}
      </>
      }
    </div>
  )
}

export default App;
