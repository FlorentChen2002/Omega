import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./styles.css";

function Forum({ user }) {
    // État initial
    const [sujets, setSujets] = useState([]);

    const navigate = useNavigate();

    // Effets
    const getAllSujet = async() =>{
        try {
            const response = await axios.get('http://localhost:8000/api/user/forum/sujet');
            if (response.status==200){
                setSujets(response.data);
            }
        }catch(e){
            console.error("Erreur lors de l'envoi de la requête :", e);
        }
    }
    useEffect(() => {
        document.body.classList.add("forum");
        getAllSujet();
        return () => {
            document.body.classList.remove("forum");
        };
    }, []);
    // Rendu
    return (
        <div className="forum-container">
            <main>
                {sujets.map((sujet) => (
                    <div 
                        className="post-link" 
                        key={sujet._id}
                        onClick={() => navigate("/forum/sujet",{ state: { sujet } })}
                        role="button"
                        tabIndex={0}
                    >
                        <div className="post-forum">
                            <h3>{sujet.titre}</h3>
                            <p>
                                - Auteur: {sujet.user_pseudo} - Posté: {sujet.date}
                            </p>
                        </div>
                    </div>
                ))}
            </main>
        </div>
        
    );
}

export default Forum;