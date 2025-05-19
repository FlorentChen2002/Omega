import React from "react";
import { Link,useNavigate } from "react-router-dom";

const Header = () => {
  //comportement
  const navigate = useNavigate();
  const submissionHandler = () =>{
    navigate("/postforum");
  }
  //affichage
  return (
    <div className="sidebar-gauche">
        <ul>
          <button className="submitButton" onClick={submissionHandler}> +    Sujet </button>
          <li>
            <Link to="/forum">Forum</Link>
          </li>
          <li>
            <Link to="/">Messages</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/">AdminPanel</Link>
          </li>
        </ul>
    </div>
  );
};

export default Header;
