import React, { useState } from "react";
import PostList from "./PostList";
import NewPostForm from "./NewPostForm";

const ThreadView = async({ thread, users }) => {
    let list_post={}
    try {
        list_post = await axios.get('http://localhost:8000/api/forum/get', {thread});
        console.log("Requête Get envoyée avec succès :", response.data);
    } catch (error) {
        console.error("Erreur lors de l'envoi de la requête :", error);
    }
    const [commentaires, setCommentaires] = useState(list_post); //bdd
    
    const handleAddComment = (newCommentaire) => {
        const newCom = {
        id: Date.now(),
        auteur_id: users.id,
        auteur: users.pseudo,
        content: newCommentaire,
        replies: [],
        };
        setCommentaires([...commentaires, newCom]);
    };

    const addReply = (parentId, reply) => {
        const addRecursively = (commentairesList) =>
            commentairesList.map((commentaire) => {
            if (commentaire.id === parentId) {
                return { ...commentaire, replies: [...commentaire.replies, reply] };
            } else {
                return { ...commentaire,replies: addRecursively(commentaire.replies)};
            }
        });
        setCommentaires(addRecursively(commentaires));
    };

    return (
        <div>
        <h2>{list_post.titre}</h2>
        <p>{list_post.content}</p>
        <p>Posté par {list_post.auteur}</p>
        <h3>Commentaires :</h3>
        <PostList commentaires={commentaires} users={users} onReply={addReply} />
        <NewPostForm onSubmit={handleAddComment} />
        </div>
    );
};

export default ThreadView;