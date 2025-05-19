import React,{useState , useEffect} from "react";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import "./profile.css";

function Profile({user}) {
  const [messages,setMessages] = useState([]);
  const location = useLocation();
  const [users,setUser] =useState(user);
  const otherUser = async() => {
    try {
      const response = await axios.get('http://localhost:8000/api/user/userid',
        {params: { userid: location.state?.user_id }}
      );
      if (response.status==200){
        setUser(response.data);
      }
    }catch(e){
      console.error("Erreur lors de l'envoi de la requête :", e);
    }
  }

  const getMessage = async() =>{

    try {
      const response = await axios.get('http://localhost:8000/api/user/forum/allthread');
      if (response.status==200){
        let responseCopy=[...response.data];
        responseCopy=responseCopy.filter((responses) => responses.user_id.toString()===users._id.toString());
        setMessages(responseCopy);
      }
    }catch(e){
      console.error("Erreur lors de l'envoi de la requête :", e);
    }
  }
  useEffect(() => {
    if (location.state?.userid){
      otherUser();
    }
    getMessage();
  }, []);
  return (
    <div className="container-profile">
      <div className="profile-info">
        <h2>{users.pseudo}</h2>
        <p>Inscrit : {users.date}</p>
        <p>Nombre de messages : {messages.length}</p>
      </div>

      <div className="messages">
        <h3>Historique des messages</h3>
        {messages.map((message) => (
          <div className="message" key={message._id}>{message.content}
            <div className="meta">{message.date}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;
