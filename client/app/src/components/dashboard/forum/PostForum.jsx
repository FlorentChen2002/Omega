import React, { useState} from "react";
import "./styles.css";

function PostForum({ user }) {
    const [titre, setTitre] = useState("");
    const [contenu, setContenu] = useState("");

    const getTitre = (evt) => {
        setContenu(evt.target.value);
    };
    const getContenu = (evt) => {
        setContenu(evt.target.value);
    };

    const submissionHandler = (evt) => {
        console.log("Ajouter pour le moment");
    };

    return (
        <div className="forum-container">
        <h2 className="Post-forum-h2">Poster un nouveau sujet</h2>
        <form className="Post-forum-form" method="post">
            <label className="Post-forum-label">
            Titre du sujet
            </label>
            <input
            className="Post-forum-text"
            type="text"
            value={titre}
            onChange={getTitre}
            required
            />
            <label className="Post-forum-label">
            Contenu
            </label>
            <textarea
            className="Post-forum-text"
            rows="6"
            value={contenu}
            onChange={getContenu}
            required
            ></textarea>
            <button className="Post-forum-button" onClick={submissionHandler}>
            Poster
            </button>
        </form>
        </div>
    );
};

export default PostForum;