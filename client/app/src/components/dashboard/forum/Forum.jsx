import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Recherche from "../recherche/Recherche";
import axios from 'axios';
import "./styles.css";

function Forum({ user }) {
    // État initial
    const [memoire, setMemoire] = useState([]);
    const [sujets, setSujets] = useState([]);
    const navigate = useNavigate();

    // comportement
    const getAllSujet = async() =>{
        try {
            const response = await axios.get('http://localhost:8000/api/forum/sujet');
            if (response.status==200){
                setMemoire(response.data);
                setSujets(response.data);
            }
        }catch(e){
            console.error("Erreur lors de l'envoi de la requête :", e);
        }
    }

    const cherche = (e,resultat) =>{
        e.preventDefault();
        const tmp = memoire.filter(obj =>
            obj.titre.toLowerCase().includes(resultat.toLowerCase())
        )
        setSujets(tmp);
        //window.location.reload();
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
            <Recherche onRecherche={cherche} />
            <main>
                { sujets.map((sujet) => {
                    const showSujet = !sujet.prive || user.rang?.toString() === "admin";
                    if (!showSujet) return null;

                    return (
                        <div 
                            className="post-link" 
                            key={sujet._id}
                            onClick={() => navigate("/forum/sujet", { state: { sujet } })}
                            role="button"
                            tabIndex={0}
                        >
                            <div className="post-forum">
                                <h3>{sujet.titre}
                                    {sujet.prive&& <span className="badge-forum"> privée </span>}
                                </h3>
                                <p>
                                    - Auteur: {sujet.user_pseudo} - Posté: {sujet.date}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </main>
        </div>
        
    );
}

export default Forum;