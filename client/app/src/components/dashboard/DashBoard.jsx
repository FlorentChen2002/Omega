import React from "react";
import Layout from "./Layout";
import Forum from "./forum/Forum";
import Profile from "./profile/Profile";
import PostForum from "./forum/PostForum"
import LayoutForum from "./forum/LayoutForum";
import ListUser from "./profile/ListUser";

import { Routes, Route, Navigate } from "react-router-dom";
import Principale from "./thread/principale";

function DashBoard({users}) {//verification de connexion
  //affichage
  return (
    <Routes> 
      <Route path="/" element={<Layout user={users} />}>
      
        {/* Redirection de "/" vers "/forum" */}
        <Route index element={<Navigate to="/forum" />} />

        <Route path="forum" element={<LayoutForum user={users} />}>
          <Route index element={<Forum user={users} />} />
          <Route path="sujet" element={<Principale user={users} />} />
        </Route>
        <Route path="postforum" element={<PostForum user={users} />} />
        <Route path="profile" element={<Profile user={users} />} />
        <Route path="listuser" element={<ListUser/>} />
      </Route>
    </Routes>
  );
}
export default DashBoard;