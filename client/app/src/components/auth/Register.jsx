import React, { useState,useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import "./Login.css";

function Signup(props) {
  //state
  const [pseudo, setPseudo] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [passOK, setPassOK] = useState(true);
  const [passRegister, setPassRegister] = useState(true);
  
  useEffect(() => {
    document.body.classList.add("login");
    return () => {
      document.body.classList.remove("login");
    };
  },[]);
  const getPseudo = (evt) => {
    setPseudo(evt.target.value);
  };
  const getPassword1 = (evt) => {
    setPassword1(evt.target.value);
  };
  const getPassword2 = (evt) => {
    setPassword2(evt.target.value);
  };

  const submissionHandler = async(event) => {
    event.preventDefault();
    if (password1 !== password2) {
      setPassOK(false);
      return
    } else {
      try {
        const response = await axios.post('http://localhost:8000/api/user/register', {
          login: pseudo, password: password1,date: new Date().toLocaleDateString('fr-FR'),rang: "users"
        });
        setPassRegister(true);
        // Affiche la réponse reçue du serveur
        console.log("Requête POST envoyée avec succès :", response.data);
        setPassOK(false);
        if (response.data.status==200){
          console.log("connexion");
          setPassRegister(false);
          setPseudo("");
          setPassword1("");
          setPassword2("");
          setPassOK(true);
        }
      } catch (error) {
        // Gère les erreurs éventuelles (connexion, serveur, etc.)
        setPassOK(false);
        console.error("Erreur lors de l'envoi de la requête :", error);
      }
    }
  };

  //affichage
  return (
    <form className="login-box" >
      <header className="header-login">S'inscrire</header>
      {passRegister ? (
        <p></p>
      ) : (
        <p style={{ color: "green" }}>L'inscription est validé</p>
      )}
      {passOK ? (
        <p></p>
      ) : (
        <p style={{ color: "red" }}>Ce pseudo est déjà utilisée ou le mot de passe est différent</p>
      )}
      <div className="input-box">
        <input
          type="text"
          className="input-field"
          placeholder="Pseudo"
          value={pseudo}
          onChange={getPseudo}
        />
      </div>
      <div className="input-box">
        <input
          type="password"
          className="input-field"
          placeholder="Saisir votre mot de passe"
          value={password1}
          onChange={getPassword1}
        />
      </div>
      <div className="input-box">
        <input
          type="password"
          className="input-field"
          placeholder="Confirmer votre mot de poasse"
          value={password2}
          onChange={getPassword2}
        />
      </div>
      <div className="input-submit">
      <button className="submit-btn" onClick={submissionHandler}></button>
        <label>S'inscrire</label>
      </div>
      <div className="sign-up-link">
        <p>
          Vous avez déjà un compte ?<Link to="/login"> Connexion</Link>
        </p>
      </div>
    </form>
  );
}

export default Signup;
