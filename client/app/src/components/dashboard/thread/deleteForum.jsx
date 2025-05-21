import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function DeleteForum({commentaire,query}){
    const called = useRef(false);
    const navigate = useNavigate();

    const supprimer = async() =>{
        try {
            const response = await axios.delete(`http://localhost:8000/api/forum/delete/${query}`,{ data: { id: commentaire._id } });
            console.log("Requête DELETE envoyée avec succès :", response.data);
            if (response.status==200){
                if (query==="sujet"){
                    navigate("/forum");
                    window.location.reload();
                }else{
                    window.location.reload();
                }
            }
        }catch(e){
            console.error("Erreur lors de l'envoi de la requête :", e);
        }
    }

    useEffect(() => {
        if (called.current) return;
        called.current = true;
        supprimer();
    }, []);

    return null;
}

export default DeleteForum;