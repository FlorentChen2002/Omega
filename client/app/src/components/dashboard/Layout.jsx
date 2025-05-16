import { Outlet } from "react-router-dom";
import Header from "./Header";
import React, { useEffect } from "react";
import "./forum/styles.css";

const Layout = ({user}) => {
    useEffect(() => {
        document.body.classList.add("forum");
        return () => {
        document.body.classList.remove("forum");
        };
    }, []);
    return (
        <div>
        <header className="header">
            <h1>Forum</h1>
            <div className="nav-links">
            <a href="#">首页</a>
            <a href="#">WebApproach</a>
            <a href="#">Github</a>
            </div>
        </header>
        <div className="container">
            <Header />
            <div className="content">
            <Outlet />
            </div>
        </div>
        </div>
    );
};

export default Layout;