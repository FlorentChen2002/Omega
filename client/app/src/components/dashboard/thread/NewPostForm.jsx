// components/NewPostForm/index.jsx
import React, { useState } from "react";
import "./styles_module.css";

const NewPostForm = ({ user,sujet,commentaire }) => {
  const [content, setContent] = useState("");

  //serveur
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    setContent("");
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
