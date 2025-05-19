import React,{useState , useEffect} from "react";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import "./profile.css";

function Profile({user}) {
  const [messages,setMessages] = useState([]);
  const location = useLocation();
  const [users,setUsers] = useState(user);
  const [rang,setRang] = useState(users.rang.toString()==="admin");
  const showPrive = user.rang.toString()==="admin";
  const otherUser = async(userid) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/user/${userid}`
      );
      if (response.status==200){
        setUsers(response.data);
        setRang(response.data.rang.toString()==="admin");
        getMessage(response.data._id);
      }
    }catch(e){
      console.error("Erreur lors de l'envoi de la requête :", e);
    }
  }

  const getMessage = async(userid) =>{

    try {
      const response = await axios.get('http://localhost:8000/api/forum/allthread');
      if (response.status==200){
        let responseCopy=[...response.data];
        responseCopy=responseCopy.filter((responses) => responses.user_id.toString()===userid.toString());
        setMessages(responseCopy);
      }
    }catch(e){
      console.error("Erreur lors de l'envoi de la requête :", e);
    }
  }
  useEffect(() => {
    const loadData = async () => {
      if (location.state?.userid) {
        await otherUser(location.state.userid);
      }else{
        await getMessage(users._id);
      }
    };

    loadData();
  }, []);
  return (
    <div className="container-profile">
      <div className="profile-info">
        <h2>
          {users.pseudo}
          {rang&&<span className="badge">Admin</span>}
        </h2>
        <p>Inscrit : {users.date}</p>
        <p>Nombre de messages : {messages.length}</p>
      </div>

      <div className="messages">
        <h3>Historique des messages</h3>
        {messages.map((message) => (
          ((showPrive||message.prive) && <div className="message" key={message._id}>{message.content}
            <div className="meta">{message.date}
            </div>
          </div>)
        ))}
      </div>
    </div>
  );
}

export default Profile;
