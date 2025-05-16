import React from "react";
import PostItem from "./PostItem";

const PostList = ({ commentaires, users, onReply }) => {
    return (
        <>
        {commentaires.map((commentaire) => (
            <PostItem
            key={commentaire.id}
            commentaire={commentaire}
            users={users}
            onReply={onReply}
            />
        ))}
        </>
    );
};

export default PostList;