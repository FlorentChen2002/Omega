// components/NewPostForm/index.jsx
import React, { useState } from "react";
import "./styles_module.css";
import axios from 'axios';

const NewPostForm = ({ user,sujet,commentaire }) => {
  const [content, setContent] = useState("");
  //serveur
  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!content.trim()) return;
    try{
      const repondData = commentaire ? [{
        content: commentaire.content,
        user_id: commentaire.user_id,
        user_pseudo: commentaire.user_pseudo,
        date: commentaire.date
      }] : [];

      await axios.post('http://localhost:8000/api/user/forum/post', {
        sujetid: sujet._id,
        content: content,
        userid: user._id,
        userpseudo: user.pseudo,
        date: new Date().toLocaleString('fr-FR'),
        repond: repondData
      });
      setContent("");
      window.location.reload();
    }catch(e){
      console.error("Erreur lors de l'envoi de la requête :", e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="newPostForm-post">
      <textarea
        placeholder="Votre commentaire"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="textareaField-post"
        required
      />
      <button type="submit" className="submitButton-post">
        Envoyer
      </button>
    </form>
  );
};

export default NewPostForm;
