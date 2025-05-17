import React, { useEffect } from "react";
import PostSujet from "./postSujet";
import NewPostForm from "./NewPostForm";
import PostList from "./postList";
const sujet = {
  id: 1,
  user_id: 1,
  titre: "Pourquoi React est génial ?",
  commentaire: "J'aimerais vos avis sur les avantages de React.",
  pseudo: "Alice",
  date: "2018-05-05 22:08:44",
};

function Principale({sujet,user}) {
  //useEffect liste de commentaire
  return (
    <main className="containers contents">
      <section>
        <PostSujet sujet={sujet} user={user}/>
        <PostList
          commentaires={[
            {
              id: 1,
              sujet_id: 1,
              user_id: 1,
              pseudo: "Jean",
              commentaire: "C'est beau",
              date: "2018-05-05 22:08:44",
              repond: [],
            },
          ]}
        />
        <div className="commentaire">
          <NewPostForm user={user} sujet={sujet} commentaire={[]} />
        </div>
      </section>
    </main>
  );
}

export default Principale;
