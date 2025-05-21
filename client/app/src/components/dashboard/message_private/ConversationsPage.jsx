import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ConversationPage.css";

function ConversationPage() {
  const [currentUserId, setCurrentUserId] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [newUserPseudo, setNewUserPseudo] = useState("");
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/messages_private/current-user", { withCredentials: true });
        setCurrentUserId(res.data.userId);
      } catch (err) {
        console.error("Erreur récupération currentUser:", err);
      }
    };
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (currentUserId) {
      fetchConversations();
    }
  }, [currentUserId]);

  const fetchConversations = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/messages_private/conversations", { withCredentials: true });
      setConversations(res.data);
    } catch (err) {
      console.error("Erreur fetch conv:", err);
    }
  };

  const createConversation = async () => {
    try {
      if (!newUserPseudo.trim()) return;

      const res = await axios.post(
        "http://localhost:8000/api/messages_private/conversations",
        { pseudo: newUserPseudo },
        { withCredentials: true }
      );

      setNewUserPseudo("");
      setError("");
      fetchConversations();
    } catch (err) {
      console.error("Erreur lors de la création", err);
      setError(err.response?.data?.message || "Erreur inconnue");
    }
  };

  const handleAfficherMessages = async (conversationId) => {
    try {
      const res = await axios.get(`http://localhost:8000/api/messages_private/conversations/${conversationId}/messages`, { withCredentials: true });
      setSelectedMessages(res.data);
      setSelectedConversationId(conversationId);
      console.log("Requête GET envoyée avec succès :", res.data);
    } catch (err) {
      console.error("Erreur affichage messages:", err);
    }
  };

  const handleSendMessage = async () => {
    if (!messageInput.trim() || !selectedConversationId) return;
    try {
      const res = await axios.post(
        `http://localhost:8000/api/messages_private/${selectedConversationId}`,
        { content: messageInput },
        { withCredentials: true }
      );
      console.log("Requête POST envoyée avec succès :", res.data);
      setMessageInput("");
      handleAfficherMessages(selectedConversationId);
    } catch (err) {
      console.error("Erreur envoi message:", err);
    }
  };

  return (
    <div className="container-message">
      <h2>Messagerie Privée</h2>

      <div className="new-conversation mb-4 flex gap-2">
        <input
          type="text"
          value={newUserPseudo}
          onChange={(e) => setNewUserPseudo(e.target.value)}
          placeholder="Pseudo de l'utilisateur"
        />
        <button onClick={createConversation}>Nouvelle discussion</button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {conversations.length === 0 ? (
        <p>Parle à quelqu’un avant de regarder ici</p>
      ) : (
        <ul className="conversations-list">
          {conversations.map((conv) => (
            <li key={conv._id}>
              Conversation avec <strong>{conv.otherPseudo}</strong>
              <button onClick={() => {setShowForm(!showForm);handleAfficherMessages(conv._id)}}>Voir</button>
            </li>
          ))}
        </ul>
      )}
      {showForm && (
        <div className="messages-section mt-6">
          <h3>Messages</h3>
          {selectedMessages.length === 0 ? (
            <p>Aucun message pour l'instant</p>
          ) : (
            <ul className="messages-list">
              {selectedMessages.map((msg) => (
                <li
                  key={msg._id}
                  className={
                    String(msg.sender) === String(currentUserId)
                      ? "message-mine"
                      : "message-other"
                  }
                >
                  <span className="message-sender">
                    {String(msg.sender) === String(currentUserId) ? "MOI" : "LUI/ELLE"}
                  </span>
                  {msg.content}
                </li>
              ))}
            </ul>
          )}

          <div className="message-input-container mt-4 flex gap-2">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Tape ton message..."
            />
            <button onClick={handleSendMessage}>Envoyer</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ConversationPage;