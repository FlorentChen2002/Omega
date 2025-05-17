import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./styles.css";

function Forum({ user }) {
    // État initial
    const [threads, setThreads] = useState([
        {
            id: 1,
            title: "Pourquoi React est génial ?",
            author: "Alice",
            date: "03/05/2025",
            replies: 3
        },
        {
            id: 2,
            title: "Les hooks React",
            author: "Bob",
            date: "04/05/2025",
            replies: 5
        },
        {
            id: 3,
            title: "React vs Vue",
            author: "Charlie",
            date: "05/05/2025",
            replies: 2
        },
    ]);

    const navigate = useNavigate();

    // Effets
    useEffect(async() => {
        document.body.classList.add("forum");
        try {
            const response = await axios.get('http://localhost:8000/api/user/forum');
            if (response.data.status==200){
                console.log(response)
            }
        }catch(e){
            console.error("Erreur lors de l'envoi de la requête :", e);
        }
        return () => {
            document.body.classList.remove("forum");
        };
    }, []);

    // Gestion du clic sur un thread
    const handleThreadClick = (threadId) => {
        console.log("change de page");
    };

    // Rendu
    return (
        <div className="forum-container">
            <main>
                {threads.map((thread) => (
                    <div 
                        className="post-link" 
                        key={thread.id}
                        onClick={() => handleThreadClick(thread.id)}
                        role="button"
                        tabIndex={0}
                    >
                        <div className="post-forum">
                            <h3>{thread.title}</h3>
                            <span className="replies-forum">{thread.replies} 回复</span>
                            <p>
                                - 发布者: {thread.author} - 时间: {thread.date}
                            </p>
                        </div>
                    </div>
                ))}
            </main>
        </div>
        
    );
}

export default Forum;