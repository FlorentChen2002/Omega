import {useNavigate } from "react-router-dom";
import React, { useState} from "react";
import axios from 'axios';
import "./styles.css";

function PostForum({ user }) {

    //state
    const [titre, setTitre] = useState("");
    const [contenu, setContenu] = useState("");
    const [prive, setPrive] = useState(false);
    const navigate = useNavigate();
    const showPrive = user.rang.toString()==="admin";

    //comportement
    const getTitre = (evt) => {
        setTitre(evt.target.value);
    };
    const getContenu = (evt) => {
        setContenu(evt.target.value);
    };
    const handleChange = (evt) => {
        setPrive(evt.target.checked);
    }
    const submissionHandler = async(evt) => {
        evt.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/forum/postforum', {
                titre:titre,description:contenu,date:new Date().toLocaleString('fr-FR'),userid:user._id,userpseudo:user.pseudo,private:prive
            });
            if (response.data.status==201){
                setTitre("");
                setContenu("");
                navigate("/")
            }
        }catch(e){
            console.error("Erreur lors de l'envoi de la requête :", e);
        }
    };
    //affichage
    return (
        <div className="forum-container">
            <h2 className="Post-forum-h2">Poster un nouveau sujet</h2>
            <form className="Post-forum-form" method="post">
                <label className="Post-forum-label">Titre du sujet</label>
                <input
                    className="Post-forum-text"
                    type="text"
                    value={titre}
                    onChange={getTitre}
                    required
                />
                <label className="Post-forum-label">Contenu</label>
                <textarea
                    className="Post-forum-text"
                    rows="6"
                    value={contenu}
                    onChange={getContenu}
                    required
                />
                { showPrive && <label className="meta"><input type="checkbox" value={prive} onChange={handleChange}/>Privé pour les admins</label>}
                <button className="Post-forum-button" onClick={submissionHandler}>
                Poster
                </button>
            </form>
        </div>
    );
};

export default PostForum;