import React from "react";
import Commentaire from "./commentaire";
import "./styles.css";


//Affiche la liste des commentaires d'un sujet de forum.
const PostList = ({ sujet,commentaires, user }) => { 
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
