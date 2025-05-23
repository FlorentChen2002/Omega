import React from "react";
import Layout from "./Layout";
import Forum from "./forum/Forum";
import Profile from "./profile/Profile";
import PostForum from "./forum/PostForum"
import LayoutForum from "./forum/LayoutForum";
import ListUser from "./profile/ListUser";
import AdminUsers from "./adminpage/AdminUsers";
import ConversationPages from "./message_private/ConversationsPage";
import { Routes, Route, Navigate } from "react-router-dom";
import Principale from "./thread/principale";



//Définit les routes principales de l'application selon le rôle de l'utilisateur.
//Affiche les différentes pages (forum, profil, admin,messages,utilisateurs..) via react-router-dom.
function DashBoard({ users }) {
  if (!users) {
    return <p>Chargement de l'utilisateur...</p>; // ou un loader
  }

  return (
    <Routes>
      <Route path="/" element={<Layout user={users} />}>
        <Route index element={<Navigate to="/forum" />} />

        <Route path="forum" element={<LayoutForum user={users} />}>
          <Route index element={<Forum user={users} />} />
          <Route path="sujet" element={<Principale user={users} />} />
        </Route>

        <Route path="postforum" element={<PostForum user={users} />} />
        <Route path="profile" element={<Profile user={users} />} />
        <Route path="listuser" element={<ListUser />} />
        <Route path="conversation" element={<ConversationPages />} />
        {users.rang?.toString() === "admin" && (
          <Route path="adminpanel" element={<AdminUsers />} />
        )}
      </Route>
    </Routes>
  );
}
export default DashBoard;