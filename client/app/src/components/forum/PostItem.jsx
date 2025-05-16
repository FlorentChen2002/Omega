import React, { useState } from "react";

const PostItem = ({ commentaire, users, onReply }) => {
    const [showReplies, setShowReplies] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [message, setMessage] = useState("");
    const handleReplySubmit = (e) => {
        e.preventDefault();
        if (!message.trim()) return;
        const newReply = {
        id: Date.now(),
        auteur_id: users.id,
        auteur: users.pseudo,
        content: message,
        replies: [],
        };

        onReply(commentaire.id, newReply);
        setMessage("");
        setShowForm(false);
        setShowReplies(true);
    };

    //cache les réponses des réponses
    const visibleReplies = showReplies ? comment.replies : [];
    const hiddenCount = commentaire.replies.length;

    return (
        <div>
        <p>
            <strong>{commentaire.auteur}</strong> : {commentaire.content}
        </p>
        <button onClick={() => setShowForm(!showForm)}>Répondre</button>
        {showForm && (
            <form onSubmit={handleReplySubmit}>
            <textarea
                placeholder="Votre réponse"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit">Envoyer</button>
            </form>
        )}

        {visibleReplies.map((reply) => (
            <PostItem key={reply.id} comment={reply} onReply={onReply} />
        ))}

        {hiddenCount > 0 && !showReplies && (
            <button onClick={() => setShowReplies(true)}>
            Voir {hiddenCount} réponse{hiddenCount > 1 ? "s" : ""}
            </button>
        )}
        {showReplies && comment.replies.length > 0 && (
            <button onClick={() => setShowReplies(false)}>
            Masquer les réponses
            </button>
        )}
        </div>
    );
};

export default PostItem;