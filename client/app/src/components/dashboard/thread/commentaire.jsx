import React, { useState } from "react";
import NewPostForm from "./NewPostForm";
import DeleteForum from "./deleteForum";
import "./styles.css";

function Commentaire({ sujet, commentaire, user }) {
  const [showForm, setShowForm] = useState(false);
  const [showDeleteComposant, setShowDeleteComposant] = useState(false);
  //const [showRepond, setShowRepond] = useState(false);
  const showRepond = commentaire.repond[0].content;
  const showDelete = user._id.toString()===commentaire.user_id.toString() || user.rang.toString()==="admin";
  console.log(user._id.toString(),commentaire.user_id.toString(), showDelete);
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
        {showDelete && <span onClick={() => setShowDeleteComposant(true)} >🗑️ Supprimer</span>}
        {showDeleteComposant && <DeleteForum commentaire={commentaire} query="thread"/>}
      </div>
      {showForm && <NewPostForm user={user} sujet={sujet} commentaire={commentaire}/>}
    </div>
  );
}

export default Commentaire;
