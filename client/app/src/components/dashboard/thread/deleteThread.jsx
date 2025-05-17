import { useEffect, useRef } from "react";
import axios from 'axios';

function DeleteThread({commentaire}){
    const called = useRef(false);
    const supprimer = async() =>{
        try {
        const response = await axios.delete('http://localhost:8000/api/user/forum/delete/sujet',{ data: { id: commentaire._id } });
        if (response.status==200){
            window.location.reload();
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

export default DeleteThread;