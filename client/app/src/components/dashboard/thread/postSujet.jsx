import React, { useEffect, useRef } from "react";
import "./styles.css";

function PostSujet({ user, sujet }) {
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
        {sujet.pseudo} · {sujet.date}
      </p>

      <p className="article-text">{sujet.commentaire}</p>

      <div className="commentaire-actions">
        <span onClick={handleClick}>💬 Répondre</span>
        <span>🚩 Signaler</span>
      </div>
    </div>
  );
}

export default PostSujet;
