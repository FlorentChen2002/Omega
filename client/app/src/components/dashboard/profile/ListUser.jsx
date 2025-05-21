import React,{ useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Recherche from "../recherche/Recherche";
import axios from "axios";
import "./profile.css";

const ListUser = () => { 
    const [memoire, setMemoire] = useState([]);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const getAllUser = async() =>{
        try {
            const response = await axios.get('http://localhost:8000/api/user/alluser');
            console.log("Requête GET envoyée avec succès :", response.data);
            if (response.status==200){
                setMemoire(response.data);
                setUsers(response.data);
            }
        }catch(e){
            console.error("Erreur lors de l'envoi de la requête :", e);
        }
    }
    const cherche = (e,resultat) =>{
        e.preventDefault();
        console.log(resultat)
        const tmp = memoire.filter(obj =>
            obj.pseudo.toLowerCase().includes(resultat.toLowerCase())
        )
        setUsers(tmp);
        //window.location.reload();
    }

    useEffect(() => {
        getAllUser();
    }, []);

    return (
        <div className="search-container">
            <Recherche onRecherche={cherche} />
            <ul className="search-results">
                {users.map(user => {
                const userid = user._id;
                return (
                    <li key={user._id} onClick={() => navigate("/profile", { state: { userid } })}>
                    {user.pseudo}
                    </li>
                );
                })}
            </ul>
        </div>
    );
};

export default ListUser;