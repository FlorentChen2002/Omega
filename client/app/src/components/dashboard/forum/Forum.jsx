import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
    useEffect(() => {
        console.log(user);
        document.body.classList.add("forum");
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
                        <div className="post">
                            <h3>{thread.title}</h3>
                            <span className="replies">{thread.replies} 回复</span>
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