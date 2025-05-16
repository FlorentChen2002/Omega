import React, { useState } from "react";
import ThreadView from "./ThreadView"
import { useNavigate } from "react-router-dom";

const Sujet = async({ thread, users }) => {
    try {
        const list_sujet = await axios.get('http://localhost:8000/api/forum', {});
        console.log("Requête Get envoyée avec succès :", response.data);
    } catch (error) {
        console.error("Erreur lors de l'envoi de la requête :", error);
    }
    return(<div><ul>
        {list_sujet.map((sujet) => (
          <li key={sujet._id}>
            {sujet.titre} {sujet.auteur} <button onClick={() => navigate("/ThreadView",{thread:sujet._id, users:users})}>x</button>
          </li>
        ))}</ul></div>);
};
export default Sujet;