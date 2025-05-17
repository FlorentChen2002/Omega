import React from "react";
import Commentaire from "./commentaire";
import "./styles.css";

const PostList = ({ sujet,commentaires, user }) => {
  console.log("pas ici",showSujet) 
  return (
    <div className="commentaire">
      <h1>Commentaire :</h1>
      {commentaires.map((commentaire) => (
          <Commentaire
          key={commentaire._id}
          sujet={sujet}
          commentaire={commentaire}
          user={user}
        />
      ))}
    </div>
  );
};

export default PostList;
