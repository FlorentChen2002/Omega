import React, { useState } from "react";
import NewPostForm from "./NewPostForm";
import "./styles.css";

function Commentaire({ sujet, commentaire, user }) {
  const [showForm, setShowForm] = useState(false);
  const [showRepond, setShowRepond] = useState(false);
  if (commentaire.repond.length > 0) {
    setShowRepond(true);
  }
  return (
    <div className="commentaire-body">
      <div className="commentaire-meta">
        <span className="author">{commentaire.pseudo}</span>

        <span className="meta">{commentaire.date}</span>
      </div>
      <p>{commentaire.commentaire}</p>
      {showRepond && (
        <div className="reply-block">
          <div className="commentaire-meta">
            <span className="author">{commentaire.repond.pseudo}</span>
            <span className="meta">{commentaire.repond.date}</span>
          </div>
          <p>{commentaire.repond.commentaire}</p>
        </div>
      )}
      <div className="commentaire-actions">
        <span onClick={() => setShowForm(!showForm)}>💬 Répondre</span>
        <span>🚩 Signaler</span>
      </div>
      {showForm && <NewPostForm user={user} sujet={sujet} commentaire={commentaire}/>}
    </div>
  );
}

export default Commentaire;
