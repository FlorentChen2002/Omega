import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import NewPostForm from "./NewPostForm";
import PostSujet from "./postSujet";
import PostList from "./postList";
import axios from 'axios';


//Affiche un sujet de forum, sa liste de commentaires (threads) 
//et un formulaire pour poster un nouveau commentaire.
//Charge les commentaires depuis l'API au chargement.
function Principale({user}) {
  const [threads,setThreads] = useState([]);
  const location = useLocation();
  const sujet = location.state?.sujet;

  const getAllThread = async() =>{
    try {
      const response = await axios.get('http://localhost:8000/api/forum/thread', {
        params: { sujetid: sujet._id },
        withCredentials: true
      });
      console.log("Requête GET envoyée avec succès :", response.data);
      if (response.status==200){
        setThreads(response.data);
      }
    }catch(e){
      console.error("Erreur lors de l'envoi de la requête :", e);
    }
  }
  //useEffect liste de commentaire
  useEffect(() => {
    document.body.classList.add("sujet");
    getAllThread();
    return () => {
      document.body.classList.remove("sujet");
    };
  }, []);
  
  return (
    <main className="containers contents">
      <section>
        <PostSujet sujet={sujet} user={user}/>
        <PostList user={user} commentaires={threads} sujet={sujet} />
        <div className="commentaire">
          <NewPostForm user={user} sujet={sujet} commentaire={[]} />
        </div>
      </section>
    </main>
  );
}

export default Principale;
