import React from "react";
import Forum from "./forum/Forum";
import Layout from "./Layout";
import PostForum from "./forum/PostForum"
import { Routes, Route } from "react-router-dom";

function DashBoard({users}) {//verification de connexion
  //affichage
  return (
    <Routes> 
      <Route path="/" element={<Layout user={users}/>}>
        <Route index element={<Forum user={users}/>} />
        <Route path="/forum" element={<Forum user={users}/>} />
        <Route path="/postforum" element={<PostForum user={users}/>} />
      </Route>
    </Routes>
  );
}
export default DashBoard;