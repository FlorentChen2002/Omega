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
    <div className="sidebar">
        <ul>
          <button className="submitButton" onClick={submissionHandler}> +    Sujet </button>
          <li>
            <Link to="/">Forum</Link>
          </li>
          <li>
            <Link to="/">Forum</Link>
          </li>
          <li>
            <Link to="/">Messages</Link>
          </li>
          <li>
            <Link to="/">Profile</Link>
          </li>
          <li>
            <Link to="/">AdminPanel</Link>
          </li>
        </ul>
    </div>
  );
};

export default Header;
