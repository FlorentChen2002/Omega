import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import DeleteForum from "./deleteForum";
import "./styles.css";


//Affiche les détails d’un sujet de forum avec options pour répondre,
//accéder au profil de l’auteur, et supprimer si autorisé.
function PostSujet({ user, sujet }) {
  const [showDeleteComposant, setShowDeleteComposant] = useState(false);
  const showDelete = user._id.toString()===sujet.user_id.toString() || user.rang.toString()==="admin";
  const navigate = useNavigate();
  const userid =sujet.user_id;
  
  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }, []);

  const handleClick = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };

  return (
    <div className="main-content">
      <h2>{sujet.titre}</h2>
      <p className="meta">
        {sujet.user_pseudo} · {sujet.date}
      </p>

      <p className="article-text">{sujet.description}</p>

      <div className="commentaire-actions">
        <span onClick={handleClick}>💬 Répondre</span>
        <span>🚩 Signaler</span>
        <span onClick={() => navigate("/profile", { state: { userid } })}>👤 profile</span>
        {showDelete && <span onClick={() => setShowDeleteComposant(true)} >🗑️ Supprimer</span>}
        {showDeleteComposant && <DeleteForum commentaire={sujet} query="sujet"/>}
      </div>
    </div>
  );
}

export default PostSujet;
