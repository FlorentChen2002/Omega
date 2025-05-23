import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import NewPostForm from "./NewPostForm";
import DeleteForum from "./deleteForum";
import "./styles.css";

//Affiche un message d'utilisateur avec ses métadonnées, les réponses associées,
//et des actions comme répondre, supprimer ou accéder au profil.
function Commentaire({ sujet, commentaire, user }) {
  const [showForm, setShowForm] = useState(false);
  const [showDeleteComposant, setShowDeleteComposant] = useState(false);
  //const [showRepond, setShowRepond] = useState(false);
  const navigate = useNavigate();
  const showRepond = commentaire?.repond[0]?.content;
  const showDelete = user._id.toString()===commentaire.user_id.toString() || user.rang.toString()==="admin";
  const userid=commentaire.user_id;
  //console.log(user._id.toString(),commentaire.user_id.toString(), showDelete);
  return (
    <div className="commentaire-body">
      <div className="commentaire-meta">
        <span className="author">{commentaire.user_pseudo}</span>

        <span className="meta">{commentaire.date}</span>
      </div>
      <p>{commentaire.content}</p>
      {showRepond && (
        <div className="reply-block">
          <div className="commentaire-meta">
            <span className="author">{commentaire.repond[0].user_pseudo}</span>
            <span className="meta">{commentaire.repond[0].date}</span>
          </div>
          <p>{commentaire.repond[0].content}</p>
        </div>
      )}
      <div className="commentaire-actions">
        <span onClick={() => setShowForm(!showForm)}>💬 Répondre</span>
        <span>🚩 Signaler</span>
        <span onClick={() => navigate("/profile", { state: { userid } })}>👤 profile</span>
        {showDelete && <span onClick={() => setShowDeleteComposant(true)} >🗑️ Supprimer</span>}
        {showDeleteComposant && <DeleteForum commentaire={commentaire} query="thread"/>}
      </div>
      {showForm && <NewPostForm user={user} sujet={sujet} commentaire={commentaire}/>}
    </div>
  );
}

export default Commentaire;
