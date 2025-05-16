import React, { useState } from "react";

const NewPostForm = ({ onSubmit }) => {
    const [content, setContent] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!content.trim()) return;
        onSubmit(content);
        setContent("");
    };

    return (
        <form onSubmit={handleSubmit}>
        <textarea
            placeholder="Votre commentaire"
            value={content}
            onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Ajouter un commentaire</button>
        </form>
    );
};

export default NewPostForm;